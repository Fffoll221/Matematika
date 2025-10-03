import express from "express";
import cors from "cors";
import fse from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5174;

// дозволяємо фронту
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "25mb" })); // для base64
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const DATA_DIR = path.join(__dirname, "data");
const UPLOADS_DIR = path.join(__dirname, "uploads");
await fse.ensureDir(DATA_DIR);
await fse.ensureDir(UPLOADS_DIR);

const p = (name) => path.join(DATA_DIR, name + ".json");
const rd = async (name, fallback) =>
  (await fse.pathExists(p(name)))
    ? JSON.parse(await fse.readFile(p(name), "utf8") || "null") ?? fallback
    : (await fse.writeFile(p(name), JSON.stringify(fallback)), fallback);
const wr = (name, data) => fse.writeFile(p(name), JSON.stringify(data, null, 2));

// --------------- дефолтні дані ----------------
const DEF_CATALOG = [
  { id: "nmt11", title: "НМТ-2026 (11 клас)", price: 3600, short: "12 уроків/міс. Групові заняття + матеріали + тести." }
];

// гарантуємо файли
await rd("users", []);
await rd("catalog", DEF_CATALOG);
await rd("purchases", []);
await rd("enrollments", {});
await rd("receipts", {});  // { userId: { courseId: [ {id,name,url,ts,courseId} ] } }
await rd("materials", {}); // { courseId: { text, files:[{id,name,url,ts,type}] } }

// ===== helpers =====
const saveDataUrl = async (dataUrl, folder, origName) => {
  const m = String(dataUrl).match(/^data:(.+?);base64,(.+)$/);
  if (!m) throw new Error("Invalid data URL");
  const [, mime, b64] = m;
  const ext = (origName.split(".").pop() || "").toLowerCase() || "bin";
  const id = nanoid(10);
  const fname = `${Date.now()}_${id}.${ext}`;
  const dir = path.join(UPLOADS_DIR, folder);
  await fse.ensureDir(dir);
  await fse.writeFile(path.join(dir, fname), Buffer.from(b64, "base64"));
  return { id, name: origName, url: `/uploads/${folder}/${fname}`, ts: Date.now() };
};

// ============== API ==============

// ---- каталог
app.get("/api/catalog", async (_req, res) => res.json(await rd("catalog", DEF_CATALOG)));
app.put("/api/catalog", async (req, res) => { await wr("catalog", req.body || []); res.json({ ok: true }); });

// ---- користувачі
app.post("/api/users/ensure", async (req, res) => {
  const email = String(req.body?.email || "").toLowerCase().trim();
  if (!email) return res.status(400).json({ error: "email required" });
  const users = await rd("users", []);
  let u = users.find(x => String(x.email || x.mail || "").toLowerCase() === email);
  if (!u) {
    u = { id: "u_" + nanoid(8), email, firstName: "", lastName: "" };
    users.push(u);
    await wr("users", users);
  }
  res.json(u);
});
app.get("/api/users", async (_req, res) => res.json(await rd("users", [])));
app.get("/api/users/:id", async (req, res) => {
  const users = await rd("users", []);
  res.json(users.find(u => u.id === req.params.id) || null);
});
app.patch("/api/users/:id", async (req, res) => {
  const users = await rd("users", []);
  const i = users.findIndex(u => u.id === req.params.id);
  if (i < 0) return res.status(404).json({ error: "not found" });
  users[i] = { ...users[i], ...req.body };
  await wr("users", users);
  res.json(users[i]);
});

// ---- заявки (purchases)
app.get("/api/purchases", async (_req, res) => res.json(await rd("purchases", [])));
app.post("/api/purchases", async (req, res) => {
  const list = await rd("purchases", []);
  const item = { courseId: req.body.courseId, userId: req.body.userId, status: "pending", ts: Date.now() };
  list.push(item); await wr("purchases", list); res.json(item);
});
app.patch("/api/purchases/:ts", async (req, res) => {
  const list = await rd("purchases", []);
  const i = list.findIndex(x => String(x.ts) === String(req.params.ts));
  if (i < 0) return res.status(404).json({ error: "not found" });
  list[i] = { ...list[i], ...req.body }; await wr("purchases", list); res.json(list[i]);
});
app.delete("/api/purchases/:ts", async (req, res) => {
  const list = await rd("purchases", []);
  const i = list.findIndex(x => String(x.ts) === String(req.params.ts));
  if (i < 0) return res.json({ ok: true });
  list.splice(i, 1); await wr("purchases", list); res.json({ ok: true });
});

// ---- доступи (enrollments)
app.get("/api/enrollments", async (_req, res) => res.json(await rd("enrollments", {})));
app.put("/api/enrollments/:userId", async (req, res) => {
  const all = await rd("enrollments", {});
  all[req.params.userId] = Array.isArray(req.body?.courses) ? req.body.courses : [];
  await wr("enrollments", all);
  res.json(all[req.params.userId]);
});

// ---- матеріали (текст + файли у base64)
app.get("/api/materials", async (_req, res) => res.json(await rd("materials", {})));
app.get("/api/materials/:courseId", async (req, res) => {
  const all = await rd("materials", {});
  res.json(all[req.params.courseId] || { text: "", files: [] });
});
app.put("/api/materials/:courseId", async (req, res) => {
  const all = await rd("materials", {});
  all[req.params.courseId] = { ...(all[req.params.courseId] || { text: "", files: [] }), text: req.body?.text || "" };
  await wr("materials", all); res.json(all[req.params.courseId]);
});
app.post("/api/materials/:courseId/base64", async (req, res) => {
  const files = Array.isArray(req.body?.files) ? req.body.files : [];
  const saved = [];
  for (const f of files) saved.push(await saveDataUrl(f.dataUrl, "materials", f.name || "file.bin"));
  const all = await rd("materials", {});
  const prev = all[req.params.courseId]?.files || [];
  all[req.params.courseId] = { text: all[req.params.courseId]?.text || "", files: prev.concat(saved.map(x => ({ ...x, type: "file" }))) };
  await wr("materials", all);
  res.json(all[req.params.courseId]);
});
app.delete("/api/materials/:courseId/file/:fileId", async (req, res) => {
  const all = await rd("materials", {});
  const m = all[req.params.courseId];
  if (!m) return res.json({ ok: true });
  m.files = (m.files || []).filter(f => f.id !== req.params.fileId);
  all[req.params.courseId] = m;
  await wr("materials", all);
  res.json({ ok: true });
});

// ---- чеки (base64)
app.get("/api/receipts/:userId/:courseId", async (req, res) => {
  const all = await rd("receipts", {});
  res.json(all?.[req.params.userId]?.[req.params.courseId] || []);
});
app.post("/api/receipts/:userId/:courseId/base64", async (req, res) => {
  const files = Array.isArray(req.body?.files) ? req.body.files : [];
  const saved = [];
  for (const f of files) saved.push(await saveDataUrl(f.dataUrl, "receipts", f.name || "file.bin"));
  const all = await rd("receipts", {});
  all[req.params.userId] = all[req.params.userId] || {};
  const arr = all[req.params.userId][req.params.courseId] || [];
  saved.forEach(s => arr.push({ ...s, courseId: req.params.courseId }));
  // meta.txt
  const txid = String(req.body?.meta?.txid || "");
  const comment = String(req.body?.meta?.comment || "");
  if (txid || comment) {
    const metaName = `meta_${Date.now()}.txt`;
    const metaPath = path.join(UPLOADS_DIR, "receipts", metaName);
    await fse.ensureDir(path.dirname(metaPath));
    await fse.writeFile(metaPath, `txid: ${txid}\ncomment: ${comment}`);
    arr.push({ id: nanoid(8), name: metaName, url: `/uploads/receipts/${metaName}`, ts: Date.now(), courseId: req.params.courseId });
  }
  all[req.params.userId][req.params.courseId] = arr;
  await wr("receipts", all);
  res.json(arr);
});
app.delete("/api/receipts/:userId/:courseId/:fileId", async (req, res) => {
  const all = await rd("receipts", {});
  const arr = all?.[req.params.userId]?.[req.params.courseId] || [];
  const idx = arr.findIndex(x => x.id === req.params.fileId);
  if (idx >= 0) arr.splice(idx, 1);
  all[req.params.userId] = all[req.params.userId] || {};
  all[req.params.userId][req.params.courseId] = arr;
  await wr("receipts", all);
  res.json({ ok: true });
});

// ---- чати
app.get("/api/chats/:userId", async (req, res) => {
  const chats = await rd("chats", {}); res.json(chats[req.params.userId] || []);
});
app.post("/api/chats/:userId", async (req, res) => {
  const chats = await rd("chats", {});
  const arr = Array.isArray(chats[req.params.userId]) ? chats[req.params.userId] : [];
  const msg = { from: req.body.from || "user", text: String(req.body.text || ""), ts: Date.now() };
  arr.push(msg); chats[req.params.userId] = arr; await wr("chats", chats); res.json(msg);
});

app.listen(PORT, () => console.log("API on http://localhost:" + PORT));

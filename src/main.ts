// src/main.ts
import "./styles.css";
import { Router } from "./router";

import Landing from "./views/Landing";
import Login from "./views/Login";
import Register from "./views/Register";

import Dashboard from "./views/Dashboard";
import Overview from "./views/Overview";
import Courses from "./views/Courses";
import MyCourses from "./views/MyCourses";
import Profile from "./views/Profile";
import Support from "./views/Support";
import Payment from "./views/Payment";
import Admin from "./views/Admin";

import AdminLogin from "./views/AdminLogin";
import { Auth } from "./auth";

import ZnoNmt from "./views/ZnoNmt";
import VideoCourses from "./views/VideoCourses";
import Lifehacks from "./views/Lifehacks";
import Tests from "./views/Tests";
import AboutCourse from "./views/AboutCourse";
import UsefulLinks from "./views/UsefulLinks";
import AboutMe from "./views/AboutMe";
import Models from "./views/Models";

import { mountFooter } from "./footer";
import Privacy from "./views/Privacy";
import Terms from "./views/Terms";

window.addEventListener("error", (e) =>
  console.error("[window.error]", (e as any).error || (e as any).message)
);

const app = document.getElementById("app")!;
const router = new Router(app);

// ====== ROUTES ======
router.register({ path: "/", view: Landing });
router.register({ path: "/login", view: Login });
router.register({ path: "/register", view: Register });

router.register({ path: "/zno-nmt", view: ZnoNmt });
router.register({ path: "/video-courses", view: VideoCourses });
router.register({ path: "/lifehacks", view: Lifehacks });
router.register({ path: "/tests", view: Tests });
router.register({ path: "/about-course", view: AboutCourse });
router.register({ path: "/links", view: UsefulLinks });
router.register({ path: "/about-me", view: AboutMe });
router.register({ path: "/models", view: Models });

router.register({ path: "/privacy", view: Privacy });
router.register({ path: "/terms", view: Terms });

router.register({ path: "/admin-login", view: AdminLogin });

router.register({ path: "/app/pay",        view: Payment,   protected: true });
router.register({ path: "/app/overview",   view: Overview,  protected: true });
router.register({ path: "/app/courses",    view: Courses,   protected: true });
router.register({ path: "/app/my-courses", view: MyCourses, protected: true });
router.register({ path: "/app/profile",    view: Profile,   protected: true });
router.register({ path: "/app/support",    view: Support,   protected: true });
router.register({ path: "/app",            view: Dashboard, protected: true });

router.register({ path: "/admin", view: Admin, adminOnly: true });

router.register({
  path: "404",
  view: () => `<div class="container-soft py-10">404</div>`,
});

router.navigate();
mountFooter();

// ====== API CONFIG / OFFLINE MODE ======
// серверний базовий URL (працює лише у dev)
const API_BASE = location.hostname === "localhost" ? "http://localhost:5174" : "";
// вмикає звернення до бекенда тільки якщо ?api=1 або localStorage.use_api === "1"
const urlParams = new URLSearchParams(location.search);
const USE_API = (urlParams.get("api") === "1") || (localStorage.getItem("use_api") === "1");

// Перетворення шляху у повний URL (для data:, http(s) нічого не чіпаємо)
const absUrl = (u: string) => {
  if (!u) return u;
  const low = u.toLowerCase();
  if (low.startsWith("http://") || low.startsWith("https://") || low.startsWith("data:")) return u;
  return API_BASE ? API_BASE + u : u;
};

// ====== SEPARATE SESSION KEYS ======
const USER_EMAIL_KEY = "user_email";
const USER_ID_KEY    = "user_id";

const ADMIN_EMAIL_KEY  = "admin_email";
const ADMIN_TOKEN_KEY  = "admin_token";

// ====== HELPERS: network wrappers (тихі у офлайн-режимі) ======
const jget = async <T>(url: string, fallback: T): Promise<T> => {
  if (!USE_API || !API_BASE) return fallback;
  try {
    const r = await fetch(API_BASE + url, { credentials: "include" });
    if (!r.ok) throw 0;
    return await r.json();
  } catch {
    return fallback;
  }
};
const jput   = async (url: string, body: any) => {
  if (!USE_API || !API_BASE) return;
  try { await fetch(API_BASE + url, { method: "PUT",   headers: { "Content-Type":"application/json" }, body: JSON.stringify(body) }); } catch {}
};
const jpost  = async (url: string, body: any) => {
  if (!USE_API || !API_BASE) return;
  try { await fetch(API_BASE + url, { method: "POST",  headers: { "Content-Type":"application/json" }, body: JSON.stringify(body) }); } catch {}
};
const jpatch = async (url: string, body: any) => {
  if (!USE_API || !API_BASE) return;
  try { await fetch(API_BASE + url, { method: "PATCH", headers: { "Content-Type":"application/json" }, body: JSON.stringify(body) }); } catch {}
};
const jdel   = async (url: string) => {
  if (!USE_API || !API_BASE) return;
  try { await fetch(API_BASE + url, { method: "DELETE" }); } catch {}
};

// ====== DATA KEYS & TYPES ======
type Course = { id: string; title: string; price: number; short: string };

const DEFAULT_CATALOG: Course[] = [
  { id: "nmt11", title: "НМТ-2026 (11 клас)", price: 3600, short: "12 уроків/міс. Групові заняття + матеріали + тести." },
];

const CATALOG_KEY = "catalog";
const getCatalog = (): Course[] => JSON.parse(localStorage.getItem(CATALOG_KEY) || "[]");
const setCatalog = async (arr: Course[]) => {
  localStorage.setItem(CATALOG_KEY, JSON.stringify(arr));
  await jput("/api/catalog", arr);
};
const syncCatalog = async () => {
  // якщо вже є локальний каталог — не затираємо його дефолтом
  const local = getCatalog();
  const fallback = Array.isArray(local) && local.length ? local : DEFAULT_CATALOG;
  const srv = await jget<Course[]>("/api/catalog", fallback);
  localStorage.setItem(CATALOG_KEY, JSON.stringify(srv));
};
const ensureCatalog = () => {
  try {
    const raw = localStorage.getItem(CATALOG_KEY);
    const arr = raw ? JSON.parse(raw) : null;
    if (!Array.isArray(arr) || arr.length === 0) localStorage.setItem(CATALOG_KEY, JSON.stringify(DEFAULT_CATALOG));
  } catch { localStorage.setItem(CATALOG_KEY, JSON.stringify(DEFAULT_CATALOG)); }
};
ensureCatalog();

type Purchase = { courseId: string; userId: string; status: "pending" | "approved" | "rejected"; ts: number };
const PURCHASES_KEY = "purchases";
const getPurchases = (): Purchase[] => JSON.parse(localStorage.getItem(PURCHASES_KEY) || "[]");
const setPurchasesLocal = (arr: Purchase[]) => localStorage.setItem(PURCHASES_KEY, JSON.stringify(arr));
const addLocalPurchase = (courseId: string, userId: string) => {
  const list = getPurchases();
  list.push({ courseId, userId, status: "pending", ts: Date.now() });
  setPurchasesLocal(list);
};
const syncPurchases = async () => {
  const srv = await jget<Purchase[]>("/api/purchases", getPurchases());
  setPurchasesLocal(srv);
};

type Enrollments = Record<string, string[]>;
const ENROLL_KEY = "enrollments";
const getEnrollments = (): Enrollments => JSON.parse(localStorage.getItem(ENROLL_KEY) || "{}");
const setEnrollmentsLocal = (obj: Enrollments) => localStorage.setItem(ENROLL_KEY, JSON.stringify(obj));
const syncEnrollments = async () => {
  const srv = await jget<Enrollments>("/api/enrollments", getEnrollments());
  setEnrollmentsLocal(srv);
};

type Receipt = { id?: string; name: string; url: string; ts: number; courseId: string };
type ReceiptsMap = Record<string, Record<string, Receipt[]>>;
const RECEIPTS_KEY = "receipts";
const getReceipts = (): ReceiptsMap => JSON.parse(localStorage.getItem(RECEIPTS_KEY) || "{}");
const setReceipts = (obj: ReceiptsMap) => localStorage.setItem(RECEIPTS_KEY, JSON.stringify(obj));
const fetchReceiptsToLocal = async (uid: string, courseId: string) => {
  const arr = await jget<Receipt[]>(`/api/receipts/${uid}/${courseId}`, []);
  const all = getReceipts(); const by = all[uid] || {};
  by[courseId] = arr; all[uid] = by; setReceipts(all);
  return arr;
};

type MaterialFile = { id?: string; name: string; url: string; type: "image" | "video" | "file"; ts: number };
type CourseMaterials = { text: string; files: MaterialFile[] };
type MaterialsMap = Record<string, CourseMaterials>;

const MATERIALS_KEY = "materials";
const getMaterials = (): MaterialsMap => JSON.parse(localStorage.getItem(MATERIALS_KEY) || "{}");
const setMaterials = (obj: MaterialsMap) => localStorage.setItem(MATERIALS_KEY, JSON.stringify(obj));
const ensureCourseMaterials = async (courseId: string) => {
  const m = getMaterials();
  if (!m[courseId]) {
    m[courseId] = { text: "", files: [] };
    setMaterials(m);
    await jput(`/api/materials/${courseId}`, { text: "" });
  }
};
const syncMaterialsForCourses = async (courseIds: string[]) => {
  const all = getMaterials();
  for (const cid of courseIds) {
    const m = await jget<CourseMaterials>(`/api/materials/${cid}`, { text: "", files: [] });
    all[cid] = m;
  }
  setMaterials(all);
};

// ====== UPLOADS (with offline fallback) ======
const uploadReceiptsBase64 = async (
  userId: string,
  courseId: string,
  namedDataUrls: { name: string; dataUrl: string }[],
  meta?: { txid?: string; comment?: string }
) => {
  if (USE_API && API_BASE) {
    await jpost(`/api/receipts/${userId}/${courseId}/base64`, { files: namedDataUrls, meta });
    return;
  }
  // OFFLINE: кладемо у localStorage
  const all = getReceipts();
  const byUser = all[userId] || {};
  const current = byUser[courseId] || [];
  const now = Date.now();
  namedDataUrls.forEach((f, i) => {
    current.push({
      id: `loc_${now}_${i}`,
      name: f.name || `receipt_${now}_${i}.png`,
      url: f.dataUrl,
      ts: now + i,
      courseId
    });
  });
  byUser[courseId] = current;
  all[userId] = byUser;
  setReceipts(all);
};

const uploadCourseFilesBase64 = async (courseId: string, namedDataUrls: { name: string; dataUrl: string }[]) => {
  if (USE_API && API_BASE) {
    await jpost(`/api/materials/${courseId}/base64`, { files: namedDataUrls });
    return;
  }
  // OFFLINE: додаємо у materials локально
  const all = getMaterials();
  if (!all[courseId]) all[courseId] = { text: "", files: [] };
  const now = Date.now();
  namedDataUrls.forEach((f, i) => {
    const ext = (f.name || "").toLowerCase();
    const type: MaterialFile["type"] =
      ext.endsWith(".mp4") || ext.endsWith(".mov") ? "video" :
      ext.endsWith(".pdf") ? "file" :
      "image";
    all[courseId].files.push({
      id: `loc_${now}_${i}`,
      name: f.name || `file_${now}_${i}`,
      url: f.dataUrl,
      ts: now + i,
      type
    });
  });
  setMaterials(all);
};

// ====== CHAT / USERS / AUTH ======
const CHAT_KEY = "chats";
type ChatMsg = { from: "user" | "admin"; text: string; ts: number };

const loadChats = (): Record<string, any> => JSON.parse(localStorage.getItem(CHAT_KEY) || "{}");
const saveChats = (chats: Record<string, ChatMsg[]>) => localStorage.setItem(CHAT_KEY, JSON.stringify(chats));

const isMsg = (m: any): m is ChatMsg =>
  m && (m.from === "user" || m.from === "admin") && typeof m.text === "string" && typeof m.ts === "number";
const normalizeThread = (v: any): ChatMsg[] => {
  if (Array.isArray(v)) return v.filter(isMsg);
  if (!v || typeof v !== "object") return [];
  return Object.values(v).filter(isMsg);
};

// !!! РОЗВЕДЕНІ СЕСІЇ
const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");
const setUsers = (arr: any[]) => localStorage.setItem("users", JSON.stringify(arr));

// повертає user id для юзер-роутів, а на адмін-роутах — "admin"
const getCurrentUserId = () => {
  const hash = location.hash || "";
  const onAdmin = hash.startsWith("#/admin");
  if (onAdmin) return "admin";
  return localStorage.getItem(USER_ID_KEY);
};

const makeId = () => "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

// тільки юзер-прив’язка (адмін не чіпається)
const ensureAuthBinding = async () => {
  const emailRaw =
    (localStorage.getItem(USER_EMAIL_KEY) || localStorage.getItem("auth_email") || "")
      .toLowerCase()
      .trim();

  if (!emailRaw) return;

  try {
    const u = (await jpost("/api/users/ensure", { email: emailRaw })) as any;
    if (u?.id) {
      localStorage.setItem(USER_ID_KEY, u.id);
      // для сумісності зі старим кодом
      localStorage.setItem("auth_user_id", u.id);
      const list = getUsers();
      if (!list.find((x: any) => x.id === u.id)) { list.push(u); setUsers(list); }
      return;
    }
  } catch {}

  let users = getUsers();
  let u = users.find((x: any) => (x.email || x.mail || "").toLowerCase() === emailRaw);
  if (!u) {
    u = { id: makeId(), email: emailRaw, firstName: "", lastName: "" };
    users.push(u);
    setUsers(users);
  }
  localStorage.setItem(USER_ID_KEY, u.id);
  // сумісність
  localStorage.setItem("auth_user_id", u.id);
};

const ADMIN_ACCOUNTS_KEY = "admin_accounts";
type AdminAccount = { email: string; password: string };

const getAdminAccounts = (): AdminAccount[] => JSON.parse(localStorage.getItem(ADMIN_ACCOUNTS_KEY) || "[]");
const setAdminAccounts = (arr: AdminAccount[]) => localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(arr));
if (!localStorage.getItem(ADMIN_ACCOUNTS_KEY)) {
  setAdminAccounts([{ email: "admin@nmt.school", password: "admin123" }]);
}
const adminAuth = (email: string, password: string) =>
  !!getAdminAccounts().find(
    (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
  );

// ====== VIEW HOOKS ======
document.addEventListener("view:mounted", (e: Event) => {
  const detail = (e as CustomEvent<string>).detail;

  // Burger
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    const setOpen = (flag: boolean) => {
      (burger as HTMLElement).classList.toggle("burger-open", flag);
      mobileMenu.setAttribute("data-open", flag ? "true" : "false");
    };
    setOpen(false);
    (burger as HTMLButtonElement).onclick = () =>
      setOpen(!burger.classList.contains("burger-open"));
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  }

  // ====== Login (USER) ======
  if (detail === "/login") {
    const form = document.getElementById("loginForm") as HTMLFormElement | null;
    form?.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      const email = String(fd.get("email") || "").toLowerCase().trim();
      await Auth.login(email, String(fd.get("password")));

      // ВАЖЛИВО: не чіпаємо адмінські ключі
      localStorage.setItem("role", "user"); // для сумісності з роутером
      localStorage.setItem(USER_EMAIL_KEY, email);
      localStorage.setItem("auth_email", email); // legacy

      // не чіпаємо admin_token / admin_email / auth_token
      await ensureAuthBinding();
      location.hash = "/app";
    });
  }

  // ====== Register ======
  if (detail === "/register") {
    const form = document.getElementById("regForm") as HTMLFormElement | null;
    form?.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      const id = await Auth.register(Object.fromEntries(fd.entries()));
      alert(`Ваш унікальний ID: ${id}. Після оплати доступ підтвердить адміністратор.`);
      location.hash = "/login";
    });
  }

  // ====== Admin login (ADMIN) ======
  if (detail === "/admin-login") {
    const form = document.getElementById("adminLoginForm") as HTMLFormElement | null;
    form?.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      const email = String(fd.get("email") || "");
      const password = String(fd.get("password") || "");
      if (!adminAuth(email, password)) return alert("Невірний email або пароль адміністратора.");

      // ВАЖЛИВО: не чіпаємо юзерські ключі
      localStorage.setItem(ADMIN_TOKEN_KEY, `admin:${Date.now()}`);
      localStorage.setItem("auth_token", localStorage.getItem(ADMIN_TOKEN_KEY)!); // legacy
      localStorage.setItem("role", "admin"); // для сумісності з роутером
      localStorage.setItem(ADMIN_EMAIL_KEY, email);
      // НЕ видаляємо user_email / user_id / auth_email

      location.hash = "/admin";
    });
  }

  // ====== Dashboard (USER AREA) ======
  if (detail === "/app") {
    ensureCatalog();
    ensureAuthBinding();

    const rd = (u: any, keys: string[], fallback = "") =>
      keys.reduce((v, k) => (v ?? u?.[k]), undefined) ?? fallback;

    // cleanup для таймерів на вкладках кабінету
    let cleanupCurrent: (() => void) | null = null;

    const views: Record<string, (u?: any) => string> = {
      courses: () => {
        const catalogList = getCatalog();
        if (!catalogList.length) return `<article class="card">Каталог порожній.</article>`;
        return (
          catalogList
            .map(
              (c) => `
          <article class="card grid gap-4" data-reveal>
            <h2 class="text-2xl font-bold" data-field="title" data-id="${c.id}">${c.title}</h2>
            <p class="muted" data-field="short" data-id="${c.id}">${c.short}</p>
            <ul class="grid gap-2 pl-5 list-disc">
              <li>Групові заняття у Zoom (2–3 рази на тиждень)</li>
              <li>Матеріали, конспекти та домашні завдання в кабінеті</li>
              <li>Тести у форматі НМТ з автоперевіркою</li>
            </ul>
            <div class="flex items-center justify-between mt-2">
              <div class="text-xl font-semibold" data-field="price" data-id="${c.id}">
                ${c.price.toLocaleString("uk-UA")} грн/міс
              </div>
              <div class="flex gap-3">
                <button class="btn" data-buy="${c.id}">Придбати</button>
              </div>
            </div>
          </article>`
            )
            .join("") +
          `
          <article class="card grid gap-3" data-reveal>
            <h3 class="text-lg font-semibold">Як відбувається навчання</h3>
            <ol class="grid gap-2 pl-5 list-decimal">
              <li>Після оплати адміністратор відкриває вам доступ до матеріалів.</li>
              <li>Зустрічі онлайн, записи зберігаються у вашому кабінеті.</li>
              <li>Питання по навчанню — у вкладці <b>Підтримка</b>.</li>
            </ol>
          </article>`
        );
      },

      my: () => {
        const uid = getCurrentUserId()!;
        const enroll = getEnrollments()[uid] || [];
        const catalogAll = getCatalog();
        const mine = catalogAll.filter((c) => enroll.includes(c.id));
        const pending = getPurchases().filter((p) => p.userId === uid && p.status === "pending");

        const materialsHTML = (courseId: string) => {
          const m = getMaterials()[courseId];
          if (!m) return "";
          const text = m.text ? `<div class="prose"><p>${m.text.replace(/\n/g, "<br/>")}</p></div>` : "";
          const files = (m.files || [])
            .map((f) => {
              if (f.type === "image") {
                return `
                  <a href="${absUrl(f.url)}" target="_blank" class="block border rounded-xl overflow-hidden">
                    <img src="${absUrl(f.url)}" alt="${f.name}" style="max-width:100%;height:auto;object-fit:contain;background:#faf7f2;display:block;">
                  </a>
                  <div class="muted text-xs break-all">${f.name}</div>`;
              }
              if (f.type === "video") {
                return `
                  <video controls style="width:100%;max-height:260px;background:#000;border-radius:12px;display:block">
                    <source src="${absUrl(f.url)}">
                  </video>
                  <div class="muted text-xs break-all">${f.name}</div>`;
              }
              return `<a class="btn-outline" href="${absUrl(f.url)}" download="${f.name}" style="width:100%;text-align:center">Завантажити ${f.name}</a>`;
            })
            .join("<div class='h-2'></div>");

          if (!text && !files) return "";
          return `
            <div class="mt-3 p-3 bg-beige-50 rounded-xl border">
              <div class="text-sm font-semibold mb-2">Матеріали курсу</div>
              <div class="grid gap-3">${text}${files ? `<div class="grid gap-3">${files}</div>` : ""}</div>
            </div>`;
        };

        if (mine.length === 0 && pending.length === 0) {
          return `
            <article class="card" data-reveal>
              <h2 class="text-xl font-semibold mb-1">Мої курси</h2>
              <p class="muted">Тут з’являться ваші курси після підтвердження адміністратором.</p>
            </article>`;
        }

        return `
          ${mine
            .map(
              (c) => `
            <article class="card" data-reveal>
              <h3 class="text-lg font-semibold">${c.title}</h3>
              <p class="muted">${c.short}</p>
              ${materialsHTML(c.id)}
            </article>`
            )
            .join("")}
          ${
            pending.length
              ? `
            <article class="card" data-reveal>
              <h3 class="text-lg font-semibold">Заявки</h3>
              ${pending
                .map((p) => {
                  const c = catalogAll.find((x) => x.id === p.courseId)!;
                  return `<div class="muted">"${c.title}" — <b>очікує підтвердження</b></div>`;
                })
                .join("")}
            </article>`
              : ""
          }`;
      },

      support: () => {
        const uid = getCurrentUserId();
        if (!uid) {
          return `
            <article class="card grid gap-3" data-reveal>
              <h2 class="text-xl font-semibold">Підтримка</h2>
              <div class="input" style="height:200px;display:flex;align-items:center;justify-content:center">
                <span class="muted">Сесія недійсна. Перелогіньтесь, будь ласка.</span>
              </div>
              <div class="muted text-sm">Чат зберігається локально та буде доступний адміністратору.</div>
            </article>`;
        }
        return `
          <article class="card grid gap-3" data-reveal>
            <h2 class="text-xl font-semibold">Підтримка</h2>
            <div id="chat" class="h-[48vh] overflow-auto space-y-2 p-2 bg-beige-50 rounded-xl border"></div>
            <form id="chatForm" class="grid grid-cols-[1fr_auto] gap-2">
              <input id="chatInput" class="input" placeholder="Ваше повідомлення…" autocomplete="off" />
              <button class="btn" type="submit">Надіслати</button>
            </form>
            <div class="muted text-sm">Чат зберігається локально та буде доступний адміністратору.</div>
          </article>`;
      },

      profile: (u?: any) => {
        const id = getCurrentUserId() || "—";
        const lastName  = u ? rd(u, ["lastName", "surname"], "") : "";
        const firstName = u ? rd(u, ["firstName", "name"], "") : "";
        const fallbackEmail = (localStorage.getItem(USER_EMAIL_KEY) || localStorage.getItem("auth_email") || "").trim();
        const email = u ? rd(u, ["email", "mail"], fallbackEmail) : fallbackEmail;

        return `
          <article class="card grid gap-4" data-reveal>
            <h2 class="text-xl font-semibold">Профіль</h2>
            <form id="profForm" class="grid gap-4 max-w-xl">
              <div><div class="muted text-sm mb-1">ID користувача</div><input class="input" value="${id}" readonly /></div>
              <div class="grid sm:grid-cols-2 gap-3">
                <div><div class="muted text-sm mb-1">Прізвище</div><input name="lastName" class="input" value="${lastName}" /></div>
                <div><div class="muted text-sm mb-1">Ім'я</div><input name="firstName" class="input" value="${firstName}" /></div>
              </div>
              <div><div class="muted text-sm mb-1">Email</div><input name="email" class="input" type="email" placeholder="you@mail.com" value="${email}" /></div>
              <div class="flex gap-2">
                <button class="btn" type="submit">Зберегти</button>
                <button class="btn-outline" id="logoutBtn" type="button">Вийти</button>
              </div>
            </form>
          </article>`;
      },
    };

    const parseTab = (): "courses" | "my" | "support" | "profile" => {
      const full = location.hash;
      const onlyPath = full.split("?")[0];
      const q = full.split("?")[1] || "";
      const tab = new URLSearchParams(q).get("tab") as any;
      if (tab && ["courses", "my", "support", "profile"].includes(tab)) return tab;
      if (onlyPath === "#/app") return "courses";
      return (sessionStorage.getItem("cabinet_tab") as any) || "courses";
    };

    const contentEl = document.getElementById("dashContent") as HTMLElement | null;
    if (!contentEl) return; // захист від рідкісного стану DOM

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".tab-link"));

    const setActive = (name: "courses" | "my" | "support" | "profile") => {
      // чистимо попередні ватчери вкладки
      if (cleanupCurrent) { try { cleanupCurrent(); } catch {} cleanupCurrent = null; }

      links.forEach((a) => {
        const on = a.getAttribute("data-tab") === name;
        a.classList.toggle("is-active", on);
        a.classList.toggle("bg-beige-200", on);
      });

      const users = getUsers();
      const uid = getCurrentUserId();
      const currentUser = users.find((u: any) => u.id === uid) || null;

      contentEl.innerHTML = views[name](currentUser || undefined);
      sessionStorage.setItem("cabinet_tab", name);

      if (name === "courses") {
        contentEl.querySelectorAll<HTMLButtonElement>("[data-buy]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const courseId = btn.getAttribute("data-buy")!;
            localStorage.setItem("selected_course", courseId);
            location.hash = "/app/pay";
          });
        });
      }

      contentEl.querySelectorAll<HTMLElement>("[data-goto]").forEach((el) => {
        el.addEventListener("click", () => {
          const nxt = el.getAttribute("data-goto") as any;
          setActive(nxt);
          history.replaceState(null, "", `#${"/app"}?tab=${nxt}`);
        });
      });

      contentEl.querySelector("#logoutBtn")?.addEventListener("click", () => {
        sessionStorage.removeItem("cabinet_tab");
        // вихід тільки з юзер-сесії, адміна не чіпаємо
        localStorage.removeItem(USER_ID_KEY);
        localStorage.removeItem(USER_EMAIL_KEY);
        localStorage.removeItem("auth_user_id"); // legacy
        localStorage.removeItem("auth_email");    // legacy
        Auth.logout();
        location.hash = "/login";
      });

      const prof = contentEl.querySelector<HTMLFormElement>("#profForm");
      prof?.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        const fd = new FormData(prof);
        const firstName = String(fd.get("firstName") || "").trim();
        const lastName  = String(fd.get("lastName")  || "").trim();
        const email     = String(fd.get("email")     || "").trim().toLowerCase();
        const emailOk   = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailOk) return alert("Некоректний email");

        const list = getUsers();
        const uid  = getCurrentUserId()!;
        const i    = list.findIndex((x: any) => x.id === uid);
        if (i >= 0) {
          list[i] = { ...list[i], firstName, lastName, email };
          setUsers(list);
          localStorage.setItem(USER_EMAIL_KEY, email);
          localStorage.setItem("auth_email", email); // legacy
          await jpatch(`/api/users/${uid}`, { firstName, lastName, email });
          await ensureAuthBinding();
          alert("Збережено.");
        }
      });

      if (name === "support") {
        const box = contentEl.querySelector<HTMLDivElement>("#chat")!;
        const form = contentEl.querySelector<HTMLFormElement>("#chatForm")!;
        const input = contentEl.querySelector<HTMLInputElement>("#chatInput")!;

        const render = () => {
          const uid = getCurrentUserId()!;
          const all = loadChats();
          const thread = normalizeThread(all[uid]);
          all[uid] = thread;
          saveChats(all);

          box.innerHTML = "";
          thread.forEach((m) => {
            const mine = m.from === "user";
            box.insertAdjacentHTML(
              "beforeend",
              `
              <div class="flex ${mine ? "justify-end" : "justify-start"}">
                <div class="rounded-2xl px-4 py-2 ${mine ? "bg-brown-700 text-white" : "bg-white border"} max-w-[80%]">
                  <div class="text-sm break-words">${m.text}</div>
                  <div class="muted text-xs mt-1">${new Date(m.ts).toLocaleString()}</div>
                </div>
              </div>`
            );
          });
          box.scrollTop = box.scrollHeight;
        };

        render();

        form.addEventListener("submit", (ev) => {
          ev.preventDefault();
          const text = (input.value || "").trim();
          if (!text) return;
          const uid = getCurrentUserId()!;
          const updated = loadChats();
          const arr = normalizeThread(updated[uid]);
          arr.push({ from: "user", text, ts: Date.now() });
          updated[uid] = arr;
          saveChats(updated);
          input.value = "";
          render();
        });

        // === live-оновлення чату без перезавантаження ===
        const uidLive = getCurrentUserId()!;
        let lastSig = JSON.stringify(normalizeThread(loadChats()[uidLive] || []));
        const tick = () => {
          const cur = JSON.stringify(normalizeThread(loadChats()[uidLive] || []));
          if (cur !== lastSig) { lastSig = cur; render(); }
        };
        const onStorage = (e: StorageEvent) => { if (e.key === CHAT_KEY) tick(); };
        window.addEventListener("storage", onStorage);
        const intId = window.setInterval(tick, 1000);
        cleanupCurrent = () => { clearInterval(intId); window.removeEventListener("storage", onStorage); };
      }

      if (name === "my") {
        // === авто-синхронізація доступів і текстових матеріалів, щоб з’являлись одразу ===
        if (USE_API && API_BASE) {
          const uid = getCurrentUserId()!;
          let lastEnroll = JSON.stringify(getEnrollments()[uid] || []);
          let lastTextSig = JSON.stringify((getEnrollments()[uid] || []).map(cid => (getMaterials()[cid]?.text || "")));

          const tickMy = async () => {
            await syncEnrollments();
            const enr = getEnrollments()[uid] || [];
            const enrStr = JSON.stringify(enr);

            if (enrStr !== lastEnroll) {
              lastEnroll = enrStr;
              await syncMaterialsForCourses(enr);
              // перерендер тільки якщо ми все ще на вкладці "my"
              if ((sessionStorage.getItem("cabinet_tab") as any) === "my") contentEl.innerHTML = views.my();
              lastTextSig = JSON.stringify(enr.map(cid => (getMaterials()[cid]?.text || "")));
              return;
            }

            if (enr.length) {
              const before = lastTextSig;
              await syncMaterialsForCourses(enr);
              lastTextSig = JSON.stringify(enr.map(cid => (getMaterials()[cid]?.text || "")));
              if (lastTextSig !== before && (sessionStorage.getItem("cabinet_tab") as any) === "my") {
                contentEl.innerHTML = views.my();
              }
            }
          };

          const intIdMy = window.setInterval(tickMy, 4000);
          cleanupCurrent = () => { clearInterval(intIdMy); };
        }
      }
    };

    links.forEach((a) => {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        const name = a.getAttribute("data-tab") as any;
        setActive(name);
        history.replaceState(null, "", `#${"/app"}?tab=${name}`);
      });
    });

    const initialTab = parseTab();
    setActive(initialTab);
    history.replaceState(null, "", `#${"/app"}?tab=${initialTab}`);

    (async () => {
      await syncCatalog();
      await syncEnrollments();
      const uid = getCurrentUserId()!;
      const enr = getEnrollments()[uid] || [];
      await syncMaterialsForCourses(enr);
      if ((sessionStorage.getItem("cabinet_tab") as any) === "my") setActive("my");
    })();
  }

  // ====== PAY (USER) ======
  if (detail === "/app/pay") {
    ensureCatalog();
    ensureAuthBinding();

    const courseId = localStorage.getItem("selected_course") || getCatalog()[0]?.id;
    const course = getCatalog().find((c) => c.id === courseId) || getCatalog()[0];

    const uidMaybe = getCurrentUserId();
    if (!uidMaybe) {
      alert("Сесія недійсна. Увійдіть знову.");
      location.hash = "/login";
      return;
    }
    const uid = uidMaybe;

    const titleEl = document.getElementById("payCourseTitle");
    if (titleEl && course) titleEl.textContent = course.title;
    const sumEl = document.getElementById("payAmount");
    if (sumEl && course) sumEl.textContent = `${course.price.toLocaleString("uk-UA")} грн`;

    const form = document.getElementById("receiptForm") as HTMLFormElement | null;
    const status = document.getElementById("status")!;
    const fileInput = document.getElementById("receiptFile")  as HTMLInputElement | null;
    const camInput  = document.getElementById("receiptPhoto") as HTMLInputElement | null;
    const btnPhoto  = document.getElementById("btnTakePhoto") as HTMLButtonElement | null;
    const btnPick   = document.getElementById("btnPickFile")  as HTMLButtonElement | null;
    const chosen    = document.getElementById("chosenFiles")!;
    const listBox   = document.getElementById("uploadedList")!;
    const txidEl    = document.getElementById("receiptTxid") as HTMLInputElement | null;
    const commentEl = document.getElementById("receiptComment") as HTMLTextAreaElement | null;

    // керування станом кнопки «Надіслати»
    const submitBtn = form?.querySelector<HTMLButtonElement>('button[type="submit"]') || null;
    let uploading = false;
    let totalToRead = 0;
    let readSoFar = 0;

    const hasSelected = () =>
      ((camInput?.files?.length || 0) + (fileInput?.files?.length || 0)) > 0;

    const setSubmitState = () => {
      if (!submitBtn) return;
      const disabled = uploading || !hasSelected();
      submitBtn.disabled = disabled;
      submitBtn.classList.toggle('opacity-50', disabled);
      submitBtn.textContent = uploading ? `Завантаження… ${readSoFar}/${totalToRead}` : 'Надіслати';
    };

    btnPhoto?.addEventListener("click", () => camInput?.click());
    btnPick?.addEventListener("click",  () => fileInput?.click());

    const showChosen = () => {
      const files = [
        ...(camInput?.files ? Array.from(camInput.files) : []),
        ...(fileInput?.files ? Array.from(fileInput.files) : []),
      ];
      chosen.innerHTML = files.length
        ? files.map(f => `• <span class="break-all">${f.name}</span> <span class="muted text-xs">(${Math.round(f.size/1024)} кБ)</span>`).join("<br/>")
        : `<span class="muted">Файли не вибрано.</span>`;
      setSubmitState();
    };
    camInput?.addEventListener("change", showChosen);
    fileInput?.addEventListener("change", showChosen);
    setSubmitState();

    const renderReceipts = async () => {
      const recs = USE_API ? await fetchReceiptsToLocal(uid, course.id) : (getReceipts()[uid]?.[course.id] || []);
      listBox.innerHTML = recs.length
        ? recs.map((r: Receipt) => `
            <div class="border rounded-xl p-2 flex flex-col sm:flex-row sm:items-center gap-2 w-full">
              <div class="text-sm flex-1 min-w-0">
                <div class="font-medium break-all">${r.name}</div>
                <div class="muted text-xs">${new Date(r.ts).toLocaleString()}</div>
              </div>
              <div class="flex gap-2 w-full sm:w-auto">
                <a class="btn-outline" style="flex:1" href="${absUrl(r.url)}" target="_blank">Відкрити</a>
                <button class="btn-outline" style="flex:1" data-del-receipt-id="${r.id || ""}">Видалити</button>
              </div>
            </div>
          `).join("")
        : `<div class="muted text-sm">Поки що чеків немає.</div>`;

      listBox.querySelectorAll<HTMLButtonElement>("[data-del-receipt-id]").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-del-receipt-id")!;
          if (!id) return;
          if (USE_API) {
            await jdel(`/api/receipts/${uid}/${course.id}/${id}`);
          } else {
            const all = getReceipts();
            const arr = (all[uid]?.[course.id] || []).filter((x: any) => x.id !== id);
            (all[uid] ||= {})[course.id] = arr;
            setReceipts(all);
          }
          await renderReceipts();
        });
      });
    };
    renderReceipts();

    const readAsDataURL = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => { readSoFar++; setSubmitState(); resolve(String(reader.result || "")); };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

    form?.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      if (uploading) return;

      const files: File[] = [
        ...(camInput?.files ? Array.from(camInput.files) : []),
        ...(fileInput?.files ? Array.from(fileInput.files) : []),
      ];

      if (!files.length) {
        alert("Будь ласка, додайте файл(и) чека.");
        fileInput?.click();
        return;
      }

      try {
        uploading = true;
        totalToRead = files.length;
        readSoFar = 0;
        setSubmitState();
        status.textContent = "Завантаження файлів…";

        const urls: string[] = [];
        for (const f of files) urls.push(await readAsDataURL(f));

        await uploadReceiptsBase64(
          uid,
          course.id,
          files.map((f, i) => ({ name: f.name, dataUrl: urls[i] })),
          { txid: txidEl?.value || "", comment: commentEl?.value || "" }
        );

        // заявка локально + (за наявності бекенда — POST теж піде)
        addLocalPurchase(course.id, uid);
        await jpost("/api/purchases", { courseId: course.id, userId: uid });

        status.textContent = "Чек(и) завантажено. Статус: очікує підтвердження адміністратором.";
        if (camInput)  camInput.value = "";
        if (fileInput) fileInput.value = "";
        if (txidEl)    txidEl.value = "";
        if (commentEl) commentEl.value = "";
        showChosen();
        await renderReceipts();
        await syncPurchases();

        alert("Дякуємо! Заявку з чеком передано на перевірку.");
        location.hash = "/app?tab=my";
      } catch (e) {
        console.error(e);
        alert("Не вдалося завантажити файл(и). Спробуйте інший формат або менший розмір.");
      } finally {
        uploading = false;
        totalToRead = 0;
        readSoFar = 0;
        setSubmitState();
      }
    });
  }

  // ====== ADMIN ======
  if (detail === "/admin") {
    const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>("#admTabs [data-adm-tab]"));
    const sections: Record<string, HTMLElement> = {
      chats: document.getElementById("admChats") as HTMLElement,
      courses: document.getElementById("admCourses") as HTMLElement,
      requests: document.getElementById("admRequests") as HTMLElement,
      access: document.getElementById("admAccess") as HTMLElement,
    };
    const setAdmTab = (name: keyof typeof sections) => {
      tabs.forEach((b) => b.classList.toggle("is-active", b.dataset.admTab === name));
      Object.keys(sections).forEach((k) => sections[k].classList.toggle("hidden", k !== name));
    };
    tabs.forEach((b) => b.addEventListener("click", () => setAdmTab(b.dataset.admTab as any)));
    setAdmTab("courses");

    const usersBox = document.getElementById("chatUsers")!;
    const chatBox = document.getElementById("adminChatBox")!;
    const header = document.getElementById("adminChatHeader")!;
    const form = document.getElementById("adminChatForm") as HTMLFormElement | null;
    const input = document.getElementById("adminChatInput") as HTMLInputElement | null;

    let activeId: string | null = null;
    const users = getUsers();

    const renderUsersList = () => {
      const chats = loadChats();
      const ids = Object.keys(chats);
      usersBox.innerHTML = ids.length
        ? ids
            .map((id) => {
              const u = users.find((x: any) => x.id === id);
              const name = u
                ? [u.surname || u.lastName, u.name || u.firstName].filter(Boolean).join(" ")
                : id;
              const last = normalizeThread(chats[id])?.slice(-1)[0];
              const sub = last ? new Date(last.ts).toLocaleString() : "";
              return `
            <button class="w-full text-left px-4 py-3 border-b hover:bg-beige-100" data-open="${id}">
              <div class="font-medium break-all">${name || id}</div>
              <div class="muted text-xs">${sub}</div>
            </button>`;
            })
            .join("")
        : `<div class="p-4 muted">Поки що немає жодного чату.</div>`;

      usersBox.querySelectorAll<HTMLButtonElement>("[data-open]").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeId = btn.getAttribute("data-open");
          if (activeId) renderThread(activeId);
        });
      });
    };

    const renderThread = (id: string) => {
      const thread = normalizeThread(loadChats()[id]);
      chatBox.innerHTML = "";
      thread.forEach((m) => {
        const mine = m.from === "admin";
        chatBox.insertAdjacentHTML(
          "beforeend",
          `
          <div class="flex ${mine ? "justify-end" : "justify-start"}">
            <div class="rounded-2xl px-4 py-2 ${mine ? "bg-brown-700 text-white" : "bg-white border"} max-w-[80%]">
              <div class="text-sm">${m.text}</div>
              <div class="muted text-xs mt-1">${new Date(m.ts).toLocaleString()}</div>
            </div>
          </div>`
        );
      });
      chatBox.scrollTop = chatBox.scrollHeight;

      const u = users.find((x: any) => x.id === id);
      const title = u ? [u.surname || u.lastName, u.name || u.firstName].filter(Boolean).join(" ") : id;
      header.textContent = `Чат з: ${title || id}`;
    };

    renderUsersList();

    form?.addEventListener("submit", (ev) => {
      ev.preventDefault();
      if (!activeId) return;
      const text = (input?.value || "").trim();
      if (!text) return;
      const updated = loadChats();
      const arr = normalizeThread(updated[activeId]);
      arr.push({ from: "admin", text, ts: Date.now() });
      updated[activeId] = arr;
      saveChats(updated);
      input!.value = "";
      renderThread(activeId);
      renderUsersList();
    });

    // ====== курси (CRUD + матеріали) ======
    const courseList = document.getElementById("courseList")!;
    const addCourseBtn = document.getElementById("addCourseBtn")!;

    const renderCourses = () => {
      ensureCatalog();
      const catalogAdmin = getCatalog();
      courseList.innerHTML = catalogAdmin.length
        ? catalogAdmin
            .map((c) => {
              ensureCourseMaterials(c.id);
              const mats = getMaterials()[c.id];
              const files = (mats.files || [])
                .map(
                  (f) => `
                    <div class="border rounded-xl p-2 flex flex-col sm:flex-row sm:items-center gap-2">
                      <div class="text-sm flex-1 min-w-0">
                        <div class="font-medium break-all">${f.name}</div>
                        <div class="muted text-xs">${new Date(f.ts).toLocaleString()}</div>
                      </div>
                      <div class="flex gap-2 w-full sm:w-auto">
                        <a class="btn-outline" style="flex:1" href="${absUrl(f.url)}" target="_blank">Відкрити</a>
                        <button class="btn-outline" style="flex:1" data-del-file-id="${c.id}:${f.id || ""}">Прибрати</button>
                      </div>
                    </div>`
                )
                .join("");

              return `
                <div class="border rounded-xl p-3 grid gap-2">
                  <div class="grid sm:grid-cols-3 gap-2">
                    <input class="input" data-c-title="${c.id}" value="${c.title}" />
                    <input class="input" data-c-price="${c.id}" type="number" min="0" value="${c.price}" />
                    <div class="flex gap-2">
                      <button class="btn" data-c-save="${c.id}">Зберегти</button>
                      <button class="btn-outline" data-c-del="${c.id}">Видалити</button>
                    </div>
                  </div>
                  <textarea class="input" rows="2" data-c-short="${c.id}">${c.short}</textarea>

                  <div class="mt-2 p-3 rounded-xl bg-beige-50 border">
                    <div class="text-sm font-semibold mb-2">Матеріали курсу</div>
                    <textarea class="input" rows="4" placeholder="Текстові матеріали, конспект, інструкції…" data-c-mtext="${c.id}">${mats?.text || ""}</textarea>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <input type="file" class="hidden" multiple accept="image/*,video/*,.pdf" id="matFile_${c.id}" />
                      <button class="btn" data-mat-pick="${c.id}">Додати фото/відео/файл</button>
                    </div>
                    <div class="grid gap-2 mt-2" id="matList_${c.id}">
                      ${files || `<div class="muted text-sm">Поки що немає файлів.</div>`}
                    </div>
                    <div class="muted text-xs mt-2">Підтримуються фото (JPG/PNG/HEIC), відео (MP4/MOV*) та PDF.</div>
                  </div>
                </div>`;
            })
            .join("")
        : `<div class="muted">Каталог порожній.</div>`;

      courseList.querySelectorAll<HTMLButtonElement>("[data-c-save]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-c-save")!;
          const list = getCatalog();
          const i = list.findIndex((x) => x.id === id);
          if (i < 0) return;
          const title = (courseList.querySelector<HTMLInputElement>(`[data-c-title="${id}"]`)!.value || "").trim();
          const price = Number(courseList.querySelector<HTMLInputElement>(`[data-c-price="${id}"]`)!.value || "0");
          const short = (courseList.querySelector<HTMLTextAreaElement>(`[data-c-short="${id}"]`)!.value || "").trim();
          list[i] = { ...list[i], title, price, short };
          await setCatalog(list);

          await ensureCourseMaterials(id);
          const m = getMaterials();
          m[id].text = (courseList.querySelector<HTMLTextAreaElement>(`[data-c-mtext="${id}"]`)?.value || "").trim();
          setMaterials(m);
          await jput(`/api/materials/${id}`, { text: m[id].text });

          alert("Збережено.");
          await syncCatalog();
          renderCourses();
        });
      });

      courseList.querySelectorAll<HTMLButtonElement>("[data-c-del]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-c-del")!;
          if (!confirm("Видалити курс?")) return;
          const list = getCatalog().filter((c) => c.id !== id);
          await setCatalog(list);

          const mats = getMaterials();
          delete mats[id];
          setMaterials(mats);

          const enr = getEnrollments();
          Object.keys(enr).forEach((uid) => (enr[uid] = (enr[uid] || []).filter((cid) => cid !== id)));
          setEnrollmentsLocal(enr);

          await syncCatalog();
          renderCourses();
        });
      });

      courseList.querySelectorAll<HTMLButtonElement>("[data-mat-pick]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-mat-pick")!;
          const picker = courseList.querySelector<HTMLInputElement>(`#matFile_${id}`);
          picker?.click();
        });
      });

      catalogAdmin.forEach((c) => {
        const inp = courseList.querySelector<HTMLInputElement>(`#matFile_${c.id}`);
        if (!inp) return;
        inp.onchange = async () => {
          if (!inp.files?.length) return;
          const files = Array.from(inp.files);
          const urls: string[] = await Promise.all(files.map(f => new Promise<string>((resolve, reject) => {
            const r = new FileReader(); r.onload = () => resolve(String(r.result || "")); r.onerror = () => reject(r.error); r.readAsDataURL(f);
          })));
          await uploadCourseFilesBase64(c.id, files.map((f,i)=>({ name: f.name, dataUrl: urls[i] })));
          const m = await jget<CourseMaterials>(`/api/materials/${c.id}`, getMaterials()[c.id] || { text: "", files: [] });
          const all = getMaterials(); all[c.id] = m; setMaterials(all);
          renderCourses();
        };
      });

      courseList.querySelectorAll<HTMLButtonElement>("[data-del-file-id]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const raw = btn.getAttribute("data-del-file-id")!; // courseId:fileId
          const [cid, fileId] = raw.split(":");
          if (USE_API && fileId) await jdel(`/api/materials/${cid}/file/${fileId}`);
          // локально також прибираємо
          const mats = getMaterials();
          mats[cid].files = (mats[cid].files || []).filter(f => (f.id || "") !== fileId);
          setMaterials(mats);
          renderCourses();
        });
      });
    };

    addCourseBtn.addEventListener("click", async () => {
      const id = `c_${Date.now().toString(36)}`;
      const list = getCatalog();
      list.unshift({ id, title: "Новий курс", price: 0, short: "Короткий опис…" });
      await setCatalog(list);
      await ensureCourseMaterials(id);
      renderCourses();
    });

    (async () => { await syncCatalog(); renderCourses(); })();

    // ====== Requests ======
    const reqList = document.getElementById("reqList")!;
    const renderRequests = async () => {
      await syncPurchases();
      const reqs = getPurchases().sort((a, b) => b.ts - a.ts);
      const catalogAdmin2 = getCatalog();
      const ulist = getUsers();

      if (USE_API) {
        await Promise.all(
          reqs.map(async (r) => {
            try {
              const arr = await jget<Receipt[]>(`/api/receipts/${r.userId}/${r.courseId}`, []);
              const all = getReceipts();
              (all[r.userId] ||= {})[r.courseId] = arr;
              setReceipts(all);
            } catch {}
          })
        );
      }

      if (!reqs.length) {
        reqList.innerHTML = `<div class="muted">Немає заявок.</div>`;
        return;
      }

      reqList.innerHTML = reqs
        .map((r) => {
          const user = ulist.find((u: any) => u.id === r.userId);
          const uname = user ? [user.surname || user.lastName, user.name || user.firstName].filter(Boolean).join(" ") : r.userId;
          const course = catalogAdmin2.find((c) => c.id === r.courseId);
          const cname = course ? course.title : r.courseId;

          const recs = (getReceipts()[r.userId]?.[r.courseId] || []) as any[];
          const hasReceipt = recs.length > 0;

          const receiptsPreview = (uid: string, courseId: string) => {
            const arr = (getReceipts()[uid]?.[courseId] || []) as Array<{ name: string; url: string; ts: number }>;
            if (!arr.length) return `<div class="muted text-sm">Немає файлів</div>`;
            return `
              <div class="grid gap-2">
                ${arr
                  .map((f) => {
                    const isPdf = /\.pdf(\?|$)/i.test(f.name) || (!f.url.startsWith("data:") && f.url.includes("/uploads/"));
                    return isPdf
                      ? `<div class="flex flex-col sm:flex-row sm:items-center gap-2 border rounded-xl p-2">
                          <div class="text-sm flex-1 min-w-0">
                            <div class="font-medium break-all">${f.name}</div>
                            <div class="muted text-xs">${new Date(f.ts).toLocaleString()}</div>
                          </div>
                          <a class="btn-outline" style="flex:1" href="${absUrl(f.url)}" target="_blank">Відкрити</a>
                        </div>`
                      : `<a href="${absUrl(f.url)}" target="_blank" class="block border rounded-xl overflow-hidden">
                           <img src="${absUrl(f.url)}" alt="${f.name}" style="max-width:100%;height:auto;object-fit:contain;background:#faf7f2;display:block">
                         </a>
                         <div class="muted text-xs break-all">${f.name} • ${new Date(f.ts).toLocaleString()}</div>`;
                  })
                  .join("")}
              </div>`;
          };

          return `
          <div class="border rounded-xl p-3 flex flex-col gap-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="min-w-0">
                <div class="font-medium break-all">${uname}</div>
                <div class="muted text-sm">Курс: <b>${cname}</b>
                  • ${new Date(r.ts).toLocaleString()}
                  • статус: <b>${r.status}</b>
                  ${hasReceipt ? ' • <span class="text-green-700">є чек</span>' : ' • <span class="text-red-700">немає чеку</span>'}
                </div>
              </div>
              <div class="flex gap-2 w-full sm:w-auto">
                <button class="btn" style="flex:1" data-approve='${JSON.stringify(r)}'>Підтвердити</button>
                <button class="btn-outline" style="flex:1" data-reject='${JSON.stringify(r)}'>Відхилити</button>
                <button class="btn-outline" style="flex:1" data-remove='${JSON.stringify(r)}'>Видалити заявку</button>
              </div>
            </div>
            <details class="mt-1">
              <summary class="cursor-pointer text-brown-700 hover:underline">Переглянути чеки (${recs.length})</summary>
              <div class="mt-2">${receiptsPreview(r.userId, r.courseId)}</div>
            </details>
          </div>`;
        })
        .join("");

      reqList.querySelectorAll<HTMLButtonElement>("[data-approve]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const r = JSON.parse(btn.getAttribute("data-approve")!) as Purchase;
          const hasReceipt = (getReceipts()[r.userId]?.[r.courseId] || []).length > 0;
          if (!hasReceipt) return alert("Неможливо підтвердити: користувач ще не завантажив чек.");

          const list = getPurchases();
          const i = list.findIndex((x) => x.userId === r.userId && x.courseId === r.courseId && x.ts === r.ts);
          if (i >= 0) list[i].status = "approved";
          setPurchasesLocal(list);
          await jpatch(`/api/purchases/${r.ts}`, { status: "approved" });

          const enr = getEnrollments();
          const arr = enr[r.userId] || [];
          if (!arr.includes(r.courseId)) arr.push(r.courseId);
          enr[r.userId] = arr;
          setEnrollmentsLocal(enr);
          await jput(`/api/enrollments/${r.userId}`, { courses: arr });

          renderRequests();
          alert("Доступ видано.");
        });
      });

      reqList.querySelectorAll<HTMLButtonElement>("[data-reject]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const r = JSON.parse(btn.getAttribute("data-reject")!) as Purchase;
          const list = getPurchases();
          const i = list.findIndex((x) => x.userId === r.userId && x.courseId === r.courseId && x.ts === r.ts);
          if (i >= 0) list[i].status = "rejected";
          setPurchasesLocal(list);
          await jpatch(`/api/purchases/${r.ts}`, { status: "rejected" });
          renderRequests();
        });
      });

      reqList.querySelectorAll<HTMLButtonElement>("[data-remove]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const r = JSON.parse(btn.getAttribute("data-remove")!) as Purchase;
          if (!confirm("Видалити цю заявку остаточно?")) return;
          const list = getPurchases();
          const i = list.findIndex((x) => x.userId === r.userId && x.courseId === r.courseId && x.ts === r.ts);
          if (i >= 0) { list.splice(i, 1); setPurchasesLocal(list); }
          await jdel(`/api/purchases/${r.ts}`);
          renderRequests();
        });
      });
    };
    renderRequests();

    // ====== Access ======
    const userSelect = document.getElementById("userSelect") as HTMLSelectElement;
    const accessList = document.getElementById("accessList")!;
    const saveAccessBtn = document.getElementById("saveAccessBtn")!;

    const ulist = getUsers();
    userSelect.innerHTML = ulist.length
      ? ulist
          .map(
            (u: any) =>
              `<option value="${u.id}">${
                [u.surname || u.lastName, u.name || u.firstName].filter(Boolean).join(" ") || u.id
              }</option>`
          )
          .join("")
      : `<option value="" disabled>Немає користувачів</option>`;

    const renderAccess = async () => {
      const uid = userSelect.value;
      const catalogAll2 = getCatalog();

      if (USE_API) {
        await Promise.all(
          catalogAll2.map(async (c) => {
            try {
              const arr = await jget<Receipt[]>(`/api/receipts/${uid}/${c.id}`, []);
              const all = getReceipts();
              (all[uid] ||= {})[c.id] = arr;
              setReceipts(all);
            } catch {}
          })
        );
      }

      const enr = getEnrollments()[uid] || [];
      const recs = getReceipts()[uid] || {};

      const boxes = catalogAll2
        .map(
          (c) => `
        <label class="flex items-center gap-2">
          <input type="checkbox" data-acc="${c.id}" ${enr.includes(c.id) ? "checked" : ""}/>
          <span>${c.title}</span>
        </label>`
        )
        .join("");

      const filesHtml = Object.keys(recs).length
        ? Object.entries(recs)
            .map(([cid, arr]) => {
              const course = catalogAll2.find((c) => c.id === cid);
              const cname = course ? course.title : cid;
              const items = (arr || [])
                .map(
                  (r: any) => `
                <div class="border rounded-xl p-2 flex flex-col sm:flex-row sm:items-center gap-2">
                  <div class="text-sm flex-1 min-w-0">
                    <div class="font-medium break-all">${r.name}</div>
                    <div class="muted text-xs">${new Date(r.ts).toLocaleString()}</div>
                  </div>
                  <a class="btn-outline" style="flex:1" href="${absUrl(r.url)}" target="_blank">Відкрити</a>
                </div>`
                )
                .join("");
              return `
                <div class="grid gap-2">
                  <div class="font-medium">${cname}</div>
                  ${items || '<div class="muted text-sm">Немає чеків</div>'}
                </div>`;
            })
            .join("")
        : `<div class="muted text-sm">Користувач ще не завантажував чеки.</div>`;

      accessList.innerHTML = `
        <div class="grid gap-2">${boxes}</div>
        <hr class="my-2"/>
        <div class="grid gap-3">
          <div class="text-lg font-semibold">Чеки користувача</div>
          ${filesHtml}
        </div>`;
    };

    userSelect.addEventListener("change", renderAccess);
    renderAccess();

    saveAccessBtn.addEventListener("click", async () => {
      const uid = userSelect.value;
      const checks = Array.from(accessList.querySelectorAll<HTMLInputElement>("[data-acc]"));
      const selected = checks.filter((c) => c.checked).map((c) => c.getAttribute("data-acc")!);
      const enr = getEnrollments();
      enr[uid] = selected;
      setEnrollmentsLocal(enr);
      await jput(`/api/enrollments/${uid}`, { courses: selected });
      alert("Доступи оновлено.");
    });

    // === live-оновлення адмін-чату (список та активний тред) ===
    let lastDump = localStorage.getItem(CHAT_KEY) || "{}";
    const tickAdmin = () => {
      const cur = localStorage.getItem(CHAT_KEY) || "{}";
      if (cur !== lastDump) {
        lastDump = cur;
        renderUsersList();
        if (activeId) renderThread(activeId);
      }
    };
    const onStorageAdm = (e: StorageEvent) => { if (e.key === CHAT_KEY) tickAdmin(); };
    window.addEventListener("storage", onStorageAdm);
void window.setInterval(tickAdmin, 1000);
    // при зміні вкладок адмінки інтервал не заважає — лишаємо простим
  }

  // reveal анімації
  document.querySelectorAll<HTMLElement>(".reveal, .reveal-up").forEach((el) => io.observe(el));
});

// observer
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) (e.target as HTMLElement).classList.add("is-visible");
    }),
  { threshold: 0.15 }
);

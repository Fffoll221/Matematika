// src/app/bindings.ts
import { S, getCatalog, getMy, setMy, setProfile } from "../app/storage";

/** Викликати ОДИН раз у старті застосунку (після створення Router). */
export function installAppBindings() {
  // підсвітка активної вкладки у шелі
  document.addEventListener("view:mounted", (e: any) => {
    const path = e.detail as string;
    const nav = document.getElementById("dashNav");
    if (!nav) return;
    nav.querySelectorAll(".dashTab").forEach((a) => {
      const el = a as HTMLElement;
      const active = el.getAttribute("data-tab") === path;
      el.classList.toggle("bg-brown-700/10", active);
      el.querySelector("span")?.classList.toggle("font-semibold", active);
    });
  });

  // Логіка для кожної підсторінки
  document.addEventListener("view:mounted", (e: any) => {
    const path = e.detail as string;
    const content = document.getElementById("dashContent")!;

    // /app/courses: купівля
    if (path === "/app/courses") {
      const onClick = (ev: Event) => {
        const btn = (ev.target as HTMLElement).closest('[data-action="buy"]') as HTMLElement | null;
        if (!btn) return;
        const id = btn.getAttribute("data-id")!;
        const item = getCatalog().find(c => c.id === id);
        if (!item) return;
        const mine = getMy();
        if (!mine.some(m => m.id === id)) {
          mine.push({ id: item.id, title: item.title, access: "pending" });
          setMy(mine);
          location.hash = "/app/my"; // одразу показати «Мої курси»
        } else {
          alert("Курс уже у ваших «Мої курси».");
        }
      };
      content.addEventListener("click", onClick, { once: false });
    }

    // /app/support: чат
    if (path === "/app/support") {
      const form = content.querySelector("#chatForm") as HTMLFormElement | null;
      form?.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const input = content.querySelector("#chatInput") as HTMLInputElement;
        const text = (input.value || "").trim();
        if (!text) return;
        const msgs = S.get<{t:number; from:"me"|"admin"; text:string}[]>("chat_user", []);
        msgs.push({ t: Date.now(), from: "me", text });
        S.set("chat_user", msgs);
        const box = content.querySelector("#chatBox") as HTMLElement;
        box.insertAdjacentHTML("beforeend",
          `<div class="flex justify-end"><div class="max-w-[75%] rounded-2xl px-3 py-2 text-sm bg-brown-700 text-white">
             ${text}<div class="mt-0.5 text-[10px] text-white/70">${new Date().toLocaleString("uk-UA")}</div>
           </div></div>`);
        input.value = ""; box.scrollTop = box.scrollHeight;
      });
    }

    // /app/profile: збереження та вихід
    if (path === "/app/profile") {
      const pf = content.querySelector("#profileForm") as HTMLFormElement | null;
      const msg = content.querySelector("#pMsg") as HTMLElement | null;
      pf?.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const data = Object.fromEntries(new FormData(pf).entries());
        setProfile(data);
        if (msg) {
          msg.textContent = "Збережено.";
          msg.classList.remove("hidden");
          msg.classList.add("bg-green-50", "text-green-700", "border", "border-brown-700/15");
        }
      });
      content.querySelector("#logoutBtn")?.addEventListener("click", () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("myCourses");
        location.hash = "/login";
      });
    }
  });
}

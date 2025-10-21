// src/views/AppSupport.ts
import { S } from "../app/storage";

export default function AppSupport() {
  const msgs = S.get<{t:number; from:"me"|"admin"; text:string}[]>("chat_user", []);
  const list = msgs.map(m => `
    <div class="flex ${m.from === "me" ? "justify-end" : ""}">
      <div class="max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.from === "me" ? "bg-brown-700 text-white" : "bg-amber-50"}">
        ${m.text}
        <div class="mt-0.5 text-[10px] ${m.from === "me" ? "text-white/70" : "text-brown-700/50"}">${new Date(m.t).toLocaleString("uk-UA")}</div>
      </div>
    </div>`).join("");

  return `
    <div class="card grid gap-3" data-reveal>
      <div class="font-semibold">Підтримка</div>
      <div id="chatBox" class="grid gap-2 max-h-[360px] overflow-auto pr-1">${list}</div>
      <form id="chatForm" class="flex gap-2">
        <input id="chatInput" class="input flex-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white focus:ring-2 focus:ring-brown-700/25" placeholder="Напишіть повідомлення…"/>
        <button class="btn" type="submit">Надіслати</button>
      </form>
      <div class="muted text-xs">*Демо: повідомлення зберігаються локально (далі під’єднаємо бекенд/адмін-панель).</div>
    </div>
  `;
}

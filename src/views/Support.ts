type Msg = { from:"user"|"admin"; text:string; ts:number };
export default function Support() {
  const msgs: Msg[] = JSON.parse(localStorage.getItem("support_msgs") || "[]");
  const list = msgs.map(m => `
    <div class="flex ${m.from==="user" ? "justify-end" : "justify-start"}">
      <div class="rounded-2xl px-4 py-2 ${m.from==="user" ? "bg-brown-700 text-white" : "bg-beige-200"} max-w-[80%]">
        <div class="text-sm">${m.text}</div>
      </div>
    </div>
  `).join("");

  return `
  <div class="container-soft py-8 grid gap-4">
    <h1 class="text-2xl font-bold">Підтримка</h1>
    <div id="chat" class="card grid gap-3 max-h-[60vh] overflow-y-auto">${list || "<div class='muted'>Напишіть перше повідомлення…</div>"}</div>
    <form id="chatForm" class="flex gap-2">
      <input id="chatInput" class="flex-1 border rounded-xl px-4 py-3" placeholder="Ваше повідомлення..." />
      <button class="btn" type="submit">Надіслати</button>
    </form>
  </div>`;
}

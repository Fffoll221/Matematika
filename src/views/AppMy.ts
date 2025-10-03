// src/views/AppMy.ts
import { getCatalog, getMy } from "../app/storage";

export default function AppMy() {
  const catalog = getCatalog();
  const mine = getMy();

  if (!mine.length) {
    return `<div class="card" data-reveal>
      Поки що немає придбаних курсів. Перейдіть у вкладку <b>Курси</b> та натисніть «Придбати».
    </div>`;
  }

  return `
    <div class="grid md:grid-cols-2 gap-6">
      ${mine.map(m => {
        const c = catalog.find(x => x.id === m.id);
        const badge = m.access === "active"
          ? `<span class="text-xs rounded-full px-2 py-0.5 bg-green-100 text-green-700">доступ надано</span>`
          : `<span class="text-xs rounded-full px-2 py-0.5 bg-amber-100 text-amber-700">очікує доступу</span>`;
        const btn   = m.access === "active"
          ? `<a class="btn no-underline" href="#/tests">Відкрити матеріали</a>`
          : `<button class="btn-outline cursor-not-allowed opacity-70" disabled>Очікує доступу</button>`;

        return `
          <article class="card" data-reveal>
            <div class="flex items-center justify-between">
              <div class="text-lg font-semibold">${m.title}</div>
              ${badge}
            </div>
            <div class="muted mt-1 text-sm">${c?.desc ?? ""}</div>
            <div class="mt-3 flex gap-2">${btn}<a class="btn-outline no-underline" href="#/app/support">Підтримка</a></div>
          </article>`;
      }).join("")}
    </div>
  `;
}

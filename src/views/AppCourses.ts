// src/views/AppCourses.ts
import { getCatalog } from "../app/storage";

export default function AppCourses() {
  const catalog = getCatalog();
  return `
    <div class="grid md:grid-cols-2 gap-6">
      ${catalog.map(c => `
        <article class="card" data-reveal>
          <div class="text-lg font-semibold">${c.title}</div>
          <div class="mt-1 muted text-sm">${c.desc}</div>
          <div class="mt-3 font-bold text-brown-700">${c.price.toLocaleString("uk-UA")} грн/міс</div>
          <div class="mt-4 flex gap-2">
            <button class="btn" data-action="buy" data-id="${c.id}">Придбати</button>
            <a class="btn-outline no-underline" href="#/courses">Детальніше</a>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

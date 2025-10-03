// src/footer.ts

// Лаконічна іконка "знак відповідності"
const checkIco =
  `<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12l4 4 10-10"/></svg>`;

/**
 * Статичний footer (НЕ fixed).
 * Робимо classic "sticky footer": body -> flex-col, #app -> flex-1.
 * Футер завжди під контентом; якщо контенту мало, прилипає до низу вікна.
 */
export function mountFooter() {
  // знімаємо минулу fixed-версію якщо раптом була
  const oldFixed = document.getElementById("siteFooter");
  if (oldFixed) oldFixed.remove();

  // Налаштування верстки для sticky footer
  document.body.classList.add("min-h-screen", "flex", "flex-col");
  const app = document.getElementById("app");
  if (app) app.classList.add("flex-1"); // контент розтягується, футер внизу

  // Прибираємо "резерви" від fixed-версії, якщо вони колись були
  document.documentElement.style.scrollPaddingBottom = "";
  document.body.classList.remove("pb-footer");
  document.body.style.paddingBottom = "";

  // Рік не нижче 2025 (як просив замовник)
  const year = Math.max(2025, new Date().getFullYear());

  // Статичний блок футера
  const footer = document.createElement("footer");
  footer.id = "siteFooter";
  footer.setAttribute("role", "contentinfo");
  footer.innerHTML = `
    <div class="border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div class="container-soft py-4">
        <div class="rounded-2xl border border-beige-200 bg-white shadow-[0_6px_24px_rgba(0,0,0,.06)] px-4 md:px-6 py-3">
          <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-between">
            <div class="flex items-center gap-2 text-sm md:text-base">
              <span class="text-brown-700">${checkIco}</span>
              <span>Знак відповідності</span>
              <span class="opacity-50">•</span>
              <span>© ${year} Усі права захищені</span>
            </div>

            <nav aria-label="Правові посилання" class="flex flex-wrap items-center gap-2 text-sm md:text-base">
              <a class="btn-outline no-underline px-3 py-1" href="#/privacy" title="Політика конфіденційності">
                Політика конфіденційності
              </a>
              <a class="btn no-underline px-3 py-1" href="#/terms" title="Права та обов’язки / Умови користування">
                Права та обов’язки (Умови)
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `;

  // Додаємо футер у кінець <body> — під усім контентом
  document.body.appendChild(footer);
}

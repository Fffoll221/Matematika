// src/views/Models.ts
import PublicHeader from "./_PublicHeader";

export default function Models(): string {
  return `
    ${PublicHeader("#/models")}

    <section class="container-soft py-10 grid gap-4">
      <h1 class="text-2xl font-extrabold">Математичні моделі</h1>

      <!-- Чіпи з посиланнями (у потрібному порядку) -->
      <nav class="flex flex-wrap items-center gap-2">
        <a class="chip" href="https://www.geogebra.org/f/zadscs8w9s" target="_blank" rel="noopener">Математика</a>
        <a class="chip" href="https://www.geogebra.org/f/unk6xd77dn" target="_blank" rel="noopener">Алгебра</a>
        <a class="chip" href="https://www.geogebra.org/f/zw3seawbfz" target="_blank" rel="noopener">Планіметрія</a>
        <a class="chip" href="https://www.geogebra.org/f/s56rwkpe2x" target="_blank" rel="noopener">Стереометрія</a>
        <a class="chip" href="https://www.geogebra.org/f/zjfs3a4qxs" target="_blank" rel="noopener">Тренажери</a>
      </nav>

      <!-- Попередній перегляд: чистий Classic усередині сторінки -->
      <article class="card overflow-hidden">
        <div class="relative w-full" style="min-height: 680px;">
          <iframe
            id="ggbFrame"
            title="GeoGebra Classic"
            src="https://www.geogebra.org/classic?embed&lang=uk"
            style="border:0;width:100%;height:680px;"
            allowfullscreen
            loading="lazy">
          </iframe>
        </div>
      </article>

      <!-- Повний список посилань з описом (все, що просив, у вказаному порядку) -->
      <article class="card">
        <h2 class="font-semibold mb-3">Список посилань GeoGebra</h2>
        <ul class="grid gap-2">
          <li>
            <a class="flex items-center justify-between rounded-lg border px-4 py-2 hover:bg-beige-100"
               href="https://www.geogebra.org/f/zadscs8w9s" target="_blank" rel="noopener">
              <span>Математика (5–6 класи)</span><span class="opacity-70">↗ Відкрити</span>
            </a>
          </li>
          <li>
            <a class="flex items-center justify-between rounded-lg border px-4 py-2 hover:bg-beige-100"
               href="https://www.geogebra.org/f/unk6xd77dn" target="_blank" rel="noopener">
              <span>Алгебра</span><span class="opacity-70">↗ Відкрити</span>
            </a>
          </li>
          <li>
            <a class="flex items-center justify-between rounded-lg border px-4 py-2 hover:bg-beige-100"
               href="https://www.geogebra.org/f/zw3seawbfz" target="_blank" rel="noopener">
              <span>Планіметрія</span><span class="opacity-70">↗ Відкрити</span>
            </a>
          </li>
          <li>
            <a class="flex items-center justify-between rounded-lg border px-4 py-2 hover:bg-beige-100"
               href="https://www.geogebra.org/f/s56rwkpe2x" target="_blank" rel="noopener">
              <span>Стереометрія</span><span class="opacity-70">↗ Відкрити</span>
            </a>
          </li>
          <li>
            <a class="flex items-center justify-between rounded-lg border px-4 py-2 hover:bg-beige-100"
               href="https://www.geogebra.org/f/zjfs3a4qxs" target="_blank" rel="noopener">
              <span>Тренажери</span><span class="opacity-70">↗ Відкрити</span>
            </a>
          </li>
        </ul>
        <p class="muted mt-3 text-sm">
          
        </p>
      </article>
    </section>
  `;
}

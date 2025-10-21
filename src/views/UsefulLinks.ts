import PublicHeader from "./_PublicHeader";

const icons = {
  mail: `
<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor">
  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/>
</svg>`,
  instagram: `
<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor">
  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 5 5 5 5 0 0 0-5-5Zm0 2.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5Zm5.5-2.75a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25Z"/>
</svg>`,
  youtube: `
<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor">
  <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.2 12 4.2 12 4.2s-6.6 0-8.2.5A4 4 0 0 0 1 7.5 41.3 41.3 0 0 0 .5 12 41.3 41.3 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.5 8.2.5 8.2.5s6.6 0 8.2-.5A4 4 0 0 0 23 16.5 41.3 41.3 0 0 0 23.5 12 41.3 41.3 0 0 0 23 7.5ZM10 15.5v-7l6 3.5-6 3.5Z"/>
</svg>`,
  link: `
<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor">
  <path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 1 0-7.07-7.07L10.9 5.93a1 1 0 0 0 1.41-1.41l1.23-1.23a3 3 0 1 1 4.24 4.24L15.66 9.3A3 3 0 0 1 11.4 5.06l-.7.7A1 1 0 1 0 12.1 7.2l.7-.7a5 5 0 0 0-2.83 6.5ZM4.81 20.6a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 1 0-7.07-7.07l-2.12 2.12a5 5 0 0 0 0 7.07Zm1.41-5.66 2.12-2.12a3 3 0 0 1 4.24 4.24l-2.12 2.12a3 3 0 1 1-4.24-4.24Z"/>
</svg>`
};

export default function UsefulLinks() {
  return `
  ${PublicHeader("#/links")}

  <section class="container-soft py-10">
    <h1 class="text-4xl font-bold">Корисні посилання</h1>
    <p class="muted mt-2">Офіційні контакти та соцмережі викладача. Тисни — і переходимо </p>

    <!-- Chips -->
    <div class="grid md:grid-cols-2 gap-4 mt-6">
      <!-- Email -->
      <a class="card flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition group"
         href="mailto:olga.vasurenko@ukr.net" target="_blank" rel="noopener">
        <div class="rounded-xl bg-beige-200 p-3 text-brown-700 group-hover:bg-beige-300">${icons.mail}</div>
        <div>
          <div class="font-semibold">Електронна пошта</div>
          <div class="muted text-sm">olga.vasurenko@ukr.net</div>
        </div>
        <span class="ml-auto text-sm muted">Написати</span>
      </a>

      <!-- Instagram -->
      <a class="card flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition group"
         href="https://www.instagram.com/nmt_vasurenko/" target="_blank" rel="noopener">
        <div class="rounded-xl bg-beige-200 p-3 text-brown-700 group-hover:bg-beige-300">${icons.instagram}</div>
        <div>
          <div class="font-semibold">Instagram</div>
          <div class="muted text-sm">@nmt_vasurenko</div>
        </div>
        <span class="ml-auto text-sm muted">Відкрити</span>
      </a>

      <!-- YouTube -->
      <a class="card flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition group"
         href="https://www.youtube.com/channel/UCRaauVG61w0903fTqtSWrcg" target="_blank" rel="noopener">
        <div class="rounded-xl bg-beige-200 p-3 text-brown-700 group-hover:bg-beige-300">${icons.youtube}</div>
        <div>
          <div class="font-semibold">YouTube-канал</div>
          <div class="muted text-sm">«Вивчаємо математику разом»</div>
        </div>
        <span class="ml-auto text-sm muted">Переглянути</span>
      </a>


    <!-- Mini-tips -->
    <div class="mt-8 grid md:grid-cols-3 gap-4">
      <div class="card">
        <div class="hand text-2xl text-brown-700">1.</div>
        <p class="muted mt-1">Підписуйся на YouTube — там з’являються розбори задач та міні-тести.</p>
      </div>
      <div class="card">
        <div class="hand text-2xl text-brown-700">2.</div>
        <p class="muted mt-1">В Instagram — анонси занять і короткі лайфхаки до тем.</p>
      </div>
      <div class="card">
        <div class="hand text-2xl text-brown-700">3.</div>
        <p class="muted mt-1">Є питання? Пиши на пошту — відповім і підкажу оптимальний маршрут підготовки.</p>
      </div>
    </div>
  </section>
  `;
}

import PublicHeader from "./_PublicHeader";

const StarIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
</svg>`;
const MedalIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17 3H7v6a5 5 0 1 0 10 0V3zm-2 0v6a3 3 0 1 1-6 0V3h6zM8 19l4-2 4 2v2l-4-2-4 2v-2z"/>
</svg>`;
const HeartIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12.1 21.35 10 19.28C5.4 14.36 2 11.28 2 7.5A4.5 4.5 0 0 1 6.5 3 5 5 0 0 1 12 5a5 5 0 0 1 5.5-2A4.5 4.5 0 0 1 22 7.5c0 3.78-3.4 6.86-8 11.78l-1.9 2.07z"/>
</svg>`;
const TargetIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm0-13a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5Zm0 7a2 2 0 1 1 2-2 2.006 2.006 0 0 1-2 2Z"/>
</svg>`;
const BookIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
  <path d="M18 2H8a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h10v4a1 1 0 0 0 2 0V4a2 2 0 0 0-2-2Zm-1 12H8a1 1 0 0 0-1 1V5a1 1 0 0 1 1-1h9Z"/>
</svg>`;
const SparkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
  <path d="M13 2 9 12l8-2-6 12 4-10-8 2 6-14z"/>
</svg>`;

export default function AboutMe() {
  return `
  ${PublicHeader("#/about-me")}

  <!-- HERO -->
  <section class="container-soft py-12 md:py-16">
    <div class="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
      <!-- Фото -->
      <div class="card p-0 overflow-hidden reveal-up">
        <div class="aspect-[4/5] bg-beige-200 relative">
          <img src="/teacher1.jpg" alt="Ольга Васюренко" class="w-full h-full object-cover"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
          <div class="absolute inset-0 hidden items-center justify-center text-center p-6">
            <div class="border-2 border-dashed border-brown-700/30 rounded-2xl w-full h-full grid place-items-center">
              <div>
                <div class="hand text-3xl mb-2">Тут буде фото</div>
                <div class="muted">Додайте файл <code>public/teacher.jpg</code></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Текст -->
      <div class="reveal">
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">Про мене</h1>
        <p class="mt-4 text-lg muted">
          Мене звати <b>Ольга Васюренко</b>. Я — вчитель математики вищої категорії, вчитель-методист
          із понад <b>25-річним</b> педагогічним стажем та досвідом роботи з учнями різного рівня підготовки.
          Багато років працюю як репетитор, допомагаючи школярам не лише підтягнути знання, а й досягати високих результатів.
        </p>

        <div class="grid md:grid-cols-2 gap-4 mt-6">
          <div class="card reveal-up">
            <div class="flex gap-3 items-start">${StarIcon}
              <div><div class="font-semibold">Результати учнів</div>
                <p class="muted mt-1">Мої учні успішно складають ЗНО/НМТ, отримуючи результати <b>196, 192, 190, 186</b> балів.</p>
              </div>
            </div>
          </div>
          <div class="card reveal-up delay-1">
            <div class="flex gap-3 items-start">${MedalIcon}
              <div><div class="font-semibold">Досвід підготовки</div>
                <p class="muted mt-1">Готую до іспитів ще з часу перших ЗНО — добре знаю всі вимоги та формати.</p>
              </div>
            </div>
          </div>
          <div class="card reveal-up delay-2">
            <div class="flex gap-3 items-start">${HeartIcon}
              <div><div class="font-semibold">Любов до математики</div>
                <p class="muted mt-1">Прагну передати цю любов своїм учням через зрозумілі пояснення й підтримку.</p>
              </div>
            </div>
          </div>
          <div class="card reveal-up delay-3">
            <div class="flex gap-3 items-start">${TargetIcon}
              <div><div class="font-semibold">Мета</div>
                <p class="muted mt-1">Щоб учні не лише успішно склали іспит, а й відчули впевненість у собі — математика може бути цікавою кожному.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-6 reveal-up">
          <div class="flex gap-3 items-start">${BookIcon}
            <div>
              <div class="font-semibold">Підхід</div>
              <p class="mt-1 muted">
                Я — педагог за покликанням. На уроках ми не просто розбираємо формули й задачі —
                <b>вчимося бачити, як математика працює у звичайному житті</b>. Тому складні теми стають зрозумілими й логічними.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap gap-3 reveal-up">
          <a href="#/register" class="btn no-underline">Записатися на курс</a>
          <a href="#/about-course" class="btn-outline no-underline">Про курс</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Маленький hand-accent -->
  <section class="container-soft pb-12">
    <div class="hand text-3xl text-brown-700 reveal-up flex items-center gap-2">
      ${SparkIcon} Дамо математиці звучати легко ✨
    </div>
  </section>
  `;
}

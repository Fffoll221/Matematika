import PublicHeader from "./_PublicHeader";

const PinIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
  <path d="M16.24 3.56a2.5 2.5 0 0 1 3.53 3.53l-1.62 1.62a3.98 3.98 0 0 1 .39 5.25l1.11 1.11a1 1 0 0 1-1.41 1.41l-1.11-1.11a3.98 3.98 0 0 1-5.25.39l-4.6 4.6a.75.75 0 0 1-1.06-1.06l4.6-4.6a3.98 3.98 0 0 1-.39-5.25L6.91 7.09A2.5 2.5 0 1 1 10.44 3.56l1.62 1.62a3.98 3.98 0 0 1 5.25.39l-1.07 1.07  -.02.02  .02-.02.02-.02 1-1z"/>
</svg>`;

export default function AboutCourse() {
  return `
  ${PublicHeader("#/about-course")}

  <!-- HERO -->
  <section class="container-soft py-12 md:py-16">
    <div class="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
      <div class="reveal">
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
          Про курс підготовки до <span class="text-brown-700">НМТ з математики</span>
        </h1>
        <p class="hand text-2xl md:text-3xl mt-4 text-brown-700/90">
          Мій курс — це цілеспрямована підготовка для учнів 10–11 класів.
        </p>
        <p class="muted mt-4 text-lg">
          Крок за кроком проходимо всі теми НМТ, багато практики на тестах, формуємо впевненість
          перед іспитом та стабільний результат.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
          <a href="#/register" class="btn no-underline">Записатися</a>
          <a href="#/about-me" class="btn-outline no-underline">Про викладача</a>
        </div>
      </div>

      <!-- Фото викладача -->
      <div class="card p-0 overflow-hidden reveal-up delay-1">
        <div class="aspect-[4/5] bg-beige-200 relative">
          <!-- Якщо покладеш public/teacher.jpg — підхопиться -->
          <img src="/teacher.jpg" alt="Фото викладача" class="w-full h-full object-cover"
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
    </div>
  </section>

  <!-- ПЕРЕВАГИ -->
  <section class="container-soft pb-4">
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Формат -->
      <div class="card reveal-up">
        <div class="flex gap-4 items-start">
          ${PinIcon}
          <div>
            <h3 class="font-semibold text-lg">Формат</h3>
            <p class="muted mt-1">
              Онлайн-заняття у групах за рівнями знань. Пояснення до відеоуроків у відеоформаті,
              конспект до кожного уроку, перевірка домашніх завдань.
            </p>
          </div>
        </div>
      </div>

      <!-- Доступність -->
      <div class="card reveal-up delay-1">
        <div class="flex gap-4 items-start">
          ${PinIcon}
          <div>
            <h3 class="font-semibold text-lg">Доступність</h3>
            <p class="muted mt-1">
              Пояснення простими словами, постійна підтримка та практика.
              Складні теми стають зрозумілими й логічними.
            </p>
          </div>
        </div>
      </div>

      <!-- Результат -->
      <div class="card reveal-up delay-2">
        <div class="flex gap-4 items-start">
          ${PinIcon}
          <div>
            <h3 class="font-semibold text-lg">Результат</h3>
            <p class="muted mt-1">
              Уже за перший місяць учні додають у середньому <b>+15 балів</b>,
              а фінальні результати — <b>190+ балів</b> на НМТ.
            </p>
          </div>
        </div>
      </div>

      <!-- Економія -->
      <div class="card reveal-up delay-3">
        <div class="flex gap-4 items-start">
          ${PinIcon}
          <div>
            <h3 class="font-semibold text-lg">Економія</h3>
            <p class="muted mt-1">
              Заняття у групі коштують <b>300 грн</b> — це вдвічі дешевше за індивідуальні уроки.
              Плюс кожен учень отримує <b>безкоштовну щотижневу індивідуальну консультацію</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- СТРУКТУРА / ЯК МИ ПРАЦЮЄМО -->
  <section class="container-soft py-8">
    <div class="card reveal">
      <div class="grid md:grid-cols-4 gap-6">
        <div>
          <div class="hand text-3xl">1.</div>
          <h4 class="font-semibold mt-1">Діагностика</h4>
          <p class="muted mt-1">Визначаємо рівень, формуємо групу, ставимо цілі.</p>
        </div>
        <div>
          <div class="hand text-3xl">2.</div>
          <h4 class="font-semibold mt-1">Теорія + конспект</h4>
          <p class="muted mt-1">Коротко і зрозуміло, без «води», приклади, шаблони.</p>
        </div>
        <div>
          <div class="hand text-3xl">3.</div>
          <h4 class="font-semibold mt-1">Практика</h4>
          <p class="muted mt-1">Завдання формату НМТ, домашка з перевіркою.</p>
        </div>
        <div>
          <div class="hand text-3xl">4.</div>
          <h4 class="font-semibold mt-1">Контроль і фідбек</h4>
          <p class="muted mt-1">Міні-тести, розбір помилок, індивідуальні поради.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="container-soft py-10">
    <div class="card flex flex-col md:flex-row items-center justify-between gap-4 reveal-up">
      <div>
        <div class="hand text-3xl text-brown-700">Готові почати?</div>
        <p class="muted">Зареєструйтесь, увійдіть у кабінет і придбайте курс.</p>
      </div>
      <div class="flex gap-3">
        <a href="#/register" class="btn no-underline">Зареєструватися</a>
        <a href="#/login" class="btn-outline no-underline">Увійти</a>
      </div>
    </div>
  </section>
  `;
}

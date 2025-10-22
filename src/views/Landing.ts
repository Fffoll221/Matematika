// src/views/Landing.ts
import PublicHeader from "./_PublicHeader";

/* ---------- Невеличка іконкова міні-бібліотека (inline SVG) ---------- */
const ico = {
  play: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
           <rect x="3" y="5" width="18" height="14" rx="2"></rect>
           <path d="M10 9l5 3-5 3z" fill="currentColor"></path>
         </svg>`,
  notebook: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
               <rect x="5" y="3" width="14" height="18" rx="2"></rect>
               <path d="M9 7h6M9 11h6M9 15h4"></path>
             </svg>`,
  target: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
             <circle cx="12" cy="12" r="7"></circle>
             <circle cx="12" cy="12" r="3"></circle>
           </svg>`,
  chart: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M4 19V5M10 19V9M16 19v-6M3 19h18"></path>
          </svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M5 12l4 4 10-10"></path>
          </svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="9" cy="8" r="3"></circle>
            <path d="M2 20c0-3.2 3-5 7-5"></path>
            <circle cx="17" cy="10" r="2.5"></circle>
            <path d="M22 20c0-2.6-2-4-5-4"></path>
          </svg>`,
  chat: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
           <path d="M4 5h16v10H7l-3 3V5z"></path>
         </svg>`,
  clipboard: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
               <rect x="7" y="4" width="10" height="16" rx="2"></rect>
               <path d="M9 4v2h6V4"></path>
               <path d="M9 10h6M9 14h6"></path>
             </svg>`,
  wallet: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <rect x="3" y="6" width="18" height="12" rx="2"></rect>
            <path d="M16 12h4M6 8h8"></path>
          </svg>`,
  wifi: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
           <path d="M3 9a13 13 0 0 1 18 0M6 12a9 9 0 0 1 12 0M9 15a5 5 0 0 1 6 0"></path>
           <circle cx="12" cy="18" r="1.6" fill="currentColor"></circle>
         </svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <rect x="3" y="5" width="18" height="16" rx="2"></rect>
              <path d="M8 3v4M16 3v4M3 10h18"></path>
            </svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="12" cy="12" r="8"></circle>
            <path d="M12 7v6l3 2"></path>
          </svg>`,
  lightning: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
               <path d="M13 3L4 14h6l-1 7 9-11h-6z"></path>
             </svg>`,
  book: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
           <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"></path>
           <path d="M6 3v16"></path>
         </svg>`,
  brain: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M8 8a3 3 0 0 1 6 0M5 12a3 3 0 0 1 3-4M16 8a3 3 0 0 1 3 4M8 16a3 3 0 1 1-3-4M19 12a3 3 0 1 1-3 4M12 9v6"></path>
          </svg>`,
};

/* ---------- Дані для секцій (усі тексти з твоїх макетів) ---------- */
const perks = [
  {
    title: "Оптимальність",
    text:
      "Оптимальний баланс між онлайн‑уроком наживо, і уроками в записі. Запис дозволяє працювати у власному темпі і в зручний для себе час. Онлайн‑уроки наживо – це можливість отримати відповідь на своє запитання в реальному часі.",
    icon: ico.check,
  },
  {
    title: "Мобільність",
    text:
      "Учні мають можливість навчатись у зручний час і в будь‑якому місці, де є вихід в інтернет — так як записи уроків зберігаються. Переглядати відеоуроки, як з комп’ютера, так і з будь‑якого іншого ґаджета.",
    icon: ico.wifi,
  },
  {
    title: "Доступність",
    text:
      "Інформація подається просто, чітко та зрозуміло для кожного учня. Вивчення основних означень та формул здійснюється не шляхом зазубрення, а методом асоціацій та ситуаційних процесів.",
    icon: ico.book,
  },
  {
    title: "Економія",
    text:
      "Онлайн‑курси заощадять найцінніший ресурс — час та кошти, адже оплата курсу не потребує внесення повної вартості навчання одразу. Не витрачатимеш час на дорогу до репетитора або освітнього центру.",
    icon: ico.wallet,
  },
];

const learnFeatures = [
  { icon: ico.play, title: "Уроки наживо та відеоуроки" },
  { icon: ico.users, title: "Робота в міні‑групах" },
  { icon: ico.chat, title: "Спілкування в чаті" },
  { icon: ico.wallet, title: "Помісячна оплата" },
  { icon: ico.notebook, title: "Робочі зошити" },
  { icon: ico.chart, title: "Підсумкові тести та симуляції НМТ" },
  { icon: ico.brain, title: "Психологічна підтримка та мотивування" },
];

const studentGets = [
  {
    icon: ico.play,
    title: "Відеозапис пояснень",
    text:
      "Учень завжди має доступ до запису пояснення навчальної теми: повторювати матеріал у власному темпі, переглядати складні моменти кілька разів та готуватись у зручний час.",
  },
  {
    icon: ico.notebook,
    title: "Конспект і матеріали",
    text:
      "До кожного уроку надається конспект із теорією, прикладами розв’язків, довідниками та «шпаргалками». Це допомагає швидко закріплювати знання та економити час на підготовці.",
  },
  {
    icon: ico.target,
    title: "Практика на занятті",
    text:
      "Під час уроку розбираємо завдання у форматі НМТ: приклади, тести, типові помилки. Є можливість ставити запитання й отримувати уточнення та пояснення до кожної теми.",
  },
  {
    icon: ico.chart,
    title: "Симуляції НМТ та звітність",
    text:
      "Раз на місяць учні проходять пробне тестування у форматі НМТ — щомісячний аналіз успішності, персональні рекомендації та звіти для батьків.",
  },
];

const whyMe = [
  {
    icon: ico.check,
    text:
      "Пояснюю зрозуміло, а не просто формули. Кожна тема подається простими словами через приклади з життя та асоціації — учень не зубрить, а дійсно розуміє логіку математики.",
  },
  {
    icon: ico.lightning,
    text:
      "Вчу міркувати, а не зазубрювати: сучасні інструменти (GeoGebra, наочні моделі, лайфхаки) допомагають мислити, а не механічно повторювати дії.",
  },
  {
    icon: ico.target,
    text:
      "Уроки, що готують до НМТ: не просто «виконати за шаблоном», а відпрацювати всі типи задач, які зустрічаються на іспиті, зі стратегіями розв’язання.",
  },
  {
    icon: ico.users,
    text:
      "Максимум уваги до кожного: навіть у групі кожен учень отримує пояснення, відповіді на питання та індивідуальні рекомендації.",
  },
  {
    icon: ico.chart,
    text:
      "Симуляції, зворотний зв’язок і прогрес крок за кроком: щомісячні пробні НМТ показують рівень підготовки та динаміку в балах.",
  },
  {
    icon: ico.chat,
    text:
      "Постійна підтримка від викладача — я на зв’язку з учнями та батьками, допомагаю у складних моментах і щиро вболіваю за результат.",
  },
];

const courseCards = [
  {
    ribbon: "11 клас (старт 01 вересня)",
    facts: [
      { icon: ico.calendar, text: "Початок 01 вересня" },
      { icon: ico.clock, text: "3 рази на тиждень, по 60 хв" },
      { icon: ico.check, text: "Реєстрація: відкрита" },
      { icon: ico.target, text: "Тривалість: до дня НМТ" },
    ],
  },
  {
    ribbon: "11 клас (старт 08 червня)",
    facts: [
      { icon: ico.calendar, text: "Початок 08 червня" },
      { icon: ico.clock, text: "2 рази на тиждень, по 60 хв" },
      { icon: ico.chat, text: "Реєстрація: закрита" },
      { icon: ico.target, text: "Тривалість: до дня НМТ" },
    ],
  },
  {
    ribbon: "10 клас",
    facts: [
      { icon: ico.calendar, text: "Початок 01 вересня" },
      { icon: ico.clock, text: "2 рази на тиждень, по 60 хв" },
      { icon: ico.check, text: "Реєстрація: відкрита" },
      { icon: ico.target, text: "Тривалість: до дня НМТ" },
    ],
  },
];

export default function Landing() {
const teacherFallback = `
  <div class="absolute inset-0 hidden place-items-center p-6">
    <div class="border-2 border-dashed border-brown-700/30 rounded-2xl w-full h-full grid place-items-center">
      <div class="text-center">
        <div class="hand text-3xl mb-1">Тут буде фото викладача</div>
        <div class="muted text-sm">Покладіть <code>public/fan.png</code> або <code>public/teacher1.jpg</code></div>
      </div>
    </div>
  </div>`;


  return `
  ${PublicHeader("#/")}

  <main>
    <!-- ============ HERO ============ -->
    <section class="container-soft py-10 md:py-16">
      <div class="grid md:grid-cols-[1.25fr_0.75fr] gap-8 items-start">
        <div data-reveal>
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
            Математика <span class="text-brown-700">НМТ‑2026</span>
          </h1>
          <div class="mt-3 flex items-center gap-2 text-brown-700 font-semibold">
            ${ico.calendar}
            <span>Старт навчання — <span class="underline decoration-brown-700/40">1 вересня</span></span>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 mt-6">
            <div class="card" data-reveal>
              <div class="font-semibold">Для 11‑класників</div>
              <p class="muted mt-1">
                Хто хоче запустити підготовку до НМТ‑2026 без стресу й поспіху.
                Чітка система, поступовий старт — й упевненість із перших тем.
              </p>
            </div>
            <div class="card" data-reveal>
              <div class="font-semibold">Для 10‑класників</div>
              <p class="muted mt-1">
                Ідеальна можливість повторити базу, щоб протягом 11 класу
                зосередитись на шкільній програмі та підготовці до НМТ‑2027 — спокійно й завчасно.
              </p>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <a class="btn no-underline" href="#/register">Зареєструватися</a>
            <a class="btn-outline no-underline" href="#/about-me">Про викладача</a>
          </div>
        </div>

<!-- Фото викладача -->
<div class="card p-0 overflow-hidden relative aspect-[4/5] group" data-reveal data-tilt>
  <img
    src="/fan.png"
    alt="Викладач"
    class="block w-full h-full object-cover object-[center_top] transition-transform duration-700 ease-out"
    onerror="this.onerror=null;this.src='/teacher1.jpg';"
  />
  ${teacherFallback}
</div>

      </div>
    </section>

    <!-- ============ КУРСИ/ГРУПИ (з Canva) ============ -->
    <section class="container-soft pb-4">
      <h2 class="text-2xl md:text-3xl font-bold mb-4" data-reveal>Курси / групи</h2>
      <div class="grid md:grid-cols-3 gap-6">
        ${courseCards
          .map(
            (c) => `
          <div class="card" data-reveal>
            <div class="font-semibold text-brown-700 mb-3">${c.ribbon}</div>
            <ul class="grid gap-2">
              ${c.facts
                .map(
                  (f) => `
                <li class="flex items-start gap-3">
                  <span class="text-brown-700 shrink-0 mt-0.5">${f.icon}</span>
                  <span>${f.text}</span>
                </li>`
                )
                .join("")}
            </ul>
          </div>`
          )
          .join("")}
      </div>
    </section>

    <!-- ============ ПЕРЕВАГИ КУРСУ ============ -->
<figure class="card card-narrow p-0 overflow-hidden mb-6" data-reveal>
  <img
    src="/kadr1.png"
    alt="Математичні формули — переваги курсу"
    class="block w-full h-auto"
    loading="lazy"
    decoding="async"
  />
</figure>

      <div class="grid md:grid-cols-4 gap-6">
        ${perks
          .map(
            (p) => `
          <div class="card" data-reveal>
            <div class="flex items-center gap-3">
              <span class="text-brown-700">${p.icon}</span>
              <h3 class="font-semibold text-lg">${p.title}</h3>
            </div>
            <p class="muted mt-2">${p.text}</p>
          </div>`
          )
          .join("")}
      </div>
    </section>

    <!-- ============ НАВЧАННЯ НА КУРСІ ============ -->
    <section class="container-soft py-10">
      <h2 class="text-2xl md:text-3xl font-bold mb-6" data-reveal>Навчання на курсі</h2>
       <div class="card p-0 overflow-hidden mb-6" data-reveal>
    <img
      src="/kadr2.png"
      alt="Математичні формули — навчання на курсі"
      class="block w-full h-auto"
      loading="lazy"
    />
  </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        ${learnFeatures
          .map(
            (f) => `
          <div class="card flex items-center gap-3" data-reveal>
            <span class="text-brown-700">${f.icon}</span>
            <div class="font-medium">${f.title}</div>
          </div>`
          )
          .join("")}
      </div>
    </section>

    <!-- ============ ЩО ОТРИМУЄ УЧЕНЬ (детально) ============ -->
    <section class="container-soft pb-4">
      <h2 class="text-2xl md:text-3xl font-bold mb-4" data-reveal>Що отримує учень на курсі?</h2>
      <div class="card p-0 overflow-hidden mb-6" data-reveal>
    <img
      src="/kadr3.png"
      alt="Математичні формули — що отримує учень"
      class="block w-full h-auto"
      loading="lazy"
    />
  </div>
      <div class="grid md:grid-cols-2 gap-6">
        ${studentGets
          .map(
            (b) => `
          <div class="card" data-reveal>
            <div class="flex items-start gap-3">
              <span class="text-brown-700 shrink-0 mt-0.5">${b.icon}</span>
              <div>
                <div class="font-semibold">${b.title}</div>
                <p class="muted mt-1">${b.text}</p>
              </div>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </section>

    <!-- ============ ЧОМУ ВАРТО ГОТУВАТИСЬ ЗІ МНОЮ? ============ -->
    <section class="container-soft py-10">
      <h2 class="text-2xl md:text-3xl font-bold mb-4" data-reveal>Чому варто готуватись до НМТ зі мною?</h2>
      <div class="card p-0 overflow-hidden mb-6" data-reveal>
    <img
      src="/kadr4.png"
      alt="Математика — чому варто готуватись зі мною"
      class="block w-full h-auto"
      loading="lazy"
    />
  </div>
      <ul class="grid md:grid-cols-2 gap-6">
        ${whyMe
          .map(
            (w) => `
          <li class="card flex items-start gap-3" data-reveal>
            <span class="text-brown-700 shrink-0 mt-0.5">${w.icon}</span>
            <p>${w.text}</p>
          </li>`
          )
          .join("")}
      </ul>
    </section>

    <!-- ============ ОСОБЛИВОСТІ КУРСУ (з Canva) ============ -->
    <section class="container-soft pb-4">
      <h2 class="text-2xl md:text-3xl font-bold mb-4" data-reveal>Особливості курсу</h2>
       <div class="card p-0 overflow-hidden mb-6" data-reveal>
    <img
      src="/kadr5.png"
      alt="Особливості курсу — математичні формули"
      class="block w-full h-auto"
      loading="lazy"
    />
  </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card" data-reveal>
          <div class="flex items-start gap-3"><span class="text-brown-700">${ico.clock}</span>
            <p><b>3 уроки щотижня (11 клас)</b> по 60 хв — допоможуть виробити стабільну звичку до навчання.</p>
          </div>
        </div>
        <div class="card" data-reveal>
          <div class="flex items-start gap-3"><span class="text-brown-700">${ico.clock}</span>
            <p><b>2 уроки щотижня (10 клас)</b> по 60 хв — допоможуть виробити стабільну звичку до навчання.</p>
          </div>
        </div>
        <div class="card" data-reveal>
          <div class="flex items-start gap-3"><span class="text-brown-700">${ico.notebook}</span>
            <p><b>Домашні завдання</b> після кожної теми дозволяють закріпити знання й навчитись працювати самостійно.</p>
          </div>
        </div>
        <div class="card" data-reveal>
          <div class="flex items-start gap-3"><span class="text-brown-700">${ico.chart}</span>
            <p><b>Симуляція НМТ щомісяця</b> — щоб бачити прогрес і звикнути до формату справжнього тесту.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ ВАРТІСТЬ (з Canva) ============ -->
    <section class="container-soft py-10">
      <div class="card" data-reveal>
        <h2 class="text-2xl md:text-3xl font-bold">Математика НМТ‑2026 — вартість</h2>
        <div class="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <div class="flex items-center gap-2 font-semibold text-lg">
              <span class="text-brown-700">${ico.wallet}</span>
              <span>500 грн/урок з учня. Оплата помісячно.</span>
            </div>
            <ul class="mt-3 grid gap-1">
              <li>• 12 уроків = <b>6000 грн</b> — учні 11 класу;</li>
              <li>• 8 уроків = <b>4000 грн</b> — учні 10 класу.</li>
            </ul>
          </div>
          <div>
            <div class="font-semibold mb-1">Що входить у вартість:</div>
            <ul class="grid gap-1">
              <li>• Доступ до всіх матеріалів (відео, конспект, довіднички, шпаргалки, лайфхаки, домашнє завдання);</li>
              <li>• Перевірка домашнього завдання;</li>
              <li>• Персональні рекомендації;</li>
              <li>• Звіти про прогрес.</li>
            </ul>
          </div>
        </div>
        <div class="mt-6 flex flex-wrap gap-3">
          <a class="btn no-underline" href="#/register">Зареєструватися</a>
          <a class="btn-outline no-underline" href="#/login">Я вже з вами</a>
        </div>
      </div>
    </section>

    <!-- ============ ФІНАЛЬНИЙ CTA (з Canva) ============ -->
    <section class="container-soft pb-12">
      <div class="card flex flex-col md:flex-row items-center justify-between gap-4" data-reveal>
        <div>
          <div class="text-2xl font-semibold">Готуйтеся до НМТ впевнено та без паніки!</div>
          <p class="muted">Ранній старт — ваш ключ до успіху. Для запису на курс — напишіть у <b>особисті повідомлення</b> або зареєструйтесь на сайті.</p>
        </div>
        <div class="flex gap-3">
          <a class="btn no-underline" href="#/register">Зареєструватися</a>
          <a class="btn-outline no-underline" href="#/support">Написати у підтримку</a>
        </div>
      </div>
    </section>
  </main>

  <!-- Невеличкий скрипт для плавної появи елементів -->
  <script>
    (function(){
      const els = document.querySelectorAll('[data-reveal]');
      els.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
      });
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            e.target.style.opacity = '1';
            e.target.style.transform = 'none';
            io.unobserve(e.target);
          }
        })
      }, {threshold: .12});
      els.forEach(el=>io.observe(el));
    })();
  </script>
  `;
}

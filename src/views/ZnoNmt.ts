import PublicHeader from "./_PublicHeader";

/* SVG іконки (inline) */
const ShieldIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2 4 5v6c0 5 3.8 9.4 8 11 4.2-1.6 8-6 8-11V5l-8-3z"/>
</svg>`;
const RocketIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700" viewBox="0 0 24 24" fill="currentColor">
  <path d="M14 3c3.9 0 7 3.1 7 7 0 4.2-2.6 8.6-7.7 13.1a1 1 0 0 1-1.3 0C6.9 18.6 4.3 14.2 4.3 10 4.3 6.1 7.4 3 11.3 3H14Zm-5.2 9.5-1.3 3.8 3.8-1.3L18 8.3A3 3 0 0 0 13.7 4l-4.9 8.5Z"/>
</svg>`;
const TargetIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm0-13a5 5 0 1 0 5 5 5 5 0 0 0-5-5Zm0 7a2 2 0 1 1 2-2 2.006 2.006 0 0 1-2 2Z"/>
</svg>`;
const PlayIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor">
  <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.2 12 4.2 12 4.2s-6.6 0-8.2.5A4 4 0 0 0 1 7.5V16.5a4 4 0 0 0 2.8 2.8c1.6.5 8.2.5 8.2.5s6.6 0 8.2-.5A4 4 0 0 0 23 16.5V7.5ZM10 15.5v-7l6 3.5-6 3.5Z"/>
</svg>`;
const LinkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor">
  <path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 1 0-7.07-7.07L10.9 5.93a1 1 0 1 0 1.41-1.41l1.23-1.23a3 3 0 0 1 4.24 4.24L15.66 9.3A3 3 0 0 1 11.4 5.06l-.7.7A1 1 0 0 0 12.1 7.2l.7-.7a5 5 0 0 0-2.83 6.5ZM4.81 20.6a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 1 0-7.07-7.07l-2.12 2.12a5 5 0 0 0 0 7.07Z"/>
</svg>`;

/* 49 тем із твого списку */
const TOPICS: string[] = [
  "Дії з дійсними числами","Цілі та раціональні вирази","Модуль. Арифметичний корінь","Властивості степенів",
  "Стандартний вигляд числа","Пропорції, задачі на пропорції","Кути, зовнішній кут, відрізки та коло",
  "Основні поняття. Трикутники","Прямокутний трикутник","Рівносторонній трикутник","Теорема синусів, косинусів",
  "Площі трикутників, вписані та описані кола","Лінійні та лінійні рівняння з параметром",
  "Квадратні рівняння, Теорема Вієта","Дробово-раціональні рівняння",
  "Бі квадратичні рівняння, рівняння, що розв'язуються заміною","Ірраціональні рівняння",
  "Найпростіші нерівності, метод інтервалів","Найпростіші нерівності, метод інтервалів","Системи нерівностей",
  "Тригонометричні рівняння","Показникові рівняння та нерівності","Системи рівнянь",
  "Логарифмічні вирази","Логарифмічні рівняння та нерівності","Паралелограм","Ромб","Прямокутник та квадрат",
  "Трапеції","Арифметична прогресія","Геометрична прогресія","Діаграми","Середнє значення",
  "Функції та їх властивості","Похідна","Первісна","Інтеграл","Координати у просторі","Вектори у просторі",
  "Ймовірність. Вибіркові характеристики","Комбінаторика","Аксіоми стереометрії","Прямокутний паралелепіпед, куб",
  "Призми","Піраміди","Циліндри","Піраміди","Конус","Куля та сфера"
];

export default function ZnoNmt() {
  const splitIndex = 25;

  // красиві рядки з круглим номером
  const renderRow = (text: string, idx: number) => `
    <li class="flex items-start gap-3">
      <span class="inline-grid place-items-center w-9 h-9 rounded-full text-white font-semibold
                   bg-gradient-to-br from-brown-700 to-brown-600 shadow-sm shrink-0">${idx}</span>
      <span class="leading-snug pt-1">${text}</span>
    </li>`;

  const col1 = TOPICS.slice(0, splitIndex).map((t, i) => renderRow(t, i + 1)).join("");
  const col2 = TOPICS.slice(splitIndex).map((t, i) => renderRow(t, splitIndex + i + 1)).join("");

  return `
  ${PublicHeader("#/zno-nmt")}

  <!-- HERO -->
  <section class="container-soft py-12 md:py-16">
    <div class="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
      <div class="reveal">
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
          НМТ / ЗНО з математики — <span class="text-brown-700">візьми план і дій</span>
        </h1>
        <p class="muted mt-4 text-lg">
          Чітка програма, регулярна практика у форматі НМТ, пояснення «людською мовою».
          Йдемо крок за кроком — від діагностики до імітацій тесту — щоб упевнено скласти іспит.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a href="#/register" class="btn no-underline">Приєднатися до підготовки</a>
          <a href="#/about-course" class="btn-outline no-underline">Про курс</a>
        </div>
      </div>

      <!-- Обіцянка результату -->
      <div class="card reveal-up">
        <div class="flex items-start gap-3">
          ${ShieldIcon}
          <div>
            <div class="hand text-3xl text-brown-700 flex items-center gap-2">
              ${RocketIcon} Мета: 180+ балів
            </div>
            <p class="muted mt-1">Маршрут «діагностика → теорія → практика → імітації НМТ → фініш».</p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 mt-5 text-center">
          <div class="rounded-2xl bg-beige-100 p-3">
            <div class="font-bold text-xl">1–2</div>
            <div class="text-xs muted">заняття/тиждень</div>
          </div>
          <div class="rounded-2xl bg-beige-100 p-3">
            <div class="font-bold text-xl">Щотижня</div>
            <div class="text-xs muted">домашка + фідбек</div>
          </div>
          <div class="rounded-2xl bg-beige-100 p-3">
            <div class="font-bold text-xl">Моки</div>
            <div class="text-xs muted">імітації НМТ</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- МАРШРУТ -->
  <section class="container-soft">
    <div class="card reveal">
      <div class="grid md:grid-cols-5 gap-6">
        <div><div class="hand text-3xl">1.</div><div class="font-semibold mt-1">Діагностика</div><p class="muted mt-1">Стартовий рівень + персональний план.</p></div>
        <div><div class="hand text-3xl">2.</div><div class="font-semibold mt-1">Теорія без «води»</div><p class="muted mt-1">Стислі конспекти й відео.</p></div>
        <div><div class="hand text-3xl">3.</div><div class="font-semibold mt-1">Практика НМТ</div><p class="muted mt-1">Завдання формату тесту, перевірка.</p></div>
        <div><div class="hand text-3xl">4.</div><div class="font-semibold mt-1">Імітації</div><p class="muted mt-1">Міні-тести з таймером і розбором.</p></div>
        <div><div class="hand text-3xl">5.</div><div class="font-semibold mt-1">Фініш</div><p class="muted mt-1">Повтор, лайфхаки, психологічна готовність.</p></div>
      </div>
    </div>
  </section>

  <!-- ВІДЕО-БЛОК -->
  <section class="container-soft py-10">
    <div class="card reveal-up flex items-start gap-3">
      ${TargetIcon}
      <div>
        <div class="font-semibold">Мікро-роз’яснення у відео</div>
        <p class="muted">Короткі пояснення складних місць і розбір типових помилок.</p>
        <a href="https://www.youtube.com/channel/UCRaauVG61w0903fTqtSWrcg" target="_blank" rel="noopener"
           class="btn-outline mt-3 inline-flex items-center gap-2 no-underline">${PlayIcon}<span> YouTube-канал</span></a>
      </div>
    </div>
  </section>

  <!-- ПОВНА ПРОГРАМА (1–49) з красивими номерами -->
  <section class="container-soft pb-10">
    <h2 class="text-2xl font-bold mb-4">Повна програма</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <ol class="space-y-2">
        ${col1}
      </ol>
      <ol class="space-y-2">
        ${col2}
      </ol>
    </div>

    <!-- Додаткові абзаци -->
    <div class="grid md:grid-cols-2 gap-6 mt-8">
      <div class="card reveal">
        <h3 class="font-semibold text-lg mb-1">Детальніше</h3>
        <p class="muted">Структура курсу. Різні можливості проходження. (Записати відео).</p>
      </div>
      <div class="card reveal-up">
        <h3 class="font-semibold text-lg mb-1">Цикл відеоуроків</h3>
        <p class="muted">
          Цикл з ___ відео-уроків, які містять основні питання з програми підготовки до ЗНО/НМТ,
          створені для того, щоб протягом короткого часу систематизувати знання з математики.
        </p>
      </div>
    </div>

    <!-- Для кого курс -->
    <div class="card mt-6 reveal">
      <h3 class="font-semibold text-lg mb-1">Для кого мій курс</h3>
      <p class="muted">
        Для учня, який самостійно готується до ЗНО, має середній рівень досягнень і хоче все швидко повторити.
        Тоді йому вистачить перегляду відео з повторенням теорії та розв'язування тематичних тестів.
      </p>
    </div>

    <!-- Як придбати матеріали -->
    <a href="https://www.matematichka.com.ua/pro-mene/yak-prydbaty-nashi-materialy"
       target="_blank" rel="noopener"
       class="card mt-6 reveal flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition no-underline">
      <span class="rounded-xl bg-beige-200 p-3 text-brown-700">${LinkIcon}</span>
      <div>
        <div class="font-semibold">Як придбати матеріали</div>
        <div class="muted text-sm">Перейдіть за посиланням — там інструкція з оплатою</div>
      </div>
      <span class="ml-auto text-sm muted">Відкрити</span>
    </a>
  </section>

  <!-- CTA -->
  <section class="container-soft pb-12">
    <div class="card flex flex-col md:flex-row items-center justify-between gap-4 reveal-up">
      <div>
        <div class="hand text-3xl text-brown-700">Готові рухатися до 180+?</div>
        <p class="muted">Зареєструйтесь — доступ до розкладу та матеріалів у кабінеті.</p>
      </div>
      <div class="flex gap-3">
        <a href="#/register" class="btn no-underline">Зареєструватися</a>
        <a href="#/login" class="btn-outline no-underline">Увійти</a>
      </div>
    </div>
  </section>
  `;
}

type Course = { id: string; title: string; desc: string; price: number };

const MOCK: Course[] = [
  { id: "math-std", title: "НМТ Математика (Стандарт)", desc: "Повний курс підготовки", price: 2500 },
  { id: "math-pro", title: "НМТ Математика (PRO)", desc: "Додаткові тренажери + консультації", price: 3900 },
];

export default function Courses() {
  const items = MOCK.map(c => `
    <div class="card">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-xl font-semibold">${c.title}</h3>
          <p class="mt-1 opacity-80">${c.desc}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold">${c.price} грн</div>
          <button class="btn mt-3" data-buy="${c.id}">Придбати</button>
        </div>
      </div>
    </div>
  `).join("");

  return `
    <div class="container py-8 grid gap-4">
      <h1 class="text-3xl font-bold mb-2">Курси</h1>
      ${items}
    </div>
  `;
}

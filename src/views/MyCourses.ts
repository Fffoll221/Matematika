type Material = { title:string; type:"video"|"pdf"; url:string };
const MATERIALS: Record<string, Material[]> = {
  "math-std": [
    { title:"Модуль 1: Алгебра (відео)", type:"video", url:"https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title:"Конспект 1 (PDF)", type:"pdf", url:"/sample.pdf" },
  ],
  "math-pro": [
    { title:"Модуль PRO: Геометрія (відео)", type:"video", url:"https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title:"Збірка задач (PDF)", type:"pdf", url:"/sample.pdf" },
  ],
};

export default function MyCourses() {
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]") as Array<{id:string; status:string}>;
  const approved = purchases.filter(p => p.status === "approved");

  if (!approved.length) {
    return `
    <div class="container-soft py-8">
      <div class="card">
        <div class="font-semibold mb-2">Доступів ще немає</div>
        <p class="muted">Придбайте курс і завантажте чек — після підтвердження тут з’являться матеріали.</p>
        <a class="btn mt-4 inline-block" href="#/app/courses">До курсів</a>
      </div>
    </div>`;
  }

  const blocks = approved.map(p => {
    const mats = MATERIALS[p.id] ?? [];
    return `
      <div class="card">
        <h3 class="text-xl font-semibold mb-3">${p.id}</h3>
        <div class="grid gap-4">
          ${mats.map(m => m.type === "video"
            ? `<div class="rounded-2xl overflow-hidden bg-black aspect-video"><iframe class="w-full h-full" src="${m.url}" allowfullscreen></iframe></div>`
            : `<a class="btn-outline rounded-xl px-5 py-3 inline-block" href="${m.url}" target="_blank">${m.title}</a>`
          ).join("")}
        </div>
      </div>`;
  }).join("");

  return `<div class="container-soft grid gap-6"><h1 class="text-2xl font-bold">Мої курси</h1>${blocks}</div>`;
}

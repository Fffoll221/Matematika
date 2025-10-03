import PublicHeader from "./_PublicHeader";

type Tip = { title: string; id: string; tag: string };

const TIPS: Tip[] = [
  { title: "Властивості серединних перпендикулярів", id: "qAc8hPjRNUk", tag: "Геометрія" },
  { title: "Властивості висот трикутника",            id: "h9S9ieRiA2w", tag: "Геометрія" },
  { title: "Властивості медіан і бісектрис трикутника",id: "b6GCExpjDqg", tag: "Геометрія" },
  { title: "Кут 30° у прямокутному трикутнику",        id: "XnzzZDcahro", tag: "Геометрія" },
  { title: "Піфагорові трійки",                         id: "MD67alODZuM", tag: "Геометрія" },
  { title: "Рівнобедрений прямокутний трикутник",       id: "kOnOwm4bVBM", tag: "Геометрія" },
  { title: "Що робить медіана",                         id: "sMwvfIlZy04", tag: "Геометрія" },
  { title: "Формули у рівносторонньому трикутнику",     id: "v5qa8MU2u1U", tag: "Геометрія" },
  { title: "Властивості середньої лінії",               id: "OjkrMmb9T8k", tag: "Геометрія" },
];

const PlayIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor">
  <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.2 12 4.2 12 4.2s-6.6 0-8.2.5A4 4 0 0 0 1 7.5V16.5a4 4 0 0 0 2.8 2.8c1.6.5 8.2.5 8.2.5s6.6 0 8.2-.5A4 4 0 0 0 23 16.5V7.5ZM10 15.5v-7l6 3.5-6 3.5Z"/>
</svg>`;
const WandIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-brown-700" viewBox="0 0 24 24" fill="currentColor">
  <path d="M8.1 13.5 3 18.6l2.4 2.4 5.1-5.1-2.4-2.4Zm2.8-1.4 1.4-1.4 8.5 8.5-1.4 1.4-8.5-8.5ZM17 2l.7 2.3L20 5l-2.3.7L17 8l-.7-2.3L14 5l2.3-.7L17 2Zm-8 2 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z"/>
</svg>`;

export default function Lifehacks() {
  const items = TIPS.map((t, i) => {
    const yt = `https://www.youtube.com/watch?v=${t.id}`;
    const thumb = `https://img.youtube.com/vi/${t.id}/hqdefault.jpg`;
    const embed = `https://www.youtube.com/embed/${t.id}`;

    return `
      <div class="card hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition reveal-up ${i%3===1?"delay-1":i%3===2?"delay-2":""}">
        <div class="flex items-start gap-3">
          ${WandIcon}
          <div>
            <div class="text-xs px-2 py-1 rounded-full bg-beige-200 inline-block mb-1">${t.tag}</div>
            <h3 class="font-semibold text-lg leading-snug">${t.title}</h3>
          </div>
        </div>

        <div class="mt-4 overflow-hidden rounded-2xl border border-beige-200">
          <!-- прев’ю з кнопкою відтворення -->
          <a href="${yt}" target="_blank" rel="noopener"
             class="relative block group">
            <img src="${thumb}" alt="${t.title}" class="w-full h-48 object-cover group-hover:scale-[1.02] transition" loading="lazy" />
            <span class="absolute inset-0 grid place-items-center">
              <span class="rounded-full bg-white/90 p-4 shadow group-hover:scale-105 transition">
                ${PlayIcon}
              </span>
            </span>
          </a>
        </div>

        <details class="mt-3">
          <summary class="cursor-pointer text-sm text-brown-700/90">Переглянути вбудовано</summary>
          <div class="mt-3 rounded-2xl overflow-hidden aspect-video">
            <iframe class="w-full h-full" src="${embed}" title="${t.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
        </details>
      </div>`;
  }).join("");

  return `
    ${PublicHeader("#/lifehacks")}

    <section class="container-soft py-10">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h1 class="text-4xl font-bold">Лайфхаки</h1>
          <p class="muted mt-1">Короткі відео з геометрії: властивості, формули, трюки до НМТ.</p>
        </div>
        <a href="https://www.youtube.com/channel/UCRaauVG61w0903fTqtSWrcg" target="_blank" rel="noopener"
           class="btn-outline no-underline hidden md:inline-flex">${PlayIcon}<span class="ml-2">YouTube канал</span></a>
      </div>

      <!-- решітка плиток -->
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        ${items}
      </div>

    </section>
  `;
}

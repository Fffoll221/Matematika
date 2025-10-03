// src/views/AppShell.ts
import PublicHeader from "./_PublicHeader";

export default function AppShell() {
  return `
  ${PublicHeader("#/app/courses")}
  <main class="container-soft py-8 md:py-12">
    <div class="grid md:grid-cols-[260px_1fr] gap-6">
      <aside class="card p-0 overflow-hidden h-max">
        <div class="p-4 text-xl font-extrabold">Мій кабінет</div>
        <nav id="dashNav" class="grid">
          <a class="dashTab bg-brown-700/10 text-left px-5 py-3" data-tab="/app/courses" href="#/app/courses">
            <span class="inline-flex items-center gap-2 text-base font-semibold">Курси</span>
          </a>
          <a class="dashTab text-left px-5 py-3" data-tab="/app/my" href="#/app/my">
            <span class="inline-flex items-center gap-2 text-base">Мої курси</span>
          </a>
          <a class="dashTab text-left px-5 py-3" data-tab="/app/support" href="#/app/support">
            <span class="inline-flex items-center gap-2 text-base">Підтримка</span>
          </a>
          <a class="dashTab text-left px-5 py-3" data-tab="/app/profile" href="#/app/profile">
            <span class="inline-flex items-center gap-2 text-base">Профіль</span>
          </a>
        </nav>
      </aside>
      <section id="dashContent" class="grid gap-6"></section>
    </div>
  </main>
  `;
}

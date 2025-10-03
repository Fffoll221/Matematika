// src/views/Dashboard.ts
import PublicHeader from "./_PublicHeader";

export default function Dashboard() {
  return `
    ${PublicHeader("#/app")}
    <main class="container-soft py-8 md:py-12">
      <div class="grid md:grid-cols-[260px_1fr] gap-6">

        <!-- Sidebar -->
        <aside class="card p-0 overflow-hidden h-max">
          <div class="p-4 text-xl font-extrabold">Мій кабінет</div>
          <nav class="grid" id="cabTabs">
            <a href="#/app?tab=courses"  class="tab-link px-5 py-3 text-left is-active" data-tab="courses">Курси</a>
            <a href="#/app?tab=my"       class="tab-link px-5 py-3 text-left"         data-tab="my">Мої курси</a>
            <a href="#/app?tab=support"  class="tab-link px-5 py-3 text-left"         data-tab="support">Підтримка</a>
            <a href="#/app?tab=profile"  class="tab-link px-5 py-3 text-left"         data-tab="profile">Профіль</a>
          </nav>
        </aside>

        <!-- Content -->
        <section id="dashContent" class="grid gap-6">
          <!-- наповнюється з main.ts залежно від активної вкладки -->
        </section>

      </div>
    </main>
  `;
}

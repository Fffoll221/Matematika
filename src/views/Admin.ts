// src/views/Admin.ts
import Header from "./_PublicHeader";

export default function Admin() {
  return `
    ${Header("#/admin")}
    <section class="container-soft py-10">
      <h1 class="h1 mb-6">Адмін-панель</h1>

      <!-- Таби -->
      <nav id="admTabs" class="flex flex-wrap gap-3 mb-6">
        <button class="btn-outline" data-adm-tab="chats">Чати</button>
        <button class="btn-outline is-active" data-adm-tab="courses">Курси</button>
        <button class="btn-outline" data-adm-tab="requests">Заявки</button>
        <button class="btn-outline" data-adm-tab="access">Доступи</button>
      </nav>

      <!-- ========== ЧАТИ ========== -->
      <!-- лише hidden на секції; всередині — контейнер з grid -->
      <section id="admChats" class="hidden">
        <div class="grid gap-4">
          <article class="card" data-reveal>
            <h2 class="text-xl font-semibold mb-4">Чати користувачів</h2>
            <div id="chatUsers" class="border rounded-xl overflow-hidden"></div>
          </article>

          <article class="card grid gap-4" data-reveal>
            <h2 id="adminChatHeader" class="text-xl font-semibold">Чат з: —</h2>
            <div id="adminChatBox" class="h-[48vh] overflow-auto space-y-2 p-2 bg-beige-50 rounded-xl border"></div>
            <form id="adminChatForm" class="grid grid-cols-[1fr_auto] gap-2">
              <input id="adminChatInput" class="input" placeholder="Повідомлення для користувача…" />
              <button class="btn" type="submit">Надіслати</button>
            </form>
          </article>
        </div>
      </section>

      <!-- ========== КУРСИ (CRUD) ========== -->
      <!-- активна секція — без hidden, з grid прямо на контейнері -->
      <section id="admCourses">
        <div class="grid gap-4">
          <article class="card grid gap-4" data-reveal>
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-xl font-semibold">Курси (редагування)</h2>
              <button class="btn" id="addCourseBtn">Додати курс</button>
            </div>

            <!-- список курсів (динамічно) -->
            <div id="courseList" class="grid gap-4"></div>

            <div class="muted text-sm">
              Тут можна змінювати <b>назву</b>, <b>опис</b> та <b>ціну</b> курсу.
              Кнопка <i>Зберегти</i> оновлює дані в каталозі, <i>Видалити</i> — прибирає курс і доступи до нього.
            </div>
          </article>
        </div>
      </section>

      <!-- ========== ЗАЯВКИ ========== -->
      <section id="admRequests" class="hidden">
        <div class="grid gap-4">
          <article class="card grid gap-4" data-reveal>
            <h2 class="text-xl font-semibold">Заявки на доступ</h2>
            <div id="reqList" class="grid gap-3"></div>
            <div class="muted text-sm">
              Статуси: <b>pending</b> — очікує, <b>approved</b> — підтверджено, <b>rejected</b> — відхилено.
            </div>
          </article>
        </div>
      </section>

      <!-- ========== ДОСТУПИ ========== -->
      <section id="admAccess" class="hidden">
        <div class="grid gap-4">
          <article class="card grid gap-4" data-reveal>
            <h2 class="text-xl font-semibold">Доступи користувачів</h2>

            <label class="grid gap-2">
              <span class="muted text-sm">Користувач</span>
              <select id="userSelect" class="input"></select>
            </label>

            <div class="grid gap-2">
              <div class="muted text-sm">Курси для користувача</div>
              <div id="accessList" class="grid gap-2"></div>
            </div>

            <div class="flex gap-2">
              <button id="saveAccessBtn" class="btn">Зберегти доступи</button>
            </div>
          </article>
        </div>
      </section>
    </section>
  `;
}

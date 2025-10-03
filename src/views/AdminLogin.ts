// src/views/AdminLogin.ts
export default function AdminLogin() {
  return /* html */ `
    <header class="container-soft py-6">
      <a href="#/" class="muted hover:underline">← На головну</a>
    </header>

    <section class="container-narrow py-10">
      <article class="card max-w-md mx-auto grid gap-6">
        <h1 class="text-2xl font-extrabold">Адмін-панель • Вхід</h1>

        <form id="adminLoginForm" class="grid gap-4">
          <div>
            <div class="muted text-sm mb-1">Email</div>
            <input name="email" type="email" class="input" placeholder="admin@site.com" required />
          </div>
          <div>
            <div class="muted text-sm mb-1">Пароль</div>
            <input name="password" type="password" class="input" placeholder="••••••••" required />
          </div>

          <button type="submit" class="btn w-full">Увійти як адмін</button>
        </form>

        <div class="muted text-sm">
          Порада: за замовчуванням доступні облікові дані
          <code>admin@nmt.school</code> / <code>admin123</code>.
          Ви зможете змінити їх пізніше.
        </div>
      </article>
    </section>
  `;
}

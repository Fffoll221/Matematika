// src/views/Login.ts
import PublicHeader from "./_PublicHeader";

const ico = {
  back: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5"><path fill="currentColor" d="M14.7 6.3a1 1 0 0 1 0 1.4L10.41 12l4.3 4.3a1 1 0 1 1-1.42 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.42 0Z"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5"><path fill="currentColor" d="M12 5c5.52 0 9.27 4.42 9.94 5.28a1 1 0 0 1 0 1.44C21.27 12.58 17.52 17 12 17S2.73 12.58 2.06 11.72a1 1 0 0 1 0-1.44C2.73 9.42 6.48 5 12 5Zm0 2C7.83 7 4.64 9.94 3.5 11c1.14 1.06 4.33 4 8.5 4s7.36-2.94 8.5-4C19.86 9.94 16.17 7 12 7Zm0 1.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5Z"/></svg>`,
  eyeOff:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5"><path fill="currentColor" d="M3.28 2.22a.75.75 0 1 0-1.06 1.06l3 3C3.3 7.75 1.9 9.24 1.56 9.72a1 1 0 0 0 0 1.28C2.23 12.86 6.48 17 12 17c2.06 0 3.9-.55 5.44-1.38l3.28 3.28a.75.75 0 0 0 1.06-1.06l-18.5-18.5Z"/></svg>`,
};

export default function Login() {
  return `
  ${PublicHeader("#/login")}

  <main class="container-soft py-10 md:py-14">
    <div class="max-w-md mx-auto">



      <div class="card p-6 md:p-8">
        <h1 class="text-3xl font-extrabold mb-6">Вхід</h1>

        <form id="loginForm" class="grid gap-5 md:gap-6" novalidate>
          <!-- Email -->
          <label class="block">
            <span class="muted text-sm">Email</span>
            <input name="email" type="email" required autocomplete="email"
              class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white placeholder:text-brown-700/40 focus:ring-2 focus:ring-brown-700/25 focus:outline-none transition-shadow"
              placeholder="you@example.com" />
          </label>

          <!-- Пароль -->
          <div class="block">
            <span class="muted text-sm">Пароль</span>
            <div class="relative mt-1">
              <input id="pwd" name="password" type="password" required minlength="6"
                class="input pr-10 px-4 py-3.5 bg-amber-50/40 focus:bg-white placeholder:text-brown-700/40 focus:ring-2 focus:ring-brown-700/25 focus:outline-none transition-shadow"
                placeholder="••••••••" />
              <button id="togglePwd" type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-brown-700/70 hover:text-brown-700 focus:ring-2 focus:ring-brown-700/25"
                aria-label="Показати пароль" aria-pressed="false" data-visible="false">${ico.eye}</button>
            </div>
          </div>

          <button class="btn w-full" type="submit">Увійти</button>

          <div class="text-center text-sm">
            Ще немає акаунта?
            <a class="underline text-brown-700" href="#/register">Зареєструватися</a>
          </div>
        </form>
      </div>
    </div>
  </main>

  <script>
    // --- Назад (розумний бек) ---
    function smartBack(fallback = '#/') {
      const ref = document.referrer;
      const sameOrigin = ref && new URL(ref, location.href).origin === location.origin;
      if (sameOrigin && history.length > 1) history.back();
      else location.hash = fallback;
    }
    document.getElementById('backBtn')?.addEventListener('click', (e) => {
      e.preventDefault(); smartBack('#/');
    });

    // --- Показ/приховати пароль (стабільно) ---
    (function () {
      const btn = document.getElementById('togglePwd');
      const input = document.getElementById('pwd');
      if (!btn || !input) return;
      btn.addEventListener('mousedown', e => e.preventDefault()); // не забирати фокус

      btn.addEventListener('click', () => {
        const vis = btn.getAttribute('data-visible') === 'true';
        const next = !vis;
        input.type = next ? 'text' : 'password';
        btn.setAttribute('data-visible', String(next));
        btn.setAttribute('aria-pressed', String(next));
        btn.innerHTML = next ? ${JSON.stringify(ico.eyeOff)} : ${JSON.stringify(ico.eye)};
        input.focus({ preventScroll: true });
        const v = input.value; input.value = ''; input.value = v; // курсор у кінці
      });
    })();

    // Мʼяка підсвітка required полів
    (function () {
      const form = document.getElementById('loginForm');
      form?.querySelectorAll('input[required]').forEach((el) => {
        const refresh = () => {
          const empty = !el.value.trim();
          el.classList.toggle('ring-2', empty);
          el.classList.toggle('ring-amber-300', empty);
          el.classList.toggle('bg-amber-50/60', empty);
        };
        refresh();
        el.addEventListener('input', refresh);
        el.addEventListener('blur', () => {
          if (!el.checkValidity()) {
            el.classList.add('ring-2','ring-red-300','bg-red-50/30');
          } else {
            el.classList.remove('ring-2','ring-red-300','bg-red-50/30');
          }
        });
      });

      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        // тут буде ваш реальний логін; поки просто редірект:
        location.hash = '#/dashboard';
      });
    })();
  </script>
  `;
}

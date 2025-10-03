// src/views/Register.ts
import PublicHeader from "./_PublicHeader";

const ico = {
  back: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5"><path fill="currentColor" d="M14.7 6.3a1 1 0 0 1 0 1.4L10.41 12l4.3 4.3a1 1 0 1 1-1.42 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.42 0Z"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5"><path fill="currentColor" d="M12 5c5.52 0 9.27 4.42 9.94 5.28a1 1 0 0 1 0 1.44C21.27 12.58 17.52 17 12 17S2.73 12.58 2.06 11.72a1 1 0 0 1 0-1.44C2.73 9.42 6.48 5 12 5Zm0 2C7.83 7 4.64 9.94 3.5 11c1.14 1.06 4.33 4 8.5 4s7.36-2.94 8.5-4C19.86 9.94 16.17 7 12 7Zm0 1.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5Z"/></svg>`,
  eyeOff: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5"><path fill="currentColor" d="M3.28 2.22a.75.75 0 1 0-1.06 1.06l3 3C3.3 7.75 1.9 9.24 1.56 9.72a1 1 0 0 0 0 1.28C2.23 12.86 6.48 17 12 17c2.06 0 3.9-.55 5.44-1.38l3.28 3.28a.75.75 0 0 0 1.06-1.06l-18.5-18.5ZM12 15.5c-4.17 0-7.36-2.94-8.5-4 .52-.48 1.81-1.6 3.53-2.54l2.08 2.08A3.5 3.5 0 0 0 12 15.5Zm9.94-4.22a1 1 0 0 0 0-1.28C21.27 8.14 17.02 4 11.5 4c-1.02 0-2 .12-2.93.34l1.73 1.73c.39-.05.8-.07 1.2-.07 4.17 0 7.36 2.94 8.5 4-.35.33-1.03.94-1.98 1.66l1.13 1.13c1.3-.9 2.2-1.86 2.29-1.99Z"/></svg>`,
};

export default function Register() {
  return `
  ${PublicHeader("#/register")}

  <main class="container-soft py-10 md:py-14">
    <div class="max-w-xl mx-auto">


      <div class="card p-6 md:p-8">
        <h1 class="text-3xl font-extrabold mb-6">Реєстрація</h1>

        <form id="regForm" class="grid gap-5 md:gap-6" novalidate>
          <!-- Прізвище -->
          <label class="block">
            <span class="muted text-sm">Прізвище</span>
            <input name="lastName" required autocomplete="family-name"
              class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white placeholder:text-brown-700/40 focus:ring-2 focus:ring-brown-700/25 focus:outline-none transition-shadow"
              placeholder="Шевченко" />
          </label>

          <!-- Ім'я -->
          <label class="block">
            <span class="muted text-sm">Ім'я</span>
            <input name="firstName" required autocomplete="given-name"
              class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white placeholder:text-brown-700/40 focus:ring-2 focus:ring-brown-700/25 focus:outline-none transition-shadow"
              placeholder="Тарас" />
          </label>

          <!-- По батькові -->
          <label class="block">
            <span class="muted text-sm">По батькові</span>
            <input name="middleName"
              class="input mt-1 px-4 py-3.5 bg-amber-50/30 focus:bg-white placeholder:text-brown-700/40 focus:ring-2 focus:ring-brown-700/25 focus:outline-none transition-shadow"
              placeholder="Григорович" />
          </label>

          <!-- Телефон -->
          <label class="block">
            <span class="muted text-sm">Телефон</span>
            <input name="phone" required inputmode="tel" autocomplete="tel"
              pattern="\\+?\\d[\\d\\s\\-\\(\\)]{8,}"
              class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white placeholder:text-brown-700/40 focus:ring-2 focus:ring-brown-700/25 focus:outline-none transition-shadow"
              placeholder="+38 (0xx) xxx-xx-xx" />
            <small class="muted">У форматі: +38 (0xx) xxx-xx-xx</small>
          </label>

          <!-- Email -->
          <label class="block">
            <span class="muted text-sm">Email</span>
            <input name="email" type="email" required autocomplete="email"
              class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white placeholder:text-brown-700/40 focus:ring-2 focus:ring-brown-700/25 focus:outline-none transition-shadow"
              placeholder="you@example.com" />
          </label>

          <!-- Дата народження -->
          <label class="block">
            <span class="muted text-sm">Дата народження</span>
            <input name="birth" type="date" required
              class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white focus:ring-2 focus:ring-brown-700/25 focus:outline-none transition-shadow" />
          </label>

          <!-- Пароль + показ/приховати -->
          <div class="block">
            <span class="muted text-sm">Пароль</span>
            <div class="relative mt-1">
              <input id="pwd" name="password" required minlength="6" maxlength="64"
                class="input pr-10 px-4 py-3.5 bg-amber-50/40 focus:bg-white placeholder:text-brown-700/40 focus:ring-2 focus:ring-brown-700/25 focus:outline-none transition-shadow"
                type="password" placeholder="••••••••" />
              <button id="togglePwd" type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-brown-700/70 hover:text-brown-700 focus:ring-2 focus:ring-brown-700/25"
                aria-label="Показати пароль" aria-pressed="false" data-visible="false">${ico.eye}</button>
            </div>
            <small class="muted">Мінімум 6 символів. Рекомендація: літера + цифра.</small>
          </div>

          <!-- Згода -->
          <label class="flex items-start gap-3 mt-1">
            <input type="checkbox" class="mt-1 accent-brown-700" required />
            <span class="muted">Погоджуюся з <a href="#/privacy" class="underline">політикою приватності</a>.</span>
          </label>

          <!-- Повідомлення -->
          <div id="formMsg" class="hidden rounded-xl p-3 text-sm"></div>

          <div class="pt-1">
            <button class="btn w-full" type="submit">Зареєструватися</button>
          </div>
        </form>
      </div>
    </div>
  </main>

  <script>
    // ← Назад
    document.getElementById('backBtn')?.addEventListener('click', () => {
      if (history.length > 1) history.back(); else location.hash = '#/';
    });

    // Показ/приховати пароль — стабільно
    (function () {
      const btn = document.getElementById('togglePwd');
      const input = document.getElementById('pwd');
      if (!btn || !input) return;
      btn.addEventListener('mousedown', e => e.preventDefault()); // не забирати фокус з інпуту

      btn.addEventListener('click', () => {
        const visible = btn.getAttribute('data-visible') === 'true';
        const next = !visible;
        input.setAttribute('type', next ? 'text' : 'password');
        btn.setAttribute('data-visible', String(next));
        btn.setAttribute('aria-pressed', String(next));
        btn.innerHTML = next ? ${JSON.stringify(ico.eyeOff)} : ${JSON.stringify(ico.eye)};
        input.focus({ preventScroll: true });
        // встановити курсор у кінець
        const val = input.value; input.value = ''; input.value = val;
      });
    })();

    // М'яка підсвітка порожніх/невалідних полів
    (function () {
      const form = document.getElementById('regForm');
      const msg = document.getElementById('formMsg');

      function showMsg(text, ok) {
        msg.textContent = text;
        msg.classList.remove('hidden');
        msg.classList.toggle('bg-green-50', !!ok);
        msg.classList.toggle('text-green-700', !!ok);
        msg.classList.toggle('bg-red-50', !ok);
        msg.classList.toggle('text-red-700', !ok);
        msg.classList.add('border', 'border-brown-700/15');
      }

      // підсвічувати пусті required поля
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
        const data = new FormData(form);
        const required = ['lastName','firstName','phone','email','birth','password'];
        for (const k of required) {
          const v = (data.get(k) || '').toString().trim();
          if (!v) { showMsg('Будь ласка, заповніть усі обовʼязкові поля.', false); return; }
        }
        const email = (data.get('email')+'').toLowerCase();
        if (!/^\\S+@\\S+\\.\\S+$/.test(email)) { showMsg('Невірний формат email.', false); return; }

        showMsg('Надсилаємо дані…', true);
        setTimeout(() => showMsg('Готово! Обліковий запис створено (демо). Перевірте пошту.', true), 600);
      });
    })();
  </script>
  `;
}

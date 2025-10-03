// src/views/AppProfile.ts
import { getProfile } from "../app/storage";

export default function AppProfile() {
  const p = getProfile();
  const v = (x?: string) => (x ?? "").replace(/"/g, "&quot;");

  return `
    <form id="profileForm" class="card grid gap-4" data-reveal>
      <div class="text-lg font-semibold">Профіль</div>
      <div class="grid sm:grid-cols-2 gap-4">
        <label class="block">
          <span class="muted text-sm">Прізвище</span>
          <input name="lastName" value="${v(p.lastName)}" class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white focus:ring-2 focus:ring-brown-700/25" />
        </label>
        <label class="block">
          <span class="muted text-sm">Ім’я</span>
          <input name="firstName" value="${v(p.firstName)}" class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white focus:ring-2 focus:ring-brown-700/25" />
        </label>
        <label class="block">
          <span class="muted text-sm">Телефон</span>
          <input name="phone" value="${v(p.phone)}" class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white focus:ring-2 focus:ring-brown-700/25" />
        </label>
        <label class="block">
          <span class="muted text-sm">Email</span>
          <input type="email" name="email" value="${v(p.email)}" class="input mt-1 px-4 py-3.5 bg-amber-50/40 focus:bg-white focus:ring-2 focus:ring-brown-700/25" />
        </label>
      </div>
      <div class="flex gap-2">
        <button class="btn" type="submit">Зберегти</button>
        <button class="btn-outline" type="button" id="logoutBtn">Вийти</button>
      </div>
      <div id="pMsg" class="hidden rounded-xl p-2 text-sm"></div>
    </form>
  `;
}

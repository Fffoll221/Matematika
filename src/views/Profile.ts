export default function Profile() {
  const id = localStorage.getItem("pending_user_id") ?? "U-XXXXXX";
  const data = JSON.parse(localStorage.getItem("profile") || "{}");
  return `
  <div class="container-soft py-8 max-w-2xl">
    <h1 class="text-2xl font-bold mb-4">Профіль</h1>
    <div class="card">
      <form id="profileForm" class="grid md:grid-cols-2 gap-4">
        <input class="border rounded-xl px-4 py-3" name="lastName"  placeholder="Прізвище" value="${data.lastName ?? ""}" />
        <input class="border rounded-xl px-4 py-3" name="firstName" placeholder="Ім'я" value="${data.firstName ?? ""}" />
        <input class="border rounded-xl px-4 py-3" name="middleName" placeholder="По батькові" value="${data.middleName ?? ""}" />
        <input class="border rounded-xl px-4 py-3" name="phone" placeholder="Телефон" value="${data.phone ?? ""}" />
        <input class="border rounded-xl px-4 py-3 md:col-span-2" name="email" placeholder="Email" value="${data.email ?? ""}" />
        <div class="md:col-span-2 muted">Ваш ID: <b>${id}</b></div>
        <button class="btn md:col-span-2" type="submit">Зберегти</button>
      </form>
    </div>
  </div>`;
}

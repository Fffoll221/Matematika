export default function Overview() {
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]") as Array<{id:string; status:string}>;
  const approved = purchases.filter(p => p.status === "approved").length;
  const pending  = purchases.filter(p => p.status === "pending").length;

  return `
  <div class="container-soft grid gap-6">
    <h1 class="text-2xl font-bold">Огляд</h1>

    <div class="grid md:grid-cols-3 gap-6">
      <div class="card"><div class="text-sm muted">Курси з доступом</div><div class="text-3xl font-bold mt-1">${approved}</div></div>
      <div class="card"><div class="text-sm muted">Чеки в обробці</div><div class="text-3xl font-bold mt-1">${pending}</div></div>
      <div class="card"><div class="text-sm muted">ID користувача</div><div class="text-xl font-semibold mt-1">${localStorage.getItem("pending_user_id") ?? "буде після реєстрації"}</div></div>
    </div>

    <div class="card">
      <div class="font-semibold mb-1">Швидкі дії</div>
      <div class="flex flex-wrap gap-3 mt-2">
        <a class="btn" href="#/app/courses">Придбати курс</a>
        <a class="btn-outline rounded-xl px-5 py-3" href="#/app/support">Написати у підтримку</a>
      </div>
    </div>
  </div>`;
}

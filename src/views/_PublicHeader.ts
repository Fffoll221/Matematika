const nav = [
  { href: "#/",              label: "ГОЛОВНА" },
  { href: "#/zno-nmt",       label: "ЗНО та НМТ" },
  
  { href: "#/lifehacks",     label: "ЛАЙФХАКИ" },
  
  { href: "#/about-course",  label: "ПРО КУРС" },
  { href: "#/links",         label: "КОРИСНІ ПОСИЛАННЯ" },
  { href: "#/about-me",      label: "ПРО МЕНЕ" },
];

export default function PublicHeader(activeHref: string) {
  const items = nav.map(i => `
    <a class="px-3 py-2 rounded-xl hover:bg-beige-200 ${i.href===activeHref ? "bg-beige-200" : ""}" href="${i.href}">${i.label}</a>
  `).join("");

  return `
  <header class="border-b bg-beige-100/80 backdrop-blur">
    <div class="container-soft py-3 flex items-center justify-between">
      <a href="#/" class="font-extrabold text-xl">НМТ<br/>Математика</a>

      <!-- desktop -->
      <nav class="hidden md:flex items-center gap-1">${items}</nav>

      <div class="hidden md:flex gap-3">
        <a class="btn-outline" href="#/login">Увійти</a>
        <a class="btn" href="#/register">Зареєструватися</a>
      </div>

      <!-- burger -->
      <button id="burger" class="md:hidden p-2 rounded-xl border border-brown-700/30 bg-white">
        <span class="burger-line burger-line-1"></span>
        <span class="burger-line burger-line-2"></span>
        <span class="burger-line burger-line-3"></span>
      </button>
    </div>

    <!-- mobile -->
    <div id="mobileMenu" class="mobile-menu" data-open="false">
      <nav class="grid">${items}</nav>
      <div class="grid grid-cols-2 gap-2 pt-2">
        <a class="btn-outline text-center" href="#/login">Увійти</a>
        <a class="btn text-center" href="#/register">Зареєструватися</a>
      </div>
    </div>
  </header>`;
}

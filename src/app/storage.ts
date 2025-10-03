// src/app/storage.ts
export type CatalogItem = { id: string; title: string; price: number; desc: string };
export type MyCourse = { id: string; title: string; access: "pending" | "active" };
export type Profile = { lastName?: string; firstName?: string; phone?: string; email?: string };

export const S = {
  get<T>(k: string, d: T): T {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }
    catch { return d; }
  },
  set(k: string, v: any) { localStorage.setItem(k, JSON.stringify(v)); },
};

const DEFAULT_CATALOG: CatalogItem[] = [
  { id: "nmt11",   title: "НМТ-2026 (11 клас)",           price: 3600, desc: "12 уроків/міс. Групові заняття + матеріали + тести." },
  { id: "base10",  title: "База математики (10 клас)",    price: 2400, desc: "8 уроків/міс. Повтор базових тем + практика." },
  { id: "intense", title: "Інтенсив з функцій",           price: 1200, desc: "4 заняття. Графіки, похідна, застосування." },
];

// один раз ініціалізуємо каталог
if (!localStorage.getItem("catalog")) {
  S.set("catalog", DEFAULT_CATALOG);
}

// корисні геттери
export function getCatalog(): CatalogItem[]     { return S.get<CatalogItem[]>("catalog", []); }
export function getMy(): MyCourse[]             { return S.get<MyCourse[]>("myCourses", []); }
export function setMy(v: MyCourse[])            { S.set("myCourses", v); }
export function getProfile(): Profile           { return S.get<Profile>("profile", {}); }
export function setProfile(p: Profile)          { S.set("profile", p); }

// src/auth.ts

export type NewUser = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type User = {
  id: string;                 // унікальний ID користувача
  email: string;
  password: string;           // ⚠️ демо (у проді — хеш)
  role: "user" | "admin";
  createdAt: number;
  firstName?: string;
  lastName?: string;
};

type AdminAccount = { email: string; password: string };

const USERS_KEY  = "users";          // реєстр користувачів у localStorage
const TOKEN_KEY  = "auth_token";     // активна сесія (uid або "admin:*")
const ROLE_KEY   = "role";           // роль активного користувача
const ADMINS_KEY = "admin_accounts"; // список адмінів

/* ---------- helpers ---------- */
function loadUsers(): User[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
  catch { return []; }
}
function saveUsers(list: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}
function loadAdmins(): AdminAccount[] {
  try { return JSON.parse(localStorage.getItem(ADMINS_KEY) || "[]"); }
  catch { return []; }
}
function saveAdmins(list: AdminAccount[]) {
  localStorage.setItem(ADMINS_KEY, JSON.stringify(list));
}

// Створимо дефолтного адміна, якщо ще не було
if (!localStorage.getItem(ADMINS_KEY)) {
  saveAdmins([{ email: "admin@nmt.school", password: "admin123" }]);
}

// Формат ID схожий на твій: "U-XXXXXX"
function genUserId(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `U-${rand}`;
}

/* ---------- public API ---------- */
export const Auth = {
  /** ЛОГІН користувача: email + password → виставляє auth_token (uid) та role=user */
  async login(email: string, password: string): Promise<void> {
    const users = loadUsers();
    const u = users.find(x => x.email === String(email).trim().toLowerCase());
    if (!u || u.password !== String(password)) {
      throw new Error("Невірний email або пароль.");
    }
    localStorage.setItem(TOKEN_KEY, u.id);
    localStorage.setItem(ROLE_KEY, "user");
  },

  /** ЛОГІН АДМІНА: окремий від звичайного */
  async loginAdmin(email: string, password: string): Promise<void> {
    const admins = loadAdmins();
    const ok = admins.some(
      (a) => a.email.toLowerCase() === String(email).toLowerCase() && a.password === String(password)
    );
    if (!ok) throw new Error("Невірний email або пароль адміністратора.");
    localStorage.setItem(TOKEN_KEY, `admin:${Date.now()}`);
    localStorage.setItem(ROLE_KEY, "admin");
  },

  /** РЕЄСТРАЦІЯ: створює користувача з унікальним ID і повертає цей ID */
  async register(data: Record<string, FormDataEntryValue> | NewUser): Promise<string> {
    const email = String((data as any).email || "").trim().toLowerCase();
    const password = String((data as any).password || "");
    const firstName = String((data as any).firstName || "");
    const lastName  = String((data as any).lastName  || "");

    if (!email || !password) throw new Error("Вкажіть email і пароль.");

    const users = loadUsers();
    if (users.some(u => u.email === email)) {
      throw new Error("Користувач із таким email уже існує.");
    }

    const user: User = {
      id: genUserId(),
      email,
      password,     // ⚠️ у реальному проєкті тут має бути хеш
      role: "user",
      createdAt: Date.now(),
      firstName,
      lastName,
    };

    users.push(user);
    saveUsers(users);

    // опціонально — показ ID після реєстрації
    localStorage.setItem("pending_user_id", user.id);
    // початковий профіль (демо)
    localStorage.setItem("profile", JSON.stringify({ firstName, lastName, email }));

    return user.id;
  },

  /** ВИХІД */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  },

  /** Поточний uid (для user), або null якщо адмін / не залогінений */
  uid(): string | null {
    const tok = localStorage.getItem(TOKEN_KEY) || "";
    const role = localStorage.getItem(ROLE_KEY);
    if (!tok) return null;
    if (role === "admin") return null; // адмін не має user-uid
    return tok;
  },

  /** Поточний користувач (якщо є uid) */
  currentUser(): User | null {
    const id = this.uid();
    if (!id) return null;
    const users = loadUsers();
    return users.find(u => u.id === id) || null;
  },

  isAdmin(): boolean { return localStorage.getItem(ROLE_KEY) === "admin"; },
  isUser(): boolean  { return localStorage.getItem(ROLE_KEY) === "user";  },
};

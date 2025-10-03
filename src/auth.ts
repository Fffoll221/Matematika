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

const USERS_KEY = "users";          // реєстр користувачів у localStorage
const TOKEN_KEY = "auth_token";     // активна сесія (uid)
const ROLE_KEY  = "role";           // роль активного користувача

function loadUsers(): User[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
  catch { return []; }
}
function saveUsers(list: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

// Формат ID схожий на твій: "U-XXXXXX"
function genUserId(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `U-${rand}`;
}

export const Auth = {
  /** ЛОГІН: email + password → виставляє auth_token (uid) та role */
  login: async (email: string, password: string): Promise<void> => {
    const users = loadUsers();
    const u = users.find(x => x.email === String(email).trim().toLowerCase());
    if (!u || u.password !== String(password)) {
      throw new Error("Невірний email або пароль.");
    }
    // сумісно з твоїм кодом:
    localStorage.setItem(TOKEN_KEY, u.id);
    localStorage.setItem(ROLE_KEY, u.role);
  },

  /** РЕЄСТРАЦІЯ: створює користувача з унікальним ID і повертає цей ID */
  register: async (data: Record<string, FormDataEntryValue> | NewUser): Promise<string> => {
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

    // залишимо, якщо ти показуєш ID після реєстрації
    localStorage.setItem("pending_user_id", user.id);

    // опціонально — заповнимо початковий профіль у твоєму демо-кабінеті
    localStorage.setItem("profile", JSON.stringify({ firstName, lastName, email }));

    return user.id;
  },

  /** ВИХІД */
  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  },

  /** Допоміжні (можеш не використовувати) */
  uid(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  currentUser(): User | null {
    const id = this.uid();
    if (!id) return null;
    const users = loadUsers();
    return users.find(u => u.id === id) || null;
  },
  isAdmin(): boolean {
    return localStorage.getItem(ROLE_KEY) === "admin";
  },
};

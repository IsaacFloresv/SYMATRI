export type Session = {
  id: number;
  token: string;
  role: string;
  datosPersonales: {
    firstName: string;
    lastName: string;
    name_user?: string;
    email?: string;
  };
  modulos?: number[];
};

const KEY = "session";

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch (e) {
    console.error("Failed to parse session from localStorage", e);
    return null;
  }
}

export function setSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function removeSession() {
  localStorage.removeItem(KEY);
}

export function getToken(): string | null {
  return getSession()?.token ?? null;
}

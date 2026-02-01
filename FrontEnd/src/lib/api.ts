import { getToken, removeSession } from "@/lib/authStorage";
import { useAuthStorage } from "@/hooks/useAuthStorage";

export const api = {
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  timeout: 5000,
  // token dinámico leído desde el utilitario
  token: getToken(),
};


export async function fetchUsers() {
  try {
    const response = await fetch('/data/users.json');
    if (!response.ok) {
      handleErrors(response)
      throw new Error('Error al cargar los usuarios');
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error en fetchUsers:', error);
    return [];
  }
}

function handleErrors(response: any) {
  // Si la API responde 401 entonces la sesión dejó de ser válida
  if (response?.status === 401) {
    removeSession();
    // Resetear estado en memoria (Zustand)
    try {
      useAuthStorage.getState().setUser(null);
    } catch (e) {
      // no crítico
      console.warn('No se pudo resetear el store de auth', e);
    }
  }
}
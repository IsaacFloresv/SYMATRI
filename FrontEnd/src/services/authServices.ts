// authServices.ts
import type { loginData } from "@/schemas/authSchema";

export type LoginResponse = {
  id: number;
  token: string;
  datosPersonales: {
    firstName: string;
    lastName: string;
    name_user: string;
    email_user: string;
    password_user: string;
    role_user?: "admin" | "user";
  };
};

export async function login(credentials: loginData) {
  // 1. Login
  const response = await fetch("http://localhost:4321/begin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: credentials.name_user,
      pass: credentials.password_user,
    }),
  });
 

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  const session = await response.json();

  // 2. Obtener rol
  const roleResponse = await fetch(
    `http://localhost:4321/roles/byId?id=${session.roleId}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  const roleData = await roleResponse.json();

  // 3. Construir sesión completa
  const fullSession = {
    id: session.id,
    token: session.token,
    datosPersonales: session.datosPersonales,
    role: roleData.nombre,
    modulos: roleData.modulos, 
  };

  // 4. Guardar en localStorage
  localStorage.setItem("session", JSON.stringify(fullSession));

  return fullSession;
}

export async function getMe(id: number, token: string) {
  const response = await fetch(`http://localhost:4321/users/byid?id=${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("No se pudo obtener el usuario");

  return response.json();
}

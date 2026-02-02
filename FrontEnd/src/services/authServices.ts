// authServices.ts
import type { loginData } from "@/schemas/authSchema";
import { setSession } from "@/lib/authStorage";

export type LoginResponse = {
  id: number;
  roleId: number;
  token: string;
  datosPersonales: {
    firstName: string;
    lastName: string;
    name_user: string;
    email_user: string;
    password_user: string;
    role_user?: string |"guest";
  };
};

export async function login(credentials: loginData) {
  // 1. Login (endpoint y payload proporcionados)
  const url = "http://localhost:4321/api/v1/begin/login";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: credentials.name_user,
      rol: "guest",
      pass: credentials.password_user,
    }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error(text || "Credenciales incorrectas");
  }

  const session = await response.json();
  
  // 2. Priorizar role desde la respuesta del usuario si existe, o desde datos personales
  let roleName = session.role || session.datosPersonales?.role || "guest";
  let roleDescripcion = "";
  let modulos: number[] = [];

  // 3. Consultar endpoint de roles para obtener el role definitivo y modulos (si está disponible)
  try {
    const roleQueryId = session.roleId ?? session.id;

    if (roleQueryId == null) {
      console.warn("roleQueryId no disponible en la respuesta de login; se omite consulta a roles/byId.");
    } else {
      const roleRes = await fetch(`http://localhost:4321/api/v1/roles/byId?id=${roleQueryId}`, {
        headers: { Authorization: `Bearer ${session.token}` },
      });

      if (roleRes.ok) {
        const roleData = await roleRes.json();
        
       // La API es la fuente definitiva: si devuelve nombre lo usamos, y siempre intentamos leer modulos
        roleName = roleData.nombre || roleName;
        roleDescripcion = roleData.descripcion || "";
        modulos = Array.isArray(roleData.modulos) ? roleData.modulos : [];
      } else {
        // no crítico: mantener role obtenido de session o datos personales
        console.warn("No se pudo obtener role desde roles/byId, usando role de usuario o guest", await roleRes.text().catch(() => ""));
      }
    }
  } catch (e) {
    console.warn("Error obteniendo role desde API:", e);
  }

  // 4. Construir sesión completa
  const fullSession = {
    id: session.id,
    token: session.token,
    email: session.email,
    datosPersonales: session.datosPersonales,
    role: roleDescripcion,
    modulos,
  };

  // 5. Guardar en localStorage usando el utilitario central
  setSession(fullSession);

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

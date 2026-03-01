import { moduleMap } from "@/config/moduleMaps";

export function getAllowedPathsFromModuleIds(ids: number[] = []) {
  return new Set(ids.map((id) => moduleMap[id]?.path).filter(Boolean));
}

export function isPathAllowed(pathname: string, ids: number[] = []) {
  // allow the generic dashboard route for any authenticated user
  if (pathname === "/dashboard") return true;

  const allowed = getAllowedPathsFromModuleIds(ids);
  // special case: soporte or administrador roles should always see profesores
  // (useful if modulos array missing the id)
  try {
    const sess = require("@/hooks/useAuthStorage").useAuthStorage.getState().user;
    const role = (sess?.role || "").toLowerCase();
    if ((role.includes("soporte") || role.includes("admin")) &&
        (pathname === "/admin/gestion-profesores" || pathname.startsWith("/admin/gestion-profesores/"))) {
      return true;
    }
  } catch {}

  for (const p of allowed) {
    if (pathname === p) return true;
    // allow nested routes such as /admin/gestion-materias/123
    if (pathname.startsWith(p + "/")) return true;
  }
  return false;
}

export function getAllowedModules(ids: number[] = []) {
  return ids.map((id) => moduleMap[id]).filter(Boolean);
}
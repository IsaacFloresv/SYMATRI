import { moduleMap } from "@/config/moduleMaps";

export function getAllowedPathsFromModuleIds(ids: number[] = []) {
  return new Set(ids.map((id) => moduleMap[id]?.path).filter(Boolean));
}

export function isPathAllowed(pathname: string, ids: number[] = []) {
  // allow the generic dashboard route for any authenticated user
  if (pathname === "/dashboard") return true;

  const allowed = getAllowedPathsFromModuleIds(ids);
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
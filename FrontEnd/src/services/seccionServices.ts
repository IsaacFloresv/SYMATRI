import { api } from "@/lib/api";

export interface RawSeccion {
  id: number | string;
  nombre?: string;
  name?: string;
  grado?: { id?: number; name?: string } | string;
  ProfesorResponsable?: {
    datosPersonales?: { firstName?: string; lastName?: string };
  };
  seccionA?: any[];
  students?: any[];
  capacity?: number;
  capacidad?: number;
}

export async function fetchSecciones(): Promise<RawSeccion[]> {
  const headers: Record<string, string> = {};
  if (api.token) headers.Authorization = `Bearer ${api.token}`;
  const res = await fetch(`${api.baseUrl}/secciones/all`, { headers });
  if (!res.ok) {
    throw new Error("Error fetching secciones");
  }
  return res.json();
}

export async function fetchSeccionById(id: number | string): Promise<RawSeccion> {
  const headers: Record<string, string> = {};
  if (api.token) headers.Authorization = `Bearer ${api.token}`;
  const res = await fetch(`${api.baseUrl}/secciones/byid`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    throw new Error("Error fetching seccion");
  }
  const data = await res.json();
  // assume data is array, return first
  return Array.isArray(data) ? data[0] : data;
}
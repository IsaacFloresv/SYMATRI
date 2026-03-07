// errorServices.ts
import { api } from "@/lib/api";

export interface ErrorItem {
  id: number;
  logErrors: string;
  estado: string;
  createdAt?: string;
  updatedAt?: string;
}

/** fetch all error records */
export async function fetchErrors(): Promise<ErrorItem[]> {
  const headers: Record<string,string> = {};
  if (api.token) headers.Authorization = `Bearer ${api.token}`;
  const res = await fetch(`${api.baseUrl}/errores/all`, { headers });
  if (!res.ok) {
    throw new Error("Error fetching errores");
  }
  return res.json();
}

/** fetch a single error by id */
export async function getErrorById(id: number): Promise<ErrorItem> {
  const headers: Record<string,string> = {};
  if (api.token) headers.Authorization = `Bearer ${api.token}`;
  const res = await fetch(`${api.baseUrl}/errores/byid?id=${id}`, { headers });
  if (!res.ok) {
    throw new Error("Error fetching error item");
  }
  return res.json();
}

/** delete an error by id (using update endpoint to mark removed) */
export async function deleteError(id: number): Promise<any> {
  const headers: Record<string,string> = { "Content-Type": "application/json" };
  if (api.token) headers.Authorization = `Bearer ${api.token}`;
  const res = await fetch(`${api.baseUrl}/errores/delete`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || "Error deleting error");
  }
  return res.json();
}

export async function updateError(item: Partial<ErrorItem> & { id: number }): Promise<any> {
  const headers: Record<string,string> = { "Content-Type": "application/json" };
  if (api.token) headers.Authorization = `Bearer ${api.token}`;
  const res = await fetch(`${api.baseUrl}/errores/update`, {
    method: "PUT",
    headers,
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || "Error updating error");
  }
  return res.json();
}

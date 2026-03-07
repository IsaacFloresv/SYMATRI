// logServices.ts
import { api } from "@/lib/api";

export interface LogItem {
  id: number;
  tabla: string;
  usuario?: { datosPersonales?: { firstName?: string; lastName?: string } };
  estado: boolean;
  valorAnterior: any;
  valorActual: any;
  createdAt?: string;
}

export interface LogPage {
  total: number;
  totalPages: number;
  currentPage: number;
  data: LogItem[];
}

export async function fetchLogs(params: { page?: number; pageSize?: number; q?: string; table?: string; status?: string } = {}): Promise<LogPage> {
  const headers: Record<string,string> = {};
  if (api.token) headers.Authorization = `Bearer ${api.token}`;
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  if (params.pageSize) qs.set('pageSize', String(params.pageSize));
  if (params.q) qs.set('q', params.q);
  if (params.table) qs.set('table', params.table);
  if (params.status) qs.set('status', params.status);
  const res = await fetch(`${api.baseUrl}/logs/all?${qs.toString()}`, { headers });
  if (!res.ok) {
    throw new Error('Error fetching logs');
  }
  return res.json();
}

export async function getLogById(id: number): Promise<LogItem> {
  const headers: Record<string,string> = {};
  if (api.token) headers.Authorization = `Bearer ${api.token}`;
  const res = await fetch(`${api.baseUrl}/logs/byid?id=${id}`, { headers });
  if (!res.ok) {
    throw new Error('Error fetching log');
  }
  return res.json();
}

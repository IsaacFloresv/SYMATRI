import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import ConfirmModal from "@/pages/privates/administrador/ventanaConfirmacion/page"; // reusable confirmation dialog


interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
}

export default function VistaEventos() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // pagination state

  const loadEvents = async () => {
    setLoading(true);
    try {
      const headers: Record<string,string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/eventos/all`, { headers });
      if (!res.ok) throw new Error("error");
      const data = await res.json();
      const list: EventItem[] = (data.events || []).map((ev: any) => ({
        id: ev.id,
        title: ev.title || ev.name || "",
        date: ev.date || ev.startDate || "",
        time: ev.time || (ev.startAt ? ev.startAt.split('T')[1] : ""),
        location: ev.location,
        description: ev.description,
      }));
      setEvents(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // delete helper wired to confirmation modal
  const handleDelete = async (id: string) => {
    try {
      const headers: Record<string,string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/eventos/delete/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error("delete failed");
      loadEvents();
    } catch (e) {
      console.error("error deleting event", e);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  // reset to first page whenever filters or data change
  useEffect(() => {
    setPage(1);
  }, [query, events]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return events.filter(e =>
      !q ||
      e.title.toLowerCase().includes(q) ||
      (e.location || "").toLowerCase().includes(q)
    );
  }, [events, query]);

  // pagination helpers
  const pageSize = 10;
  const pageCount = Math.ceil(filtered.length / pageSize) || 1;
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <main className="flex-1 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-white text-3xl font-bold tracking-tight">Listado de Eventos</h1>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex-1">
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por nombre de evento, ubicación..."
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" variant="outline">Filtro por Fecha</Button>
            <Button size="sm" variant="outline">Filtro por Tipo</Button>
            <Button size="sm" variant="outline">Filtro por Público</Button>
          </div>
        </div>
        <div className="mt-8 space-y-2">
          {loading ? (
            <p className="text-center text-white">Cargando...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-white">No se encontraron eventos.</p>
          ) : (
            paged.map(e => (
              <details key={e.id} className="group rounded-lg bg-[#192733] [&._summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between p-4">
                  <div className="flex flex-1 items-center justify-between gap-4">
                    <span className="text-sm font-medium text-white">{e.title}</span>
                    <span className="inline-flex items-center justify-start rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-400">{e.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ConfirmModal
                      trigger={
                        <button
                          onClick={(ev) => ev.stopPropagation()}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      }
                      title="Eliminar evento"
                      message="¿Seguro que quieres eliminar este evento? Esta acción no se puede deshacer."
                      onConfirm={() => handleDelete(e.id)}
                    />
                    <span className="material-symbols-outlined text-white transition group-open:rotate-180">expand_more</span>
                  </div>
                </summary>
                <div className="border-t border-[#324d67] p-4">
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                    {e.date && (<div><strong className="text-white">Fecha:</strong> <span className="text-[#92aec9]">{e.date}</span></div>)}
                    {e.time && (<div><strong className="text-white">Hora:</strong> <span className="text-[#92aec9]">{e.time}</span></div>)}
                    {e.location && (<div><strong className="text-white">Ubicación:</strong> <span className="text-[#92aec9]">{e.location}</span></div>)}
                    {e.description && (<div><strong className="text-white">Descripción:</strong> <span className="text-[#92aec9]">{e.description}</span></div>)}
                  </div>
                </div>
              </details>
            ))
          )}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[#92aec9]">
            Mostrando {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} de {filtered.length} resultados
          </p>
          {filtered.length > pageSize && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Anterior
              </Button>
              <span className="text-sm text-[#92aec9]">
                {page} / {pageCount}
              </span>
              <Button size="sm" variant="outline" disabled={page === pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>
                Siguiente
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

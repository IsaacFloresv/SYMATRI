import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
}

export default function GestionEventos() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/eventos/all`, { headers });
      if (!res.ok) throw new Error("failed to fetch events");
      const json = await res.json();
      const fetched: EventItem[] = (json.events || []).map((ev: any) => ({
        id: ev.id,
        title: ev.title || ev.name || "",
        date: ev.date || ev.startDate || "",
        time: ev.time || (ev.startAt ? ev.startAt.split("T")[1] : ""),
        location: ev.location,
        description: ev.description,
      }));
      setEvents(fetched);
    } catch (err) {
      console.error("error loading events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este evento?")) return;
    // optimistic removal; backend endpoint not available so just filter locally
    setEvents((prev) => prev.filter((e) => e.id !== id));
    // TODO: call API when delete route is implemented
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return events.filter(
      (e) =>
        !query ||
        e.title.toLowerCase().includes(q) ||
        (e.description || "").toLowerCase().includes(q)
    );
  }, [events, query]);

  // pagination
  const pageSize = 10;
  const pageCount = Math.ceil(filtered.length / pageSize) || 1;
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 lg:p-8">
        {/* PageHeading & Add Button */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <p className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Gestión de Eventos Escolares
          </p>
          <Button
            className="flex min-w-[84px] max-w-[480px] items-center justify-center gap-2"
            onClick={() => navigate("/admin/gestion-eventos/nuevo")}
          >
            <span className="material-symbols-outlined">add</span>
            <span className="truncate">Añadir Evento</span>
          </Button>
        </div>

        {/* SearchBar */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar eventos por nombre o descripción..."
              className="w-full"
            />
          </div>
          {/* filters placeholders - not functional yet */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button size="sm" variant="outline" className="whitespace-nowrap">
              Mes
            </Button>
            <Button size="sm" variant="outline" className="whitespace-nowrap">
              Tipo de evento
            </Button>
            <Button size="sm" variant="outline" className="whitespace-nowrap">
              Próximos
            </Button>
            <Button size="sm" variant="ghost" className="whitespace-nowrap">
              Pasados
            </Button>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white dark:bg-[#111a22] rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full text-sm text-left">
              <TableHeader className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-[#233648]">
                <TableRow>
                  <TableHead className="px-6 py-3">Nombre del Evento</TableHead>
                  <TableHead className="px-6 py-3">Fecha</TableHead>
                  <TableHead className="px-6 py-3">Hora</TableHead>
                  <TableHead className="px-6 py-3">Ubicación</TableHead>
                  <TableHead className="px-6 py-3 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-6 text-center text-sm text-slate-500">
                      No se encontraron eventos.
                    </TableCell>
                  </TableRow>
                )}
                {paged.map((e) => (
                  <TableRow key={e.id} className="border-t border-t-slate-200 dark:border-t-[#3b4854]">
                    <TableCell className="px-6 py-4 text-slate-900 dark:text-white font-medium">
                      {e.title}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-slate-500">
                      {e.date}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-slate-500">
                      {e.time}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-slate-500">
                      {e.location}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm font-bold text-right">
                      <div className="flex justify-end gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/gestion-eventos/editar/${e.id}`)}
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-500/10"
                          onClick={() => handleDelete(e.id)}
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {!loading && filtered.length > pageSize && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-slate-500">
              Mostrando <span className="font-medium text-slate-700">
                {(page - 1) * pageSize + 1}
              </span> a <span className="font-medium text-slate-700">
                {Math.min(page * pageSize, filtered.length)}
              </span> de <span className="font-medium text-slate-700">{filtered.length}</span> resultados
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page === pageCount}
                onClick={() => setPage(page + 1)}
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

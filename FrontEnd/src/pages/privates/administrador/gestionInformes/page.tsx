import { useState, useMemo, useEffect } from "react";
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

interface Report {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  status: string;
}

export default function GestionInformes() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadReports = async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/informes/all`, { headers });
      if (!res.ok) throw new Error("unable to fetch");
      const data = await res.json();
      setReports(data || []);
    } catch (err) {
      console.error("failed loading informes", err);
      setReports([
        {
          id: "1",
          name: "Informe de Calificaciones Semestral",
          category: "Académico",
          createdAt: "2024-07-15",
          status: "Activo",
        },
        {
          id: "2",
          name: "Reporte de Asistencia Mensual",
          category: "Administrativo",
          createdAt: "2024-07-12",
          status: "Activo",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  // reset page whenever search query or reports list changes
  useEffect(() => {
    setPage(1);
  }, [query, reports]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return reports.filter(
      (r) =>
        !query ||
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }, [reports, query]);

  const pageSize = 10;
  const pageCount = Math.ceil(filtered.length / pageSize) || 1;
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este informe?")) return;
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <main className="flex-1 p-8">
      <div className="mx-auto max-w-7xl">
        {/* PageHeading Component */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">
              Configuración de Informes
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Crea, edita y gestiona las plantillas de informes del sistema.
            </p>
          </div>
          <Button
            className="flex min-w-[84px] items-center justify-center gap-2"
            onClick={() => navigate("/admin/gestion-informes/nuevo")}
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span className="truncate">Crear Nuevo Informe</span>
          </Button>
        </header>
        {/* Search and Filter Section */}
        <div className="mb-4 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* SearchBar Component */}
            <div className="flex-grow">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre de informe..."
                className="w-full"
              />
            </div>
            {/* Filters (placeholder) */}
            <div className="flex gap-2 p-1">
              <Button size="sm" variant="outline">
                Todos
              </Button>
              <Button size="sm" variant="outline">
                Académico
              </Button>
              <Button size="sm" variant="outline">
                Asistencia
              </Button>
              <Button size="sm" variant="outline">
                Conducta
              </Button>
            </div>
          </div>
        </div>
        {/* Table Component */}
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 dark:bg-background-dark/30">
          <div className="overflow-x-auto">
            <Table className="w-full min-w-max">
              <TableHeader className="bg-gray-50 dark:bg-white/5">
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Nombre
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Categoría
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Creación
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Estado
                  </TableHead>
                  <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
                {paged.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-6 text-center text-sm text-slate-500">
                      No se encontraron informes.
                    </TableCell>
                  </TableRow>
                )}
                {paged.map((r) => (
                  <TableRow key={r.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {r.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {r.category}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {r.createdAt}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${r.status === "Activo" ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300"}`}>
                        {r.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-4">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/gestion-informes/editar/${r.id}`)}>
                          <span className="material-symbols-outlined">edit</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10" onClick={() => handleDelete(r.id)}>
                          <span className="material-symbols-outlined">delete</span>
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
        {!loading && (
          <div className="flex items-center justify-between border-t border-[#324d67] px-4 py-3">
            <p className="text-sm text-[#92aec9]">
              Mostrando <span className="font-medium text-white">{filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}</span> a <span className="font-medium text-white">{filtered.length === 0 ? 0 : Math.min(page * pageSize, filtered.length)}</span> de <span className="font-medium text-white">{filtered.length}</span> resultados
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={page === 1 || filtered.length <= pageSize}
                onClick={() => setPage(page - 1)}
                className="border border-[#324d67] bg-[#233648] text-white hover:bg-[#324d67] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page === pageCount || filtered.length <= pageSize}
                onClick={() => setPage(page + 1)}
                className="border border-[#324d67] bg-[#233648] text-white hover:bg-[#324d67] disabled:opacity-50 disabled:cursor-not-allowed"
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

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

interface Grade {
  id: number;
  code: string;
  name: string;
  level: string;
  active: boolean;
}

export default function GestionGrados() {
  const navigate = useNavigate();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      let res = await fetch(`${api.baseUrl}/grados/all`, { headers });
      if (res.status === 404) {
        // endpoint might be different
        res = await fetch(`${api.baseUrl}/grados`, { headers });
      }
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      setGrades(data);
    } catch (err) {
      console.error("error loading grados", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("¿Eliminar este grado? Esta acción no se puede deshacer.");
    if (!confirmed) return;
    try {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/grados/delete/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error("delete failed");
      // refresh list
      reload();
    } catch (err) {
      console.error("error deleting grado", err);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return grades.filter((g) =>
      !q || g.name.toLowerCase().includes(q) || g.code.toLowerCase().includes(q)
    );
  }, [grades, query]);
  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">
              Gestión de Grados Académicos
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Añada, edite y elimine los grados académicos de la institución.
            </p>
          </div>
          <div>
            <Button className="lg:mt-8 w-50 p-4 items-center sm:mt-2" onClick={() => navigate("/admin/gestion-grados/nuevo")}>
              <span className="material-symbols-outlined text-lg">add</span>
              <span>Añadir Nuevo Grado</span>
              </Button>
          </div>
        </div>
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            placeholder="Buscar por nombre de grado..."
            className="max-w-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {/* Table */}
        <div className="@container">
          <div className="flex overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#182635]">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5">
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Código</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Nombre del Grado</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Nivel Educativo</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Estado</th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="p-6 text-center">
                      Cargando...
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="p-6 text-center">
                      No se encontraron grados
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {filtered.map((g) => (
                      <TableRow key={g.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {g.code}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {g.name}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {g.level}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${g.active
                                ? "bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400"
                                : "bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-400"
                              }`}
                          >
                            {g.active ? "Activo" : "Inactivo"}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/gestion-grados/editar/${g.id}`)}
                            className="flex items-center justify-center size-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary dark:hover:text-primary"
                          >
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(g.id)}
                            className="flex items-center justify-center size-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-500"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination placeholder */}
        <div className="flex items-center justify-between mt-6 px-1">
          <p className="text-sm text-slate-500 dark:text-[#92aec9]">
            Mostrando <span className="font-medium text-slate-700 dark:text-white">{filtered.length > 0 ? 1 : 0}</span> a <span className="font-medium text-slate-700 dark:text-white">{filtered.length}</span> de <span className="font-medium text-slate-700 dark:text-white">{grades.length}</span> resultados
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="px-3 py-1" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="px-3 py-1">
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

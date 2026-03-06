import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface Report {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  active: boolean;
}

export default function VistaInformes() {
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const headers: Record<string,string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const params = new URLSearchParams();
        if (search) params.set("q", search);
        if (category) params.set("category", category);
        const res = await fetch(`${api.baseUrl}/informes?${params.toString()}`, { headers });
        if (!res.ok) throw new Error("Error cargando informes");
        const data = await res.json();
        setReports(data.reports || []);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, category]);

  const filtered = reports.filter((r) => {
    const matchName = !search || r.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !category || r.category === category;
    return matchName && matchCat;
  });

  const categories = Array.from(new Set(reports.map((r) => r.category))).sort();

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">
              Configuración de Informes
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Crea, edita y gestiona las plantillas de informes del sistema.
            </p>
          </div>
          <Button className="flex min-w-[84px] items-center justify-center gap-2" onClick={()=>{}}>
            <span className="material-symbols-outlined text-xl">add</span>
            <span className="truncate">Crear Nuevo Informe</span>
          </Button>
        </header>
        <div className="mb-4 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Buscar por nombre de informe..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={category === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory("")}
              >
                Todos
              </Button>
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
        </div>
        {loading && <p className="text-center text-white">Cargando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/30">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="bg-gray-50 dark:bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Nombre del Informe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fecha de Creación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {r.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {r.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {r.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${r.active ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}>
                          {r.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-4">
                          <Button variant="ghost" size="sm">
                            <span className="material-symbols-outlined">visibility</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <span className="material-symbols-outlined">edit</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <span className="material-symbols-outlined">delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

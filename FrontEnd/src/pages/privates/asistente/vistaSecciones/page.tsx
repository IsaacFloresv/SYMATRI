import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { api } from "@/lib/api";

interface Section {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  studentsCount: number;
}

export default function VistaSecciones() {
  const [sections, setSections] = useState<Section[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const headers: Record<string,string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/secciones`, { headers });
        if (!res.ok) throw new Error("Error al cargar secciones");
        const data = await res.json();
        setSections(data.secciones || []);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = sections.filter(s =>
    !query ||
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.teacher.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-gray-900 dark:text-white text-3xl font-bold">Secciones</h1>
          <p className="text-gray-500 dark:text-gray-400">Listado de secciones disponibles.</p>
        </div>
        <div className="mb-4">
          <Input
            placeholder="Buscar por nombre o profesor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {loading && <p>Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Grado</TableHead>
                    <TableHead>Profesor</TableHead>
                    <TableHead>Alumnos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filtered.map(s => (
                    <TableRow key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.grade}</TableCell>
                      <TableCell>{s.teacher}</TableCell>
                      <TableCell>{s.studentsCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

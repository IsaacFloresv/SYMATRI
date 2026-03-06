import { useState, useEffect } from "react";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { api } from "@/lib/api";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function VistaCalificacionesMaterias() {
  const selectedChildId = useAuthStorage((s) => s.selectedChildId);
  const [grades, setGrades] = useState<{ materia: string; nota: number }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadGrades() {
      if (!selectedChildId) return;
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/notas/all`, { headers });
        if (!res.ok) return;
        const all = await res.json();
        const filtered = (all || []).filter(
          (n: any) => n.alumnoNota?.id === selectedChildId
        );
        const list = filtered.map((n: any) => ({
          materia: n.materia?.name || "Sin materia",
          nota: Number(n.nota || n.valor || 0),
        }));
        setGrades(list);
      } catch (e) {
        console.error(e);
      }
    }
    loadGrades();
  }, [selectedChildId]);

  return (
    <main className="flex-1 p-8 bg-background-dark flex flex-col">
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-card-dark rounded-lg transition-colors border border-transparent hover:border-border-dark"
        >
          <span className="material-symbols-outlined text-muted-dark">arrow_back</span>
        </button>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground-dark">
            Calificaciones
          </h1>
          <p className="text-muted-dark mt-1">
            {selectedChildId ? `Hijo seleccionado: ${selectedChildId}` : "No hay hijo seleccionado"}
          </p>
        </div>
      </header>

      <div className="flex-grow">
        <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden">
          <Table className="min-w-full divide-y divide-border-dark text-sm">
            <TableHeader className="bg-card-dark/50">
              <TableRow>
                <TableHead className="px-6 py-3 text-left uppercase tracking-wider text-muted-dark">
                  Materia
                </TableHead>
                <TableHead className="px-6 py-3 text-left uppercase tracking-wider text-muted-dark">
                  Nota
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="p-6 text-center">
                    Sin calificaciones
                  </TableCell>
                </TableRow>
              ) : (
                grades.map((g, idx) => (
                  <TableRow key={idx} className="hover:bg-card-dark/50 transition-colors">
                    <TableCell className="px-6 py-4">{g.materia}</TableCell>
                    <TableCell className="px-6 py-4 font-bold">{g.nota}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}

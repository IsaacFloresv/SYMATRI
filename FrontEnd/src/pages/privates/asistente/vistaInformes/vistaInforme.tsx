import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface ReportRow {
  student: string;
  subject: string;
  p1: number;
  p2: number;
  p3: number;
  average: number;
  note: string;
}

interface Report {
  id: string;
  title: string;
  generatedAt: string;
  generatedBy: string;
  school: string;
  department: string;
  period: string;
  rows: ReportRow[];
}

export default function VistaInformeAsistente() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/informes/byid?id=${id}`, { headers });
        if (!res.ok) throw new Error("Error al cargar informe");
        const r = await res.json();
        setReport(r);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "No fue posible cargar informe");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="p-8">Cargando...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!report) return <p className="p-8">Informe no encontrado</p>;

  return (
    <main className="flex-1 p-8 print-area">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-start justify-between gap-4 mb-8 no-print">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <a className="hover:text-primary" href="#">
                Informes
              </a>
              <span className="material-symbols-outlined text-base">
                chevron_right
              </span>
              <span>Visualización</span>
            </div>
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">
              {report.title}
            </h1>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">
                  calendar_today
                </span>
                <span>Generado: {report.generatedAt}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">person</span>
                <span>Admin: {report.generatedBy}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 text-sm font-bold"
            >
              <span className="material-symbols-outlined text-xl">
                picture_as_pdf
              </span>
              <span>Exportar a PDF</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 text-sm font-bold"
            >
              <span className="material-symbols-outlined text-xl">
                description
              </span>
              <span>Exportar a Excel</span>
            </Button>
            <Button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-bold"
            >
              <span className="material-symbols-outlined text-xl">print</span>
              <span>Imprimir</span>
            </Button>
          </div>
        </header>

        <div className="bg-white dark:bg-background-dark/40 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <span className="material-symbols-outlined text-4xl text-primary">
                  school
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {report.school}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {report.department}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                Periodo Escolar
              </p>
              <p className="font-bold text-gray-900 dark:text-white">
                {report.period}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-left border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-white/5">
                  <TableHead className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                    Nombre del Alumno
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                    Materia
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                    P1
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                    P2
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                    P3
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 bg-primary/5">
                    Promedio
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                    Observaciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {report.rows.map((r, idx) => (
                  <TableRow
                    key={idx}
                    className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                      {r.student}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {r.subject}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-sm">
                      {r.p1}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-sm">
                      {r.p2}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-sm">
                      {r.p3}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-sm font-bold text-primary bg-primary/5">
                      {r.average}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 italic">
                      {r.note}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* footer with signature and qr omitted in print-only priority */}
        </div>
      </div>
    </main>
  );
}
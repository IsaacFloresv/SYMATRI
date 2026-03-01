import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
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

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  status: string;
}

export default function GestionAlumnos() {
  const [students, setStudents] = useState<Student[]>([]);
  const [query, setQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // helper to reload data after mutations
  const reloadStudents = async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/seccionAlumnos/all`, { headers });
      if (!res.ok) throw new Error("failed to fetch");
      const data = await res.json();
      const studArr: Student[] = [];
      data.forEach((sec: any) => {
        const sectionName: string = sec.name || "";
        const grade = sectionName.split("-")[0].trim();
        const entries: any[] = sec.seccionA || [];
        entries.forEach((entry: any) => {
          const alumno = entry.alumnoS || {};
          const datos = alumno.datosPersonales || {};
          studArr.push({
            id: alumno.id?.toString() || "",
            name: `${datos.firstName || ""} ${datos.lastName || ""}`.trim(),
            grade,
            section: sectionName,
            status: alumno.active === true ? "Activo" : "Inactivo",
          });
        });
      });
      setStudents(studArr);
    } catch (err) {
      console.error("error loading alumnos", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId: string) => {
    if (!confirm("¿Deseas eliminar este alumno?")) return;
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      // mark user inactive
      await fetch(`${api.baseUrl}/users/delete`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id: studentId }),
      });
      // also unlink from section
      await fetch(`${api.baseUrl}/seccionAlumnos/delete`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id: studentId }),
      });
      // remove from local state to give instant feedback
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
    } catch (err) {
      console.error("failed to delete student", err);
    }
  };

  useEffect(() => {
    // initial load uses the shared helper so we can call it again when items change
    reloadStudents();
  }, []);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = query.toLowerCase();
      const isNumeric = /^\d+$/.test(q);
      const matchQuery =
        !query ||
        (isNumeric
          ? s.id.toLowerCase() === q
          : s.name.toLowerCase().startsWith(q) ||
            s.id.toLowerCase().startsWith(q));
      const matchGrade = !gradeFilter || s.grade === gradeFilter;
      const matchSection = !sectionFilter || s.section === sectionFilter;
      const matchStatus = !statusFilter || s.status === statusFilter;
      return matchQuery && matchGrade && matchSection && matchStatus;
    });
  }, [students, query, gradeFilter, sectionFilter, statusFilter]);

  // when filters change reset to first page
  useEffect(() => {
    setPage(1);
  }, [filtered]);

  const grades = useMemo(
    () => Array.from(new Set(filtered.map((s) => s.grade))).sort(),
    [filtered]
  );
  const sections = useMemo(
    () => Array.from(new Set(filtered.map((s) => s.section))).sort(),
    [filtered]
  );
  const statuses = useMemo(
    () => Array.from(new Set(filtered.map((s) => s.status))).sort(),
    [filtered]
  );

  const pageSize = 10;
  const pageCount = Math.ceil(filtered.length / pageSize) || 1;
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <main className="flex flex-1 justify-center py-5 sm:px-6 lg:px-8">
      <div className="layout-content-container flex flex-col w-full max-w-7xl">
        {/* PageHeading */}
        <div className="flex flex-wrap justify-between items-center gap-4 px-4 py-4 sm:px-0">
          <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
            Gestión de Alumnos
          </p>
          <div>
            <Button
              className="w-50"
              onClick={() => navigate("/admin/gestion-alumnos/nuevo")}
            >
              <span className="material-symbols-outlined">add</span>
              <span className="truncate">Añadir Alumno</span>
            </Button>
          </div>
        </div>
        {/* ToolBar */}
        <div className="flex flex-col gap-4 px-4 py-3 sm:px-0">
          <div className="flex flex-wrap items-center gap-2 w-full">
            <div className="relative flex-1 min-w-0">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">
                  search
                </span>
              </div>
              <Input
                className="block w-full rounded-lg pl-10 pr-4 py-2"
                placeholder="Buscar por nombre o ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>            
          </div>
          {/* filters row */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-2">
            <Select
              onValueChange={setGradeFilter}
              value={gradeFilter}
            >
              <SelectTrigger size="sm" className="flex-1">
                <SelectValue placeholder="Grado" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={setSectionFilter}
              value={sectionFilter}
            >
              <SelectTrigger size="sm" className="flex-1">
                <SelectValue placeholder="Sección" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={setStatusFilter}
              value={statusFilter}
            >
              <SelectTrigger size="sm" className="flex-1">
                <SelectValue placeholder="Estatus" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((st) => (
                  <SelectItem key={st} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="ml-auto"
              onClick={() => {
                setQuery("");
                setGradeFilter("");
                setSectionFilter("");
                setStatusFilter("");
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
        {/* Table */}
        <div className="px-4 py-3 sm:px-0 @container">
          {loading ? (
            <p className="py-20 text-center text-slate-500">Cargando alumnos...</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex overflow-hidden rounded-lg border border-slate-300 dark:border-[#3b4854] bg-white dark:bg-[#111518] w-full">
              <Table className="w-full text-left">
                <TableHeader className="border-b border-slate-300 dark:border-[#3b4854] bg-slate-50 dark:bg-[#1c2127]">
                  <TableRow>
                    <TableHead className="px-4 py-3 text-slate-600 dark:text-white text-sm font-medium leading-normal w-1/12">
                      ID Alumno
                    </TableHead>
                    <TableHead className="px-4 py-3 text-slate-600 dark:text-white text-sm font-medium leading-normal w-4/12">
                      Nombre Completo
                    </TableHead>
                    <TableHead className="px-4 py-3 text-slate-600 dark:text-white text-sm font-medium leading-normal w-1/12">
                      Grado
                    </TableHead>
                    <TableHead className="px-4 py-3 text-slate-600 dark:text-white text-sm font-medium leading-normal w-1/12">
                      Sección
                    </TableHead>
                    <TableHead className="px-4 py-3 text-slate-600 dark:text-white text-sm font-medium leading-normal w-2/12">
                      Estatus
                    </TableHead>
                    <TableHead className="px-4 py-3 text-slate-600 dark:text-white text-sm font-medium leading-normal w-3/12 text-right">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paged.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-6 text-center text-sm text-slate-500">
                        No se encontraron alumnos.
                      </TableCell>
                    </TableRow>
                  )}
                  {paged.map((s) => (
                    <TableRow key={s.id} className="border-t border-t-slate-200 dark:border-t-[#3b4854]">
                      <TableCell className="h-[72px] px-4 py-2 text-slate-500 dark:text-[#9dabb9] text-sm font-normal leading-normal">
                        {s.id}
                      </TableCell>
                      <TableCell className="h-[72px] px-4 py-2 text-slate-900 dark:text-white text-sm font-medium leading-normal">
                        {s.name}
                      </TableCell>
                      <TableCell className="h-[72px] px-4 py-2 text-slate-500 dark:text-[#9dabb9] text-sm font-normal leading-normal">
                        {s.grade}
                      </TableCell>
                      <TableCell className="h-[72px] px-4 py-2 text-slate-500 dark:text-[#9dabb9] text-sm font-normal leading-normal">
                        {s.section}
                      </TableCell>
                      <TableCell className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <span className={
                          `inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${s.status === "Activo"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                          }
                      `}>
                          {s.status}
                        </span>
                      </TableCell>
                      <TableCell className="h-[72px] px-4 py-2 text-sm font-bold leading-normal tracking-[0.015em] text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/gestion-alumnos/editar/${s.id}`)}>
                            <span className="material-symbols-outlined text-base">visibility</span>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/gestion-alumnos/editar/${s.id}`)}>
                            <span className="material-symbols-outlined text-base">edit</span>
                          </Button>                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:bg-red-500/10"
                            onClick={() => handleDelete(s.id)}
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
          )}
        </div>
        {/* Pagination */}
        {!loading && (
          <div className="flex items-center justify-between mt-6 px-1">
            <p className="text-sm text-slate-500 dark:text-[#92aec9]">
              Mostrando <span className="font-medium text-slate-700 dark:text-white">{filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}</span> a <span className="font-medium text-slate-700 dark:text-white">{filtered.length === 0 ? 0 : Math.min(page * pageSize, filtered.length)}</span> de <span className="font-medium text-slate-700 dark:text-white">{filtered.length}</span> resultados
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="px-3 py-1"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-3 py-1"
                disabled={page >= pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


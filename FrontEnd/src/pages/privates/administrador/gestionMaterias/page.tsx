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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface Subject {
  id: string;
  code: string; // we will map to id or a short code when available
  name: string;
  teacher?: string;
  grade?: string;
  description?: string;
}

export default function GestionMaterias() {
  const navigate = useNavigate();

  // placeholder state; replace with fetch from API later
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [query, setQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [page, setPage] = useState(1);
  const [_loading, setLoading] = useState(true); // TODO: show spinner if desired

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const headers: Record<string,string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/materiasprofesores/all`, { headers });
        if (res.ok) {
          const data: any[] = await res.json();
          const mapped: Subject[] = data.flatMap((m) => {
            // compute grade string – API may include m.grado.name or m.gradoId
            let gradeVal = "";
            if (m.grado) {
              if (typeof m.grado === "object" && m.grado.name) {
                gradeVal = m.grado.name;
              } else if (typeof m.grado === "string") {
                gradeVal = m.grado;
              }
            } else if (m.gradoId) {
              gradeVal = String(m.gradoId);
            }

            // each m may contain array "materia" of relations, create entry per relation
            if (Array.isArray(m.materia) && m.materia.length > 0) {
              return m.materia.map((rel: any) => {
                const prof = rel.profesorAsignado?.datosPersonales;
                const teacherName = prof ? `${prof.firstName || ""} ${prof.lastName || ""}`.trim() : "";
                return {
                  id: String(m.id),
                  code: String(m.id),
                  name: m.name || "",
                  description: m.description || "",
                  teacher: teacherName,
                  grade: gradeVal,
                };
              });
            }
            // no relations; still return a basic subject
            return [{
              id: String(m.id),
              code: String(m.id),
              name: m.name || "",
              description: m.description || "",
              teacher: "",
              grade: gradeVal,
            }];
          });
          setSubjects(mapped);
        }
      } catch (err) {
        console.error("error loading materias", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return subjects.filter((s) => {
      const q = query.toLowerCase();
      const matchQuery =
        !query ||
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q);
      const matchGrade = !gradeFilter || s.grade === gradeFilter;
      const matchTeacher = !teacherFilter || s.teacher === teacherFilter;
      return matchQuery && matchGrade && matchTeacher;
    });
  }, [subjects, query, gradeFilter, teacherFilter]);

  // pagination helpers
  const pageSize = 10;
  const pageCount = Math.ceil(filtered.length / pageSize) || 1;
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const grades = useMemo(
    () => Array.from(new Set(subjects.map((s) => s.grade || ""))).filter(Boolean).sort(),
    [subjects]
  );
  const teachers = useMemo(
    () => Array.from(new Set(subjects.map((s) => s.teacher || ""))).filter(Boolean).sort(),
    [subjects]
  );

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
      <div className="mx-auto max-w-7xl">
        {/* PageHeading */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <h1 className="text-white text-3xl font-black leading-tight tracking-tight">
              Gestión de Asignaturas
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Añadir, editar o eliminar asignaturas del sistema.
            </p>
          </div>
          <Button
            className="flex min-w-0 items-center justify-center"
            onClick={() => navigate("/admin/gestion-materias/nuevo")}
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span className="truncate">Añadir Nueva Asignatura</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="sticky top-[var(--header-height)] z-40 w-full flex flex-wrap items-center gap-4 overflow-x-auto dark:bg-background-dark dark:border dark:border-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-gray-500">search</span>
            </div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre de asignatura..."
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto py-2">
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="h-8 min-w-[180px]">
                <SelectValue placeholder="Curso" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={teacherFilter} onValueChange={setTeacherFilter}>
              <SelectTrigger className="h-8 min-w-[180px]">
                <SelectValue placeholder="Profesor" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="link" onClick={() => { setGradeFilter(""); setTeacherFilter(""); setQuery(""); }}>
              Limpiar filtros
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-[#324d67] bg-[#111a22]">
          <div className="overflow-x-auto">
            <Table className="w-full text-left">
              <TableHeader className="bg-[#192733]">
                <TableRow>
                  <TableHead className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-[#324d67] border-2 bg-transparent text-primary focus:ring-2 focus:ring-offset-background-dark focus:ring-primary/50 focus:ring-offset-2"
                    />
                  </TableHead>
                  <TableHead className="px-4 py-3 text-white text-sm font-medium leading-normal">
                    Código
                  </TableHead>
                  <TableHead className="px-4 py-3 text-white text-sm font-medium leading-normal">
                    Nombre de la Asignatura
                  </TableHead>
                  <TableHead className="px-4 py-3 text-white text-sm font-medium leading-normal">
                    Profesor a Cargo
                  </TableHead>
                  <TableHead className="px-4 py-3 text-white text-sm font-medium leading-normal">
                    Curso/Grado
                  </TableHead>
                  <TableHead className="px-4 py-3 text-white text-sm font-medium leading-normal">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((s) => (
                  <TableRow
                    key={s.id}
                    className="border-t border-t-[#324d67] hover:bg-[#192733]/50 transition-colors"
                  >
                    <TableCell className="p-4 text-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-[#324d67] border-2 bg-transparent text-primary focus:ring-2 focus:ring-offset-background-dark focus:ring-primary/50 focus:ring-offset-2"
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-[#92aec9] text-sm font-normal leading-normal">
                      {s.code}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-white text-sm font-medium leading-normal">
                      {s.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-[#92aec9] text-sm font-normal leading-normal">
                      {s.teacher}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-normal leading-normal">
                      <span className="inline-flex items-center rounded-md bg-[#233648] px-2 py-1 text-xs font-medium text-white">
                        {s.grade}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-[#92aec9] hover:text-white hover:bg-[#233648]"><span className="material-symbols-outlined text-lg">edit</span></Button>
                        <Button variant="ghost" size="sm" className="text-[#92aec9] hover:text-red-400 hover:bg-red-500/20"><span className="material-symbols-outlined text-lg">delete</span></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* pagination placeholder */}
          <div className="flex items-center justify-between border-t border-[#324d67] px-4 py-3">
            <p className="text-sm text-[#92aec9]">
              Mostrando <span className="font-medium text-white">{filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}</span> a <span className="font-medium text-white">{filtered.length === 0 ? 0 : Math.min(page * pageSize, filtered.length)}</span> de <span className="font-medium text-white">{filtered.length}</span> resultados
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="border border-[#324d67] bg-[#233648] text-white hover:bg-[#324d67] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <span>Anterior</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="border border-[#324d67] bg-[#233648] text-white hover:bg-[#324d67] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={page >= pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                <span>Siguiente</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

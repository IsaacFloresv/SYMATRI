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
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

interface Section {
  id: string;
  name: string;
  grade: string;
  capacity: number;
  assigned: number;
}

export default function GestionSecciones() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [query, setQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");

  useEffect(() => {
    async function load() {
      const headers: Record<string,string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      try {
        const res = await fetch(`${api.baseUrl}/secciones/all`, { headers });
        if (res.ok) {
          const data = await res.json();
          // normalize shape: ensure capacity/assigned numbers exist
          const mapped: Section[] = (data || []).map((s: any) => {
            const name = s.name || s.nombre || "";
            // derive grade from nombre if not provided
            // s.grado may be a string or an object from the include
            let gradeVal = "";
            if (s.grade) {
              gradeVal = s.grade;
            } else if (s.grado) {
              if (typeof s.grado === "string") {
                gradeVal = s.grado;
              } else if (typeof s.grado === "object" && s.grado.name) {
                gradeVal = s.grado.name;
              }
            }
            if (!gradeVal && name) {
              // split at space or dash
              gradeVal = name.split(/[- ]/)[0];
            }
            // capacity fallback: explicit field or number of linked alumnos
            const cap = Number(s.capacity ?? s.capacidad ?? 0) ||
                        (Array.isArray(s.seccionA) ? s.seccionA.length : 0);
            const assignedCount = Number(
              s.assigned ?? s.asignados ??
                (Array.isArray(s.students) ? s.students.length : 0) ??
                0
            );
            return {
              id: s.id?.toString() || "",
              name,
              grade: gradeVal,
              capacity: cap,
              assigned: assignedCount,
            };
          });
          setSections(mapped);
        }
      } catch (err) {
        console.error("error loading secciones", err);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return sections.filter((s) => {
      const q = query.toLowerCase();
      const matchQuery =
        !query ||
        s.name.toLowerCase().includes(q) ||
        s.grade.toLowerCase().includes(q);
      const matchGrade = !gradeFilter || s.grade === gradeFilter;
      return matchQuery && matchGrade;
    });
  }, [sections, query, gradeFilter]);

  const grades = useMemo(
    () => Array.from(new Set(sections.map((s) => s.grade))).sort(),
    [sections]
  );

  return (
    <main className="flex-1 overflow-y-auto px-4">
      <div className="p-8">
        {/* PageHeading */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Gestión de Secciones
            </h1>
            <p className="text-slate-500 dark:text-[#92aec9] text-base font-normal leading-normal">
              Crea, edita y gestiona las secciones y grupos de alumnos.
            </p>
          </div>
          <Button
            className="flex min-w-[84px] items-center justify-center gap-2"
            onClick={() => navigate("/admin/gestion-secciones/nuevo")}
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="truncate">Crear Nueva Sección</span>
          </Button>
        </div>
        {/* Search & filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar sección por nombre..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select
            value={gradeFilter}
            onValueChange={setGradeFilter}
          >
            <SelectTrigger className="h-12">
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
        </div>
        {/* Table */}
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-[#324d67] bg-white dark:bg-[#111a22]">
              <Table className="text-center min-w-full divide-y divide-slate-200 dark:divide-[#324d67]">
                <TableHeader className="text-center bg-slate-50 dark:bg-[#192733]">
                  <TableRow>
                    <TableHead className="px-6 py-3 text-xs font-medium text-slate-500 dark:text-white uppercase tracking-wider">
                      Sección
                    </TableHead>
                    <TableHead className="px-6 py-3 text-xs font-medium text-slate-500 dark:text-white uppercase tracking-wider">
                      Grado/Nivel
                    </TableHead>
                    <TableHead className="px-6 py-3 text-xs font-medium text-slate-500 dark:text-white uppercase tracking-wider">
                      Capacidad
                    </TableHead>
                    <TableHead className="px-6 py-3 text-xs font-medium text-slate-500 dark:text-white uppercase tracking-wider">
                      Alumnos Asignados
                    </TableHead>
                    <TableHead className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-white uppercase tracking-wider">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                        {s.name}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-[#92aec9]">
                        {s.grade}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-[#92aec9]">
                        {s.capacity}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-[#324d67]">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${Math.round((s.assigned / s.capacity) * 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-slate-900 dark:text-white font-medium">
                            {s.assigned} / {s.capacity}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm" className="p-2 text-slate-500 dark:text-[#92aec9] hover:text-primary dark:hover:text-primary"><span className="material-symbols-outlined">edit</span></Button>
                          <Button variant="ghost" size="sm" className="p-2 text-slate-500 dark:text-[#92aec9] hover:text-red-500 dark:hover:text-red-500"><span className="material-symbols-outlined">delete</span></Button>
                          <Button variant="ghost" size="sm" className="p-2 text-slate-500 dark:text-[#92aec9] hover:text-primary dark:hover:text-primary"><span className="material-symbols-outlined">group</span></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        {/* Pagination placeholder */}
        <div className="flex items-center justify-between mt-6 px-1">
          <p className="text-sm text-slate-500 dark:text-[#92aec9]">
            Mostrando <span className="font-medium text-slate-700 dark:text-white">0</span> a <span className="font-medium text-slate-700 dark:text-white">0</span> de <span className="font-medium text-slate-700 dark:text-white">0</span> resultados
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

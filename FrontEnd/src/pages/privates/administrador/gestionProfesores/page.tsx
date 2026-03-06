import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
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
import DetailsProfesores from "./detailsProfesores";

interface Teacher {
  id: string;
  userName?: string;
  name: string;
  department?: string;
  email: string;
  status: string;
  avatar?: string;
  datosPersonales?: any;
  role?: {
    id: number;
    nombre: string;
    descripcion: string;
    modulos: number[];
  };
  profesorAsignado?: Array<{ materiaId: number; materia: any }>;
}

export default function GestionProfesores() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [selected, setSelected] = useState<Teacher | null>(null);

  // load teachers with roleId=3 on mount
  useEffect(() => {
    async function load() {
      const headers: Record<string,string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      try {
        const res = await fetch(`${api.baseUrl}/users/byrole?roleId=3`, { headers });
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        // normalize shape
        const mapped: Teacher[] = (data || []).map((u: any) => {
          const nombre = u.datosPersonales
            ? `${u.datosPersonales.firstName || ""} ${u.datosPersonales.lastName || ""}`.trim()
            : u.userName || "";
          return {
            id: String(u.id),
            userName: u.userName,
            name: nombre,
            department: u.role?.nombre || "",
            email: u.email || "",
            status: u.active ? "Activo" : "Inactivo",
            avatar: u.avatarUrl || u.avatar || undefined,
            datosPersonales: u.datosPersonales,
            role: u.role,
            profesorAsignado: u.profesorAsignado,
          };
        });
        setTeachers(mapped);
      } catch (err) {
        console.error("error loading teachers", err);
      }
    }
    load();
  }, []);

  const subjects = useMemo<string[]>(
    () =>
      Array.from(
        new Set(
          teachers
            .flatMap((t) =>
              t.profesorAsignado?.map((pa) => pa.materia?.name || "") || []
            )
            .filter(Boolean)
        )
      ).sort(),
    [teachers]
  );

  const filtered = useMemo(() => {
    // sort copy of teachers by numeric id ascending
    const sorted = [...teachers].sort((a, b) => Number(a.id) - Number(b.id));
    return sorted.filter((t) => {
      const q = query.toLowerCase();
      const matchQuery = !query || t.name.toLowerCase().includes(q);
      const matchDept = !departmentFilter || t.department === departmentFilter;
      const matchStatus = !statusFilter || t.status === statusFilter;
      const matchSubject =
        !subjectFilter ||
        (t.profesorAsignado || []).some(
          (pa) => pa.materia?.name === subjectFilter
        );
      return matchQuery && matchDept && matchStatus && matchSubject;
    });
  }, [teachers, query, departmentFilter, statusFilter, subjectFilter, subjectFilter]);

  const departments = useMemo<string[]>(
    () => Array.from(new Set(teachers.map((t) => t.department).filter((x): x is string => Boolean(x)))).sort(),
    [teachers]
  );
  const statuses = useMemo(
    () => Array.from(new Set(teachers.map((t) => t.status).filter(Boolean))).sort(),
    [teachers]
  );

  return (
    <main className="flex-1 p-8 overflow-y-auto overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* PageHeading */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <h1 className="text-white text-3xl font-black leading-tight tracking-tight">
              Gestión de Profesores
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Añade, edita y gestiona la información del personal docente.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              className="w-60"
              onClick={() => navigate("/admin/gestion-profesores/nuevo")}
            >
              <span className="material-symbols-outlined text-xl">add</span>
              <span className="truncate">Añadir Nuevo Profesor</span>
            </Button>
          </div>
        </div>
        {/* Toolbar & filters */}
        <div className="sticky top-[var(--header-height)] z-40 w-full flex flex-wrap items-center gap-4 overflow-x-auto dark:bg-background-dark dark:border dark:border-gray-800 rounded-xl p-6 mb-6 shadow-sm">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-gray-500">search</span>
            </div>
            <Input
              placeholder="Buscar por nombre..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto py-2">
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Materia" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="link" onClick={() => { setDepartmentFilter(""); setStatusFilter(""); setQuery(""); }}>
              Limpiar filtros
            </Button>
          </div>
        </div>
        {/* Table */}
        <div className="@container">
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-background-dark shadow-sm">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
                  <TableRow>
                    <TableHead className="px-4 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ID
                    </TableHead>
                    <TableHead className="px-2 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Nombre Completo
                    </TableHead>
                    <TableHead className="px-2 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Departamento
                    </TableHead>
                    <TableHead className="px-2 py-1 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Materias
                    </TableHead>
                    <TableHead className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </TableHead>
                    <TableHead className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Estado
                    </TableHead>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-2/12">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filtered.map((t) => (
                    <TableRow key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {t.id}
                      </TableCell>
                      <TableCell className="px-4 py-2 whitespace-nowrap text-sm font-medium text-[#111518] dark:text-white flex items-center gap-2">
                        {t.avatar && (
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={t.avatar}
                            alt={`Foto de ${t.name}`}
                          />
                        )}
                        {t.name}
                      </TableCell>
                      <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {t.department}
                      </TableCell>
                      <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {t.profesorAsignado ? t.profesorAsignado.length : 0}
                      </TableCell>
                      <TableCell className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {t.email}
                      </TableCell>
                      <TableCell className="px-4 py-2 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.status === "Activo" ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"}`}>
                          {t.status}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={()=>setSelected(t)}><span className="material-symbols-outlined text-lg">visibility</span></Button>
                          <Button variant="ghost" size="sm" className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"><span className="material-symbols-outlined text-lg">edit</span></Button>
                          <Button variant="ghost" size="sm" className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50"><span className="material-symbols-outlined text-lg">delete</span></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* pagination placeholder */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Mostrando 0 a 0 de 0 resultados
              </span>
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
        </div>
      </div>

      {selected && (
        <DetailsProfesores
          teacher={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}

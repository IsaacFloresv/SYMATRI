import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface Student {
  name: string;
  studentId: string;
  grade: string;
  section: string;
  average: number;
}

interface PageDataProps {
  period?: string;
  students?: Student[];
}

const sampleStudents: Student[] = [
  {
    name: "Juan Pérez García",
    studentId: "SGE24001",
    grade: "5to Grado",
    section: "A",
    average: 95.5,
  },
  {
    name: "María Rodríguez López",
    studentId: "SGE24002",
    grade: "5to Grado",
    section: "B",
    average: 92.8,
  },
  {
    name: "Carlos Sánchez Martín",
    studentId: "SGE24003",
    grade: "4to Grado",
    section: "A",
    average: 91.0,
  },
  {
    name: "Laura Gómez Fernández",
    studentId: "SGE24004",
    grade: "5to Grado",
    section: "A",
    average: 90.2,
  },
  {
    name: "David Martínez Ruiz",
    studentId: "SGE24005",
    grade: "3er Grado",
    section: "C",
    average: 89.5,
  },
  {
    name: "Ana Díaz Pérez",
    studentId: "SGE24006",
    grade: "4to Grado",
    section: "B",
    average: 88.7,
  },
];

export default function PageData({
  period = "2024-I",
  students = sampleStudents,
}: PageDataProps) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "above" | "below" | "failed" | "absences"
  >("above");

  const threshold = 85;
  const aboveStudents = students.filter((s) => s.average >= threshold);
  const belowStudents = students.filter(
    (s) => s.average < threshold && s.average >= 60
  );
  const failedStudents = students.filter((s) => s.average < 60);

  const filtered = useMemo(() => {
    let arr =
      activeTab === "above"
        ? aboveStudents
        : activeTab === "below"
        ? belowStudents
        : activeTab === "failed"
        ? failedStudents
        : students;
    if (!query) return arr;
    return arr.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [activeTab, query, aboveStudents, belowStudents, failedStudents, students]);

  const title =
    activeTab === "above"
      ? `Alumnos por encima del promedio (${aboveStudents.length})`
      : activeTab === "below"
      ? `Alumnos debajo del promedio (${belowStudents.length})`
      : activeTab === "failed"
      ? `Reprobados (${failedStudents.length})`
      : `Registro de Ausencias`;

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="flex items-center justify-center size-8 rounded-lg"
                onClick={() => {
                  /* replace with navigate or onBack prop */
                }}
              >
                <span className="material-symbols-outlined text-black dark:text-white">
                  arrow_back
                </span>
              </Button>
              <p className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Datos del Panel de control
              </p>
            </div>
            <p className="text-gray-600 dark:text-[#92aec9] text-base font-normal leading-normal ml-11">
              Explora en profundidad los datos del panel de control.
            </p>
          </div>
          <Button
            variant="outline"
            className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#233648] pl-4 pr-3 border border-gray-200 dark:border-gray-700"
          >
            <p className="text-black dark:text-white text-sm font-medium leading-normal">
              Periodo: {period}
            </p>
            <span className="material-symbols-outlined text-black dark:text-white">
              expand_more
            </span>
          </Button>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as any)}
            className="flex -mb-px"
          >
            <TabsList>
              <TabsTrigger value="above" className="px-4 py-3">
                Encima del Promedio
              </TabsTrigger>
              <TabsTrigger value="below" className="px-4 py-3">
                Debajo del Promedio
              </TabsTrigger>
              <TabsTrigger value="failed" className="px-4 py-3">
                Reprobados
              </TabsTrigger>
              <TabsTrigger value="absences" className="px-4 py-3">
                Registro de Ausencias
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] overflow-hidden">
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                {title}
              </h2>
              <div className="flex items-center gap-4">
                <Input
                  className="w-64 pl-10 pr-4 py-2 text-sm rounded-lg"
                  placeholder="Buscar alumno..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button className="flex shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#233648] px-3 py-2 border border-gray-200 dark:border-gray-700">
                  <span className="material-symbols-outlined text-black dark:text-white text-base">
                    filter_list
                  </span>
                  <p className="text-black dark:text-white text-sm font-medium">
                    Filtrar
                  </p>
                </Button>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#192734] dark:text-gray-300">
              <TableRow>
                <TableHead className="px-6 py-3">Nombre del Alumno</TableHead>
                <TableHead className="px-6 py-3">ID Alumno</TableHead>
                <TableHead className="px-6 py-3">Grado</TableHead>
                <TableHead className="px-6 py-3">Sección</TableHead>
                <TableHead className="px-6 py-3">Promedio General</TableHead>
                <TableHead className="px-6 py-3">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow
                  key={s.studentId}
                  className="bg-white dark:bg-[#111a22] hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {s.name}
                  </TableCell>
                  <TableCell className="px-6 py-4">{s.studentId}</TableCell>
                  <TableCell className="px-6 py-4">{s.grade}</TableCell>
                  <TableCell className="px-6 py-4">{s.section}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      {s.average}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-primary hover:underline cursor-pointer">
                    Ver Detalles
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* pagination could go here */}
        </div>
      </div>
    </main>
  );
}

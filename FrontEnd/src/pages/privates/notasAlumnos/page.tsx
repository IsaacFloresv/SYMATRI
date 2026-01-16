"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Tipos para datos dinámicos
interface ProfesorInfo {
  nombre: string;
  materia: string;
  avatar?: string;
}

interface NavItem {
  id: string;
  label: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface FilterConfig {
  id: string;
  placeholder: string;
  options: SelectOption[];
  defaultValue?: string;
}

interface TableColumn {
  id: string;
  label: string;
  key: string;
  editable?: boolean;
  type?: "text" | "number" | "date";
}

interface TableRow {
  id: string;
  [key: string]: any;
}

interface SidebarProps {
  profesor: ProfesorInfo;
  navItems: NavItem[];
}

interface FiltersProps {
  filters: FilterConfig[];
  onFilterChange?: (filters: Record<string, string>) => void;
}

interface GradesTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  onRowChange?: (rowId: string, field: string, value: any) => void;
}

// Componente Sidebar dinámico
function SidebarCard({ profesor, navItems }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            {profesor.avatar ? (
              <img
                src={profesor.avatar}
                alt={profesor.nombre}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300" />
            )}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {profesor.nombre}
              </p>
              <p className="text-sm text-gray-500 dark:text-[#92aec9]">
                {profesor.materia}
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="justify-start px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
}

// Componente Filtros dinámico
function FiltersCard({ filters, onFilterChange }: FiltersProps) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleFilterChange = (filterId: string, value: string) => {
    const newValues = { ...filterValues, [filterId]: value };
    setFilterValues(newValues);
    onFilterChange?.(newValues);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className={`grid gap-4 ${filters.length <= 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3 lg:grid-cols-4"}`}>
          {filters.map((filter) => (
            <Select
              key={filter.id}
              defaultValue={filter.defaultValue}
              onValueChange={(value) => handleFilterChange(filter.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente Tabla dinámico
function GradesTable({ columns, rows, onRowChange }: GradesTableProps) {
  const handleInputChange = (
    rowId: string,
    fieldKey: string,
    value: any
  ) => {
    onRowChange?.(rowId, fieldKey, value);
  };

  return (
    <Card>
      <CardContent className="pt-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${column.id}`}>
                    {column.editable ? (
                      <Input
                        type={column.type || "text"}
                        placeholder="0"
                        defaultValue={row[column.key] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            row.id,
                            column.key,
                            e.target.value
                          )
                        }
                        className={column.type === "number" ? "w-20" : ""}
                      />
                    ) : (
                      <span
                        className={
                          column.key === "promedio" ? "font-medium" : ""
                        }
                      >
                        {row[column.key]}
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Componente Principal
export default function notasAlumnos() {
  // Datos dinámicos del profesor
  const [profesor] = useState<ProfesorInfo>({
    nombre: "Prof. Alejandro Rojas",
    materia: "Matemáticas",
    avatar: undefined,
  });

  // Items de navegación dinámicos
  const [navItems] = useState<NavItem[]>([
    { id: "inicio", label: "Inicio" },
    { id: "calificaciones", label: "Calificaciones" },
    { id: "asistencia", label: "Asistencia" },
    { id: "alumnos", label: "Alumnos" },
  ]);

  // Configuración de filtros dinámicos
  const [filters] = useState<FilterConfig[]>([
    {
      id: "seccion",
      placeholder: "Seleccionar sección",
      defaultValue: "5a",
      options: [
        { value: "5a", label: "5º A" },
        { value: "5b", label: "5º B" },
      ],
    },
    {
      id: "materia",
      placeholder: "Seleccionar materia",
      defaultValue: "matematicas",
      options: [
        { value: "matematicas", label: "Matemáticas" },
        { value: "historia", label: "Historia" },
      ],
    },
  ]);

  // Configuración de columnas de tabla
  const [columns] = useState<TableColumn[]>([
    { id: "nombre", label: "Alumno", key: "nombre" },
    { id: "examen", label: "Examen", key: "examen", editable: true, type: "number" },
    { id: "tarea", label: "Tarea", key: "tarea", editable: true, type: "number" },
    { id: "proyecto", label: "Proyecto", key: "proyecto", editable: true, type: "number" },
    { id: "promedio", label: "Promedio", key: "promedio" },
  ]);

  // Datos de alumnos dinámicos
  const [rows, setRows] = useState<TableRow[]>([
    { id: "1", nombre: "Ana Torres", examen: "", tarea: "", proyecto: "", promedio: "9.18" },
    { id: "2", nombre: "Carlos Vega", examen: "", tarea: "", proyecto: "", promedio: "8.13" },
  ]);

  const handleRowChange = (rowId: string, field: string, value: any) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    console.log("Filtros aplicados:", filters);
    // Aquí puedes hacer una llamada al backend para obtener datos
  };

  const handleSave = () => {
    console.log("Guardando datos:", rows);
    // Aquí puedes hacer una llamada al backend para guardar datos
  };

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl flex gap-8">
        <SidebarCard profesor={profesor} navItems={navItems} />

        <section className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            Gestión de Calificaciones
          </h1>

          <FiltersCard filters={filters} onFilterChange={handleFilterChange} />

          <GradesTable
            columns={columns}
            rows={rows}
            onRowChange={handleRowChange}
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
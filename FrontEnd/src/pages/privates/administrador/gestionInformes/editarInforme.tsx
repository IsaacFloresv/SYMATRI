import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/lib/api";

interface ReportConfig {
  id?: string;
  name: string;
  description: string;
  includeGrades: boolean;
  includeAttendance: boolean;
  includeBehavior: boolean;
  includeActivities: boolean;
  gradeFilter: string;
  sectionFilter: string;
  year: string;
  semester: string;
  orderAsc: boolean;
  outputFormat: "PDF" | "XLSX" | "CSV";
}

export default function EditarInforme() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<ReportConfig>({
    name: "",
    description: "",
    includeGrades: false,
    includeAttendance: false,
    includeBehavior: false,
    includeActivities: false,
    gradeFilter: "",
    sectionFilter: "",
    year: "",
    semester: "",
    orderAsc: true,
    outputFormat: "PDF",
  });
  const [, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // placeholder options
  const grades = ["1º Grado", "2º Grado", "3º Grado"];
  const sections = ["A", "B", "C"];
  const years = ["2024", "2023", "2022"];
  const semesters = ["Primer Semestre", "Segundo Semestre"];

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/informes/byid?id=${id}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setForm({
            id: data.id,
            name: data.name || "",
            description: data.description || "",
            includeGrades: Boolean(data.includeGrades),
            includeAttendance: Boolean(data.includeAttendance),
            includeBehavior: Boolean(data.includeBehavior),
            includeActivities: Boolean(data.includeActivities),
            gradeFilter: data.gradeFilter || "",
            sectionFilter: data.sectionFilter || "",
            year: data.year || "",
            semester: data.semester || "",
            orderAsc: data.orderAsc !== false,
            outputFormat: data.outputFormat || "PDF",
          });
        }
      } catch (err) {
        console.error("error loading informe", err);
      }
    }
    load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      await fetch(`${api.baseUrl}/informes/update`, {
        method: "PUT",
        headers,
        body: JSON.stringify(form),
      });
      setMessage("Cambios guardados");
      setTimeout(() => navigate("/admin/gestion-informes"), 1500);
    } catch (err) {
      console.error("error updating informe", err);
      setMessage("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Volver a Informes</span>
          </button>
          <h1 className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">
            Editar Configuración de Informe
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-1">
            Modifica los parámetros del informe.
          </p>
        </header>
        <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-gray-200 dark:border-gray-800">
          {message && <div className="p-4 bg-green-100 text-green-800 rounded mb-4">{message}</div>}
          <form className="p-6 space-y-8" onSubmit={handleSubmit}>
            {/* same contents as nuevoInforme but with controlled values */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Información Básica
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="report-name">
                  Nombre del Informe
                </label>
                <Input
                  id="report-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="report-description">
                  Descripción
                </label>
                <textarea
                  id="report-description"
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  className="form-textarea block w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/50 focus:border-primary focus:ring-primary text-sm"
                ></textarea>
              </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-800" />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Datos a Incluir
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Selecciona los conjuntos de datos que formarán parte del informe.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5">
                  <Checkbox
                    name="includeGrades"
                    checked={form.includeGrades}
                    onCheckedChange={(v) => setForm((p) => ({ ...p, includeGrades: Boolean(v) }))}
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Calificaciones</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5">
                  <Checkbox
                    name="includeAttendance"
                    checked={form.includeAttendance}
                    onCheckedChange={(v) => setForm((p) => ({ ...p, includeAttendance: Boolean(v) }))}
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Asistencia</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5">
                  <Checkbox
                    name="includeBehavior"
                    checked={form.includeBehavior}
                    onCheckedChange={(v) => setForm((p) => ({ ...p, includeBehavior: Boolean(v) }))}
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Conducta</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5">
                  <Checkbox
                    name="includeActivities"
                    checked={form.includeActivities}
                    onCheckedChange={(v) => setForm((p) => ({ ...p, includeActivities: Boolean(v) }))}
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Actividades Extrac.</span>
                </label>
              </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-800" />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filtros de Datos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="filter-grade">
                    Por Grado
                  </label>
                  <Select
                    name="gradeFilter"
                    value={form.gradeFilter}
                    onValueChange={(v) => setForm((p) => ({ ...p, gradeFilter: v }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todos los grados" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="filter-section">
                    Por Sección
                  </label>
                  <Select
                    name="sectionFilter"
                    value={form.sectionFilter}
                    onValueChange={(v) => setForm((p) => ({ ...p, sectionFilter: v }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todas las secciones" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Por Periodo</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Select
                        name="year"
                        value={form.year}
                        onValueChange={(v) => setForm((p) => ({ ...p, year: v }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar año" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((y) => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Select
                        name="semester"
                        value={form.semester}
                        onValueChange={(v) => setForm((p) => ({ ...p, semester: v }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar semestre" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Orden</label>
                  <div className="flex items-center space-x-6 mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        name="orderAsc"
                        checked={form.orderAsc}
                        onCheckedChange={(v) => setForm((p) => ({ ...p, orderAsc: Boolean(v) }))}
                      />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Ascendente</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        name="orderAsc"
                        checked={!form.orderAsc}
                        onCheckedChange={(v) => setForm((p) => ({ ...p, orderAsc: !Boolean(v) }))}
                      />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Descendente</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-800" />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Formato de Salida</h2>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    checked={form.outputFormat === "PDF"}
                    className="form-radio h-4 w-4 text-primary focus:ring-primary"
                    name="output-format"
                    type="radio"
                    value="PDF"
                    onChange={handleChange}
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">PDF</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    checked={form.outputFormat === "XLSX"}
                    className="form-radio h-4 w-4 text-primary focus:ring-primary"
                    name="output-format"
                    type="radio"
                    value="XLSX"
                    onChange={handleChange}
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Excel (XLSX)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    checked={form.outputFormat === "CSV"}
                    className="form-radio h-4 w-4 text-primary focus:ring-primary"
                    name="output-format"
                    type="radio"
                    value="CSV"
                    onChange={handleChange}
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">CSV</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-background-dark/50 rounded-b-xl">
              <Button variant="outline" onClick={() => navigate(-1)} type="button">
                Cancelar
              </Button>
              <Button variant="outline">
                <span className="material-symbols-outlined text-xl">visibility</span>
                <span className="truncate">Generar Vista Previa</span>
              </Button>
              <Button type="submit">Guardar Cambios</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

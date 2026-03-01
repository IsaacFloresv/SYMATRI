import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NuevoMateria() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    grades: [] as string[],
  });

  const toggleGrade = (grade: string) => {
    setForm((p) => {
      const exists = p.grades.includes(grade);
      return {
        ...p,
        grades: exists ? p.grades.filter((g) => g !== grade) : [...p.grades, grade],
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // TODO: call API to create materia
      console.log("submit", form);
      navigate("/admin/gestion-materias");
    } catch (err) {
      console.error(err);
    }
  };

  const allGrades = [
    "1º Primaria",
    "2º Primaria",
    "3º Primaria",
    "4º Primaria",
    "5º Primaria",
    "6º Primaria",
    "1º ESO",
    "2º ESO",
  ];

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col rounded-xl shadow-lg bg-white dark:bg-[#192733]">
          {/* Card Header */}
          <div className="p-6 border-b border-gray-200 dark:border-[#324d67]">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">
              Añadir Nueva Materia
            </h2>
            <p className="text-base font-normal leading-normal text-gray-600 dark:text-[#92aec9]">
              Completa los siguientes campos para registrar una nueva asignatura en el sistema.
            </p>
          </div>
          {/* Form */}
          <div className="p-6">
            <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
              {/* Nombre de la Materia */}
              <div className="md:col-span-1">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-700 dark:text-white">
                    Nombre de la Materia
                  </p>
                  <Input
                    placeholder="Ej: Matemáticas Avanzadas"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="h-11"
                  />
                </label>
              </div>
              {/* Código de Identificación */}
              <div className="md:col-span-1">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-700 dark:text-white">
                    Código de Identificación
                  </p>
                  <Input
                    placeholder="Ej: MAT-AV-01"
                    value={form.code}
                    onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
                    className="h-11"
                  />
                </label>
              </div>
              {/* Descripción Breve */}
              <div className="md:col-span-2">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-700 dark:text-white">
                    Descripción Breve
                  </p>
                  <textarea
                    placeholder="Introduce una descripción de la materia..."
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-sm font-normal leading-normal text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-[#324d67] dark:bg-[#192733] dark:text-white dark:placeholder:text-[#92aec9] dark:focus:border-primary min-h-24"
                  />
                </label>
              </div>
              {/* Asignar Grados */}
              <div className="md:col-span-2">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-700 dark:text-white">
                  Asignar Grados
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 rounded-lg border border-gray-300 dark:border-[#324d67] p-4">
                  {allGrades.map((g) => (
                    <label key={g} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.grades.includes(g)}
                        onChange={() => toggleGrade(g)}
                        className="form-checkbox h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary/50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                      />
                      <span className="text-sm text-gray-900 dark:text-gray-300">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Form Actions */}
              <div className="md:col-span-2 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar Materia</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

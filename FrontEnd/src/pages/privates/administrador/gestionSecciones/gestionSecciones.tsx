import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function NuevoSeccion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    grade: "",
    description: "",
  });

  const grades = [
    "1º Primaria",
    "2º Primaria",
    "3º Primaria",
    "1º Secundaria",
    "2º Secundaria",
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const headers: Record<string,string> = {"Content-Type":"application/json"};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      await fetch(`${api.baseUrl}/secciones/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
      navigate("/admin/gestion-secciones");
    } catch (err) {
      console.error("error creating seccion", err);
    }
  };

  return (
    <main className="p-8 bg-background-light dark:bg-background-dark font-display text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-1 mb-8">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-2"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Volver a Secciones</span>
          </button>
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Crear Nueva Sección
          </p>
          <p className="text-[#92aec9] text-base font-normal leading-normal">
            Rellena los detalles para añadir una nueva sección al sistema.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="px-4 py-3">
              <label className="flex flex-col">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Nombre de la sección *
                </p>
                <Input
                  placeholder="Ej. Sección A, Grupo 1-A"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="h-14"
                />
              </label>
            </div>
            <div className="px-4 py-3">
              <label className="flex flex-col">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Grado / Nivel
                </p>
                <select
                  className="form-input h-14"
                  value={form.grade}
                  onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))}
                >
                  <option value="">Selecciona un grado</option>
                  {grades.map((g) => (
                    <option key={g} value={g} className="bg-[#192733]">
                      {g}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="px-4 py-3">
            <label className="flex flex-col">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Descripción (Opcional)
              </p>
              <textarea
                placeholder="Añade una descripción o notas adicionales sobre esta sección."
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary min-h-36 placeholder:text-[#92aec9] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          <div className="flex flex-wrap justify-end gap-4 mt-10 px-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </main>
  );
}

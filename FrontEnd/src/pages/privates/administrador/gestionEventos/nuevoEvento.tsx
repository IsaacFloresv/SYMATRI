import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface EventData {
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  audience: string;
}

export default function NuevoEvento() {
  const navigate = useNavigate();
  const [form, setForm] = useState<EventData>({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    location: "",
    audience: "Todos",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const headers: Record<string,string> = {"Content-Type":"application/json"};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      await fetch(`${api.baseUrl}/eventos/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
      navigate("/admin/gestion-eventos");
    } catch (err) {
      console.error("error creating event", err);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Añadir Nuevo Evento
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Completa el formulario para crear un nuevo evento escolar.
            </p>
          </div>
          <div className="bg-white dark:bg-[#111a22] rounded-xl shadow-md p-6 lg:p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="event-name">
                  Nombre del Evento
                </label>
                <Input
                  id="event-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ej. Festival de Primavera"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="start-date">
                    Fecha de Inicio
                  </label>
                  <Input
                    id="start-date"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="end-date">
                    Fecha de Fin
                  </label>
                  <Input
                    id="end-date"
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="start-time">
                    Hora de Inicio
                  </label>
                  <Input
                    id="start-time"
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm((p) => ({ ...p, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="end-time">
                    Hora de Fin
                  </label>
                  <Input
                    id="end-time"
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm((p) => ({ ...p, endTime: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="description">
                  Descripción
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="form-textarea block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#233648] text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                  placeholder="Describe los detalles del evento, actividades, y cualquier información relevante."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="location">
                  Ubicación
                </label>
                <Input
                  id="location"
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                  placeholder="Ej. Auditorio Principal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="target-audience">
                  Público Objetivo
                </label>
                <select
                  id="target-audience"
                  className="form-select block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#233648] text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                  value={form.audience}
                  onChange={(e) => setForm((p) => ({ ...p, audience: e.target.value }))}
                >
                  <option>Todos</option>
                  <option>Alumnos</option>
                  <option>Profesores</option>
                  <option>Padres</option>
                  <option>1er Grado</option>
                  <option>2do Grado</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" onClick={() => navigate(-1)} type="button">
                  Cancelar
                </Button>
                <Button type="submit">Guardar Evento</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

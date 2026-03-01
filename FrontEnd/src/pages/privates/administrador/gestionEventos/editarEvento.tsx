import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/lib/api";

interface EventData {
  id?: string;
  name: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
  location: string;
  audience: string;
}

export default function EditarEvento() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<EventData>({
    name: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    location: "",
    audience: "Alumnos y Padres",
  });

  useEffect(() => {
    if (!id) return;
    async function load() {
      const headers: Record<string,string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      try {
        const res = await fetch(`${api.baseUrl}/eventos/byid?id=${id}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setForm({
            name: data.name || "",
            startDate: data.startDate || "",
            startTime: data.startTime || "",
            endDate: data.endDate || "",
            endTime: data.endTime || "",
            description: data.description || "",
            location: data.location || "",
            audience: data.audience || "Alumnos y Padres",
            id: data.id,
          });
        }
      } catch (err) {
        console.error("error loading event", err);
      }
    }
    load();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const headers: Record<string,string> = {"Content-Type":"application/json"};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      await fetch(`${api.baseUrl}/eventos/update`, {
        method: "PUT",
        headers,
        body: JSON.stringify(form),
      });
      navigate("/admin/gestion-eventos");
    } catch (err) {
      console.error("error updating event", err);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
              onClick={() => navigate(-1)}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Volver a Eventos</span>
            </button>
            <p className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Editar Evento
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Actualiza la información del evento.
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
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="event-description">
                  Descripción
                </label>
                <textarea
                  id="event-description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="form-textarea block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#233648] text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="event-location">
                  Ubicación
                </label>
                <Input
                  id="event-location"
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
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
                  <option>Alumnos</option>
                  <option>Alumnos y Padres</option>
                  <option>Padres</option>
                  <option>Personal Docente</option>
                  <option>Toda la comunidad</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" onClick={() => navigate(-1)} type="button">
                  Cancelar
                </Button>
                <Button type="submit">Guardar Cambios</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

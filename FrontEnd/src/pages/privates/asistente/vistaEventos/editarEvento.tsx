"use client"

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { useNavigate, useParams } from "react-router-dom";

interface EventForm {
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  targetAudience: string;
}

const defaultForm: EventForm = {
  name: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  description: "",
  location: "",
  targetAudience: "Todos",
};

export default function EditarEventoAsistente() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<EventForm>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSelect = (value: string) => {
    setForm((f) => ({ ...f, targetAudience: value }));
  };

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/eventos/${id}`, { headers });
        if (res.ok) {
          const ev = await res.json();
          setForm({
            name: ev.title || "",
            startDate: ev.date || "",
            endDate: ev.endDate || ev.date || "",
            startTime: ev.time || "",
            endTime: ev.endTime || "",
            description: ev.description || "",
            location: ev.location || "",
            targetAudience: ev.targetAudience || "Todos",
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/eventos/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(form),
      });
      if (res.ok) {
        navigate("/asistente/vista-eventos");
      } else {
        console.error("update failed", await res.text());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-8">Cargando...</p>;

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="link"
              className="inline-flex items-center gap-2 mb-4"
              onClick={() => navigate(-1)}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Volver a Eventos</span>
            </Button>
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
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="name"
                >
                  Nombre del Evento
                </label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="startDate">
                      Fecha de Inicio
                    </label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={form.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="startTime">
                      Hora de Inicio
                    </label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={form.startTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="endDate">
                      Fecha de Fin
                    </label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={form.endDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="endTime">
                      Hora de Fin
                    </label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={form.endTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="description">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#233648] text-gray-900 dark:text-white focus:border-primary focus:ring-primary"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="location">
                  Ubicación
                </label>
                <Input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="targetAudience">
                  Público Objetivo
                </label>
                <Select value={form.targetAudience} onValueChange={handleSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Alumnos">Alumnos</SelectItem>
                    <SelectItem value="Profesores">Profesores</SelectItem>
                    <SelectItem value="Padres">Padres</SelectItem>
                    <SelectItem value="1er Grado">1er Grado</SelectItem>
                    <SelectItem value="2do Grado">2do Grado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Guardando…" : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
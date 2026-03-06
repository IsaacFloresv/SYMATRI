"use client"

import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

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

export default function GestionEventosAsistente() {
  const [form, setForm] = useState<EventForm>(defaultForm);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSelect = (value: string) => {
    setForm((f) => ({ ...f, targetAudience: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/eventos`, {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
      if (res.ok) {
        navigate("/asistente/vista-eventos");
      } else {
        console.error("failed creating event", await res.text());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
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
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="name"
                >
                  Nombre del Evento
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ej. Festival de Primavera"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="startDate"
                  >
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
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="endDate"
                  >
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
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="startTime"
                  >
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
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="endTime"
                  >
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
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="description"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#233648] text-gray-900 dark:text-white focus:border-primary focus:ring-primary"
                  placeholder="Describe los detalles del evento, actividades, y cualquier información relevante."
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="location"
                >
                  Ubicación
                </label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Ej. Auditorio Principal"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  htmlFor="targetAudience"
                >
                  Público Objetivo
                </label>
                <Select
                  value={form.targetAudience}
                  onValueChange={handleSelect}
                >
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Guardando…" : "Guardar Evento"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
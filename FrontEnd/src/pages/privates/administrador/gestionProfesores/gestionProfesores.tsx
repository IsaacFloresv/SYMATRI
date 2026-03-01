import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

interface Availability {
  day: string;
  start: string;
  end: string;
}

export default function NuevoProfesor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    birthDate: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    specialties: "",
    departments: [] as string[],
    status: "Activo",
    availability: [] as Availability[],
  });

  const allDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const toggleDepartment = (dep: string) => {
    setForm((p) => {
      const exists = p.departments.includes(dep);
      return {
        ...p,
        departments: exists ? p.departments.filter((d) => d !== dep) : [...p.departments, dep],
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const headers: Record<string,string> = {"Content-Type":"application/json"};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      await fetch(`${api.baseUrl}/profesores/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
      navigate("/admin/gestion-profesores");
    } catch (err) {
      console.error("error creating profesor", err);
    }
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Back link and heading */}
        <div className="flex flex-col gap-1 mb-8 px-4">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-2"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Volver a Profesores</span>
          </button>
          <p className="text-[#111518] dark:text-white text-3xl font-bold tracking-tight">
            Añadir Nuevo Profesor
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
            Complete el formulario para registrar un nuevo profesor en el sistema.
          </p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="dark:bg-background-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-8">
              <h2 className="text-lg pl-1 font-semibold text-[#111518] dark:text-white mb-1">
                Información Personal
              </h2>
              <p className="text-sm pl-1 text-gray-500 dark:text-gray-400 mb-6">
                Datos básicos del profesor.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre
                  </label>
                  <Input
                    value={form.nombre}
                    onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                    placeholder="Ej: Ana"
                  />
                </div>
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Apellido
                  </label>
                  <Input
                    value={form.apellido}
                    onChange={(e) => setForm((p) => ({ ...p, apellido: e.target.value }))}
                    placeholder="Ej: Sánchez"
                  />
                </div>
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <Input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => setForm((p) => ({ ...p, birthDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Género
                  </label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-primary focus:border-primary text-sm p-2"
                    value={form.gender}
                    onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))}
                  >
                    <option value="">Seleccionar género</option>
                    <option>Femenino</option>
                    <option>Masculino</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="dark:bg-background-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-8">
              <div className="mb-6 pl-1">
                <h2 className="text-lg font-semibold text-[#111518] dark:text-white mb-1">
                  Información de Contacto
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Datos para contactar al profesor.
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 mb-6">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 mt-0.5">
                  lock
                </span>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Esta información es privada y solo será utilizada por personal autorizado en caso de emergencia. No será visible para alumnos ni padres.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    placeholder="+34 123 456 789"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block pl-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Dirección
                  </label>
                  <Input
                    placeholder="Calle Falsa 123, Ciudad"
                    value={form.address}
                    onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="dark:bg-background-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-8">
              <h2 className="text-lg pl-1 font-semibold text-[#111518] dark:text-white mb-1">
                Información Académica
              </h2>
              <p className="text-sm pl-1 text-gray-500 dark:text-gray-400 mb-6">
                Formación y experiencia del profesor.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Título/Formación
                  </label>
                  <Input
                    placeholder="Ej: Licenciatura en Matemáticas"
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block pl-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Especialidades/Materias
                  </label>
                  <Input
                    placeholder="Ej: Álgebra, Geometría, Cálculo"
                    value={form.specialties}
                    onChange={(e) => setForm((p) => ({ ...p, specialties: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">Separar por comas.</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm pl-1 font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Departamentos
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    {[
                      "Ciencias",
                      "Matemáticas",
                      "Historia",
                      "Artes",
                      "Lenguas",
                    ].map((dep) => (
                      <label key={dep} className="flex items-center gap-2">
                        <Checkbox
                          checked={form.departments.includes(dep)}
                          onCheckedChange={() => toggleDepartment(dep)}
                        />
                        <span className="text-sm text-gray-900 dark:text-gray-300">
                          {dep}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm pl-1 font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estado
                  </p>
                  <select
                    className="w-full border p-2 border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-primary focus:border-primary text-sm"
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                  >
                    <option>Activo</option>
                    <option>Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="dark:bg-background-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-8">
              <h2 className="text-lg font-semibold text-[#111518] dark:text-white mb-1">
                Disponibilidad Horaria
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Seleccione los días y franjas horarias disponibles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-30 gap-y-4">
                {allDays.map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{day}</span>
                    <div className="flex items-center gap-2">
                      <Input type="time" className="w-28" />
                      <span className="text-gray-500">-</span>
                      <Input type="time" className="w-28" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Profesor</Button>
          </div>
        </form>
      </div>
    </main>
  );
}

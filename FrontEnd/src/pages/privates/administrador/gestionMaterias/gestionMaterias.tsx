import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/lib/api";

export default function NuevoMateria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    // code field removed; instead choose profesor
    profesorId: "",
    description: "",
    gradoId: "", // store selected grade id as string
  });

  const [gradesOptions, setGradesOptions] = useState<{ id: number; name: string }[]>([]);
  const [teacherOptions, setTeacherOptions] = useState<{ id: string; name: string }[]>([]);
  const [relationId, setRelationId] = useState<string>("");

  // grades checkbox logic removed; using select now

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const payload: any = {
        name: form.name,
        description: form.description,
      };
      if (form.gradoId) payload.gradoId = parseInt(form.gradoId, 10);

      let url = `${api.baseUrl}/materias/create`;
      let method: "POST" | "PUT" = "POST";
      let materiaId: any = id;
      if (isEditing && id) {
        url = `${api.baseUrl}/materias/update`;
        method = "PUT";
        payload.id = id;
      }

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("materia save failed");
      const result = await res.json();
      // obtain id for new record
      if (!isEditing && result && result.id) {
        materiaId = result.id;
      }

      // handle assignment to professor
      if (form.profesorId && materiaId) {
        const relPayload: any = {
          materiaId: materiaId,
          profesorId: parseInt(form.profesorId, 10),
        };
        if (relationId) {
          relPayload.id = relationId;
          await fetch(`${api.baseUrl}/materiasProfesores/update`, {
            method: "PUT",
            headers,
            body: JSON.stringify(relPayload),
          });
        } else {
          await fetch(`${api.baseUrl}/materiasProfesores/create`, {
            method: "POST",
            headers,
            body: JSON.stringify(relPayload),
          });
        }
      }

      navigate("/admin/gestion-materias");
    } catch (err) {
      console.error(isEditing ? "error updating materia" : "error creating materia", err);
    }
  };


  // fetch list of grades and teachers for dropdowns
  useEffect(() => {
    async function loadGrades() {
      try {
        const headers: Record<string,string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/grados/all`, { headers });
        if (res.ok) {
          const data: any[] = await res.json();
          setGradesOptions(data.map((g) => ({ id: g.id, name: g.name })));
        }
      } catch (err) {
        console.error("error loading grades", err);
      }
    }

    async function loadTeachers() {
      try {
        const headers: Record<string,string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/users/byrole?roleId=3`, { headers });
        if (res.ok) {
          const data: any[] = await res.json();
          const list = data.map((u) => {
            const nombre = u.datosPersonales
              ? `${u.datosPersonales.firstName || ""} ${u.datosPersonales.lastName || ""}`.trim()
              : u.userName || "";
            return { id: String(u.id), name: nombre };
          });
          setTeacherOptions(list);
        }
      } catch (err) {
        console.error("error loading teachers", err);
      }
    }

    loadGrades();
    loadTeachers();
  }, []);

  useEffect(() => {
    async function load() {
      if (!isEditing || !id) return;
      try {
        const headers: Record<string,string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/materias/byid?id=${id}`, { headers });
        if (res.ok) {
          const data: any = await res.json();
          setForm({
            name: data.name || "",
            profesorId:
              data.materia && data.materia.length
                ? String(data.materia[0].profesorAsignado?.id || "")
                : "",
            description: data.description || "",
            gradoId: data.gradoId ? String(data.gradoId) : "",
          });
          if (data.materia && data.materia.length) {
            setRelationId(String(data.materia[0].id));
          }
        }
      } catch (err) {
        console.error("error loading materia", err);
      }
    }
    load();
  }, [id, isEditing]);

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col rounded-xl shadow-lg bg-white dark:bg-[#192733]">
          {/* Card Header */}
          <div className="p-6 border-b border-gray-200 dark:border-[#324d67]">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">
              {isEditing ? "Editar Materia" : "Añadir Nueva Materia"}
            </h2>
            <p className="text-base font-normal leading-normal text-gray-600 dark:text-[#92aec9]">
              {isEditing
                ? "Modifica los datos de la asignatura existente y guarda los cambios."
                : "Completa los siguientes campos para registrar una nueva asignatura en el sistema."}
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
              {/* Seleccionar Profesor */}
              <div className="md:col-span-1">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-700 dark:text-white">
                    Profesor a Cargo
                  </p>
                  <Select
                    value={form.profesorId}
                    onValueChange={(val) => setForm((p) => ({ ...p, profesorId: val }))}
                  >
                    <SelectTrigger className="w-full px-3 py-5">
                      <SelectValue placeholder="Seleccione un profesor" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherOptions.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              {/* Seleccionar Grado */}
              <div className="md:col-span-2">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium leading-normal text-gray-700 dark:text-white">
                    Grado
                  </p>
                  <Select
                    value={form.gradoId}
                    onValueChange={(val) => setForm((p) => ({ ...p, gradoId: val }))}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Selecciona un grado" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradesOptions.map((g) => (
                        <SelectItem key={g.id} value={String(g.id)}>
                          {g.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
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

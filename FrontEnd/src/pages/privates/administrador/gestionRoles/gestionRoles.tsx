import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { moduleMap } from "@/config/moduleMaps";

interface RoleForm {
  nombre: string;
  descripcion: string;
  modulos: number[];
}

export default function GestionRolesForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<RoleForm>({
    nombre: "",
    descripcion: "",
    modulos: [],
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const headers: Record<string,string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/roles/byid?id=${id}`, { headers });
        if (!res.ok) throw new Error("failed load");
        const data = await res.json();
        setForm({
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          modulos: Array.isArray(data.modulos) ? data.modulos : [],
        });
      } catch (err) {
        console.error("load role", err);
      }
    })();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const headers: Record<string,string> = { "Content-Type": "application/json" };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const payload: any = { ...form };
      let url = `${api.baseUrl}/roles/create`;
      let method: "POST" | "PUT" = "POST";
      if (id) {
        url = `${api.baseUrl}/roles/update`;
        method = "PUT";
        payload.id = id;
      }
      await fetch(url, { method, headers, body: JSON.stringify(payload) });
      navigate("/admin/gestion-roles");
    } catch (err) {
      console.error(id ? "error updating role" : "error creating role", err);
    }
  };

  const toggleModule = (mid: number) => {
    setForm((p) => {
      const arr = new Set(p.modulos);
      if (arr.has(mid)) arr.delete(mid);
      else arr.add(mid);
      return { ...p, modulos: Array.from(arr) };
    });
  };

  const modules = Object.values(moduleMap);

  return (
    <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-900 dark:text-white text-2xl font-bold tracking-tight">
              {id ? "Editar Rol" : "Configurar Rol"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Define el nombre, descripción y permisos específicos para este rol.
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Volver</span>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-card-dark p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Información Básica
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="role-name">
                      Nombre del Rol
                    </label>
                    <Input
                      id="role-name"
                      value={form.nombre}
                      onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="role-desc">
                      Descripción
                    </label>
                    <textarea
                      id="role-desc"
                      className="form-input w-full rounded-md px-3 py-2 text-sm"
                      value={form.descripcion}
                      onChange={(e) => setForm((p) => ({ ...p, descripcion: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-card-dark p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                  Permisos de Módulos
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Selecciona a qué secciones del sistema tendrá acceso este rol.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {modules.map((m) => (
                    <label key={m.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={form.modulos.includes(m.id)}
                        onCheckedChange={() => toggleModule(m.id)}
                      />
                      <span className="text-sm">{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </div>
    </main>
  );
}

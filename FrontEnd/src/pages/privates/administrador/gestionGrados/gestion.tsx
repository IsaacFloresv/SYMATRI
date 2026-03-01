import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export default function NuevoGrado() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
    name: "",
    level: "",
    active: true,
  });
  const [, setLoading] = useState(false);

  // if id present, fetch existing grade
  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const headers: Record<string,string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/grados/byid?id=${id}`, { headers });
        if (!res.ok) throw new Error("failed load");
        const data = await res.json();
        setForm({
          code: data.code || "",
          name: data.name || "",
          level: data.level || "",
          active: data.active !== undefined ? data.active : true,
        });
      } catch (err) {
        console.error("load grado", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const payload = { ...form };
      // ensure active is boolean
      payload.active = !!payload.active;
      let url = `${api.baseUrl}/grados/create`;
      let method: "POST" | "PUT" = "POST";
      if (id) {
        url = `${api.baseUrl}/grados/update`;
        method = "PUT";
        (payload as any).id = id;
      }
      await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });
      navigate("/admin/gestion-grados");
    } catch (err) {
      console.error(id ? "error updating grado" : "error creating grado", err);
    }
  };

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-2 mb-8">
          <Button variant="link" onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary w-fit">
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Volver a Grados</span>
          </Button>
          <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">Añadir Nuevo Grado</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Complete el formulario para crear un nuevo grado académico.</p>
        </div>
        <div className="bg-white dark:bg-[#182635] rounded-xl border border-gray-200 dark:border-white/10">
          <form onSubmit={handleSubmit}>
            <div className="p-6 md:p-8 space-y-6">
                <div>
                <label className="flex flex-col">
                  <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Código</p>
                  <Input
                    id="grade-code"
                    name="code"
                    placeholder="Ej: G1, GRADO10"
                    value={form.code}
                    onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
                    className="h-14"
                  />
                </label>
              </div>
              <div>
                <label className="flex flex-col">
                  <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre del Grado</p>
                  <Input
                    id="grade-name"
                    name="name"
                    placeholder="Ej: Primer Grado, Décimo Año"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="h-14"
                  />
                </label>
              </div>
              <div>
                <label className="flex flex-col">
                  <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nivel Educativo</p>
                  <Input
                    id="grade-level"
                    name="level"
                    placeholder="Ej: Primaria, Secundaria"
                    value={form.level}
                    onChange={(e) => setForm((p) => ({ ...p, level: e.target.value }))}
                    className="h-14"
                  />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="grade-active"
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
                  className="h-4 w-4"
                />
                <label htmlFor="grade-active" className="text-sm text-gray-700 dark:text-gray-300">
                  Activo
                </label>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 px-6 py-4 md:px-8 flex justify-end items-center gap-3 rounded-b-xl border-t border-gray-200 dark:border-white/10">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

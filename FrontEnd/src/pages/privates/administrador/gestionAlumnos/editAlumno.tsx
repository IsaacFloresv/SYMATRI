import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/lib/api";

export default function EditAlumno() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmail: "",
    guardianAddress: "",
    guardianRelation: "",
    guardianContact: "",
    sameAsStudent: false,
    grade: "",
    section: "",
    "previous-institution": "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [grades, setGrades] = useState<string[]>([]);
  const [sectionOptions, setSectionOptions] = useState<
    { id: string; grade: string; letter: string }[]
  >([]);

  // load existing data
  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/users/byid?id=${id}`, { headers });
        if (!res.ok) throw new Error("failed fetch user");
        const user = await res.json();
        const dataRes = await fetch(`${api.baseUrl}/dataUsers/byUserId?userId=${id}`, { headers });
        const data = dataRes.ok ? await dataRes.json() : {};
        const secRes = await fetch(`${api.baseUrl}/seccionAlumnos/byUser?userId=${id}`, { headers });
        const sec = secRes.ok ? await secRes.json() : {};
        setForm((p) => ({
          ...p,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: user.email || "",
          address: data.address || "",
          phone: data.telefono || "",
          guardianFirstName: data.guardianFirstName || "",
          guardianLastName: data.guardianLastName || "",
          guardianEmail: data.guardianEmail || "",
          guardianAddress: data.guardianAddress || "",
          guardianRelation: data.guardianRelation || "",
          guardianContact: data.guardianContact || "",
          grade: sec.periodo || "",
          section: sec.seccionId || "",
          "previous-institution": data["previous-institution"] || "",
        }));
      } catch (err) {
        console.error("load error", err);
      }
    }
    load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // load grade/section options from server
  useEffect(() => {
    async function loadSections() {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/secciones/all`, { headers });
        if (!res.ok) return;
        const data = await res.json();
        const opts = data.map((s: any) => {
          const name: string = s.name || "";
          const parts = name.split("-");
          const grade = parts[0]?.trim() || "";
          const letter = parts[1]?.trim() || name;
          return { id: s.id?.toString() || "", grade, letter };
        });
        setSectionOptions(opts);
        setGrades(Array.from(new Set<string>(opts.map((o) => o.grade))).sort());
      } catch (err) {
        console.error("unable to load sections for alumno edit form", err);
      }
    }
    loadSections();
  }, []);

  // keep section id valid when grade or options update
  useEffect(() => {
    if (form.grade && form.section) {
      const valid = sectionOptions.some(
        (o) => o.grade === form.grade && o.id === form.section
      );
      if (!valid) {
        setForm((p) => ({ ...p, section: "" }));
      }
    }
  }, [form.grade, form.section, sectionOptions]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      // update user
      await fetch(`${api.baseUrl}/users/update`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ id, email: form.email }),
      });
      // update dataUser
      await fetch(`${api.baseUrl}/dataUsers/update`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          userId: id,
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          telefono: form.phone,
          guardianFirstName: form.guardianFirstName,
          guardianLastName: form.guardianLastName,
          guardianEmail: form.guardianEmail,
          guardianAddress: form.guardianAddress,
          guardianRelation: form.guardianRelation,
          guardianContact: form.guardianContact,
          "previous-institution": form["previous-institution"],
        }),
      });
      // update section
      await fetch(`${api.baseUrl}/seccionAlumnos/update`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ alumnoId: id, seccionId: form.section, periodo: form.grade }),
      });
      setMessage("Datos actualizados correctamente");
      setTimeout(() => navigate("/admin/gestion-alumnos"), 1500);
    } catch (err) {
      console.error("update error", err);
      setMessage("Error al actualizar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex flex-1 justify-center py-5 sm:px-6 lg:px-8">
      <div className="layout-content-container flex flex-col w-full max-w-7xl px-4">
        <div className="flex flex-wrap justify-between items-center gap-4 py-4 sm:px-0">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="flex items-center gap-2 text-primary text-sm font-bold hover:underline"
              onClick={() => navigate(-1)}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Volver a la lista de alumnos</span>
            </button>
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Editar Alumno
            </h1>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1c2127] rounded-lg border border-slate-300 dark:border-[#3b4854] mt-4">
          {message && (
            <div className="p-4 bg-green-100 text-green-800 rounded mb-4">
              {message}
            </div>
          )}
          <form className="p-6 space-y-8" onSubmit={handleSubmit}>
            {/* Personal */}
            <div className="border-b border-slate-300 dark:border-[#3b4854] pb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Información Personal
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Datos personales del alumno.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="firstName"
                  >
                    Nombre
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Ej. Juan"
                    value={form.firstName}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="lastName"
                  >
                    Apellido
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Ej. Pérez"
                    value={form.lastName}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="birthDate"
                  >
                    Fecha de Nacimiento
                  </label>
                  <div className="relative">
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={form.birthDate}
                      onChange={handleChange}
                      className="pl-4 pr-10 text-left"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      calendar_month
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="gender"
                  >
                    Género
                  </label>
                  <Select
                    value={form.gender}
                    onValueChange={(v) => setForm((p) => ({ ...p, gender: v }))}
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div className="border-b border-slate-300 dark:border-[#3b4854] pb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Información de Contacto
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Dirección y datos de contacto del alumno.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="email"
                  >
                    Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="phone"
                  >
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+52 123 456 7890"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
                <div className="sm:col-span-6">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="address"
                  >
                    Dirección
                  </label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Av. Siempre Viva 742"
                    value={form.address}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Tutor */}
            <div className="border-b border-slate-300 dark:border-[#3b4854] pb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Datos del Tutor
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Información del padre, madre o tutor legal.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="guardianFirstName"
                  >
                    Nombre del Tutor
                  </label>
                  <Input
                    id="guardianFirstName"
                    name="guardianFirstName"
                    placeholder="Ej. Ana"
                    value={form.guardianFirstName}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="guardianLastName"
                  >
                    Apellidos del Tutor
                  </label>
                  <Input
                    id="guardianLastName"
                    name="guardianLastName"
                    placeholder="Ej. García"
                    value={form.guardianLastName}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="guardianEmail"
                  >
                    Email del Tutor
                  </label>
                  <Input
                    id="guardianEmail"
                    name="guardianEmail"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={form.guardianEmail}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
                <div className="sm:col-span-6">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="guardianAddress"
                  >
                    Dirección del Tutor
                  </label>
                  <Input
                    id="guardianAddress"
                    name="guardianAddress"
                    placeholder="Av. Ejemplo 123"
                    value={form.guardianAddress}
                    onChange={handleChange}
                    className="mt-1 w-full"
                    disabled={form.sameAsStudent}
                  />
                </div>
                <div className="sm:col-span-3 mt-[-1.2rem]">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.sameAsStudent}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm((p) => ({
                          ...p,
                          sameAsStudent: checked,
                          guardianAddress: checked ? p.address : "",
                        }));
                      }}
                    />
                    Dirección igual a la del alumno
                  </label>
                </div>
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="guardianRelation"
                  >
                    Relación con el Alumno
                  </label>
                  <Input
                    id="guardianRelation"
                    name="guardianRelation"
                    placeholder="Ej. Madre"
                    value={form.guardianRelation}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="guardianContact"
                  >
                    Teléfono de Contacto del Tutor
                  </label>
                  <Input
                    id="guardianContact"
                    name="guardianContact"
                    type="tel"
                    placeholder="+52 987 654 3210"
                    value={form.guardianContact}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Académica */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Información Académica
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Detalles sobre el historial y la asignación académica del alumno.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="grade"
                  >
                    Grado
                  </label>
                  <Select
                    value={form.grade}
                    onValueChange={(v) => setForm((p) => ({ ...p, grade: v }))}
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Seleccionar grado..." />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="section"
                  >
                    Sección
                  </label>
                  <Select
                    value={form.section}
                    onValueChange={(v) => setForm((p) => ({ ...p, section: v }))}
                    disabled={!form.grade}
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Seleccionar sección..." />
                    </SelectTrigger>
                    <SelectContent>
                      {sectionOptions
                        .filter((o) => o.grade === form.grade)
                        .map((o) => (
                          <SelectItem key={o.id} value={o.id}>{o.letter}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-6">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="previous-institution"
                  >
                    Nombre de la institución de origen
                  </label>
                  <Input
                    id="previous-institution"
                    name="previous-institution"
                    placeholder="Ej. Colegio Cervantes"
                    value={form["previous-institution"]}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end gap-3">
                <button
                  className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/80 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
                  type="button"
                >
                  <span className="truncate">Cancelar</span>
                </button>
                <button
                  className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4 hover:bg-primary/90"
                  type="submit"
                  disabled={saving}
                >
                  <span className="material-symbols-outlined text-white text-base">save</span>
                  <span className="truncate">Guardar Alumno</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

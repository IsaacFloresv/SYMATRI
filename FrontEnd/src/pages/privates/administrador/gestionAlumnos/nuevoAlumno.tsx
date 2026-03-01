import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

export default function NuevoAlumno() {
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
        section: "", // will hold seccionId
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const [grades, setGrades] = useState<string[]>([]);
    const [sectionOptions, setSectionOptions] = useState<
      { id: string; grade: string; letter: string }[]
    >([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // load grades/sections from backend
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
          console.error("unable to load sections for alumno form", err);
        }
      }
      loadSections();
    }, []);

    // when grade or available options change, ensure the chosen section still applies
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

            // 1. create user record ...
            const userPayload = {
                email: form.email,
                userName: `${form.firstName}.${form.lastName}`,
                pass: "",
            };
            const userRes = await fetch(`${api.baseUrl}/users/create`, {
                method: "POST",
                headers,
                body: JSON.stringify(userPayload),
            });
            if (!userRes.ok) throw new Error("failed creating user");
            const newUser = await userRes.json();
            const userId = newUser.id || newUser.insertId || newUser[0]?.id;

            // 2. insert personal data
            const dataUserPayload = {
                userId,
                firstName: form.firstName,
                lastName: form.lastName,
                address: form.address,
                telefono: form.phone,
            };
            await fetch(`${api.baseUrl}/dataUsers/create`, {
                method: "POST",
                headers,
                body: JSON.stringify(dataUserPayload),
            });

            // 3. tutor data
            if (form.guardianEmail) {
                const tutorPayload = {
                    email: form.guardianEmail,
                    userName: `${form.guardianFirstName}.${form.guardianLastName}`,
                    pass: "",
                };
                const tutorRes = await fetch(`${api.baseUrl}/users/create`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(tutorPayload),
                });
                if (tutorRes.ok) {
                    const tutor = await tutorRes.json();
                    const tutorId = tutor.id || tutor.insertId || tutor[0]?.id;
                    await fetch(`${api.baseUrl}/dataUsers/create`, {
                        method: "POST",
                        headers,
                        body: JSON.stringify({
                            userId: tutorId,
                            firstName: form.guardianFirstName,
                            lastName: form.guardianLastName,
                            address: form.guardianAddress,
                            telefono: form.guardianContact,
                        }),
                    });
                }
            }

            // 4. student section
            const sectionPayload = {
                alumnoId: userId,
                seccionId: form.section,
                periodo: form.grade,
            };
            await fetch(`${api.baseUrl}/seccionAlumnos/create`, {
                method: "POST",
                headers,
                body: JSON.stringify(sectionPayload),
            });

            setMessage("Datos guardados correctamente");
            // wait before redirect
            setTimeout(() => navigate("/admin/gestion-alumnos"), 1500);
        } catch (err) {
            console.error("error submitting alumno", err);
            setMessage("Error al guardar datos");
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
                            Añadir Nuevo Alumno
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
                                Datos personales del nuevo alumno.
                            </p>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="firstName">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="lastName">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="birthDate">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="gender">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="phone">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="address">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="guardianFirstName">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="guardianLastName">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="guardianEmail">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="guardianAddress">
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
                                        Dirección igual a la del alumno
                                    </label>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="guardianRelation">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="guardianContact">
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
                                Asignación de grado y sección para el alumno.
                            </p>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="grade">
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
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="section">
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
                            </div>
                        </div>

                        <div className="pt-5">
                            {saving && <p className="mb-2 text-sm text-gray-500">Guardando...</p>}
                            <div className="flex justify-end gap-3">
                                <Button
                                    onClick={() => navigate(-1)}
                                    variant="outline"
                                    className="w-50"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-50"
                                >
                                    <span className="material-symbols-outlined text-base">save</span>
                                    <span>Guardar Alumno</span>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

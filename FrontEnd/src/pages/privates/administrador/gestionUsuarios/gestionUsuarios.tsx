import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/lib/api";

export default function NuevoUsuario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // simple validation
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      setSaving(true);
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const payload: any = {
        email: form.email,
        userName: form.username,
        pass: form.password,
        role: form.role,
        datosPersonales: {
          firstName: form.firstName,
          lastName: form.lastName,
          telefono: form.phone,
        },
      };
      const res = await fetch(`${api.baseUrl}/users/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("create failed");
      navigate("/admin/gestion-usuarios");
    } catch (err) {
      console.error("error creating user", err);
      alert("Error al crear usuario");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col">
      <header className="flex items-center justify-end whitespace-nowrap border-b border-solid border-slate-200 dark:border-b-[#233648] px-10 py-3 bg-background-light dark:bg-background-dark">
        <div className="flex flex-1 justify-end gap-4">
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-slate-600 dark:bg-[#233648] dark:text-white">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Avatar className="w-10 h-10">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex-1 p-6 lg:p-10">
        <div className="mb-6">
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Añadir Nuevo Usuario</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Complete el formulario para crear una nueva cuenta de usuario.</p>
        </div>
        <div className="bg-white dark:bg-[#111a22] rounded-xl shadow-sm p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Foto de Perfil</label>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-[#233648] flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-3xl">person</span>
                        </div>
                        <label htmlFor="profile-picture" className="cursor-pointer rounded-lg bg-slate-100 dark:bg-[#233648] text-slate-700 dark:text-white px-4 py-2 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700">Subir foto</label>
                        <input className="hidden" id="profile-picture" type="file" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre</label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Ej. Juan"
                          value={form.firstName}
                          onChange={handleChange}
                          className="w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Apellido</label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Ej. Pérez"
                          value={form.lastName}
                          onChange={handleChange}
                          className="w-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Correo Electrónico</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="ejemplo@mail.com"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Número de Teléfono</label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Ej. +1 555 123 4567"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre de Usuario</label>
                        <Input
                          id="username"
                          name="username"
                          placeholder="Ej. juan.perez"
                          value={form.username}
                          onChange={handleChange}
                          className="w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rol</label>
                        <Select value={form.role} onValueChange={(v) => setForm((p) => ({ ...p, role: v }))}>
                          <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Seleccionar rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Administrador">Administrador</SelectItem>
                            <SelectItem value="Profesor">Profesor</SelectItem>
                            <SelectItem value="Alumno">Alumno</SelectItem>
                            <SelectItem value="Padre">Padre</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contraseña</label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={form.password}
                          onChange={handleChange}
                          className="w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirmar Contraseña</label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          className="w-full"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button
                      onClick={() => navigate(-1)}
                      className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-200 dark:bg-[#233648] text-slate-900 dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
                      type="button"
                    >
                        <span>Cancelar</span>
                    </button>
                    <button
                      disabled={saving}
                      className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
                      type="submit"
                    >
                        <span className="material-symbols-outlined text-white fill text-base">save</span>
                        <span>{saving ? "Guardando..." : "Guardar Usuario"}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>
  );
}

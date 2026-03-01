import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/lib/api";
import { getToken } from "@/lib/authStorage";
import { toast } from "sonner";

interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  role: string;
  avatar?: string;
}

export default function EditarPerfilU() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const token = getToken();
        const res = await fetch(`${api.baseUrl}/users/byid?id=${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) return;
        const data = await res.json();
        setUser({
          id: data.id,
          nombre: data.datosPersonales?.firstName || "",
          apellido: data.datosPersonales?.lastName || "",
          email: data.email || "",
          username: data.userName || "",
          role: data.role || "",
          avatar: data.avatar || "",
        });
      } catch (err) {
        console.error("failed to load user", err);
      }
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((u) => (u ? { ...u, [name]: value } as User : u));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const token = getToken();
      const payload = {
        id: user.id,
        email: user.email,
        userName: user.username,
        role: user.role,
        datosPersonales: {
          firstName: user.nombre,
          lastName: user.apellido,
        },
      };
      const res = await fetch(`${api.baseUrl}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("Usuario actualizado");
      navigate("/admin/gestion-usuarios");
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <main className="flex-1 p-8">Cargando...</main>;
  }

  return (
    <main className="flex-1 flex flex-col">
      <header className="flex items-center justify-end whitespace-nowrap border-b border-solid border-slate-200 dark:border-b-[#233648] px-10 py-3 bg-background-light dark:bg-background-dark">
        <div className="flex flex-1 justify-end gap-4">
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-slate-600 dark:bg-[#233648] dark:text-white">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Avatar className="w-10 h-10">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={`${user.nombre} ${user.apellido}`} />
            ) : (
              <AvatarFallback>{user.nombre?.[0]}</AvatarFallback>
            )}
          </Avatar>
        </div>
      </header>
      <div className="flex-1 p-6 lg:p-10">
        <div className="mb-6">
          <Link
            to="/admin/gestion-usuarios"
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary mb-4 text-sm font-medium"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Volver a Gestión de Usuarios</span>
          </Link>
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-[-0.033em]">
            Editar Usuario
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Modifica la información del usuario y guarda los cambios.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#111a22] rounded-xl shadow-sm p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <Avatar className="w-20 h-20">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={`${user.nombre} ${user.apellido}`} />
                  ) : (
                    <AvatarFallback>{user.nombre?.[0]}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {user.nombre} {user.apellido}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ID de Usuario: #{user.id}
                  </p>
                  <Button variant="link" className="mt-2 p-0" onClick={() => {/* implement upload */}}>
                    Cambiar foto
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="nombre">
                    Nombre
                  </label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={user.nombre}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="apellido">
                    Apellido
                  </label>
                  <Input
                    id="apellido"
                    name="apellido"
                    value={user.apellido}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="email">
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="username">
                    Nombre de Usuario
                  </label>
                  <Input
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="role">
                    Rol
                  </label>
                  <Select value={user.role} onValueChange={(v) => setUser((u) => u ? { ...u, role: v } as User : u)}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profesor">Profesor</SelectItem>
                      <SelectItem value="administrador">Administrador</SelectItem>
                      <SelectItem value="padre">Padre</SelectItem>
                      <SelectItem value="alumno">Alumno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Seguridad</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Gestiona la contraseña del usuario.
                </p>
                <Button variant="outline" className="flex max-w-[480px] items-center justify-center gap-2" type="button">
                  <span className="material-symbols-outlined">lock_reset</span>
                  Restablecer Contraseña
                </Button>
              </div>
              <div className="flex justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>
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

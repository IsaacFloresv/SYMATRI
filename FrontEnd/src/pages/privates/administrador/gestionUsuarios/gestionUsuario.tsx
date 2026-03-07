import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/lib/api";
import { getToken } from "@/lib/authStorage";
import { toast } from "sonner";
import CambioPassword from "./cambioPassword";

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
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const isNew = !id;

  useEffect(() => {
    if (id) {
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
    } else {
      // new user: start with empty template
      setUser({ id: 0, nombre: "", apellido: "", email: "", username: "", role: "", avatar: "" });
    }
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
        email: user.email || "",
        userName: user.username || "",
        role: user.role || "",
        datosPersonales: {
          firstName: user.nombre,
          lastName: user.apellido,
        },
      };
      let res;
      if (isNew) {
        // include password if provided
        const bodyPayload = { ...payload } as any;
        if (newPassword) bodyPayload.pass = newPassword;
        res = await fetch(`${api.baseUrl}/users/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(bodyPayload),
        });
      } else {
        // include id for update
        res = await fetch(`${api.baseUrl}/users/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ id: user.id, ...payload }),
        });
      }
      if (!res.ok) throw new Error(await res.text());
      toast.success(isNew ? "Usuario creado" : "Usuario actualizado");
      navigate("/admin/gestion-usuarios");
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    // show blank or loading until initial state set
    return (
      <main className="flex-1 flex items-center justify-center">
        <p>Cargando...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto">
        <div className="mb-6 pl-2">
          <Link
            to="/admin/gestion-usuarios"
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary mb-4 text-sm font-medium"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Volver a Gestión de Usuarios</span>
          </Link>
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-[-0.033em]">
            {isNew ? "Nuevo Usuario" : "Editar Usuario"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {isNew ? "Completa los datos para crear un nuevo usuario." : "Modifica la información del usuario y guarda los cambios."}
          </p>
        </div>
          <div className="bg-white dark:bg-[#111a22] rounded-xl shadow-sm p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={`${user.nombre} ${user.apellido}`} />
                    ) : (
                      <AvatarFallback>{user.nombre?.[0] || "U"}</AvatarFallback>
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
                  {isNew ? "Define la contraseña inicial del usuario." : "Gestiona la contraseña del usuario."}
                </p>
                {isNew ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="newPassword">
                          Contraseña
                        </label>
                        <Input
                          id="newPassword"
                          type={showPasswords ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="confirmPassword">
                          Confirmar contraseña
                        </label>
                        <Input
                          id="confirmPassword"
                          type={showPasswords ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="showPasswords"
                        type="checkbox"
                        checked={showPasswords}
                        onChange={(e) => setShowPasswords(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="showPasswords" className="text-sm text-slate-700 dark:text-slate-300">
                        Mostrar contraseñas
                      </label>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" className="flex max-w-[480px] items-center justify-center gap-2" type="button" onClick={() => setShowPwdModal(true)}>
                    <span className="material-symbols-outlined">lock_reset</span>
                    Restablecer Contraseña
                  </Button>
                )}
              </div>
              <div className="flex justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                  Cancelar
                </Button>
                <Button className="text-black" type="submit" disabled={saving}>
                  {saving ? "Guardando…" : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* password modal overlay */}
        {showPwdModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-y-auto max-h-[80vh] relative">
              <button
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-300"
                onClick={() => setShowPwdModal(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <CambioPassword />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

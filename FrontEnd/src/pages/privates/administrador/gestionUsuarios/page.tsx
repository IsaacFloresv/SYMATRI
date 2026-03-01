import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

interface UserRow {
  id: number;
  nombre: string;
  email: string;
  role: string;
  createdAt: string;
  active: boolean;
  avatar?: string;
}

export default function GestionUsuarios() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const reload = async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/users/all`, { headers });
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const list: UserRow[] = data.map((u: any) => ({
        id: u.id,
        nombre: `${u.datosPersonales?.firstName || ""} ${u.datosPersonales?.lastName || ""}`.trim(),
        email: u.email || "",
        role: u.role || "",
        active: u.active === true,
        createdAt: u.createdAt || u.created_at || "",
        avatar: u.avatar,
      }));
      setUsers(list);
    } catch (err) {
      console.error("failed loading users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter((u) =>
      !q ||
      u.nombre.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.id.toString().includes(q)
    );
  }, [users, query]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("¿Eliminar este usuario? Esta acción no se puede deshacer.");
    if (!confirmed) return;
    try {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/users/delete/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error("delete failed");
      reload();
    } catch (err) {
      console.error("error deleting user", err);
    }
  };

  return (
    <main className="flex-1 flex flex-col">
      {/* TopNavBar */}
      <header className="flex items-center justify-end whitespace-nowrap border-b border-solid border-slate-200 dark:border-b-[#233648] px-10 py-3 bg-background-light dark:bg-background-dark">
        <div className="flex flex-1 justify-end gap-4">
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-slate-600 dark:bg-[#233648] dark:text-white">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV27I0rDXVV0qkmXUrJ6ImTYGQmyeFFU6wLw1can4o9n-VoNb7ByCQ77Ta006Sit6HsBLC-31oTA0zV1woDpgrgiirHvZBulhfXTnkrAybWPp9wx5g0f1-XY_snRta8-LYUM-CqIHV7aPRGnaDFpin9A97GtkMphfW9B4FEKGPcXIywXf62B4UMsbDEVTNUxCylXh725SCR4WK8N_G6BPCpacyQT2anrnFQypF8zigXnIir6zeUcd3Ums6pmCs4oPd62kENxdJx6Wj" alt="Avatar admin" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Gestión de Usuarios
          </h1>
          <Button onClick={() => navigate('/admin/gestion-usuarios/nuevo')}>
            Añadir Usuario
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre, email o ID..."
              className="w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            {/* TODO: implement filters */}
          </div>
        </div>
        {/* Users Table */}
        <div className="bg-white dark:bg-[#111a22] rounded-xl overflow-x-auto shadow-sm">
          <Table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <TableHeader className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-[#233648] dark:text-slate-400">
              <TableRow>
                <TableHead className="p-4">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded bg-slate-200 dark:bg-[#233648] border-slate-300 dark:border-slate-600"
                  />
                </TableHead>
                <TableHead className="px-6 py-3">Nombre Completo</TableHead>
                <TableHead className="px-6 py-3">Email</TableHead>
                <TableHead className="px-6 py-3">Rol</TableHead>
                <TableHead className="px-6 py-3">Fecha de Creación</TableHead>
                <TableHead className="px-6 py-3">Estado</TableHead>
                <TableHead className="px-6 py-3 text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="p-6 text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="p-6 text-center">
                  No se encontraron usuarios
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filtered.map((u) => (
                  <TableRow
                    key={u.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-[#192633]"
                  >
                    <TableCell className="w-4 p-4">
                      <input
                        type="checkbox"
                        className="form-checkbox rounded bg-slate-200 dark:bg-[#233648] border-slate-300 dark:border-slate-600"
                      />
                    </TableCell>
                    <TableCell className="flex items-center px-6 py-4 text-slate-900 dark:text-white whitespace-nowrap">
                      {u.avatar && (
                        <img
                          className="w-10 h-10 rounded-full"
                          src={u.avatar}
                          alt={u.nombre}
                        />
                      )}
                      <div className="pl-3">
                        <div className="text-base font-semibold">{u.nombre}</div>
                        <div className="font-normal text-slate-500">ID: #{u.id}</div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">{u.email}</TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="bg-primary/20 text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        {u.role}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">{u.createdAt}</TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${
                          u.active
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {u.active ? "Activo" : "Inactivo"}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/gestion-usuarios/editar/${u.id}`)}
                          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#233648] text-slate-500 dark:text-slate-400"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#233648] text-red-500"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#233648] text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-lg">more_vert</span>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface Role {
  id: number;
  nombre: string;
  descripcion: string;
  modulos: any[];
  createdAt: string;
}

export default function GestionRoles() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      const res = await fetch(`${api.baseUrl}/roles/all`, { headers });
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      setRoles(data);
    } catch (err) {
      console.error("error loading roles", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Eliminar este rol?")) return;
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      await fetch(`${api.baseUrl}/roles/delete`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id }),
      });
      reload();
    } catch (err) {
      console.error("error deleting role", err);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return roles.filter((r) => !q || r.nombre.toLowerCase().includes(q));
  }, [roles, query]);

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">
              Gestión de Roles de Usuario
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Administre los permisos y niveles de acceso de los usuarios del sistema escolar.
            </p>
          </div>
          <Button
            className="flex min-w-[84px] items-center justify-center gap-2"
            onClick={() => navigate("/admin/gestion-roles/nuevo")}
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span className="truncate">Añadir Rol</span>
          </Button>
        </div>
        <div className="mb-6">
          <Input
            placeholder="Buscar por nombre de rol..."
            className="max-w-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="@container">
          <div className="flex overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#182635]">
            <Table className="w-full">
              <TableHeader className="bg-gray-50 dark:bg-white/5">
                <TableRow className="border-b border-gray-200 dark:border-white/10">
                  <TableHead className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Nombre
                  </TableHead>
                  <TableHead className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Descripción
                  </TableHead>
                  <TableHead className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Cantidad Módulos
                  </TableHead>
                  <TableHead className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Fecha Creación
                  </TableHead>
                  <TableHead className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200 dark:divide-white/10">
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="p-6 text-center">
                      Cargando...
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="p-6 text-center">
                      No se encontraron roles
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {r.nombre}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {r.descripcion}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {Array.isArray(r.modulos) ? r.modulos.length : 0}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/gestion-roles/editar/${r.id}`)}
                          className="flex items-center justify-center size-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary dark:hover:text-primary"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="flex items-center justify-center size-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-500"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}

import { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/hooks/useConfig";
import type { ConfigItem } from "@/services/configServices";
import { useNavigate } from "react-router-dom";

export default function GestionConfig() {
  const { data: configs = [], isLoading, error } = useConfig();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = (configs as ConfigItem[]).filter((c) =>
    !search ||
    c.clave.toLowerCase().includes(search.toLowerCase()) ||
    c.valor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50 dark:bg-[#0a0f14] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Parámetros del Sistema
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Gestiona las variables globales y límites de la plataforma.
            </p>
          </div>
          <Button onClick={() => navigate('/admin/gestion-config/new')}>
            <span className="material-symbols-outlined text-[20px]">add</span>
            Nueva Clave
          </Button>
        </div>
        <div className="mb-4">
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isLoading && <p>Cargando...</p>}
        {error && <p className="text-red-500">{error.message}</p>}
        {!isLoading && !error && (
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark shadow-sm">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Clave</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filtered.map((c) => (
                    <TableRow key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell className="font-mono text-sm text-gray-500 dark:text-gray-400">
                        {c.id}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900 dark:text-white">
                        {c.clave}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                        {c.valor}
                      </TableCell>
                      <TableCell className="text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {c.tipo}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/gestion-config/edit/${c.id}`)}>
                            <span className="material-symbols-outlined">edit</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <span className="material-symbols-outlined">delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
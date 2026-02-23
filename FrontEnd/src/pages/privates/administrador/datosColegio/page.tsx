import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useConfig } from "@/hooks/useConfig";

export default function DatosColegio() {
  const { data, isLoading, isError } = useConfig();
  const cfg = data ? data.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.clave] = cur.valor;
    return acc;
  }, {}) : {};

  if (isLoading) {
    return <main className="flex-1 p-6 lg:p-10">Cargando información...</main>;
  }
  if (isError) {
    return <main className="flex-1 p-6 lg:p-10">Error al cargar los datos del colegio.</main>;
  }

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-start gap-4 mb-8">
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Información del Colegio</h1>
          <p className="text-slate-600 dark:text-slate-400">Aquí se muestra la información general registrada para el colegio.</p>
        </div>
        <Card className="bg-white dark:bg-[#1C2A38] rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div
                // fixed size and visible placeholder even without a logo
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-32 h-32 flex-shrink-0 bg-slate-200 dark:bg-slate-700"
                data-alt="Logo del Colegio"
                style={{
                  backgroundImage: cfg.logo_url
                    ? `url("${cfg.logo_url}")`
                    : undefined,
                }}
              ></div>
              <div className="flex-grow">
                <h2 className="text-slate-900 dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]">
                  {cfg.school_name || "Colegio Moderno"}
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Información de contacto y detalles generales de la institución.
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-t border-slate-200 dark:border-slate-700 pt-8">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Dirección</h3>
                  <p className="text-slate-900 dark:text-white mt-1">{cfg.address || "Av. Siempre Viva 742, Ciudad Escolar, 12345"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">call</span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Teléfono</h3>
                  <p className="text-slate-900 dark:text-white mt-1">{cfg.phone || "(123) 456-7890"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">mail</span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Email de Contacto</h3>
                  <p className="text-slate-900 dark:text-white mt-1">{cfg.email || "contacto@colegiomoderno.edu"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">link</span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Sitio Web</h3>
                  <p className="text-slate-900 dark:text-white mt-1">{cfg.website || "www.colegiomoderno.edu"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 sm:px-8 py-4 flex justify-end">
            <Link to="/admin/datos-colegio/editar">
              <Button className="flex items-center justify-center gap-2 min-w-[84px] overflow-hidden rounded-lg h-10 px-4 bg-blue-500 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors">
                <span className="material-symbols-outlined text-lg">edit</span>
                <span className="truncate">Editar Información</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}

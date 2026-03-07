import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ErrorItem } from "@/services/errorServices";
import { getErrorById, updateError } from "@/services/errorServices";
import { Button } from "@/components/ui/button";

export default function DetalleError() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [errorItem, setErrorItem] = useState<ErrorItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getErrorById(parseInt(id, 10));
        setErrorItem(data);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "No se pudo cargar el error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="p-8">Cargando...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!errorItem) return <p className="p-8">Error no encontrado</p>;

  const simpleDate = errorItem.createdAt
    ? new Date(errorItem.createdAt).toLocaleString()
    : "";

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Detalle de Error
            </p>
            <p className="text-gray-600 dark:text-[#92aec9] text-base font-normal">
              Información completa del incidente #{errorItem.id}
            </p>
          </div>
          <Button
            variant="ghost"
            className="inline-flex h-10 items-center justify-center gap-x-2"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Volver
          </Button>
        </div>

        <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Estado: {errorItem.estado}
            </h3>
            <Button
              size="sm"
              onClick={async () => {
                try {
                  await updateError({ id: errorItem.id, estado: "solucionado" });
                  setErrorItem((prev) => prev && { ...prev, estado: "solucionado" });
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Marcar como solucionado
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ocurrido: {simpleDate}</p>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mensaje</h4>
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto text-xs font-mono">
              {errorItem.logErrors}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}

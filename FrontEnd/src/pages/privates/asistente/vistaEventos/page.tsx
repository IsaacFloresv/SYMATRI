import { useState, useEffect } from "react";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function VistaEventos() {
  const session = useAuthStorage((s) => s.user);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const id = session?.id;
        if (!id) {
          setError("Sesión no disponible");
          return;
        }
        const res = await fetch(`${api.baseUrl}/eventos/search?userId=${id}`, {
          headers,
        });
        if (!res.ok) throw new Error("Error al obtener eventos");
        const json = await res.json();
        setEvents(json.events || []);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Error cargando eventos");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [session?.id]);


  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Calendario Escolar
          </h1>
          <p className="text-[#92aec9] text-base font-normal">
            Consulta tus eventos próximos y tareas pendientes.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-white">Cargando...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : events.length === 0 ? (
          <p className="text-center text-white">Sin eventos disponibles</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <Card key={ev.id} className="bg-card-dark">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{ev.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-dark">
                  <p>Fecha: {ev.date}</p>
                  {ev.time && <p>Hora: {ev.time}</p>}
                  {ev.location && <p>Lugar: {ev.location}</p>}
                  <div className="mt-2 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/asistente/vista-eventos/editar/${ev.id}`)}
                    >
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

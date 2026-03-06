import { useState, useEffect } from "react";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { api } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function VistaEventosEncargado() {
  const selectedChildId = useAuthStorage((s) => s.selectedChildId);
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (!selectedChildId) return;
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(
          `${api.baseUrl}/eventos/search?userId=${selectedChildId}`,
          { headers }
        );
        if (res.ok) {
          const json = await res.json();
          setEvents(json.events || []);
        }
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [selectedChildId]);

  return (
    <main className="flex-1 p-8 bg-background-dark flex flex-col">
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-card-dark rounded-lg transition-colors border border-transparent hover:border-border-dark"
        >
          <span className="material-symbols-outlined text-muted-dark">arrow_back</span>
        </button>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground-dark">
            Eventos
          </h1>
          <p className="text-muted-dark mt-1">
            {selectedChildId
              ? `Hijo seleccionado: ${selectedChildId}`
              : "No hay hijo seleccionado"}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p className="text-center text-muted-dark col-span-full">
            No hay eventos próximos
          </p>
        ) : (
          events.map((ev) => (
            <Card key={ev.id}>
              <CardHeader>
                <CardTitle className="text-lg">{ev.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-dark">Fecha: {ev.date}</p>
                {ev.time && <p className="text-sm text-muted-dark">Hora: {ev.time}</p>}
                {ev.location && <p className="text-sm text-muted-dark">Lugar: {ev.location}</p>}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}

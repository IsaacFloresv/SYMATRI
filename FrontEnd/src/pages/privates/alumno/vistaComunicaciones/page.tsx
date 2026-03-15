import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import DetailsMensaje from "./detailsMensaje";
import { Button } from "@/components/ui/button";

// modelo del endpoint /mensajeReceptor/allById
interface DatosPersonales {
  firstName: string;
  lastName: string;
  genero?: string;
}
interface Receptor {
  email: string;
  datosPersonales: DatosPersonales;
}
interface MensajeInfo {
  id: number;
  periodo?: string;
  asunto: string;
  mensaje: string;
  emisorId?: number;
  isReaded?: boolean;
  isArchived?: boolean;
  fechaEnvio?: string;
  createdAt?: string;
  emisor?: {
    id: number;
    email: string;
    datosPersonales: DatosPersonales;
  };
}
interface MensajeReceptor {
  id: number;
  mensajeId: number;
  receptorId: number;
  leido?: boolean;
  fechaLectura?: string | null;
  receptor: Receptor;
  mensaje: MensajeInfo;
}

export default function VistaComunicaciones() {
  // const navigate = useNavigate(); // not needed for modal
  const navigate = useNavigate();
  const session = useAuthStorage((s) => s.user);
  const [messages, setMessages] = useState<MensajeReceptor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<MensajeReceptor | undefined>(undefined);

  // format ISO date to "MM/DD/YYYY hh:mm AM/PM" using local locale
  function formatDateTime(value?: string) {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"recibidos" | "archivados" | "borradores">("recibidos");
  const [query, setQuery] = useState("");

  const userId = session?.id;
  // const search = new URLSearchParams(location.search);
  // const messageId = search.get("id"); // not used any longer

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;

        if (userId) {
          const res = await fetch(
            `${api.baseUrl}/mensajeReceptor/allById?receptorId=${userId}`,
            { headers }
          );
          if (res.ok) {
            const data: MensajeReceptor[] = await res.json();
            setMessages(data);
          }
        }
      } catch (err) {
        console.error("error loading messages", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);


  const filtered = messages.filter((entry) => {
    const m = entry.mensaje;
    if (filter === "archivados" && !m.isArchived) return false;
    if (filter === "recibidos" && m.isArchived) return false;
    return (
      !query ||
      m.asunto.toLowerCase().includes(query.toLowerCase()) ||
      m.mensaje.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="p-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground-dark">
              Centro de Mensajes
            </h1>
          </div>
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-dark">
              search
            </span>
            <Input
              className="w-full bg-card-dark border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm text-foreground-dark focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              placeholder="Buscar mensajes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex border-b border-border-dark">
          <button
            className={`px-6 py-3 text-sm font-bold ${
              filter === "recibidos" ? "text-primary border-b-2 border-primary" : "text-muted-dark"
            }`}
            onClick={() => setFilter("recibidos")}
          >
            Recibidos
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              filter === "archivados" ? "text-primary border-b-2 border-primary" : "text-muted-dark"
            } hover:text-foreground-dark transition-colors`}
            onClick={() => setFilter("archivados")}
          >
            Archivados
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar space-y-4">
        {loading ? (
          <p className="text-center text-muted-dark">Cargando mensajes...</p>
        ) : (
          filtered.map((entry) => {
            const msg = entry.mensaje;
            const isRead = entry.leido ?? msg.isReaded;
            return (
              <div
                key={entry.id}
                onClick={() => {
                  console.log('entry clicked', entry);
                  setSelectedEntry(entry);
                  setModalOpen(true);
                }}
                className="group p-5 rounded-xl border border-border-dark bg-card-dark hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
              >
                {!isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
                <div className="flex gap-4">
                  <div
                    className={`${!isRead ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"} p-3 rounded-lg h-fit`}
                  >
                    <span className="material-symbols-outlined">
                      {!isRead ? "priority_high" : "info"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-foreground-dark flex items-center gap-2">
                        {msg.asunto}
                      </h3>
                      <span className="text-xs text-muted-dark">{formatDateTime(msg.fechaEnvio)}</span>
                    </div>
                    <p className="text-sm text-muted-dark line-clamp-1 mb-3">
                      {msg.mensaje}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase">
                        {msg.emisor?.datosPersonales.firstName} {msg.emisor?.datosPersonales.lastName}
                      </span>
                      <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="px-3 py-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/alumno/comunicaciones/leer", { state: entry });
                      }}
                    >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Ver mensaje completo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <DetailsMensaje
        open={modalOpen}
        onOpenChange={(o) => {
          if (!o) setSelectedEntry(undefined);
          setModalOpen(o);
        }}
        entry={selectedEntry}
        onArchived={(mensajeId, isArchived) => {
          setMessages((prev) =>
            prev.map((entry) =>
              entry.mensaje.id === mensajeId
                ? { ...entry, mensaje: { ...entry.mensaje, isArchived } }
                : entry
            )
          );
        }}
      />
    </main>
  );
}

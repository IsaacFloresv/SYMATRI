import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { api } from "@/lib/api";

interface Message {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  sender: string;
  priority?: "high" | "normal";
  tags?: string[];
  status: "recibidos" | "archivados" | "borradores";
  avatarUrl?: string;
}

export default function GestionComunicacion() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<"recibidos" | "archivados" | "borradores">("recibidos");
  const location = useLocation();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;

        const session = useAuthStorage((s) => s.user);
        const receptorId = session?.id;
        if (!receptorId) return;

        const res = await fetch(`${api.baseUrl}/mensajeReceptor/allById?receptorId=${receptorId}`, { headers });
        if (res.ok) {
          const data: any[] = await res.json();
          const mapped: Message[] = data.map((item) => {
            const msg = item.mensaje || {};
            const senderName = msg.emisor?.datosPersonales
              ? `${msg.emisor.datosPersonales.firstName || ""} ${msg.emisor.datosPersonales.lastName || ""}`.trim()
              : msg.emisor?.userName || "";
            const isDraft = !msg.fechaEnvio;
            return {
              id: String(item.id),
              title: msg.asunto || "(sin asunto)",
              body: msg.mensaje || "",
              timestamp: msg.fechaEnvio || msg.createdAt || item.createdAt || "",
              sender: senderName || "",
              status: isDraft ? "borradores" : item.isArchived ? "archivados" : "recibidos",
              priority: msg.priority || "normal",
              tags: msg.tags || [],
              avatarUrl: msg.emisor?.avatar || undefined,
            };
          });
          setMessages(mapped);
        }
      } catch (err) {
        console.error("error loading messages", err);
      }
    }
    load();
  }, [filter]);

  // reload when navigating back with state
  useEffect(() => {
    if (location.state && (location.state as any).reload) {
      // simple trick: re-run the same effect by toggling filter
      setFilter((f) => f);
      // clear state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filtered = messages
    .filter((m) => {
      if (filter === "recibidos") return m.status === "recibidos";
      if (filter === "archivados") return m.status === "archivados";
      // no drafts support yet
      return false;
    })
    .filter((m) => {
      return (
        !query ||
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.body.toLowerCase().includes(query.toLowerCase())
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
            <p className="text-muted-dark mt-1">Bandeja de entrada del colegio</p>
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
          <button
            className={`px-6 py-3 text-sm font-medium ${
              filter === "borradores" ? "text-primary border-b-2 border-primary" : "text-muted-dark"
            } hover:text-foreground-dark transition-colors`}
            onClick={() => setFilter("borradores")}
          >
            Borradores
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar space-y-4">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            onClick={() => navigate(`/encargado/gestion-comunicacion/${msg.id}`)}
            className="group p-5 rounded-xl border border-border-dark bg-card-dark hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
          >
            {msg.priority === "high" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
            <div className="flex gap-4">
              <div
                className={`${
                  msg.priority === "high" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
                } p-3 rounded-lg h-fit`}
              >
                <span className="material-symbols-outlined">
                  {msg.priority === "high" ? "priority_high" : "info"}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-foreground-dark flex items-center gap-2">
                    {msg.title}
                    {msg.priority === "high" && (
                      <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        URGENTE
                      </span>
                    )}
                  </h3>
                  <span className="text-xs text-muted-dark">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-dark line-clamp-1 mb-3">
                  {msg.body}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {msg.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {msg.avatarUrl && (
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={msg.avatarUrl} />
                      <AvatarFallback>{msg.sender?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute bottom-8 right-8 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-2xl">edit</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Nuevo Mensaje</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </main>
  );
}

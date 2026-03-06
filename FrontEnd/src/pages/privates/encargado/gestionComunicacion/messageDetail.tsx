import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  folder?: string;
}

export default function MessageDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/comunicaciones/${id}`, { headers });
        if (res.ok) {
          const data: Message = await res.json();
          setMessage(data);
        } else {
          console.error("message not found");
        }
      } catch (err) {
        console.error("error loading message", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="p-8">Cargando mensaje...</div>;
  }

  if (!message) {
    return <div className="p-8">No se encontró el mensaje.</div>;
  }

  const handleArchive = async () => {
    try {
      const headers: Record<string, string> = {};
      if (api.token) headers.Authorization = `Bearer ${api.token}`;
      await fetch(`${api.baseUrl}/comunicaciones/${id}/archive`, {
        method: "POST",
        headers,
      });
      navigate("/encargado/gestion-comunicacion", { state: { reload: true } });
    } catch (err) {
      console.error("archive failed", err);
    }
  };

  const handleSendReply = async () => {
    // placeholder: send reply to API
    console.log("reply send", reply);
    setReply("");
  };

  return (
    <main className="p-8">
      <Button onClick={() => navigate(-1)} className="mb-4">
        ← Volver
      </Button>
      <div className="max-w-2xl mx-auto bg-card-dark rounded-xl border border-border-dark shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border-dark flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex gap-2 mb-1">
              {message.tags?.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-foreground-dark">
              {message.title}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="size-8">
                {message.avatarUrl ? (
                  <AvatarImage src={message.avatarUrl} />
                ) : (
                  <AvatarFallback>{message.sender?.[0] || "U"}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground-dark">
                  {message.sender}
                </span>
                <span className="text-[11px] text-muted-dark">
                  {message.timestamp}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-muted-dark hover:text-foreground-dark transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 prose prose-invert max-w-none text-foreground-dark/90 leading-relaxed">
          {message.body.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
        <div className="px-6 py-4 bg-background-dark/30 border-t border-border-dark">
          <textarea
            className="w-full bg-card-dark border border-border-dark rounded-lg p-3 pr-24 text-sm text-foreground-dark placeholder-muted-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none h-20"
            placeholder="Escribe una respuesta rápida..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </div>
        <div className="p-6 pt-2 border-t border-border-dark flex items-center justify-between">
          <div className="flex gap-3">
            <Button onClick={handleSendReply} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">send</span>
              Responder
            </Button>
            <Button
              variant="outline"
              onClick={handleArchive}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">archive</span>
              Archivar
            </Button>
          </div>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Cerrar
          </Button>
        </div>
      </div>
    </main>
  );
}

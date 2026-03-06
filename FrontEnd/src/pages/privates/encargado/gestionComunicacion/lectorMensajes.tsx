import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

interface Message {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  sender: string;
  recipients?: string;
  priority?: "high" | "normal";
  tags?: string[];
  status: "recibidos" | "archivados" | "borradores";
  avatarUrl?: string;
  attachments?: Attachment[];
}

export default function LectorMensajes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="flex-1 p-8 bg-background-dark flex flex-col custom-scrollbar overflow-y-auto">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Button>
          <h1 className="text-2xl font-bold text-foreground-dark">
            Lectura de Mensaje
          </h1>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined text-sm">inbox</span>
          Volver a la bandeja
        </Button>
      </header>
      <article className="flex-grow max-w-5xl mx-auto w-full">
        <div className="bg-card-dark rounded-xl border border-border-dark overflow-hidden">
          <div className="p-8 border-b border-border-dark">
            <div className="flex flex-wrap gap-2 mb-4">
              {message.tags?.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
              {message.priority === "high" && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-wider">
                  Urgente
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-foreground-dark mb-6 leading-tight">
              {message.title}
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="size-12">
                  {message.avatarUrl ? (
                    <AvatarImage src={message.avatarUrl} />
                  ) : (
                    <AvatarFallback>
                      {message.sender?.[0] || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-bold text-foreground-dark">
                    {message.sender}
                  </p>
                  {message.recipients && (
                    <p className="text-sm text-muted-dark">
                      Para: {message.recipients}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-dark">
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 prose prose-invert max-w-none text-muted-dark leading-relaxed space-y-4">
            {message.body.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          {message.attachments && message.attachments.length > 0 && (
            <div className="p-8 bg-background-dark/50 border-t border-border-dark">
              <h3 className="text-xs font-bold text-muted-dark uppercase tracking-widest mb-6">
                Archivos Adjuntos ({message.attachments.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {message.attachments.map((att) => (
                  <a
                    key={att.id}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-card-dark border border-border-dark hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    <div
                      className={`${
                        att.type === "pdf"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-primary/10 text-primary"
                      } p-2 rounded`}
                    >
                      <span className="material-symbols-outlined">
                        {att.type === "pdf" ? "picture_as_pdf" : "description"}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-foreground-dark group-hover:text-primary transition-colors">
                        {att.name}
                      </p>
                      <p className="text-xs text-muted-dark">{att.size}</p>
                    </div>
                    <span className="material-symbols-outlined text-muted-dark text-xl group-hover:text-primary">
                      download
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={handleArchive}
            className="flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">archive</span>
            Archivar
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-lg">reply</span>
            Responder
          </Button>
        </div>
      </article>
    </main>
  );
}
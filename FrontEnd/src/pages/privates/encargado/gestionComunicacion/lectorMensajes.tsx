import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { api } from "@/lib/api";

function formatDateTime(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

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
  senderId?: number | string;
  recipients?: string;
  priority?: "high" | "normal";
  tags?: string[];
  status: "recibidos" | "enviados" | "archivados" | "borradores";
  avatarUrl?: string;
  attachments?: Attachment[];
}

export default function LectorMensajes() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const session = useAuthStorage((s) => s.user);
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [editedBody, setEditedBody] = useState("");

  const mode = searchParams.get("mode");
  const title =
    mode === "reply"
      ? "Responder Mensaje"
      : mode === "edit"
      ? "Editar Borrador"
      : "Lectura de Mensaje";

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;

        const isReply = mode === "reply";
        const isEdit = mode === "edit";

        // Recibidos: mensajeReceptor/byId
        // Enviados/borradores: mensajes/byId
        const endpoint = isReply
          ? `/mensajeReceptor/byId?id=${id}`
          : `/mensajes/byId?id=${id}`;

        const res = await fetch(`${api.baseUrl}${endpoint}`, { headers });
        if (!res.ok) {
          console.error("message not found", res.status);
          return;
        }

        const data = await res.json();

        if (isReply) {
          // mensajeReceptor response contains mensaje inside
          const msg = data?.mensaje;
          if (msg) {
            setMessage({
              id: String(data.id),
              title: msg.asunto || "(sin asunto)",
              body: msg.mensaje || "",
              timestamp: msg.fechaEnvio || msg.createdAt || "",
              sender: msg.emisor?.userName || "",
              senderId: msg.emisor?.id,
              priority: msg.priority || "normal",
              tags: msg.tags || [],
              status: "recibidos",
              avatarUrl: msg.emisor?.avatar || undefined,
            });
            setReply("");
          } else {
            console.error("message not found in receptor response");
          }
        } else {
          // Sent or draft
          const msg = data;
          setMessage({
            id: String(msg.id),
            title: msg.asunto || "(sin asunto)",
            body: msg.mensaje || "",
            timestamp: msg.fechaEnvio || msg.createdAt || "",
            sender: msg.emisor?.userName || "",
            priority: msg.priority || "normal",
            tags: msg.tags || [],
            status: isEdit ? "borradores" : msg.isArchived ? "archivados" : "enviados",
            avatarUrl: msg.emisor?.avatar || undefined,
          });
          setEditedBody(msg.mensaje || "");
        }
      } catch (err) {
        console.error("error loading message", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, mode]);

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
    if (!session?.id) return;
    try {
      const payload = {
        asunto: `Re: ${message?.title || ""}`,
        mensaje: reply,
        emisorId: session.id,
        fechaEnvio: new Date().toISOString(),
      };
      const res = await fetch(`${api.baseUrl}/mensajes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(api.token ? { Authorization: `Bearer ${api.token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        // create receptor record so receiver sees it
        const receptorRes = await fetch(`${api.baseUrl}/mensajeReceptor/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(api.token ? { Authorization: `Bearer ${api.token}` } : {}),
          },
          body: JSON.stringify([
            {
              mensajeId: created.id,
              receptorId: message?.senderId || session.id,
            },
          ]),
        });
        if (!receptorRes.ok) {
          console.error("failed to create mensajeReceptor", await receptorRes.text());
        }
        navigate("/encargado/gestion-comunicacion", { state: { reload: true } });
      } else {
        console.error("reply send failed", await res.text());
      }
    } catch (err) {
      console.error("send reply error", err);
    }
  };

  const handleSaveDraft = async () => {
    if (!session?.id) return;
    try {
      const payload = {
        id,
        mensaje: editedBody,
      };
      const res = await fetch(`${api.baseUrl}/mensajes/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(api.token ? { Authorization: `Bearer ${api.token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        navigate("/encargado/gestion-comunicacion", { state: { reload: true } });
      } else {
        console.error("save draft failed", await res.text());
      }
    } catch (err) {
      console.error("save draft error", err);
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
          <h1 className="text-2xl font-bold text-foreground-dark">{title}</h1>
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
                <p className="flex flex-col text-sm text-muted-dark whitespace-pre-line">
                  <span className="flex justify-start">Enviado:</span> 
                  <span>{formatDateTime(message.timestamp)}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 prose prose-invert max-w-none text-muted-dark leading-relaxed space-y-4">
            {mode === "edit" ? (
              <textarea
                className="w-full min-h-[200px] bg-card-dark border border-border-dark rounded-lg p-4 text-sm text-foreground-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
            ) : (
              message.body.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))
            )}

            {mode === "reply" && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-foreground-dark mb-2">Responder</h3>
                <textarea
                  className="w-full min-h-[150px] bg-card-dark border border-border-dark rounded-lg p-4 text-sm text-foreground-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                />
              </div>
            )}
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
          {mode === "reply" && (
            <Button
              className="flex items-center gap-2"
              onClick={handleSendReply}
            >
              <span className="material-symbols-outlined text-lg">send</span>
              Enviar Respuesta
            </Button>
          )}
          {mode === "edit" && (
            <Button
              className="flex items-center gap-2"
              onClick={handleSaveDraft}
            >
              <span className="material-symbols-outlined text-lg">edit</span>
              Guardar Cambios
            </Button>
          )}
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
            Volver
          </Button>
        </div>
      </article>
    </main>
  );
}
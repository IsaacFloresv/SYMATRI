import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface DatosPersonales { firstName: string; lastName: string; genero?: string; }
interface Receptor { email: string; datosPersonales: DatosPersonales; }
interface MensajeInfo {
  id: number;
  asunto: string;
  mensaje: string;
  fechaEnvio?: string;
  emisor?: { datosPersonales: DatosPersonales; email: string };
  attachments?: { id: string; name: string; size: string; type: string; url: string }[];
  prioridad?: "urgent" | "normal";
  tipo?: string;
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

export default function LeerMensaje() {
  const navigate = useNavigate();
  const loc = useLocation();
  // `navigate(..., { state: entry })` passes the object directly as state.
  const entry = (loc.state as MensajeReceptor | undefined) ?? (loc.state as any)?.entry;

  useEffect(() => {
    if (!entry) {
      navigate("/alumno/comunicaciones");
    }
  }, [entry, navigate]);

  if (!entry) return null;
  const msg = entry.mensaje;

  return (
    <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
      {/* ToolBar */}
      <div className="sticky top-0 z-10 flex justify-between items-center gap-2 px-6 py-3 bg-background-light dark:bg-[#111a22] border-b border-white/10">
        <div className="flex gap-1">
          <button
            className="p-2 text-[#92aec9] hover:text-white transition-colors"
            title="Atrás"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            className="p-2 text-[#92aec9] hover:text-white transition-colors"
            title="Archivar"
          >
            <span className="material-symbols-outlined">archive</span>
          </button>
          <button
            className="p-2 text-[#92aec9] hover:text-red-400 transition-colors"
            title="Eliminar"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
          <div className="w-px h-8 bg-white/10 mx-2 self-center"></div>
          <button
            className="p-2 text-[#92aec9] hover:text-white transition-colors"
            title="Marcar como no leído"
          >
            <span className="material-symbols-outlined">drafts</span>
          </button>
        </div>
        <button
          className="flex items-center gap-2 rounded-md border border-black bg-[#e5e7eb] text-black font-medium px-4 py-2"
          onClick={() => navigate("/alumno/comunicaciones")}
        >
          <span className="material-symbols-outlined text-[20px]">inbox</span>
          <span className="truncate">Volver a la bandeja</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="max-w-[1000px] mx-auto w-full px-6 py-8 flex flex-col gap-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 px-2">
          <a
            className="text-[#92aec9] text-sm font-medium hover:text-primary transition-colors"
            href="#"
          >
            Mensajes
          </a>
          <span className="text-[#92aec9] text-sm">/</span>
          <span className="text-white text-sm font-medium">Lectura</span>
        </div>

        {/* PageHeading & Meta */}
        <div className="flex flex-col gap-6 p-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-white text-4xl font-black leading-tight tracking-tight">
                {msg.asunto}
              </h2>
              {/* badges */}
              <div className="flex gap-2 shrink-0">
                {msg.prioridad === "urgent" && (
                  <div className="flex h-7 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 px-3">
                    <p className="text-red-400 text-xs font-semibold uppercase tracking-wider">
                      Urgente
                    </p>
                  </div>
                )}
                {msg.tipo && (
                  <div className="flex h-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 px-3">
                    <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                      {msg.tipo}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-primary/20"
                data-alt={`${msg.emisor?.datosPersonales.firstName} ${msg.emisor?.datosPersonales.lastName}`}
                style={{
                  backgroundImage: `url("${msg.emisor?.email || ""}")`,
                }}
              />
              <div className="flex flex-col">
                <p className="text-white text-lg font-medium leading-tight">
                  {msg.emisor?.datosPersonales.firstName} {msg.emisor?.datosPersonales.lastName}
                </p>
                <p className="text-[#92aec9] text-sm font-normal">
                  Para: {entry.receptor.datosPersonales.firstName} {entry.receptor.datosPersonales.lastName} • {msg.fechaEnvio}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Body */}
        <div className="bg-[#111a22] rounded-xl border border-white/5 p-8 shadow-xl">
          <div className="prose prose-invert max-w-none text-[#d1d5db] text-lg leading-relaxed space-y-4">
            {msg.mensaje.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          {/* Attachments Placeholder */}
          {msg.attachments && msg.attachments.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3">
              <p className="text-white text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">attachment</span> Archivos Adjuntos ({msg.attachments.length})
              </p>
              {msg.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 w-fit hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-red-400">picture_as_pdf</span>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">{att.name}</span>
                    <span className="text-[#92aec9] text-xs">{att.size}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

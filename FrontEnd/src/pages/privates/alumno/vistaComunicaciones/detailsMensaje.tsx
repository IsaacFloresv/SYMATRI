import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

// types matching API
interface DatosPersonales { firstName: string; lastName: string; genero?: string; }
interface Receptor { email: string; datosPersonales: DatosPersonales; }
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
  emisor?: { id: number; email: string; datosPersonales: DatosPersonales; };
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

function formatDateTime(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  return d.toLocaleString(undefined, {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
}

interface DetailsMensajeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry?: MensajeReceptor;
  onArchived?: (mensajeId: number, isArchived: boolean) => void;
}

export default function DetailsMensaje({ open, onOpenChange, entry, onArchived }: DetailsMensajeProps) {
  if (!entry) return null;
  const msg = entry.mensaje;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] max-h-[95vh] overflow-y-auto bg-[#0b1219] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800">
        {/* header */}
        <div className="flex items-center justify-between px-4 pt-2 pb-2">
          <h2 className="text-white tracking-tight text-[24px] font-bold leading-tight">
            {msg.asunto}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-[#92aec9] dark:hover:text-white transition-colors"
          >
          </button>
        </div>
        {/* badges */}
        <div className="px-4 flex gap-2 flex-wrap">
          <Badge variant="secondary" className="flex items-center w-40 gap-1 h-7 bg-blue-500 text-white">
            <span className="material-symbols-outlined text-[18px]">school</span>
            Académico
          </Badge>
          <Badge variant="destructive" className="flex items-center w-40 gap-1 h-7 bg-yellow-400 text-black">
            <span className="material-symbols-outlined text-[18px]">priority_high</span>
            Importante
          </Badge>
        </div>
        {/* sender */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#1a2632] p-4 rounded-lg">
            <div className="flex flex-col justify-center flex-1">
              <p className="text-gray-900 dark:text-white text-base font-semibold leading-tight">
                {msg.emisor?.datosPersonales.firstName} {msg.emisor?.datosPersonales.lastName}
              </p>
              <p className="text-gray-500 dark:text-[#92aec9] text-sm font-normal">
                Enviado: {formatDateTime(msg.fechaEnvio)}
              </p>
            </div>
          </div>
        </div>
        {/* body */}
        <div className="px-4 py-2 max-h-[100px] overflow-y-auto">
          <p className="text-gray-700 dark:text-gray-200 text-base font-normal leading-relaxed pb-2">
            {msg.mensaje}
          </p>
        </div>
        {/* footer */}
        <div className="flex items-center justify-between px-4 py-1 bg-gray-50/50 dark:bg-[#0b1219]">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={async () => {
                if (!msg?.id) return;
                const headers: Record<string, string> = { "Content-Type": "application/json" };
                if (api.token) headers.Authorization = `Bearer ${api.token}`;

                try {
                  const res = await fetch(`${api.baseUrl}/mensajes/isArchived`, {
                    method: "PATCH",
                    headers,
                    body: JSON.stringify({ id: msg.id, isArchived: !msg.isArchived }),
                  });

                  if (res.ok) {
                    onArchived?.(msg.id, !msg.isArchived);
                    onOpenChange(false);
                  } else {
                    console.error("Error updating archive state", await res.text());
                  }
                } catch (error) {
                  console.error("Error updating archive state", error);
                }
              }}
            >
              <span className="material-symbols-outlined text-[18px]">archive</span>
              {msg.isArchived ? "Desarchivar" : "Archivar"}
            </Button>
          </div>
          <Button className="border" variant="ghost" onClick={() => onOpenChange(false)}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


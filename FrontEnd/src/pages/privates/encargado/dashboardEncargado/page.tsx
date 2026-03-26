import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconMail, IconBell } from "@tabler/icons-react";

interface Child {
  id: number;
  name: string;
  avatar?: string;
}

interface Grade {
  materia: string;
  materiaId?: number;
  current: number;
  previous: number;
  trend: number;
  history: number[];
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
}

export default function DashBoardEncargado() {
  const session = useAuthStorage((s) => s.user);
  const setSelectedChildId = useAuthStorage((s) => s.setSelectedChildId);
  const setSelectedChildName = useAuthStorage((s) => s.setSelectedChildName);
  // we don't need the current value here

  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedMateriaId, setSelectedMateriaId] = useState<number | null>(null);
  const [absences, setAbsences] = useState<{ weekly: number; monthly: number; trend: string }>({
    weekly: 0,
    monthly: 0,
    trend: "--",
  });
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  interface MensajeReceptor {
    id: number;
    mensajeId: number;
    receptorId: number;
    leido?: boolean;
    fechaLectura?: string | null;
    receptor: { datosPersonales: { firstName: string; lastName: string } };
    mensaje: { asunto: string; mensaje: string; fechaEnvio?: string };
  }

  const [unreadMessages, setUnreadMessages] = useState<MensajeReceptor[]>([]);

  const formatRelativeTime = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const diff = Date.now() - date.getTime();
    const minutes = Math.round(diff / 60000);
    if (minutes < 60) return `Hace ${minutes} ${minutes === 1 ? "min" : "mins"}`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    const days = Math.round(hours / 24);
    if (days === 1) return "Ayer";
    return `Hace ${days} días`;
  };

  // load the list of children for the logged‑in encargado
  useEffect(() => {
    async function loadChildren() {
      if (!session?.id) return;
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/encargadoAlumnos/byid?id=${session.id}`, {
          headers,
        });
        if (!res.ok) throw new Error("failed fetching children");
        const arr = await res.json();
        const parent = Array.isArray(arr) ? arr[0] : arr;
        const list: Child[] = (parent?.encargado || []).map((rel: any) => ({
          id: rel.alumno?.id,
          name: `${rel.alumno?.datosPersonales?.firstName || ""} ${
            rel.alumno?.datosPersonales?.lastName || ""
          }`.trim(),
          avatar: rel.alumno?.avatar,
        }));
        setChildren(list);
        if (list.length > 0) {
          setSelectedChild(list[0]);
          setSelectedChildId(list[0].id);
          setSelectedChildName(list[0].name);
        }
      } catch (e) {
        console.error(e);
      }
    }

    loadChildren();
  }, [session?.id, setSelectedChildId]);

  // when a child is selected fetch metrics from the API
  useEffect(() => {
    if (!selectedChild) return;
    setSelectedChildId(selectedChild.id);
    const childId = selectedChild.id;

    async function loadMetrics() {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;

        // -- grades -------------------------------------------------------
        const notesRes = await fetch(`${api.baseUrl}/notas/all`, { headers });
        if (notesRes.ok) {
          const all = await notesRes.json();
          const filtered = (all || []).filter(
            (n: any) => n.alumnoNota?.id === childId
          );
          type MatKey = { id: number; name: string };
          const byMat: Record<string, { meta: MatKey; vals: number[] }> = {};
          filtered.forEach((n: any) => {
            const materiaId = Number(n.materia?.id ?? n.materiaId ?? 0);
            const materiaName = n.materia?.name || n.materia?.nombre || "Sin materia";
            const key = `${materiaId}|${materiaName}`;
            const val = Number(n.nota || n.valor || 0);
            if (!byMat[key]) byMat[key] = { meta: { id: materiaId, name: materiaName }, vals: [] };
            byMat[key].vals.push(val);
          });
          const computed: Grade[] = Object.values(byMat).map(({ meta, vals }) => {
            const curr = vals.reduce((a, b) => a + b, 0) / vals.length;
            const prev = curr - Math.random() * 5;
            return {
              materia: meta.name,
              materiaId: meta.id || undefined,
              current: curr,
              previous: prev,
              trend: curr > prev ? 1 : -1,
              history: [curr - 2, curr - 1, curr],
            };
          });
          setGrades(computed);
        }

        // -- events -------------------------------------------------------
        // First, try to resolve the child's section so we can query events by section.
        let sectionId: number | null = null;
        const seccionesRes = await fetch(`${api.baseUrl}/seccionAlumnos/all`, { headers });
        if (seccionesRes.ok) {
          const seccionesJson = await seccionesRes.json();
          // seccionesJson is an array of sections with nested seccionA (students)
          const found = (seccionesJson || []).find((s: any) =>
            Array.isArray(s.seccionA) && s.seccionA.some((rel: any) => rel.alumno?.id === childId)
          );
          if (found) sectionId = found.id;
        }

        const eventsUrl = sectionId
          ? `${api.baseUrl}/eventos/search?seccionId=${sectionId}`
          : `${api.baseUrl}/eventos/search?userId=${childId}`;

        const eventsRes = await fetch(eventsUrl, { headers });
        if (eventsRes.ok) {
          const json = await eventsRes.json();
          setEvents(json.events || []);
        }

        // -- absences -----------------------------------------------------
        const asRes = await fetch(`${api.baseUrl}/asistencia/all?userId=${childId}`, {
          headers,
        });
        if (asRes.ok) {
          const arr = await asRes.json();
          const monthly = arr.length;
          const weekly = Math.ceil(arr.length / 4);
          setAbsences({
            weekly,
            monthly,
            trend: monthly > 5 ? "Aumento" : "Estable",
          });
        }

        // -- unread messages ---------------------------------------------
        const msgRes = await fetch(
          `${api.baseUrl}/mensajeReceptor/allById?receptorId=${childId}`,
          { headers }
        );
        if (msgRes.ok) {
          const msgs: MensajeReceptor[] = await msgRes.json();
          const unread = (msgs || []).filter((m) => m.leido !== true);
          setUnreadMessages(unread);
        }
      } catch (e) {
        console.error(e);
      }
    }

    loadMetrics();
  }, [selectedChild, setSelectedChildId]);

  const handleChildClick = (child: Child) => {
    setSelectedChild(child);
    setSelectedChildId(child.id);
    setSelectedChildName(child.name);
  };

  return (
    <main className="flex-1 p-8 bg-background-dark flex flex-col">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground-dark">
          Resumen de Hijos
        </h1>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-4">
            {children.map((c) => (
              <div
                key={c.id}
                onClick={() => handleChildClick(c)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer ${
                  selectedChild?.id === c.id
                    ? "border-primary bg-primary/10"
                    : "border-transparent bg-card-dark hover:border-primary/50"
                } transition-colors`}
              >
                <Avatar className="size-20">
                  {c.avatar ? (
                    <AvatarImage src={c.avatar} />
                  ) : (
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <span
                  className={`text-sm font-semibold ${
                    selectedChild?.id === c.id ? "text-primary" : "text-muted-dark"
                  }`}
                >
                  {c.name}
                </span>
              </div>
            ))}
          </div>

          {selectedChild && (
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-foreground-dark">
                  Tabla de Rendimiento Académico
                </h2>
                <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden">
                  <Table className="min-w-full divide-y divide-border-dark text-sm">
                    <TableHeader className="bg-card-dark/50 whitespace-pre-line">
                      <TableRow>
                            <TableHead className="px-5 py-3 whitespace-pre-line text-left uppercase tracking-wider text-muted-dark text-xs">
                          Materia
                        </TableHead>
                        <TableHead className="px-5 py-3 whitespace-pre-line text-left uppercase tracking-wider text-muted-dark text-xs">
                          Promedio Actual
                        </TableHead>
                        <TableHead className="px-5 py-3 whitespace-pre-line text-left uppercase tracking-wider text-muted-dark text-xs">
                          Promedio Anterior
                        </TableHead>
                        <TableHead className="px-5 py-3 whitespace-pre-line text-left uppercase tracking-wider text-muted-dark text-xs">
                          Cambio (%)
                        </TableHead>
                        <TableHead className="px-5 py-3 whitespace-pre-line text-left uppercase tracking-wider text-muted-dark text-xs">
                          Tendencia (últimos 3 periodos)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grades.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="p-6 text-center">
                            Sin datos
                          </TableCell>
                        </TableRow>
                      ) : (
                        grades.map((g) => {
                          const change =
                            ((g.current - g.previous) / (g.previous || 1)) * 100;
                          const isUp = change >= 0;
                          return (
                            <TableRow
                              key={g.materia}
                              className={`hover:bg-card-dark/50 transition-colors cursor-pointer ${
                                selectedMateriaId && g.materiaId === selectedMateriaId
                                  ? "bg-primary/10 border-l-4 border-primary"
                                  : ""
                              }`}
                              onClick={() => {
                                const targetMateriaId = g.materiaId ?? 0;
                                if (!targetMateriaId) return;
                                setSelectedMateriaId(targetMateriaId);
                                navigate(
                                  `/encargado/calificaciones?materiaId=${encodeURIComponent(
                                    String(targetMateriaId)
                                  )}`
                                );
                              }}
                            >
                              <TableCell className="px-6 py-4">
                                {g.materia}
                              </TableCell>
                              <TableCell className="px-6 py-4 font-bold">
                                {g.current.toFixed(1)}
                              </TableCell>
                              <TableCell className="px-6 py-4 text-muted- dark">
                                {g.previous.toFixed(1)}
                              </TableCell>
                              <TableCell
                                className={`px-6 py-4 ${
                                  isUp ? "text-green-500" : "text-red-500"
                                }`}
                              >
                                {isUp ? "+" : ""}{change.toFixed(2)}%
                              </TableCell>
                              <TableCell className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-end h-8 w-16 gap-1">
                                    {g.history.map((v, i) => {
                                      const color =
                                        i === g.history.length - 1
                                          ? "bg-green-500"
                                          : v > g.previous
                                          ? "bg-green-500"
                                          : "bg-yellow-500";
                                      return (
                                        <div
                                          key={i}
                                          className={`w-1/3 ${color} rounded-sm`}
                                          style={{ height: `${v}%` }}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ausencias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-2xl text-yellow-500">
                          event_note
                        </span>
                        <p className="text-base text-foreground-dark">Semanal:</p>
                      </div>
                      <p className="text-xl font-semibold text-foreground-dark">
                        {absences.weekly}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-2xl text-yellow-500">
                          calendar_month
                        </span>
                        <p className="text-base text-foreground-dark">Mensual:</p>
                      </div>
                      <p className="text-xl font-semibold text-foreground-dark">
                        {absences.monthly}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-dark">
                      <span className="material-symbols-outlined text-lg text-red-500">
                        trending_up
                      </span>
                      <p>
                        Tendencia: <span className="text-red-500">
                          {absences.trend}
                        </span> respecto al mes anterior
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conducta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-foreground-dark">
                      <span className="material-symbols-outlined text-2xl text-green-500">
                        sentiment_satisfied
                      </span>
                      <p className="text-base">
                        Estado: <span className="font-semibold">Excelente</span>
                      </p>
                    </div>
                    <p className="text-sm text-muted-dark">
                      Mantiene un comportamiento ejemplar durante el último mes.
                    </p>
                    <Button
                      variant="link"
                      className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium p-0"
                      onClick={() => {} }
                    >
                      Ver detalles
                      <span className="material-symbols-outlined text-lg">
                        arrow_right_alt
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </section>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 flex flex-col space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground-dark">
              Próximos Eventos
            </h2>
            <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden max-h-[320px]">
              {events.length === 0 ? (
                <div className="p-6 text-center text-muted-dark">Sin eventos</div>
              ) : (
                <ul className="divide-y divide-border-dark overflow-y-auto max-h-[320px]">
                  {events.map((ev) => (
                    <li
                      key={ev.id}
                      className="p-4 flex items-start gap-3 hover:bg-card-dark/50 transition-colors"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/20 text-primary size-10">
                        <span className="material-symbols-outlined text-xl">event</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-base font-semibold text-foreground-dark truncate">
                            {ev.date}: {ev.title}
                          </p>
                          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full font-semibold">
                            Próximo
                          </span>
                        </div>
                        {ev.location && (
                          <p className="text-sm text-muted-dark mt-1 truncate">
                            {ev.location}{ev.time ? ` · ${ev.time}` : ""}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground-dark">
              Mensajes No Leídos
            </h2>
            <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden max-h-[320px] overflow-y-auto">
              {unreadMessages.length === 0 ? (
                <div className="p-6 text-center text-muted-dark">Sin mensajes no leídos</div>
              ) : (
                <ul className="divide-y divide-border-dark">
                  {unreadMessages.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-start gap-3 p-4 hover:bg-card-dark/50 transition-colors"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <IconMail className="h-5 w-5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <p className="font-semibold text-foreground-dark truncate">
                            {m.mensaje.asunto}
                          </p>
                          <span className="text-xs text-muted-dark whitespace-nowrap">
                            {formatRelativeTime(m.mensaje.fechaEnvio)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-dark mt-1 line-clamp-2">
                          {m.mensaje.mensaje}
                        </p>
                        <p className="text-xs text-muted-dark mt-2 flex items-center gap-1">
                          <IconBell className="h-3.5 w-3.5" />
                          De: {m.receptor.datosPersonales.firstName} {m.receptor.datosPersonales.lastName}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

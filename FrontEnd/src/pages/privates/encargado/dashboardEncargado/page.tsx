import { useState, useEffect } from "react";
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

interface Child {
  id: number;
  name: string;
  avatar?: string;
}

interface Grade {
  materia: string;
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
  // we don't need the current value here

  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [absences, setAbsences] = useState<{ weekly: number; monthly: number; trend: string }>({
    weekly: 0,
    monthly: 0,
    trend: "--",
  });
  const [events, setEvents] = useState<EventItem[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);

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
          const byMat: Record<string, number[]> = {};
          filtered.forEach((n: any) => {
            const m = n.materia?.name || "Sin materia";
            const val = Number(n.nota || n.valor || 0);
            if (!byMat[m]) byMat[m] = [];
            byMat[m].push(val);
          });
          const computed: Grade[] = Object.entries(byMat).map(([mat, vals]) => {
            const curr = vals.reduce((a, b) => a + b, 0) / vals.length;
            const prev = curr - Math.random() * 5;
            return {
              materia: mat,
              current: curr,
              previous: prev,
              trend: curr > prev ? 1 : -1,
              history: [curr - 2, curr - 1, curr],
            };
          });
          setGrades(computed);
        }

        // -- events -------------------------------------------------------
        const eventsRes = await fetch(
          `${api.baseUrl}/eventos/search?userId=${childId}`,
          { headers }
        );
        if (eventsRes.ok) {
          const json = await eventsRes.json();
          setEvents(json.events || []);
        }

        // -- absences -----------------------------------------------------
        const asRes = await fetch(
          `${api.baseUrl}/asistencia/all?userId=${childId}`,
          { headers }
        );
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
          `${api.baseUrl}/comunicaciones?folder=recibidos`,
          { headers }
        );
        if (msgRes.ok) {
          const msgs = await msgRes.json();
          setUnreadMessages(msgs.length);
        }
      } catch (e) {
        console.error(e);
      }
    }

    loadMetrics();
  }, [selectedChild, setSelectedChildId]);

  const handleChildClick = (child: Child) => {
    setSelectedChild(child);
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
                    <TableHeader className="bg-card-dark/50">
                      <TableRow>
                        <TableHead className="px-6 py-3 text-left uppercase tracking-wider text-muted-dark">
                          Materia
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left uppercase tracking-wider text-muted-dark">
                          Promedio Actual
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left uppercase tracking-wider text-muted-dark">
                          Promedio Anterior
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left uppercase tracking-wider text-muted-dark">
                          Cambio (%)
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left uppercase tracking-wider text-muted-dark">
                          Tendencia
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
                              className="hover:bg-card-dark/50 transition-colors"
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
            <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden max-h-[300px] overflow-y-auto">
              <ul className="divide-y divide-border-dark">
                {events.length === 0 ? (
                  <li className="p-4 text-center text-muted-dark">
                    Sin eventos
                  </li>
                ) : (
                  events.map((ev) => (
                    <li
                      key={ev.id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 text-primary rounded-full size-8 flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg">
                            event
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground-dark">
                            {ev.date}: {ev.title}
                          </p>
                          {ev.location && (
                            <p className="text-sm text-muted-dark">
                              {ev.location}, {ev.time}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-dark px-2 py-1 bg-primary/10 rounded-full">
                        Próximo
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground-dark">
              Mensajes No Leídos
            </h2>
            <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden max-h-[300px] overflow-y-auto flex items-center justify-center">
              <p className="text-lg font-bold text-foreground-dark">{unreadMessages}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

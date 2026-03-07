import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { api } from "@/lib/api";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface GradeRow {
  actividad: string;
  tipo: string;
  maximo: number;
  obtenido: number;
}

interface EventItem {
  id: number;
  title: string;
  date: string;
  status: "done" | "upcoming";
}

interface Attendance {
  attended: number;
  total: number;
  late: number;
}

export default function VistaCalificacionesMaterias() 
{
  const session = useAuthStorage((s) => s.user);
  const selectedChildId = useAuthStorage((s) => s.selectedChildId);
  const navigate = useNavigate();
  const location = useLocation();
  const [grades, setGrades] = useState<GradeRow[]>([]);
  const [schedule, setSchedule] = useState<EventItem[]>([]);
  const [attendance, setAttendance] = useState<Attendance>({ attended: 0, total: 0, late: 0 });

  // optional override via query string ?alumnoId=xxx
  const params = new URLSearchParams(location.search);
  const queryAlumno = params.get("alumnoId");

  // determine which alumnoId to use: query override > child > own
  const alumnoId = queryAlumno ? Number(queryAlumno) : selectedChildId ?? session?.id;

  // filtro de periodo y materia
  const currentYear = new Date().getFullYear().toString();
  const [periodo, setPeriodo] = useState(currentYear);
  const [materiaId, setMateriaId] = useState<number>(1);
  const [materias, setMaterias] = useState<{ id: number; name: string }[]>([]);

  // load materias, events and attendance; does NOT fetch notas
  const loadInitialData = async () => {
    if (!session?.id) return;
    const headers: Record<string, string> = {};
    if (api.token) headers.Authorization = `Bearer ${api.token}`;

    // materias
    if (materias.length === 0) {
      try {
        const mRes = await fetch(`${api.baseUrl}/materias/all`, { headers });
        if (mRes.ok) {
          const mAll = await mRes.json();
          const list = mAll.map((m: any) => ({ id: m.id, name: m.name || m.nombre || "" }));
          setMaterias(list);
          // set default materiaId if current does not exist
          if (!list.find((x) => x.id === materiaId)) {
            const def = list[0]?.id;
            if (def !== undefined) {
              setMateriaId(def);
            }
          }
        }
      } catch (err) {
        console.error("error loading materias", err);
      }
    }

    // eventos
    try {
      const evRes = await fetch(`${api.baseUrl}/eventos/search?userId=${session.id}`, { headers });
      if (evRes.ok) {
        const evAll = await evRes.json();
        const arr = Array.isArray(evAll) ? evAll : [];
        if (!Array.isArray(evAll)) {
          console.warn("expected eventos array but got", evAll);
        }
        const evList: EventItem[] = arr.map((e: any) => ({
          id: e.id,
          title: e.title || e.nombre || "Evento",
          date: e.fecha || e.date || "",
          status: e.realizado ? "done" : "upcoming",
        }));
        setSchedule(evList.slice(0, 10));
      }
    } catch (e) {
      console.error("error fetching eventos", e);
    }

    // asistencia
    try {
      const asRes = await fetch(`${api.baseUrl}/asistencia/all`, { headers });
      if (asRes.ok) {
        const allA = await asRes.json();
        const arrA = Array.isArray(allA) ? allA : [];
        if (!Array.isArray(allA)) {
          console.warn("expected asistencia array but got", allA);
        }
        const mine = arrA.filter((a: any) => a.alumnoId === session.id);
        const attended = mine.filter((a: any) => a.presente).length;
        const late = mine.filter((a: any) => a.tarde).length;
        setAttendance({ attended, total: mine.length, late });
      }
    } catch (e) {
      console.error("error fetching asistencia", e);
    }
  };

  // fetch notes based on current filtros
  const loadNotas = async () => {
    if (!session?.id) return;
    const headers: Record<string, string> = {};
    if (api.token) headers.Authorization = `Bearer ${api.token}`;

    // use effective materia id in case it was just updated
    let effectiveMateria = materiaId;
    if (materias.length > 0 && !materias.find((m) => m.id === effectiveMateria)) {
      effectiveMateria = materias[0].id;
      setMateriaId(effectiveMateria);
    }

    const query = new URLSearchParams({
      periodo,
      materiaId: String(effectiveMateria),
      alumnoId: String(alumnoId ?? ""),
    }).toString();
    console.log("Datos query", query, "alumnoIdUsed", alumnoId);
    try {
      const notasRes = await fetch(`${api.baseUrl}/notas/allbyid?${query}`, { headers });
      if (notasRes.ok) {
        const all: any = await notasRes.json();
        // server should return array of notas for this alumnoId; fall back to empty
        const arr = Array.isArray(all) ? all : [];
        console.log("respuesta notas count", arr.length);
        const list: GradeRow[] = arr.map((n) => ({
          actividad: n.tipoNota?.nombre || "(sin nombre)",
          tipo: n.materia?.name || "",
          // if maximo missing or zero, assume standard 100
          maximo: Number(n.maximo ?? 0) || 100,
          obtenido: Number(n.nota ?? 0),
        }));
        list.sort((a, b) => a.actividad.localeCompare(b.actividad));
        setGrades(list);
      }
    } catch (e) {
      console.error("error fetching notas", e);
    }
  };

  // load initial data (materias, eventos, asistencia) on mount
  useEffect(() => {
    console.log("session during load", session, "selectedChild", selectedChildId, "queryAlumno", queryAlumno);
    loadInitialData();
  }, [session, selectedChildId, queryAlumno]);

  const promedio = grades.length
    ? grades.reduce((acc, g) => acc + g.obtenido, 0) / grades.length
    : 0;

  return (
    <main className="flex-1 p-8 bg-background-dark flex flex-col">
      <header className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {alumnoId && session?.id !== alumnoId && (
          <p className="text-yellow-400 text-sm">
            Mostrando calificaciones para alumno {alumnoId} (override: {queryAlumno ? 'sí' : 'no'})
          </p>
        )}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-card-dark rounded-lg transition-colors border border-transparent hover:border-border-dark"
          >
            <span className="material-symbols-outlined text-muted-dark">arrow_back</span>
          </button>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground-dark">
              {grades[0]?.tipo || "Asignatura"}
            </h1>
            <p className="text-muted-dark mt-1">Detalle de rendimiento y actividades del curso</p>
          </div>
        </div>
        {/* filtros de periodo y materia */}
        <div className="flex items-end gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-muted-dark mb-1">Periodo</label>
            <input
              type="text"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="w-24 px-2 py-1 rounded border border-border-dark bg-card-dark text-foreground-dark text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-muted-dark mb-1">Materia</label>
            <Select
              value={String(materiaId)}
              onValueChange={(v) => setMateriaId(Number(v))}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {materias.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={loadNotas} className="mt-5">Mostrar</Button>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground-dark">Desglose de Calificaciones</h2>
              <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-bold">
                Promedio: {promedio.toFixed(2)}
              </div>
            </div>
            <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden">
              <Table className="min-w-full divide-y divide-border-dark">
                <TableHeader className="bg-card-dark/50">
                  <TableRow>
                    <TableHead className="px-6 py-4 text-left text-xs font-medium text-muted-dark uppercase tracking-wider">
                      Actividad
                    </TableHead>
                    <TableHead className="px-6 py-4 text-left text-xs font-medium text-muted-dark uppercase tracking-wider">
                      Tipo
                    </TableHead>
                    <TableHead className="px-6 py-4 text-center text-xs font-medium text-muted-dark uppercase tracking-wider">
                      Puntaje Máx.
                    </TableHead>
                    <TableHead className="px-6 py-4 text-right text-xs font-medium text-muted-dark uppercase tracking-wider">
                      Nota Obtenida
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border-dark">
                  {grades.map((g, idx) => (
                    <TableRow key={idx} className="hover:bg-card-dark/50 transition-colors">
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground-dark">
                        {g.actividad}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-xs text-muted-dark">
                        {g.tipo}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-center text-muted-dark">
                        {g.maximo}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right text-foreground-dark font-bold">
                        {g.obtenido}
                      </TableCell>
                    </TableRow>
                  ))}
                  {grades.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="p-6 text-center">
                        No hay calificaciones disponibles
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground-dark">Cronograma de Actividades</h2>
            <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border-dark">
              {schedule.map((ev) => (
                <div key={ev.id} className="relative">
                  <div className={`absolute -left-[25px] top-1 ${ev.status === 'done' ? 'bg-primary' : 'bg-muted-dark'} size-4 rounded-full border-4 border-background-dark`}></div>
                  <div className={`p-4 rounded-lg border border-border-dark bg-card-dark flex justify-between items-center ${ev.status === 'upcoming' ? 'bg-card-dark/30' : ''}`}>
                    <div>
                      <p className="text-sm font-bold text-foreground-dark">{ev.title}</p>
                      <p className="text-xs text-muted-dark">{ev.date}</p>
                    </div>
                    {ev.status === 'done' ? (
                      <span className="material-symbols-outlined text-green-500">check_circle</span>
                    ) : (
                      <span className="text-[10px] text-primary px-2 py-0.5 bg-primary/10 rounded-full font-bold uppercase tracking-wider">Próximo</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <section>
            <div className="p-6 rounded-lg border border-border-dark bg-card-dark">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground-dark">Asistencia</h3>
                <span className="material-symbols-outlined text-primary">calendar_today</span>
              </div>
              <div className="flex items-center gap-6 mb-6">
                <div className="relative size-24 flex items-center justify-center">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <circle className="stroke-border-dark fill-none" cx="18" cy="18" r="16" stroke-width="3"></circle>
                    <circle className="stroke-primary fill-none" cx="18" cy="18" r="16" stroke-dasharray="100" stroke-dashoffset={`${100 - (attendance.attended / (attendance.total || 1)) * 100}`} stroke-linecap="round" stroke-width="3"></circle>
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-xl font-bold text-foreground-dark">
                      {attendance.total > 0 ? Math.round((attendance.attended / attendance.total) * 100) + "%" : "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-dark">Clases asistidas: <span className="text-foreground-dark font-medium">{attendance.attended}/{attendance.total}</span></p>
                  <p className="text-sm text-muted-dark">Inasistencias: <span className="text-red-500 font-medium">{attendance.total - attendance.attended - attendance.late}</span></p>
                  <p className="text-sm text-muted-dark">Retrasos: <span className="text-yellow-500 font-medium">{attendance.late}</span></p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

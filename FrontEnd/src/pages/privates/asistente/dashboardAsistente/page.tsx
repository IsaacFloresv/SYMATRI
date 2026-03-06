
"use client"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface DashboardMetrics {
  totalMatriculados: number;
  aboveAverage: number;
  belowAverage: number;
  failed: number;
  absenceToday: number;
  absenceWeek: number;
  absenceMonth: number;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
}

interface StudentRow {
  id: string;
  name: string;
  grade: string;
  section: string;
  avg: number;
} 

export default function DashBoardAsistente() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalMatriculados: 0,
    aboveAverage: 0,
    belowAverage: 0,
    failed: 0,
    absenceToday: 0,
    absenceWeek: 0,
    absenceMonth: 0,
  });
  const [upcoming, setUpcoming] = useState<UpcomingEvent[]>([]);
  const [period, setPeriod] = useState("2024-I");

  // student list preview
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  useEffect(() => {
    async function loadStudents() {
      setLoadingStudents(true);
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/seccionAlumnos/all`, { headers });
        if (!res.ok) throw new Error("failed to fetch");
        const data: any[] = await res.json();
        const rows: StudentRow[] = [];
        data.forEach((sec) => {
          const sectionName: string = sec.name || "";
          const grade = sectionName.split("-")[0].trim();
          (sec.seccionA || []).forEach((entry: any) => {
            const alumno = entry.alumnoS || {};
            const datos = alumno.datosPersonales || {};
            rows.push({
              id: alumno.id?.toString() || "",
              name: `${datos.firstName || ""} ${datos.lastName || ""}`.trim(),
              grade,
              section: sectionName,
              avg: alumno.promedio || 0,
            });
          });
        });
        setStudents(rows.slice(0, 6));
      } catch (err) {
        console.error("load students", err);
      } finally {
        setLoadingStudents(false);
      }
    }
    loadStudents();
  }, []);


  // chart dataset object – derive from metrics when possible
  const chartData: {
    monthly: Array<{ label: string; value: number }>;
    weekly: Array<{ label: string; value: number }>;
    monthlyMax?: number;
    weeklyMax?: number;
  } = {
    monthly: [
      { label: "Hoy", value: metrics.absenceToday },
      { label: "Esta Sem.", value: metrics.absenceWeek },
      { label: "Este Mes", value: metrics.absenceMonth },
    ],
    weekly: [
      { label: "3 sem.", value: metrics.absenceWeek },
      { label: "2 sem.", value: metrics.absenceWeek },
      { label: "Esta Sem.", value: metrics.absenceWeek },
    ],
  };
  const monthlyData = chartData.monthly;
  const weeklyData = chartData.weekly;

  const WEEKLY_LIMIT = 45;
  const MONTHLY_LIMIT = WEEKLY_LIMIT * 4;

  const computedMonthly = monthlyData.length ? Math.max(...monthlyData.map(d => d.value)) : 0;
  const computedWeekly = weeklyData.length ? Math.max(...weeklyData.map(d => d.value)) : 0;

  const monthlyMax = chartData.monthlyMax ?? Math.max(computedMonthly, MONTHLY_LIMIT);
  const weeklyMax = chartData.weeklyMax ?? Math.max(computedWeekly, WEEKLY_LIMIT);

  const makeTicks = (max: number, steps: number = 4): number[] => {
    const arr: number[] = [];
    for (let i: number = steps; i > 0; i--) {
      arr.push(Math.ceil((max * i) / steps));
    }
    arr.push(0);
    return arr;
  };

  const monthlyTicks = makeTicks(monthlyMax);
  const weeklyTicks = makeTicks(weeklyMax);

  useEffect(() => {
    async function load() {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/dashboard/asistente`, { headers });
        if (res.ok) {
          const d = await res.json();
          setMetrics({
            totalMatriculados: d.totalMatriculados || 0,
            aboveAverage: d.aboveAverage || 0,
            belowAverage: d.belowAverage || 0,
            failed: d.failed || 0,
            absenceToday: d.absenceToday || 0,
            absenceWeek: d.absenceWeek || 0,
            absenceMonth: d.absenceMonth || 0,
          });
          if (d.period) setPeriod(d.period);
        }
      } catch (e) {
        console.error("failed loading dashboard metrics", e);
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function loadEvents() {
      try {
        const headers: Record<string, string> = {};
        if (api.token) headers.Authorization = `Bearer ${api.token}`;
        const res = await fetch(`${api.baseUrl}/eventos/next?limit=3`, { headers });
        if (res.ok) {
          const j = await res.json();
          setUpcoming(j.events || []);
        }
      } catch (e) {
        console.error("failed loading upcoming events", e);
      }
    }
    loadEvents();
  }, []);

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <p className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Panel de Control
            </p>
            <p className="text-gray-600 dark:text-[#92aec9] text-base font-normal leading-normal">
              Resumen general del estado del colegio.
            </p>
            <Button
              variant="link"
              className="mt-1 text-primary hover:underline p-0"
              onClick={() => navigate('/asistente/datos-dashboard')}
            >
              Ver datos detallados
            </Button>
          </div>
          <Button
            variant="outline"
            className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-3"
            onClick={() => {
              /* period picker placeholder */
            }}
          >
            <p className="text-black dark:text-white text-sm font-medium leading-normal">
              Periodo: {period}
            </p>
            <span className="material-symbols-outlined text-black dark:text-white">
              expand_more
            </span>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">
              Total de Matriculados
            </p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">
              {metrics.totalMatriculados}
            </p>
            {/* could show percentage change if available */}
          </Card>
          <Card className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">
              Alumnos Encima del Promedio
            </p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">
              {metrics.aboveAverage}
            </p>
            {metrics.totalMatriculados > 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
                {((metrics.aboveAverage / metrics.totalMatriculados) * 100).toFixed(0)}% del total
              </p>
            )}
          </Card>
          <Card className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">
              Alumnos Debajo del Promedio
            </p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">
              {metrics.belowAverage}
            </p>
            <p className="text-yellow-500 dark:text-yellow-400 text-sm font-medium leading-normal">
              Requieren atención
            </p>
          </Card>
          <Card className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">
              Alumnos Reprobados
            </p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">
              {metrics.failed}
            </p>
            {metrics.totalMatriculados > 0 && (
              <p className="text-red-500 dark:text-red-400 text-sm font-medium leading-normal">
                {((metrics.failed / metrics.totalMatriculados) * 100).toFixed(0)}% del total
              </p>
            )}
          </Card>
        </div>
        {/* preview list of students */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Alumnos recientes</h2>
          {loadingStudents ? (
            <div>Cargando alumnos...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#192734] dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-3">Nombre del Alumno</th>
                    <th className="px-6 py-3">ID Alumno</th>
                    <th className="px-6 py-3">Grado</th>
                    <th className="px-6 py-3">Sección</th>
                    <th className="px-6 py-3 text-right">Promedio</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr
                      key={s.id}
                      className="bg-white dark:bg-[#111a22] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => navigate(`/asistente/alumno/${s.id}`)}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {s.name}
                      </td>
                      <td className="px-6 py-4">{s.id}</td>
                      <td className="px-6 py-4">{s.grade}</td>
                      <td className="px-6 py-4">{s.section}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {s.avg}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-primary hover:underline">Ver Detalles</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] flex flex-col p-6 gap-4">
            <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Registro de Ausencias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-[#324d67] text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Hoy</p>
                <p className="flex-1 flex items-center justify-center text-black dark:text-white text-6xl font-bold tracking-tight">
                  {metrics.absenceToday}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-[#324d67] text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Esta Semana</p>
                <p className="flex-1 flex items-center justify-center text-black dark:text-white text-6xl font-bold tracking-tight">
                  {metrics.absenceWeek}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-[#324d67] text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Este Mes</p>
                <p className="flex-1 flex items-center justify-center text-black dark:text-white text-6xl font-bold tracking-tight">
                  {metrics.absenceMonth}
                </p>
              </div>
            </div>
          </Card>
          <Card className="lg:col-span-1 bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67]">
            <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 pt-6 pb-4">
              Próximos Eventos
            </h2>
            <div className="px-6 pb-6 flex flex-col gap-4">
              {upcoming.length === 0 && <p className="text-muted-dark">Sin eventos programados</p>}
              {upcoming.map((ev) => (
                <div key={ev.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                    <p className="text-xs font-bold uppercase">
                      {new Date(ev.date).toLocaleString('es-ES',{month:'short'}).toUpperCase()}
                    </p>
                    <p className="text-lg font-black">
                      {new Date(ev.date).getDate()}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-black dark:text-white font-semibold">{ev.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {ev.time ? `${ev.time} - ` : ''}{ev.location || ''}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="link" className="text-center text-primary text-sm font-semibold mt-2">
                Ver calendario completo
              </Button>
            </div>
          </Card>
        </div>
        {/* charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6 pb-14">
            <h2 className="flex justify-center text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
              Ausencias Mensuales (Últimos 3 meses)
            </h2>
            <div className="relative flex h-66 p-4 pt-4 pb-0">
              <div className="absolute bottom-0 left-0 w-full border-b border-gray-200 dark:border-gray-700" />
              <div className="flex flex-col justify-between text-right pr-2 text-xs text-gray-500 dark:text-gray-400">
                {monthlyTicks.map((t, idx) => (
                  <span key={idx} className="h-0 -translate-y-1/2">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-1 h-full flex-col border-l border-gray-200 dark:border-gray-700">
                <div className="flex flex-1 justify-around items-end gap-4 mb-[-1.4rem]">
                  {monthlyData.map((d) => {
                    const height = (d.value / monthlyMax) * 100;
                    return (
                      <div key={d.label} className="flex flex-col items-center gap-2 w-16 text-center h-full">
                        <div className="relative w-full flex-1 flex items-end">
                          <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 text-sm font-bold text-black dark:text-white">
                            {d.value}
                          </div>
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600 rounded-t-lg shadow-lg transition-[height] duration-700 ease-out"
                            style={{ height: `${height}%`, minHeight: '6px' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-around gap-4 mt-1 translate-y-5">
                  {monthlyData.map((d) => (
                    <p key={d.label} className="text-sm text-gray-600 dark:text-gray-400 w-16">
                      {d.label}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6 pb-16">
            <h2 className="flex justify-center text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
              Ausencias Semanales (Últimas 3 semanas)
            </h2>
            <div className="relative flex h-64 p-4 pt-4 pb-0">
              <div className="absolute bottom-0 left-0 w-full border-b border-gray-200 dark:border-gray-700" />
              <div className="flex flex-col justify-between text-right pr-2 text-xs text-gray-500 dark:text-gray-400">
                {weeklyTicks.map((t, idx) => (
                  <span key={idx} className="h-0 -translate-y-1/6">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-1 h-full flex-col border-l border-gray-200 dark:border-gray-700">
                <div className="flex flex-1 justify-around items-end gap-4 mt-[-2.5rem] translate-y-[2.6rem]">
                  {weeklyData.map((d) => {
                    const height = (d.value / weeklyMax) * 100;
                    return (
                      <div key={d.label} className="flex flex-col items-center gap-2 w-16 text-center h-full">
                        {/* bar area with overlayed value */}
                        <div className="relative w-full flex-1 flex items-end">
                          <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 text-sm font-bold text-black dark:text-white">
                            {d.value}
                          </div>
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600 rounded-t-lg shadow-lg transition-[height] duration-700 ease-out"
                            style={{ height: `${height}%`, minHeight: '6px' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-around gap-4 mt-1">
                  {weeklyData.map((d) => (
                    <p key={d.label} className="text-sm text-gray-600 dark:text-gray-400 w-16 translate-y-[2.4rem]">
                      {d.label}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

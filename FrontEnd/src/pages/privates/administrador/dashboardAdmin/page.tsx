import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashBoardAdmin() {
  // chart dataset object – replace or hydrate from API/props as needed
  // can optionally specify a max value to control chart scale explicitly
  const chartData: {
    monthly: Array<{ label: string; value: number }>;
    weekly: Array<{ label: string; value: number }>;
    monthlyMax?: number;
    weeklyMax?: number;
  } = {
    // sample data that demonstrates the 45‑lesson weekly limit
    monthly: [
      { label: "Agosto", value: 120 },
      { label: "Septiembre", value: 150 },
      { label: "Octubre", value: 180 }, // hits the MONTHLY_LIMIT (4*45)
    ],
    weekly: [
      { label: "Hace 2 sem.", value: 42 },
      { label: "Sem. Pasada", value: 45 }, // at the WEEKLY_LIMIT
      { label: "Esta Semana", value: 38 },
    ],
    // monthlyMax: 250, // you can still override if necessary
    // weeklyMax: 60,
  };
  const monthlyData = chartData.monthly;
  const weeklyData = chartData.weekly;

  // determine highest value in each series; no artificial ceiling so bars can fill the chart
  // respect explicit max if provided, otherwise compute from values
  // business rule: maximum lessons per week is 45
  const WEEKLY_LIMIT = 45;
  const MONTHLY_LIMIT = WEEKLY_LIMIT * 4; // roughly four weeks in a period

  const computedMonthly = monthlyData.length ? Math.max(...monthlyData.map(d => d.value)) : 0;
  const computedWeekly = weeklyData.length ? Math.max(...weeklyData.map(d => d.value)) : 0;

  // apply explicit overrides first, then enforce sensible floor values
  const monthlyMax = chartData.monthlyMax ?? Math.max(computedMonthly, MONTHLY_LIMIT);
  const weeklyMax = chartData.weeklyMax ?? Math.max(computedWeekly, WEEKLY_LIMIT);

  // helper to build evenly spaced ticks including 0 at bottom
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

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <p className="text-gray-600 dark:text-[#92aec9] text-base font-normal leading-normal">Resumen general del estado del colegio.</p>
          </div>
          <Button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#233648] pl-4 pr-3 border border-gray-200 dark:border-gray-700" variant="outline">
            <p className="text-black dark:text-white text-sm font-medium leading-normal">Periodo: 2024-I</p>
            <span className="material-symbols-outlined text-black dark:text-white">expand_more</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">Total de Matriculados</p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">865</p>
            <p className="text-green-500 dark:text-[#0bda5b] text-sm font-medium leading-normal">+1.8% vs periodo anterior</p>
          </Card>
          <Card className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">Alumnos Encima del Promedio</p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">692</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">80% del total</p>
          </Card>
          <Card className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">Alumnos Debajo del Promedio</p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">121</p>
            <p className="text-yellow-500 dark:text-yellow-400 text-sm font-medium leading-normal">Requieren atención</p>
          </Card>
          <Card className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">Alumnos Reprobados</p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">52</p>
            <p className="text-red-500 dark:text-red-400 text-sm font-medium leading-normal">6% del total</p>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2 bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] flex flex-col p-6 gap-4">
            <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Registro de Ausencias</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-[#324d67] text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Hoy</p>
                <p className="flex-1 flex items-center justify-center text-black dark:text-white text-6xl font-bold tracking-tight">12</p>
                <p className="text-red-500 dark:text-red-400 text-sm font-medium">+5.0% vs ayer</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-[#324d67] text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Esta Semana</p>
                <p className="flex-1 flex items-center justify-center text-black dark:text-white text-6xl font-bold tracking-tight">48</p>
                <p className="text-green-500 dark:text-green-400 text-sm font-medium">-2.1% vs semana pasada</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-[#324d67] text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Este Mes</p>
                <p className="flex-1 flex items-center justify-center text-black dark:text-white text-6xl font-bold tracking-tight">197</p>
                <p className="text-red-500 dark:text-red-400 text-sm font-medium">+1.5% vs mes pasado</p>
              </div>
            </div>
          </Card>
          <Card className="lg:col-span-1 bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67]">
            <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 pt-6 pb-4">Próximos Eventos</h2>
            <div className="px-6 pb-6 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                  <p className="text-xs font-bold uppercase">OCT</p>
                  <p className="text-lg font-black">28</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-black dark:text-white font-semibold">Reunión de Padres</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">18:00 - Auditorio Principal</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                  <p className="text-xs font-bold uppercase">NOV</p>
                  <p className="text-lg font-black">05</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-black dark:text-white font-semibold">Feria de Ciencias</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Todo el día - Gimnasio</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                  <p className="text-xs font-bold uppercase">NOV</p>
                  <p className="text-lg font-black">12</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-black dark:text-white font-semibold">Exámenes Finales</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Inicio del periodo de exámenes</p>
                </div>
              </div>
              <a className="text-center text-primary text-sm font-semibold mt-2 hover:underline" href="#">Ver calendario completo</a>
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6 pb-14">
            <h2 className="flex justify-center text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">Ausencias Mensuales (Últimos 3 meses)</h2>
            <div className="relative flex h-66 p-4 pt-4 pb-0">
              <div className="absolute bottom-0 left-0 w-full border-b border-gray-200 dark:border-gray-700" />
              <div className="flex flex-col justify-between text-right pr-2 text-xs text-gray-500 dark:text-gray-400">
                {/* dynamic tick labels computed from dataset */}
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
            <h2 className="flex justify-center text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">Ausencias Semanales (Últimas 3 semanas)</h2>
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
  )
}

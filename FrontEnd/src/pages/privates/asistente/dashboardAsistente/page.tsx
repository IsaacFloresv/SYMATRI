
export default function DashBoardAsistente() {
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
          </div>
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#233648] pl-4 pr-3 border border-gray-200 dark:border-gray-700">
            <p className="text-black dark:text-white text-sm font-medium leading-normal">
              Periodo: 2024-I
            </p>
            <span className="material-symbols-outlined text-black dark:text-white">
              expand_more
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">
              Total de Matriculados
            </p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">
              865
            </p>
            <p className="text-green-500 dark:text-[#0bda5b] text-sm font-medium leading-normal">
              +1.8% vs periodo anterior
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">
              Alumnos Encima del Promedio
            </p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">
              692
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
              80% del total
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">
              Alumnos Debajo del Promedio
            </p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">
              121
            </p>
            <p className="text-yellow-500 dark:text-yellow-400 text-sm font-medium leading-normal">
              Requieren atención
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
            <p className="text-black dark:text-white text-base font-medium leading-normal">
              Alumnos Reprobados
            </p>
            <p className="text-black dark:text-white tracking-light text-3xl font-bold leading-tight">
              52
            </p>
            <p className="text-red-500 dark:text-red-400 text-sm font-medium leading-normal">
              6% del total
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] flex flex-col p-6 gap-4">
            <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Registro de Ausencias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-[#324d67] text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Hoy</p>
                <p className="flex-1 flex items-center justify-center text-black dark:text-white text-6xl font-bold tracking-tight">
                  12
                </p>
                <p className="text-red-500 dark:text-red-400 text-sm font-medium">+5.0% vs ayer</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-[#324d67] text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Esta Semana</p>
                <p className="flex-1 flex items-center justify-center text-black dark:text-white text-6xl font-bold tracking-tight">
                  48
                </p>
                <p className="text-green-500 dark:text-green-400 text-sm font-medium">-2.1% vs semana pasada</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-[#324d67] text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Este Mes</p>
                <p className="flex-1 flex items-center justify-center text-black dark:text-white text-6xl font-bold tracking-tight">
                  197
                </p>
                <p className="text-red-500 dark:text-red-400 text-sm font-medium">+1.5% vs mes pasado</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67]">
            <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 pt-6 pb-4">
              Próximos Eventos
            </h2>
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
              <a className="text-center text-primary text-sm font-semibold mt-2 hover:underline" href="#">
                Ver calendario completo
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

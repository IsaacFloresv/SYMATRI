export default function registroAsistencia() {
    return (
<main class="px-4 py-8 sm:px-6 lg:px-10">
  <div class="mx-auto max-w-7xl">

    <div class="flex flex-wrap justify-between items-center gap-4 mb-8">
      <div>
        <p class="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
          Bienvenido, Profesor García
        </p>
        <p class="text-slate-600 dark:text-slate-400">
          Aquí tienes un resumen de tu día
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      
      <div class="lg:col-span-2 flex flex-col gap-8">

      
        <div class="bg-white dark:bg-[#192733] rounded-xl border border-slate-200 dark:border-[#324d67] p-6">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Próxima Clase
          </h2>

          <p class="text-2xl font-bold text-slate-900 dark:text-white">
            Matemáticas Avanzadas
          </p>

          <div class="mt-3 flex flex-col gap-2 text-slate-600 dark:text-slate-400">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined">tag</span>
              <span>Sección 11-B</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined">door_front</span>
              <span>Aula 204</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined">schedule</span>
              <span>10:00 AM</span>
            </div>
          </div>

          <button class="mt-6 h-11 px-6 rounded-lg bg-primary text-white font-bold hover:bg-primary/90">
            Ir a la clase
          </button>
        </div>

       
        <div class="bg-white dark:bg-[#192733] rounded-xl border border-slate-200 dark:border-[#324d67] p-6">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Clases de Hoy
          </h2>

          <ul class="divide-y divide-slate-200 dark:divide-[#324d67]">
            <li class="flex justify-between py-3">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Física I</p>
                <p class="text-sm text-slate-500">08:00 AM · Sección 10-A</p>
              </div>
              <span class="text-xs font-semibold bg-success-green/20 text-success-green px-2 py-1 rounded-full">
                Completada
              </span>
            </li>

            <li class="flex justify-between py-3">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Matemáticas Avanzadas</p>
                <p class="text-sm text-slate-500">10:00 AM · Sección 11-B</p>
              </div>
              <span class="text-xs font-semibold bg-primary/20 text-primary px-2 py-1 rounded-full">
                Próxima
              </span>
            </li>

            <li class="flex justify-between py-3">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Cálculo II</p>
                <p class="text-sm text-slate-500">01:00 PM · Sección 12-C</p>
              </div>
              <span class="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">
                Pendiente
              </span>
            </li>
          </ul>
        </div>
      </div>

      
      <aside class="flex flex-col gap-8">
    )
}


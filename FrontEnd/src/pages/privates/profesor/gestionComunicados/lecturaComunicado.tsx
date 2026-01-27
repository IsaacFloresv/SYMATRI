export default function lecturaComunicado() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">arrow_back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">Lecturas del Comunicado</h1>
            <p className="text-gray-500 dark:text-gray-400">"Recordatorio de Excursión al Museo"</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-[#18232e] rounded-xl shadow-sm p-4 flex items-center">
            <div className="w-16 h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.8"></path>
                <path className="text-red-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="80, 100" stroke-dashoffset="-25" stroke-linecap="round" stroke-width="3.8"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-red-600 dark:text-red-400">80%</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800 dark:text-white">Alumnos no han leído</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">20 de 25 alumnos pendientes.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#18232e] rounded-xl shadow-sm p-4 flex items-center">
            <div className="w-16 h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.8"></path>
                <path className="text-orange-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="65, 100" stroke-dashoffset="-25" stroke-linecap="round" stroke-width="3.8"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">65%</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800 dark:text-white">Padres no han leído</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">13 de 20 padres pendientes.</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#18232e] rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input className="w-full bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-700 rounded-DEFAULT pl-10 focus:ring-primary focus:border-primary text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" placeholder="Buscar por nombre..." type="text" />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 shrink-0" for="filter">Filtrar por:</label>
              <select className="bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-700 rounded-DEFAULT focus:ring-primary focus:border-primary text-gray-900 dark:text-white text-sm" id="filter">
                <option>Todos</option>
                <option>Alumnos</option>
                <option>Padres</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Nombre</th>
                  <th className="py-3 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Tipo</th>
                  <th className="py-3 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Fecha de Lectura</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark">
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Alejandro Vargas</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300"><span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Alumno</span></td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">15 de Mayo, 2024 - 09:32 AM</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark">
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Beatriz Mendoza</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300"><span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Alumno</span></td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">15 de Mayo, 2024 - 09:45 AM</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark">
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Carlos Jiménez (Padre de Lucía)</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300"><span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Padre</span></td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">15 de Mayo, 2024 - 10:15 AM</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark">
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Daniela Rojas</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300"><span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Alumno</span></td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">15 de Mayo, 2024 - 11:05 AM</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark">
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Elena Fernández (Madre de Sofía)</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300"><span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Padre</span></td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">15 de Mayo, 2024 - 12:20 PM</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-background-dark">
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">Fernando Castro</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300"><span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Alumno</span></td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">16 de Mayo, 2024 - 08:10 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

  )
}


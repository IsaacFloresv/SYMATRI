export default function VistaSecciones() {
  return (
    <main className="flex w-full flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-gray-800 dark:text-white min-w-72">Lista de Secciones</h1>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-grow">
            <label className="flex h-12 w-full min-w-40 flex-col">
              <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                <div className="flex items-center justify-center rounded-l-lg border-y border-l border-gray-200/20 bg-white/5 pl-4 text-gray-400 dark:border-white/10 dark:bg-black/10">
                  <span className="material-symbols-outlined text-2xl">search</span>
                </div>
                <input className="form-input h-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-gray-200/20 bg-white/5 px-4 text-base font-normal leading-normal text-gray-800 placeholder:text-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 dark:border-white/10 dark:bg-black/10 dark:text-white dark:placeholder:text-gray-500" placeholder="Buscar por nombre de sección..." value="" />
              </div>
            </label>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-primary bg-primary/20 px-4 text-sm font-medium leading-normal text-primary dark:border-primary dark:bg-primary/20">
              <span>Todos los Grados</span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-gray-200/50 bg-transparent px-4 text-sm font-medium leading-normal text-gray-500 hover:bg-gray-500/10 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5 transition-colors">
              <span>1º Primaria</span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-gray-200/50 bg-transparent px-4 text-sm font-medium leading-normal text-gray-500 hover:bg-gray-500/10 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5 transition-colors">
              <span>2º Primaria</span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-gray-200/50 bg-transparent px-4 text-sm font-medium leading-normal text-gray-500 hover:bg-gray-500/10 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5 transition-colors">
              <span>1º Secundaria</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col rounded-xl border border-gray-200/50 dark:border-white/10">
            <button className="flex w-full items-center justify-between p-4 bg-gray-500/5 dark:bg-white/5 hover:bg-gray-500/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">1º Primaria</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">(2 secciones)</span>
              </div>
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 transition-transform">expand_more</span>
            </button>
          </div>
          <div className="flex flex-col rounded-xl border border-gray-200/50 dark:border-white/10 bg-gray-500/5 dark:bg-white/5">
            <button className="flex w-full items-center justify-between p-4 hover:bg-gray-500/10 dark:hover:bg-white/10 transition-colors rounded-t-xl">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-primary dark:text-primary">2º Primaria</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">(1 sección)</span>
              </div>
              <span className="material-symbols-outlined text-primary dark:text-primary transition-transform rotate-180">expand_more</span>
            </button>
            <div className="flex flex-col gap-2 px-4 pb-4">
              <div className="flex flex-col rounded-lg border border-gray-200/30 dark:border-white/10 bg-background-light dark:bg-background-dark/80">
                <button className="flex w-full cursor-pointer items-center justify-between p-4 hover:bg-gray-500/5 dark:hover:bg-white/5 transition-colors rounded-t-lg">
                  <div className="flex items-center gap-3 text-left">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">2º A Primaria</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">28 Alumnos</span>
                  </div>
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 transition-transform rotate-180">expand_more</span>
                </button>
                <div className="p-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200/30 dark:border-white/10">
                    <div>
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-white">Alumnos (28)</h4>
                      <div className="overflow-hidden rounded-lg border border-gray-200/30 dark:border-white/10">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-gray-500/5 dark:bg-white/5">
                            <tr>
                              <th className="px-3 py-2 font-semibold text-gray-800 dark:text-gray-200 w-12 text-center">#</th>
                              <th className="px-3 py-2 font-semibold text-gray-800 dark:text-gray-200">Nombre</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white dark:bg-gray-800/20">
                              <td className="px-3 py-2.5 text-center text-gray-500 dark:text-gray-400">1</td>
                              <td className="px-3 py-2.5">
                                <div className="flex flex-col gap-1">
                                  <span className="font-medium text-gray-800 dark:text-gray-200">Alejandro García</span>
                                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                    <span>Promedio: <span className="font-semibold text-green-600 dark:text-green-400">9.5</span></span>
                                    <span>Conducta: <span className="font-semibold text-green-600 dark:text-green-400">Buena</span></span>
                                    <span>Ausencias: <span className="font-semibold text-gray-700 dark:text-gray-300">1</span></span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="bg-gray-500/5 dark:bg-white/5">
                              <td className="px-3 py-2.5 text-center text-gray-500 dark:text-gray-400">2</td>
                              <td className="px-3 py-2.5">
                                <div className="flex flex-col gap-1">
                                  <span className="font-medium text-gray-800 dark:text-gray-200">Valentina Rodríguez</span>
                                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                    <span>Promedio: <span className="font-semibold text-green-600 dark:text-green-400">9.8</span></span>
                                    <span>Conducta: <span className="font-semibold text-green-600 dark:text-green-400">Excelente</span></span>
                                    <span>Ausencias: <span className="font-semibold text-gray-700 dark:text-gray-300">0</span></span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800/20">
                              <td className="px-3 py-2.5 text-center text-gray-500 dark:text-gray-400">3</td>
                              <td className="px-3 py-2.5">
                                <div className="flex flex-col gap-1">
                                  <span className="font-medium text-gray-800 dark:text-gray-200">Mateo López</span>
                                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                    <span>Promedio: <span className="font-semibold text-yellow-600 dark:text-yellow-400">7.8</span></span>
                                    <span>Conducta: <span className="font-semibold text-yellow-600 dark:text-yellow-400">Regular</span></span>
                                    <span>Ausencias: <span className="font-semibold text-red-600 dark:text-red-400">5</span></span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="bg-gray-500/5 dark:bg-white/5">
                              <td className="px-3 py-2.5 text-center text-gray-500 dark:text-gray-400">4</td>
                              <td className="px-3 py-2.5">
                                <div className="flex flex-col gap-1">
                                  <span className="font-medium text-gray-800 dark:text-gray-200">Sofía Martínez</span>
                                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                    <span>Promedio: <span className="font-semibold text-green-600 dark:text-green-400">9.1</span></span>
                                    <span>Conducta: <span className="font-semibold text-green-600 dark:text-green-400">Buena</span></span>
                                    <span>Ausencias: <span className="font-semibold text-gray-700 dark:text-gray-300">2</span></span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800/20">
                              <td className="px-3 py-2.5 text-center" colSpan={2}><span className="text-gray-500 dark:text-gray-400">... (24 más)</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <div className="mb-6">
                        <h4 className="font-bold mb-3 text-gray-800 dark:text-white">Profesores (3)</h4>
                        <div className="overflow-hidden rounded-lg border border-gray-200/30 dark:border-white/10">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-gray-500/5 dark:bg-white/5">
                              <tr>
                                <th className="px-3 py-2 font-semibold text-gray-800 dark:text-gray-200 w-12 text-center">#</th>
                                <th className="px-3 py-2 font-semibold text-gray-800 dark:text-gray-200">Nombre</th>
                                <th className="px-3 py-2 font-semibold text-gray-800 dark:text-gray-200">Materia</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white dark:bg-gray-800/20">
                                <td className="px-3 py-2.5 text-center text-gray-500 dark:text-gray-400">1</td>
                                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Prof. Isabel Castillo</td>
                                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Tutor</td>
                              </tr>
                              <tr className="bg-gray-500/5 dark:bg-white/5">
                                <td className="px-3 py-2.5 text-center text-gray-500 dark:text-gray-400">2</td>
                                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Prof. Carlos Vega</td>
                                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Matemáticas</td>
                              </tr>
                              <tr className="bg-white dark:bg-gray-800/20">
                                <td className="px-3 py-2.5 text-center text-gray-500 dark:text-gray-400">3</td>
                                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Prof. Ana Méndez</td>
                                <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">Física, Química y Biología</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-3 text-gray-800 dark:text-white">Estadísticas del Salón</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-center justify-between"><span>Alumno con mejor promedio:</span> <span className="font-semibold text-green-600 dark:text-green-400">9.8 (Valentina Rodríguez)</span></li>
                          <li className="flex items-center justify-between"><span>Alumno con peor promedio:</span> <span className="font-semibold text-red-600 dark:text-red-400">6.5 (Juan Pérez)</span></li>
                          <li className="flex items-center justify-between"><span>Promedio general del salón:</span> <span className="font-semibold text-primary">8.7</span></li>
                          <li className="flex items-center justify-between"><span>Alumno con más ausencias:...</span> <span className="font-semibold text-red-600 dark:text-red-400">5 (Mateo López)</span></li>
                          <li className="flex items-center justify-between"><span>Alumno con peor conducta:</span> <span className="font-semibold text-red-600 dark:text-red-400">Regular (Mateo López)</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-xl border border-gray-200/50 dark:border-white/10">
            <button className="flex w-full items-center justify-between p-4 bg-gray-500/5 dark:bg-white/5 hover:bg-gray-500/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">3º Secundaria</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">(2 secciones)</span>
              </div>
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 transition-transform">expand_more</span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">Mostrando <span className="font-medium text-gray-800 dark:text-white">3</span> de <span className="font-medium text-gray-800 dark:text-white">5</span> grados</p>
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/50 text-gray-600 hover:bg-gray-500/10 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary bg-primary/20 text-sm font-bold text-primary dark:border-primary dark:bg-primary/20">1</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/50 text-sm text-gray-600 hover:bg-gray-500/10 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5 transition-colors">2</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/50 text-gray-600 hover:bg-gray-500/10 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

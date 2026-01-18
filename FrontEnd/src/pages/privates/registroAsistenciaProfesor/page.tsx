export default function registroAsistencia() {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Registro de Asistencia</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-8 flex flex-col gap-6 bg-white dark:bg-[#192733] p-6 rounded-xl border border-slate-200 dark:border-[#324d67]">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Controles</h3>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Seleccionar Sección</p>
                  <select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#324d67] bg-slate-50 dark:bg-[#111a22] focus:border-primary h-14 p-[15px] text-base font-normal leading-normal">
                    <option>Matemáticas - 7A</option>
                    <option>Ciencias - 8B</option>
                    <option>Historia - 9C</option>
                  </select>
                </label>
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-slate-700 dark:text-white text-base font-medium leading-normal pb-2">Seleccionar Fecha</p>
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#324d67] bg-slate-50 dark:bg-[#111a22] focus:border-primary h-14 p-[15px] text-base font-normal leading-normal" type="date" value="2023-10-27" />
                </label>
              </div>
              <div className="flex flex-col gap-4 pt-4 border-t border-slate-200 dark:border-[#324d67]">
                <button className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">Guardar Asistencia</button>
                <button className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-[#324d67] hover:bg-slate-100 dark:hover:bg-[#233648] text-base font-bold leading-normal tracking-[0.015em]">Cancelar</button>
              </div>
            </div>
          </aside>
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#324d67] bg-white dark:bg-[#192733]">
                  <p className="text-slate-600 dark:text-slate-300 text-base font-medium leading-normal">Presentes</p>
                  <p className="text-success-green tracking-light text-3xl font-bold leading-tight">28</p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#324d67] bg-white dark:bg-[#192733]">
                  <p className="text-slate-600 dark:text-slate-300 text-base font-medium leading-normal">Ausentes</p>
                  <p className="text-danger-red tracking-light text-3xl font-bold leading-tight">2</p>
                </div>
                <div className="flex min-w-[158px flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#324d67] bg-white dark:bg-[#192733]">
                  <p className="text-slate-600 dark:text-slate-300 text-base font-medium leading-normal">Tardanzas</p>
                  <p className="text-warning-yellow tracking-light text-3xl font-bold leading-tight">1</p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#324d67] bg-white dark:bg-[#192733]">
                  <p className="text-slate-600 dark:text-slate-300 text-base font-medium leading-normal">Justificados</p>
                  <p className="text-info-gray dark:text-slate-400 tracking-light text-3xl font-bold leading-tight">0</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#324d67] bg-white dark:bg-[#111a22]">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-[#192733]">
                    <tr>
                      <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal">Alumno</th>
                      <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal">Estado de Asistencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-slate-200 dark:border-t-[#324d67]">
                      <td className="h-[88px] px-6 py-2 text-slate-900 dark:text-white text-sm font-normal leading-normal">Ana García Pérez</td>
                      <td className="h-[88px] px-6 py-2 text-sm font-bold leading-normal tracking-[0.015em]">
                        <div className="flex flex-wrap gap-2 custom-radio-group">
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-success-green bg-success-green/20">
                            <input checked="" className="hidden" name="student_1" type="radio" /> Presente
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-danger-red bg-danger-red/20">
                            <input className="hidden" name="student_1" type="radio" /> Ausente
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-warning-yellow bg-warning-yellow/20">
                            <input className="hidden" name="student_1" type="radio" /> Tardanza
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-info-gray bg-info-gray/20">
                            <input className="hidden" name="student_1" type="radio" /> Justificado
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-t-slate-200 dark:border-t-[#324d67]">
                      <td className="h-[88px] px-6 py-2 text-slate-900 dark:text-white text-sm font-normal leading-normal">Benito Juárez</td>
                      <td className="h-[88px] px-6 py-2 text-sm font-bold leading-normal tracking-[0.015em]">
                        <div className="flex flex-wrap gap-2 custom-radio-group">
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-success-green bg-success-green/20">
                            <input className="hidden" name="student_2" type="radio" /> Presente
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-danger-red bg-danger-red/20">
                            <input checked="" className="hidden" name="student_2" type="radio" /> Ausente
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-warning-yellow bg-warning-yellow/20">
                            <input className="hidden" name="student_2" type="radio" /> Tardanza
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-info-gray bg-info-gray/20">
                            <input className="hidden" name="student_2" type="radio" /> Justificado
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-t-slate-200 dark:border-t-[#324d67]">
                      <td className="h-[88px] px-6 py-2 text-slate-900 dark:text-white text-sm font-normal leading-normal">Carla Espinoza</td>
                      <td className="h-[88px] px-6 py-2 text-sm font-bold leading-normal tracking-[0.015em]">
                        <div className="flex flex-wrap gap-2 custom-radio-group">
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-success-green bg-success-green/20">
                            <input className="hidden" name="student_3" type="radio" /> Presente
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-danger-red bg-danger-red/20">
                            <input className="hidden" name="student_3" type="radio" /> Ausente
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-warning-yellow bg-warning-yellow/20">
                            <input checked="" className="hidden" name="student_3" type="radio" /> Tardanza
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-info-gray bg-info-gray/20">
                            <input className="hidden" name="student_3" type="radio" /> Justificado
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-t-slate-200 dark:border-t-[#324d67]">
                      <td className="h-[88px] px-6 py-2 text-slate-900 dark:text-white text-sm font-normal leading-normal">David Maldonado</td>
                      <td className="h-[88px] px-6 py-2 text-sm font-bold leading-normal tracking-[0.015em]">
                        <div className="flex flex-wrap gap-2 custom-radio-group">
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-success-green bg-success-green/20">
                            <input checked="" className="hidden" name="student_4" type="radio" /> Presente
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-danger-red bg-danger-red/20">
                            <input className="hidden" name="student_4" type="radio" /> Ausente
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-warning-yellow bg-warning-yellow/20">
                            <input className="hidden" name="student_4" type="radio" /> Tardanza
                          </label>
                          <label className="radio-label cursor-pointer rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-info-gray bg-info-gray/20">
                            <input className="hidden" name="student_4" type="radio" /> Justificado
                          </label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}   

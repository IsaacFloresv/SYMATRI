export default function notasAlumnosProfesor() {
  return (

    <main className="flex-1 p-8">
      <div className="flex flex-col max-w-7xl mx-auto gap-6">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Gestión de Calificaciones</h1>
        </div>
        {/* Filters (Dropdowns) */}
        <div className="flex flex-wrap items-end gap-4 p-4 rounded-xl bg-white dark:bg-[#111a22] border border-gray-200 dark:border-[#324d67]">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Seleccionar Sección</p>
            <select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#324d67] bg-background-light dark:bg-[#192733] focus:border-primary dark:focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-[#92aec9] p-[15px] text-base font-normal leading-normal">
              <option>5º A</option>
              <option>5º B</option>
              <option>6º A</option>
            </select>
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Seleccionar Materia</p>
            <select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#324d67] bg-background-light dark:bg-[#192733] focus:border-primary dark:focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-[#92aec9] p-[15px] text-base font-normal leading-normal">
              <option>Matemáticas</option>
              <option>Historia</option>
              <option>Ciencias Naturales</option>
            </select>
          </label>
        </div>
        {/* Table */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#111a22]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-[#192733]">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-white w-[250px] text-sm font-medium leading-normal sticky left-0 bg-gray-50 dark:bg-[#192733]">Nombre del Alumno</th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-white min-w-[120px] text-sm font-medium leading-normal">Examen 1</th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-white min-w-[120px] text-sm font-medium leading-normal">Tarea 2</th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-white min-w-[120px] text-sm font-medium leading-normal">Participación</th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-white min-w-[120px] text-sm font-medium leading-normal">Proyecto Final</th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-white min-w-[150px] text-sm font-medium leading-normal">Promedio Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#324d67]">
                <tr>
                  <td className="h-[72px] px-4 py-2 w-[250px] text-gray-900 dark:text-white text-sm font-normal leading-normal sticky left-0 bg-white dark:bg-[#111a22]">Ana Torres</td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="8.5" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="9.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="10.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="9.2" /></td>
                  <td className="h-[72px] px-4 py-2 text-gray-700 dark:text-[#92aec9] text-sm font-medium leading-normal">9.18</td>
                </tr>
                <tr>
                  <td className="h-[72px] px-4 py-2 w-[250px] text-gray-900 dark:text-white text-sm font-normal leading-normal sticky left-0 bg-white dark:bg-[#111a22]">Carlos Vega</td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="7.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="8.5" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="9.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="8.0" /></td>
                  <td className="h-[72px] px-4 py-2 text-gray-700 dark:text-[#92aec9] text-sm font-medium leading-normal">8.13</td>
                </tr>
                <tr>
                  <td className="h-[72px] px-4 py-2 w-[250px] text-gray-900 dark:text-white text-sm font-normal leading-normal sticky left-0 bg-white dark:bg-[#111a22]">Elena Morales</td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary border-yellow-400" max="10" min="0" step="0.1" type="number" value="9.5" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="10.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="10.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="9.8" /></td>
                  <td className="h-[72px] px-4 py-2 text-gray-700 dark:text-[#92aec9] text-sm font-medium leading-normal">9.83</td>
                </tr>
                <tr>
                  <td className="h-[72px] px-4 py-2 w-[250px] text-gray-900 dark:text-white text-sm font-normal leading-normal sticky left-0 bg-white dark:bg-[#111a22]">Javier Ríos</td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="6.5" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="7.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="8.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="7.5" /></td>
                  <td className="h-[72px] px-4 py-2 text-gray-700 dark:text-[#92aec9] text-sm font-medium leading-normal">7.25</td>
                </tr>
                <tr>
                  <td className="h-[72px] px-4 py-2 w-[250px] text-gray-900 dark:text-white text-sm font-normal leading-normal sticky left-0 bg-white dark:bg-[#111a22]">Sofía Navarro</td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="10.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="9.5" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary" max="10" min="0" step="0.1" type="number" value="9.0" /></td>
                  <td className="h-[72px] px-4 py-2"><input className="form-input w-24 rounded-lg bg-background-light dark:bg-[#192733] border-gray-300 dark:border-[#324d67] text-gray-700 dark:text-[#92aec9] focus:ring-primary focus:border-primary border-red-500" max="10" min="0" step="0.1" type="number" value="abc" /></td>
                  <td className="h-[72px] px-4 py-2 text-gray-700 dark:text-[#92aec9] text-sm font-medium leading-normal">9.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 flex-wrap">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200 dark:bg-[#233648] text-gray-800 dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-[#324d67]">
            <span className="truncate">Cancelar</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
            <span className="truncate">Guardar Calificaciones</span>
          </button>
        </div>
      </div>
    </main>

  )
}     

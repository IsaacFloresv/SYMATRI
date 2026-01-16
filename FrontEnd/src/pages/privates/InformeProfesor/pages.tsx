export default function InformeProfesor() {
  const informes = [
    {
      tipo: "Informe de Calificaciones",
      fecha: "15/07/2024",
      detalle: "Matemáticas 7-A, 2do Trimestre",
    },
    {
      tipo: "Informe de Asistencia",
      fecha: "10/07/2024",
      detalle: "Álgebra 8-A, 2do Trimestre",
    },
    {
      tipo: "Informe de Calificaciones",
      fecha: "15/04/2024",
      detalle: "Matemáticas 7-B, 1er Trimestre",
    },
  ]

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-[-0.033em] text-gray-900 dark:text-white">
            Generación y Gestión de Informes
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#192733] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Generar Nuevo Informe
              </h2>

              <form className="flex flex-col gap-6">
                <Select label="Tipo de Informe">
                  <option>Informe de Calificaciones</option>
                  <option>Informe de Asistencia</option>
                  <option>Informe de Comportamiento</option>
                </Select>

                <Select label="Período Académico">
                  <option>1er Trimestre</option>
                  <option>2do Trimestre</option>
                  <option>3er Trimestre</option>
                  <option>Anual</option>
                </Select>

                <Select label="Sección / Clase">
                  <option>Matemáticas 7-A</option>
                  <option>Matemáticas 7-B</option>
                  <option>Álgebra 8-A</option>
                </Select>

                <button
                  type="button"
                  className="mt-4 flex items-center justify-center gap-2 h-12 rounded-lg bg-primary text-white font-medium shadow-sm hover:bg-primary/90"
                >
                  <span className="material-symbols-outlined">add_chart</span>
                  Generar Informe
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#192733] rounded-xl border border-gray-200 dark:border-gray-800 p-6">

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Historial de Informes Generados
                </h2>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Buscar informe..."
                    className="pl-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#101922] focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="border-b border-gray-200 dark:border-gray-700 text-gray-500">
                    <tr>
                      <th className="py-3 px-4">Informe</th>
                      <th className="py-3 px-4">Fecha</th>
                      <th className="py-3 px-4">Detalles</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {informes.map((informe, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                          {informe.tipo}
                        </td>
                        <td className="py-4 px-4 text-gray-500">
                          {informe.fecha}
                        </td>
                        <td className="py-4 px-4 text-gray-500">
                          {informe.detalle}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-2">
                            <Action icon="visibility" />
                            <Action icon="download" />
                            <Action icon="delete" danger />
                          </div>
                        </td>
                      </tr>
                    ))}
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


function Select({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <select className="h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#101922] px-3 focus:ring-2 focus:ring-primary">
        {children}
      </select>
    </label>
  )
}

function Action({ icon, danger }) {
  return (
    <button
      className={`p-2 rounded-full transition-colors ${
        danger
          ? "text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
          : "text-gray-500 hover:bg-primary/10"
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  )
}


      

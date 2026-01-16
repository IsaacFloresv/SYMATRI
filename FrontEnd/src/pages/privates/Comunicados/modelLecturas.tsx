export default function modelLectura() {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100">

    
      <aside className="w-64 bg-white dark:bg-[#18232e] border-r border-gray-200 dark:border-gray-800">
        <div className="h-full flex flex-col justify-between p-4">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="size-10 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRbRUqxdggqKCD2eqtGO3syBIsZluMbw_lOaHHIZ1RUVs7Y1FUcC-ba8jV9LlmEWUA6Rr5HqrAjuHtqqk5HEmnCJ0X27INgCI6NlnU0UYLHkp7jCU-yM9vpCWdnEfeu9poWqXF0riVSxzxxrXe-zC5SjGo8m-Z6pSHhBykB8o86zv9wvbYoG_acaMG4AEvK9F3JeVM0h9ZYD9q4ljTjN4VfAQ0B3v0stWbJyX1itmAAdAdMQ8ef1kA87c-QnqJmu2WEJO3k1V-1RYm")',
                }}
              />
              <div>
                <p className="font-medium dark:text-white">Prof. Ana Torres</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Maestra de 5° Grado
                </p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                ["home", "Inicio"],
                ["groups", "Mis Clases"],
                ["chat", "Comunicación", true],
                ["assignment_turned_in", "Calificaciones"],
              ].map(([icon, label, active]) => (
                <a
                  key={label}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2 rounded ${
                    active
                      ? "bg-primary/20 text-primary dark:bg-primary dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-background-dark"
                  }`}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </nav>
          </div>

          <button className="h-10 rounded border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#18232e] text-sm font-bold hover:bg-gray-300 dark:hover:bg-gray-800/50">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">

         
          <div className="flex items-center gap-4 mb-6">
            <button className="w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold">Lecturas del Comunicado</h1>
              <p className="text-gray-500 dark:text-gray-400">
                "Recordatorio de Excursión al Museo"
              </p>
            </div>
          </div>

          
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <Resumen
              porcentaje="80%"
              color="text-red-500"
              titulo="Alumnos no han leído"
              detalle="20 de 25 alumnos pendientes"
            />
            <Resumen
              porcentaje="65%"
              color="text-orange-500"
              titulo="Padres no han leído"
              detalle="13 de 20 padres pendientes"
            />
          </div>

         
          <div className="bg-white dark:bg-[#18232e] rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                className="flex-1 rounded border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark p-2"
                placeholder="Buscar por nombre..."
              />
              <select className="rounded border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark p-2">
                <option>Todos</option>
                <option>Alumnos</option>
                <option>Padres</option>
              </select>
            </div>

            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="py-3 px-4 text-gray-500">Nombre</th>
                  <th className="py-3 px-4 text-gray-500">Tipo</th>
                  <th className="py-3 px-4 text-gray-500">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Alejandro Vargas", "Alumno", "15 May 2024 - 09:32"],
                  ["Carlos Jiménez", "Padre", "15 May 2024 - 10:15"],
                  ["Daniela Rojas", "Alumno", "15 May 2024 - 11:05"],
                ].map(([nombre, tipo, fecha]) => (
                  <tr
                    key={nombre}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark"
                  >
                    <td className="py-4 px-4 font-medium">{nombre}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          tipo === "Alumno"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }`}
                      >
                        {tipo}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                      {fecha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
function Resumen({ porcentaje, color, titulo, detalle }) {
  return (
    <div className="bg-white dark:bg-[#18232e] rounded-xl shadow-sm p-4 flex items-center gap-4">
      <div className={`text-2xl font-black ${color}`}>{porcentaje}</div>
      <div>
        <p className="font-semibold">{titulo}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{detalle}</p>
      </div>
    </div>
  );
}

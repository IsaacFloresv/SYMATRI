export default function ModelComunicado() {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display">
      
    
      <aside className="flex w-64 flex-col bg-white dark:bg-[#18232e] border-r border-gray-200 dark:border-gray-800">
        <div className="flex h-full flex-col justify-between p-4">

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-2">
              <div
                className="size-10 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRbRUqxdggqKCD2eqtGO3syBIsZluMbw_lOaHHIZ1RUVs7Y1FUcC-ba8jV9LlmEWUA6Rr5HqrAjuHtqqk5HEmnCJ0X27INgCI6NlnU0UYLHkp7jCU-yM9vpCWdnEfeu9poWqXF0riVSxzxxrXe-zC5SjGo8m-Z6pSHhBykB8o86zv9wvbYoG_acaMG4AEvK9F3JeVM0h9ZYD9q4ljTjN4VfAQ0B3v0stWbJyX1itmAAdAdMQ8ef1kA87c-QnqJmu2WEJO3k1V-1RYm")',
                }}
              />
              <div>
                <h1 className="text-base font-medium text-gray-900 dark:text-white">
                  Prof. Ana Torres
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Maestra de 5° Grado
                </p>
              </div>
            </div>

           
            <nav className="flex flex-col gap-2 mt-4">
              {[
                ["home", "Inicio"],
                ["groups", "Mis Clases"],
              ].map(([icon, label]) => (
                <a
                  key={label}
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-background-dark text-gray-700 dark:text-gray-300"
                >
                  <span className="material-symbols-outlined">{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded bg-primary/20 dark:bg-primary text-primary dark:text-white"
              >
                <span className="material-symbols-outlined fill">chat</span>
                <span className="text-sm font-medium">Comunicación</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-background-dark text-gray-700 dark:text-gray-300"
              >
                <span className="material-symbols-outlined">assignment_turned_in</span>
                <span className="text-sm font-medium">Calificaciones</span>
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <button className="h-10 rounded border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-[#18232e] text-sm font-bold text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800/50">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-8">

          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-1">
            Centro de Comunicación
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Envía comunicados a tus clases y alumnos.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            <section className="lg:col-span-3 bg-white dark:bg-[#18232e] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Nuevo Comunicado
              </h2>

              <input
                className="w-full mb-4 rounded border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark p-2"
                placeholder="Asunto"
              />

              <textarea
                rows={6}
                className="w-full rounded border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark p-3"
                placeholder="Escribe tu mensaje aquí..."
              />

              <div className="flex justify-end mt-4">
                <button className="h-12 px-6 rounded bg-primary text-white font-bold hover:bg-primary/90">
                  Enviar Comunicado
                </button>
              </div>
            </section>
            <aside className="lg:col-span-2 bg-white dark:bg-[#18232e] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Historial de Comunicados
              </h2>

              <input
                className="w-full mb-4 rounded border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark p-2"
                placeholder="Buscar..."
              />

              <div className="text-sm text-gray-600 dark:text-gray-300">
                Recordatorio de excursión al museo
              </div>
            </aside>

          </div>
        </div>
      </main>
    </div>
  );
}

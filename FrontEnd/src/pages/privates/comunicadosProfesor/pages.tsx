export default function comunicadosProfesor() {
  return (

    <main className="flex-1 overflow-y-auto">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-3 mb-8">
          <div className="flex min-w-72 flex-col gap-2">
            <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Centro de Comunicación</p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Envía comunicados a tus clases y alumnos.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white dark:bg-[#18232e] rounded-xl p-6 shadow-sm">
            <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">Nuevo Comunicado</h2>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-gray-800 dark:text-gray-200 text-base font-normal leading-normal">Para:</label>
              <div className="flex flex-wrap gap-x-6 gap-y-3 p-3 border border-gray-300 dark:border-gray-700 rounded-DEFAULT bg-background-light dark:bg-background-dark">
                <div className="flex items-center">
                  <input className="w-4 h-4 text-primary bg-gray-200 border-gray-400 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-background-dark focus:ring-2 dark:bg-gray-700 dark:border-gray-600" id="dest-5a-alumnos" type="checkbox" />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="dest-5a-alumnos">Clase 5A</label>
                </div>
                <div className="flex items-center">
                  <input className="w-4 h-4 text-primary bg-gray-200 border-gray-400 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-background-dark focus:ring-2 dark:bg-gray-700 dark:border-gray-600" id="dest-5b-alumnos" type="checkbox" />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="dest-5b-alumnos">Clase 5B</label>
                </div>
                <div className="flex items-center">
                  <input className="w-4 h-4 text-primary bg-gray-200 border-gray-400 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-background-dark focus:ring-2 dark:bg-gray-700 dark:border-gray-600" id="dest-todos" type="checkbox" />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="dest-todos">Todas mis clases</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-gray-800 dark:text-gray-200 text-base font-normal leading-normal" for="subject">Asunto:</label>
              <input className="w-full bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-700 rounded-DEFAULT focus:ring-primary focus:border-primary text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" id="subject" placeholder="Ej: Recordatorio de excursión" type="text" />
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-gray-800 dark:text-gray-200 text-base font-normal leading-normal" for="message">Mensaje:</label>
              <div className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 rounded-DEFAULT">
                <div className="flex p-2 border-b border-gray-300 dark:border-gray-700 gap-2">
                  <button className="p-1 rounded-DEFAULT hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"><span className="material-symbols-outlined !text-xl">format_bold</span></button>
                  <button className="p-1 rounded-DEFAULT hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"><span className="material-symbols-outlined !text-xl">format_italic</span></button>
                  <button className="p-1 rounded-DEFAULT hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"><span className="material-symbols-outlined !text-xl">format_list_bulleted</span></button>
                  <button className="p-1 rounded-DEFAULT hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"><span className="material-symbols-outlined !text-xl">format_list_numbered</span></button>
                </div>
                <textarea className="w-full p-3 bg-transparent border-none focus:ring-0 resize-y text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" id="message" placeholder="Escribe tu mensaje aquí..." rows="8"></textarea>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-DEFAULT">
                <span className="material-symbols-outlined !text-xl">attach_file</span>
                Adjuntar Archivo
              </button>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-DEFAULT h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:ring-4 focus:ring-primary/30">
                <span className="truncate">Enviar Comunicado</span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-[#18232e] rounded-xl p-6 shadow-sm">
            <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">Historial de Comunicados</h2>
            <div className="relative mb-6">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input className="w-full bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-700 rounded-DEFAULT pl-10 focus:ring-primary focus:border-primary text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" placeholder="Buscar por palabra clave, destinatario..." type="text" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 p-4 rounded-DEFAULT border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark cursor-pointer">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 dark:text-white">Recordatorio de Excursión al Museo</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Hace 2 días</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Hola a todos, solo un recordatorio rápido sobre nuestra excursión al museo de ciencias la próxima semana. Por favor, asegúrense de entregar los permisos firmados...</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex h-6 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-gray-700 px-3">
                      <p className="text-gray-700 dark:text-gray-200 text-xs font-medium">Clase 5A</p>
                    </div>
                    <div className="flex h-6 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-2.5">
                      <div className="size-1.5 rounded-full bg-green-500"></div>
                      <p className="text-green-800 dark:text-green-300 text-xs font-medium">Enviado</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-base text-gray-500 dark:text-gray-400" style="font-variation-settings: 'FILL' 1;">visibility</span>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">95% leído</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-DEFAULT border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark cursor-pointer">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 dark:text-white">Material para la clase de Arte</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Hace 1 semana</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Estimados alumnos de 5B, para la próxima clase de arte necesitaremos que traigan cartulinas de colores y tijeras. ¡Vamos a hacer un collage!</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex h-6 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-gray-700 px-3">
                      <p className="text-gray-700 dark:text-gray-200 text-xs font-medium">Clase 5B</p>
                    </div>
                    <div className="flex h-6 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-2.5">
                      <div className="size-1.5 rounded-full bg-green-500"></div>
                      <p className="text-green-800 dark:text-green-300 text-xs font-medium">Enviado</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-base text-gray-500 dark:text-gray-400" style="font-variation-settings: 'FILL' 1;">visibility</span>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">100% leído</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-DEFAULT border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark cursor-pointer">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 dark:text-white">Reunión de Padres (Programada)</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Se enviará en 3 días</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Recordatorio: La reunión de padres y maestros se llevará a cabo el próximo viernes. Esperamos contar con su presencia para discutir el progreso de los estudiantes...</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex h-6 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-gray-700 px-3">
                      <p className="text-gray-700 dark:text-gray-200 text-xs font-medium">Todas las clases</p>
                    </div>
                    <div className="flex h-6 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 px-2.5">
                      <div className="size-1.5 rounded-full bg-blue-500"></div>
                      <p className="text-blue-800 dark:text-blue-300 text-xs font-medium">Programado</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-base text-gray-500 dark:text-gray-400">visibility_off</span>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">--% leído</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-DEFAULT border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-background-dark cursor-pointer">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 dark:text-white">Borrador: Ideas para proyecto final</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Editado hace 1 hora</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Hola chicos, estoy preparando algunas ideas para nuestro proyecto final de ciencias. ¿Qué les parecería investigar sobre energías renovables? Aún no enviado...</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex h-6 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-gray-700 px-3">
                      <p className="text-gray-700 dark:text-gray-200 text-xs font-medium">Clase 5A</p>
                    </div>
                    <div className="flex h-6 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5">
                      <div className="size-1.5 rounded-full bg-gray-400"></div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs font-medium">Borrador</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-base text-gray-500 dark:text-gray-400">visibility_off</span>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">--% leído</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

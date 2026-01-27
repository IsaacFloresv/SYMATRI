export default function gestion EventosProfesor() {
    return (

< !DOCTYPE html >

  <html className="dark" lang="es"><head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Gestión de Eventos</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&amp;display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <script id="tailwind-config">
      tailwind.config = {
        darkMode: "className",
      theme: {
        extend: {
        colors: {
        "primary": "#1176d4",
      "background-light": "#f6f7f8",
      "background-dark": "#101922",
          },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
          },
      borderRadius: {
        "DEFAULT": "0.25rem",
      "lg": "0.5rem",
      "xl": "0.75rem",
      "full": "9999px"
          },
        },
      },
    }
    </script>
    <style>
      .material-symbols-outlined {
        font - variation - settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24
    }
    </style>
  </head>
    <body className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col">
        <div className="flex h-full grow flex-col">
          <div className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
            <div className="flex w-full max-w-7xl flex-col">
              <!-- Breadcrumbs and Page Heading -->
              <div className="mb-8">
                <div className="mt-2 flex flex-wrap justify-between gap-3">
                  <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Administrar Eventos de Biología 101</p>
                </div>
              </div>
              <!-- Main Content Grid -->
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column: Form -->
                <div className="lg:col-span-1 flex flex-col gap-6 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#192733]/50 p-6">
                  <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Crear Nuevo Evento</h2>
                  <form className="flex flex-col gap-4">
                    <label className="flex flex-col w-full">
                      <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Nombre del Evento</p>
                      <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#324d67] bg-background-light dark:bg-[#192733] h-14 placeholder:text-gray-400 dark:placeholder:text-[#92aec9] p-[15px] text-base font-normal leading-normal" placeholder="Ej. Examen Parcial 1" value="" />
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <label className="flex flex-col min-w-0 flex-1">
                        <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Fecha</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#324d67] bg-background-light dark:bg-[#192733] h-14 placeholder:text-gray-400 dark:placeholder:text-[#92aec9] p-[15px] text-base font-normal leading-normal" type="date" />
                      </label>
                      <label className="flex flex-col min-w-0 flex-1">
                        <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Hora</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#324d67] bg-background-light dark:bg-[#192733] h-14 placeholder:text-gray-400 dark:placeholder:text-[#92aec9] p-[15px] text-base font-normal leading-normal" type="time" />
                      </label>
                    </div>
                    <label className="flex flex-col w-full">
                      <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Descripción</p>
                      <textarea className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#324d67] bg-background-light dark:bg-[#192733] min-h-32 placeholder:text-gray-400 dark:placeholder:text-[#92aec9] p-[15px] text-base font-normal leading-normal" placeholder="Añade detalles adicionales sobre el evento..."></textarea>
                    </label>
                    <label className="flex flex-col w-full">
                      <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">Sección</p>
                      <div className="relative">
                        <select className="form-select appearance-none flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-[#324d67] bg-background-light dark:bg-[#192733] h-14 p-[15px] text-base font-normal leading-normal">
                          <option>Toda la clase</option>
                          <option>Sección A</option>
                          <option>Sección B</option>
                        </select>
                        <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">expand_more</span>
                      </div>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button className="flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gray-200 dark:bg-white/10 px-6 text-base font-semibold text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20" type="button">Cancelar</button>
                      <button className="flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 text-base font-semibold text-white hover:bg-primary/90" type="submit">Guardar Evento</button>
                    </div>
                  </form>
                </div>
                <!-- Right Column: Events List -->
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4">Próximos Eventos</h2>
                  <div className="flex flex-col gap-3">
                    <!-- Event Card 1 -->
                    <div className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#192733]/50 p-4 transition-all hover:shadow-md dark:hover:bg-[#192733]">
                      <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 p-3 text-primary dark:text-blue-300">
                        <span className="text-sm font-bold uppercase">OCT</span>
                        <span className="text-2xl font-black">25</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg text-gray-900 dark:text-white">Examen Parcial 1</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM - Toda la clase</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10">
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full text-red-500/80 hover:bg-red-500/10 hover:text-red-500">
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </div>
                    <!-- Event Card 2 -->
                    <div className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#192733]/50 p-4 transition-all hover:shadow-md dark:hover:bg-[#192733]">
                      <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 p-3 text-primary dark:text-blue-300">
                        <span className="text-sm font-bold uppercase">NOV</span>
                        <span className="text-2xl font-black">12</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg text-gray-900 dark:text-white">Entrega de Proyecto Final</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">11:59 PM - Sección A</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10">
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full text-red-500/80 hover:bg-red-500/10 hover:text-red-500">
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </div>
                    <!-- Event Card 3 -->
                    <div className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#192733]/50 p-4 transition-all hover:shadow-md dark:hover:bg-[#192733]">
                      <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 p-3 text-primary dark:text-blue-300">
                        <span className="text-sm font-bold uppercase">NOV</span>
                        <span className="text-2xl font-black">20</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg text-gray-900 dark:text-white">Salida al Museo de Ciencias</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">08:00 AM - Toda la clase</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10">
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full text-red-500/80 hover:bg-red-500/10 hover:text-red-500">
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </div>
                    <!-- Empty State -->
                    <!-- Uncomment this block to see the empty state -->
                    <!--
                    <div className="flex flex-col items-center justify-center text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 mt-4">
                      <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-500 mb-4">event_busy</span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">No hay eventos programados</p>
                      <p className="text-gray-500 dark:text-gray-400">Aún no hay eventos para esta clase. ¡Crea el primero usando el formulario!</p>
                    </div>
                  -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body></html>
    )
  }     
  
export default function GestionClase() {
  const eventos = [
    {
      mes: "OCT",
      dia: "25",
      titulo: "Examen Parcial 1",
      detalle: "10:00 AM - Toda la clase",
    },
    {
      mes: "NOV",
      dia: "12",
      titulo: "Entrega de Proyecto Final",
      detalle: "11:59 PM - Sección A",
    },
    {
      mes: "NOV",
      dia: "20",
      titulo: "Salida al Museo de Ciencias",
      detalle: "08:00 AM - Toda la clase",
    },
  ]

  return (
    <main className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 text-gray-500 dark:text-[#92aec9]">
            <span>Mis Clases</span>
            <span>/</span>
            <span>Biología 101</span>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Eventos</span>
          </div>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.033em] text-gray-900 dark:text-white">
            Administrar Eventos de Biología 101
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Panel izquierdo: Crear evento */}
          <div className="lg:col-span-1 bg-white dark:bg-[#192733]/50 rounded-xl border border-gray-200 dark:border-[#324d67] p-6">
            <h2 className="text-[22px] font-bold mb-6 text-gray-900 dark:text-white">
              Crear Nuevo Evento
            </h2>

            <form className="flex flex-col gap-4">
              <Input label="Nombre del Evento" placeholder="Ej. Examen Parcial 1" />

              <div className="flex flex-col sm:flex-row gap-4">
                <Input label="Fecha" type="date" />
                <Input label="Hora" type="time" />
              </div>

              <Textarea
                label="Descripción"
                placeholder="Añade detalles adicionales sobre el evento..."
              />

              <Select label="Sección">
                <option>Toda la clase</option>
                <option>Sección A</option>
                <option>Sección B</option>
              </Select>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 h-12 rounded-lg bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-white/20"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
                >

                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[22px] font-bold mb-4 px-1 text-gray-900 dark:text-white">
              Próximos Eventos
            </h2>

            <div className="flex flex-col gap-3">
              {eventos.map((evento, index) => (
                <EventCard key={index} evento={evento} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

function Input({ label, type = "text", placeholder }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-medium text-gray-900 dark:text-white">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-14 rounded-lg border border-gray-300 dark:border-[#324d67] bg-gray-50 dark:bg-[#192733] px-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
      />
    </label>
  )
}

function Textarea({ label, placeholder }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-medium text-gray-900 dark:text-white">
        {label}
      </span>
      <textarea
        placeholder={placeholder}
        className="min-h-32 rounded-lg border border-gray-300 dark:border-[#324d67] bg-gray-50 dark:bg-[#192733] px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
      />
    </label>
  )
}

function Select({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-medium text-gray-900 dark:text-white">
        {label}
      </span>
      <select className="h-14 rounded-lg border border-gray-300 dark:border-[#324d67] bg-gray-50 dark:bg-[#192733] px-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50">
        {children}
      </select>
    </label>
  )
}

function EventCard({ evento }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#192733]/50 p-4 hover:shadow-md transition">
      
      <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 p-3 text-primary dark:text-blue-300 w-16">
        <span className="text-sm font-bold uppercase">{evento.mes}</span>
        <span className="text-2xl font-black">{evento.dia}</span>
      </div>

      <div className="flex-1">
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          {evento.titulo}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {evento.detalle}
        </p>
      </div>

      <div className="flex gap-2">
        <IconButton icon="edit" />
        <IconButton icon="delete" danger />
      </div>
    </div>
  )
}

function IconButton({ icon, danger }) {
  return (
    <button
      className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
        danger
          ? "text-red-500 hover:bg-red-500/10"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
      }`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </button>
  )
}

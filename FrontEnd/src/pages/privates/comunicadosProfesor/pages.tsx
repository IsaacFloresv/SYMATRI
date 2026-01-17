export default function Comunicados{
  const comunicados = [
    {
      titulo: "Recordatorio de Excursión al Museo",
      tiempo: "Hace 2 días",
      mensaje:
        "Hola a todos, solo un recordatorio rápido sobre nuestra excursión al museo de ciencias la próxima semana...",
      destinatario: "Clase 5A",
      estado: "Enviado",
      estadoColor: "green",
      lectura: "95% leído",
      visible: true,
    },
    {
      titulo: "Material para la clase de Arte",
      tiempo: "Hace 1 semana",
      mensaje:
        "Estimados alumnos de 5B, para la próxima clase de arte necesitaremos cartulinas de colores...",
      destinatario: "Clase 5B",
      estado: "Enviado",
      estadoColor: "green",
      lectura: "100% leído",
      visible: true,
    },
    {
      titulo: "Reunión de Padres (Programada)",
      tiempo: "Se enviará en 3 días",
      mensaje:
        "Recordatorio: La reunión de padres y maestros se llevará a cabo el próximo viernes...",
      destinatario: "Todas las clases",
      estado: "Programado",
      estadoColor: "blue",
      lectura: "--% leído",
      visible: false,
    },
    {
      titulo: "Borrador: Ideas para proyecto final",
      tiempo: "Editado hace 1 hora",
      mensaje:
        "Hola chicos, estoy preparando algunas ideas para nuestro proyecto final de ciencias...",
      destinatario: "Clase 5A",
      estado: "Borrador",
      estadoColor: "gray",
      lectura: "--% leído",
      visible: false,
    },
  ]

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">

        
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            Centro de Comunicación
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Envía comunicados a tus clases y alumnos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          <div className="lg:col-span-3 bg-white dark:bg-[#18232e] rounded-xl p-6 shadow-sm">
            <h2 className="text-[22px] font-bold mb-6 text-gray-900 dark:text-white">
              Nuevo Comunicado
            </h2>

            <form className="flex flex-col gap-4">
              <CheckboxGroup />

              <Input label="Asunto" placeholder="Ej: Recordatorio de excursión" />

              <Editor />

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="flex items-center gap-2 text-primary hover:bg-primary/10 px-4 py-2 rounded"
                >
                  <span className="material-symbols-outlined">attach_file</span>
                  Adjuntar Archivo
                </button>

                <button
                  type="submit"
                  className="h-12 px-6 bg-primary text-white font-bold rounded hover:bg-primary/90"
                >
                  Enviar Comunicado
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-[#18232e] rounded-xl p-6 shadow-sm">
            <h2 className="text-[22px] font-bold mb-4 text-gray-900 dark:text-white">
              Historial de Comunicados
            </h2>

            <SearchInput />

            <div className="flex flex-col gap-4">
              {comunicados.map((c, i) => (
                <ComunicadoCard key={i} data={c} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}


function Input({ label, placeholder }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-gray-800 dark:text-gray-200">{label}</span>
      <input
        placeholder={placeholder}
        className="rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-background-dark px-3 py-2 text-gray-900 dark:text-white focus:ring-primary"
      />
    </label>
  )
}

function CheckboxGroup() {
  const opciones = ["Clase 5A", "Clase 5B", "Todas mis clases"]

  return (
    <div>
      <p className="mb-2 text-gray-800 dark:text-gray-200">Para:</p>
      <div className="flex flex-wrap gap-6 p-3 border border-gray-300 dark:border-gray-700 rounded bg-background-light dark:bg-background-dark">
        {opciones.map((op, i) => (
          <label key={i} className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="text-primary" />
            <span className="text-gray-900 dark:text-gray-300">{op}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function Editor() {
  return (
    <div>
      <label className="text-gray-800 dark:text-gray-200">Mensaje:</label>
      <div className="border border-gray-300 dark:border-gray-700 rounded">
        <div className="flex gap-2 p-2 border-b border-gray-300 dark:border-gray-700">
          {["format_bold", "format_italic", "format_list_bulleted", "format_list_numbered"].map(
            icon => (
              <button key={icon} className="p-

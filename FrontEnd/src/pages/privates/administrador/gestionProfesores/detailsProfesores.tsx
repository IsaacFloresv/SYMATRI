
export interface Teacher {
  id: string;
  userName?: string;
  name: string;
  department?: string;
  email: string;
  status: string;
  avatar?: string;
  datosPersonales?: any;
  profesorAsignado?: Array<{ materiaId: number; materia: any }>;
}

interface DetailsProps {
  teacher: Teacher;
  onClose: () => void;
}

export default function DetailsProfesores({ teacher, onClose }: DetailsProps) {
  if (!teacher) return null;

  // helper for avatar url (use teacher.avatar or fallback)
  const avatarUrl = teacher.avatar || "";

  return (
    <>
      {/* background page structure blurred */}
      <div className="relative flex min-h-screen w-full flex-col opacity-20 pointer-events-none">
        <div className="flex h-full grow">
          <aside className="flex h-screen min-h-screen flex-col bg-background-dark border-r border-slate-800 w-60 p-4 shrink-0">
            <div className="flex flex-col gap-4 flex-grow">
              <div className="flex items-center gap-3 px-2">
                <span className="material-symbols-outlined text-primary text-3xl">school</span>
                <h1 className="text-white text-lg font-bold">Gestión Escolar</h1>
              </div>
            </div>
          </aside>
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex flex-col gap-1">
                  <p className="text-white text-3xl font-bold tracking-tight">Gestión de Profesores</p>
                </div>
              </div>
              <div className="h-96 w-full border border-slate-800 rounded-xl bg-slate-900/50"></div>
            </div>
          </main>
        </div>
      </div>

      {/* actual modal overlay copied from original file */}
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-2xl bg-[#09090b] border border-slate-800 rounded-lg shadow-2xl flex flex-col max-h-[90vh]">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full border-2 border-slate-800 overflow-hidden bg-slate-900">
                {avatarUrl && (
                  <img
                    alt={`${teacher.name} Avatar`}
                    className="h-full w-full object-cover"
                    src={avatarUrl}
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold leading-none tracking-tight text-white">
                    {teacher.name}
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {teacher.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  {teacher.email}
                </p>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none text-slate-400"
                onClick={onClose}
              >
                <span className="material-symbols-outlined">close</span>
                <span className="sr-only">Cerrar</span>
              </button>
            </div>
          </div>
          <div className="p-6 overflow-y-auto space-y-8">
            <section>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">person</span>
                Datos Personales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/40 p-4 rounded-lg border border-slate-800/50">
                {teacher.datosPersonales && (
                  <>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 font-medium">Género</p>
                      <p className="text-sm text-slate-200">{teacher.datosPersonales.genero}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 font-medium">Teléfono</p>
                      <p className="text-sm text-slate-200">{teacher.datosPersonales.telefono}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 font-medium">Dirección</p>
                      <p className="text-sm text-slate-200">{teacher.datosPersonales.address}</p>
                    </div>
                  </>
                )}
              </div>
            </section>
            <section>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                Rol del Sistema
              </h3>
              <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-800/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-md">PROFESOR</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">Gestión de Calificaciones</span>
                  <span className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">Registro de Asistencia</span>
                  <span className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">Planificación de Clases</span>
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">book</span>
                Materias Asignadas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {teacher.profesorAsignado?.map((pa) => (
                  <div key={pa.materiaId} className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-center">
                    <p className="text-xs font-semibold text-white">{pa.materia?.name}</p>
                    <p className="text-[10px] text-slate-500">grado {pa.materia?.gradoId}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-slate-800">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 text-slate-900 shadow hover:bg-slate-200 h-9 px-4 py-2" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

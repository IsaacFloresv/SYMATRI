export default function ModalEvent() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 dark:bg-black/70">
            <div className="bg-white dark:bg-[#192733] rounded-xl shadow-lg w-full max-w-lg m-4">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary/20 dark:bg-primary/30 rounded-lg p-3 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary dark:text-blue-300">groups</span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reunión de Claustro</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Reunión mensual obligatoria para todo el personal docente para discutir los avances del semestre, planificación de próximas actividades y asuntos varios. Se ruega puntualidad.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            <span>
                                <strong className="font-medium text-gray-900 dark:text-white">Fecha:</strong> Viernes, 25 de Octubre
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            <span>
                                <strong className="font-medium text-gray-900 dark:text-white">Hora:</strong> 4:00 PM - 5:30 PM
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">location_on</span>
                            <span>
                                <strong className="font-medium text-gray-900 dark:text-white">Ubicación:</strong> Sala de Conferencias
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">people</span>
                            <span>
                                <strong className="font-medium text-gray-900 dark:text-white">Público:</strong> Personal Docente
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-[#233648]/60 px-6 py-4 rounded-b-xl flex justify-end">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-medium leading-normal shadow-sm hover:bg-primary/90">
                        <span className="truncate">Cerrar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
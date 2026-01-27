export default function DashBoardProfesor() {
    return (
        <main className="flex-1 p-6 lg:p-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-wrap justify-between gap-3 mb-8">
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Bienvenido, Profesor García</p>
                        <p className="text-gray-600 dark:text-[#92aec9] text-base font-normal leading-normal">Aquí tienes un resumen de tu día.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div>
                            <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-1 pb-3 pt-2">Próxima Clase</h2>
                            <div className="w-full">
                                <div className="flex flex-col items-stretch justify-start rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#192733]">
                                    <div className="flex w-full flex-col items-stretch justify-center gap-2 p-6">
                                        <p className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">Matemáticas Avanzadas</p>
                                        <div className="flex flex-col gap-1 text-gray-600 dark:text-[#92aec9]">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">tag</span>
                                                <p className="text-base font-normal leading-normal">Sección 11-B</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">door_front</span>
                                                <p className="text-base font-normal leading-normal">Aula: 204</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">schedule</span>
                                                <p className="text-base font-normal leading-normal">Hora: 10:00 AM</p>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-medium leading-normal shadow-sm hover:bg-primary/90">
                                                <span className="truncate">Ir a la clase</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-1 pb-3 pt-2">Resumen de Clases de Hoy</h2>
                            <div className="bg-white dark:bg-[#192733] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="flex justify-between items-center py-3">
                                        <div>
                                            <p className="text-gray-900 dark:text-white font-medium">Física I</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">08:00 AM - Sección 10-A</p>
                                        </div>
                                        <span className="text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">Completada</span>
                                    </li>
                                    <li className="flex justify-between items-center py-3">
                                        <div>
                                            <p className="text-gray-900 dark:text-white font-medium">Matemáticas Avanzadas</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM - Sección 11-B</p>
                                        </div>
                                        <span className="text-xs font-medium bg-primary/20 dark:bg-primary/30 text-primary dark:text-blue-300 px-2 py-1 rounded-full">Próxima</span>
                                    </li>
                                    <li className="flex justify-between items-center py-3">
                                        <div>
                                            <p className="text-gray-900 dark:text-white font-medium">Cálculo II</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">01:00 PM - Sección 12-C</p>
                                        </div>
                                        <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full">Pendiente</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1 flex flex-col gap-8">
                        <div>
                            <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-1 pb-3 pt-2">Próximos Eventos del Colegio</h2>
                            <div className="bg-white dark:bg-[#192733] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <div className="flex-shrink-0 bg-primary/20 dark:bg-primary/30 rounded-lg p-2 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary dark:text-blue-300">groups</span>
                                        </div>
                                        <div>
                                            <p className="text-gray-900 dark:text-white font-medium">Reunión de Claustro</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Viernes, 25 de Oct - 4:00 PM</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg p-2 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">edit_document</span>
                                        </div>
                                        <div>
                                            <p className="text-gray-900 dark:text-white font-medium">Exámenes Finales de Semestre</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">15 Nov - 20 Nov</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/50 rounded-lg p-2 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-red-600 dark:text-red-400">sports_soccer</span>
                                        </div>
                                        <div>
                                            <p className="text-gray-900 dark:text-white font-medium">Día Deportivo</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Miércoles, 30 de Nov</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-1 pb-3 pt-2">Mis Secciones</h2>
                            <div className="bg-white dark:bg-[#192733] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Sección 10-A</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">10mo Grado</p>
                                        </div>
                                        <a className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300" href="#">
                                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                                        </a>
                                    </li>
                                    <li className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Sección 11-B</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">11vo Grado</p>
                                        </div>
                                        <a className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300" href="#">
                                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                                        </a>
                                    </li>
                                    <li className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Sección 12-C</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">12vo Grado</p>
                                        </div>
                                        <a className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300" href="#">
                                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}



export default function EditarInforme() {
  return (
    <main className="flex-1 p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">Personalizar Informe</h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal mt-1">Ajusta los campos, filtros y formato para crear una vista de informe a tu medida.</p>
        </header>
        <div className="bg-white dark:bg-background-dark/30 rounded-xl border border-gray-200 dark:border-gray-800">
            <form className="p-6 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Información Básica</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="report-name">Nombre del Informe</label>
                        <input className="form-input block w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/50 focus:border-primary focus:ring-primary text-sm" id="report-name" placeholder="Ej. Informe de Calificaciones Semestral" type="text" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="report-description">Descripción</label>
                        <textarea className="form-textarea block w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/50 focus:border-primary focus:ring-primary text-sm" id="report-description" placeholder="Describe brevemente el propósito de este informe." rows={3}></textarea>
                    </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-800" />
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Datos a Incluir</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Selecciona los conjuntos de datos que formarán parte del informe.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5">
                            <input className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary" type="checkbox" />
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Calificaciones</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5">
                            <input className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary" type="checkbox" />
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Asistencia</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5">
                            <input className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary" type="checkbox" />
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Conducta</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5">
                            <input className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary" type="checkbox" />
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Actividades Extrac.</span>
                        </label>
                    </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-800" />
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filtros de Datos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="filter-grade">Por Grado</label>
                            <select className="form-select block w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/50 focus:border-primary focus:ring-primary text-sm" id="filter-grade">
                                <option>Todos los grados</option>
                                <option>1º Grado</option>
                                <option>2º Grado</option>
                                <option>3º Grado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="filter-section">Por Sección</label>
                            <select className="form-select block w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/50 focus:border-primary focus:ring-primary text-sm" id="filter-section">
                                <option>Todas las secciones</option>
                                <option>Sección A</option>
                                <option>Sección B</option>
                                <option>Sección C</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Por Periodo</label>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <label className="sr-only" htmlFor="filter-year">Año</label>
                                    <select className="form-select block w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/50 focus:border-primary focus:ring-primary text-sm" id="filter-year">
                                        <option>Seleccionar año</option>
                                        <option>2024</option>
                                        <option>2023</option>
                                        <option>2022</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="sr-only" htmlFor="filter-semester">Semestre</label>
                                    <select className="form-select block w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark/50 focus:border-primary focus:ring-primary text-sm" id="filter-semester">
                                        <option>Seleccionar semestre</option>
                                        <option>Primer Semestre</option>
                                        <option>Segundo Semestre</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Orden</label>
                            <div className="flex items-center space-x-6 mt-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary" type="checkbox" />
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Ascendente</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary" type="checkbox" />
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Descendente</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-800" />
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Formato de Salida</h2>
                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input className="form-radio h-4 w-4 text-primary focus:ring-primary" name="output-format" type="radio" />
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">PDF</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input className="form-radio h-4 w-4 text-primary focus:ring-primary" name="output-format" type="radio" />
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Excel (XLSX)</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input className="form-radio h-4 w-4 text-primary focus:ring-primary" name="output-format" type="radio" />
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">CSV</span>
                        </label>
                    </div>
                </div>
            </form>
            <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-background-dark/50 rounded-b-xl">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-bold leading-normal tracking-wide hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
                    <span className="truncate">Cancelar</span>
                </button>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 border border-primary/50 text-primary dark:text-primary dark:hover:bg-primary/10 text-sm font-bold leading-normal tracking-wide hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                    <span className="truncate">Generar Vista Previa</span>
                </button>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined text-xl">save</span>
                    <span className="truncate">Guardar Configuración</span>
                </button>
            </div>
        </div>
    </div>
</main>
  );
}

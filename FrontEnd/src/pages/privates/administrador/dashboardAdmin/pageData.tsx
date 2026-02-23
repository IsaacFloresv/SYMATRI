export default function pageData() {
    return (
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <a className="flex items-center justify-center size-8 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10" href="#">
                                <span className="material-symbols-outlined text-black dark:text-white">arrow_back</span>
                            </a>
                            <p className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Datos del Panel de control</p>
                        </div>
                        <p className="text-gray-600 dark:text-[#92aec9] text-base font-normal leading-normal ml-11">Explora en profundidad los datos del panel de control.</p>
                    </div>
                    <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#233648] pl-4 pr-3 border border-gray-200 dark:border-gray-700">
                        <p className="text-black dark:text-white text-sm font-medium leading-normal">Periodo: 2024-I</p>
                        <span className="material-symbols-outlined text-black dark:text-white">expand_more</span>
                    </button>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav aria-label="Tabs" className="flex -mb-px">
                        <a className="shrink-0 border-b-2 border-primary text-primary px-4 py-3 text-sm font-medium" href="#">Encima del Promedio</a>
                        <a className="shrink-0 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600 px-4 py-3 text-sm font-medium" href="#">Debajo del Promedio</a>
                        <a className="shrink-0 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600 px-4 py-3 text-sm font-medium" href="#">Reprobados</a>
                        <a className="shrink-0 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600 px-4 py-3 text-sm font-medium" href="#">Registro de Ausencias</a>
                    </nav>
                </div>
                <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] overflow-hidden">
                    <div className="p-6">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Alumnos por encima del promedio (85)</h2>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                    <input className="w-64 pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-black dark:text-white focus:ring-primary focus:border-primary" placeholder="Buscar alumno..." type="text" />
                                </div>
                                <button className="flex shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#233648] px-3 py-2 border border-gray-200 dark:border-gray-700">
                                    <span className="material-symbols-outlined text-black dark:text-white text-base">filter_list</span>
                                    <p className="text-black dark:text-white text-sm font-medium">Filtrar</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#192734] dark:text-gray-300">
                                <tr>
                                    <th className="px-6 py-3" scope="col">Nombre del Alumno</th>
                                    <th className="px-6 py-3" scope="col">ID Alumno</th>
                                    <th className="px-6 py-3" scope="col">Grado</th>
                                    <th className="px-6 py-3" scope="col">Sección</th>
                                    <th className="px-6 py-3" scope="col">Promedio General</th>
                                    <th className="px-6 py-3" scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white dark:bg-[#111a22] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Juan Pérez García</td>
                                    <td className="px-6 py-4">SGE24001</td>
                                    <td className="px-6 py-4">5to Grado</td>
                                    <td className="px-6 py-4">A</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">95.5</span></td>
                                    <td className="px-6 py-4 text-primary hover:underline cursor-pointer">Ver Detalles</td>
                                </tr>
                                <tr className="bg-white dark:bg-[#111a22] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">María Rodríguez López</td>
                                    <td className="px-6 py-4">SGE24002</td>
                                    <td className="px-6 py-4">5to Grado</td>
                                    <td className="px-6 py-4">B</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">92.8</span></td>
                                    <td className="px-6 py-4 text-primary hover:underline cursor-pointer">Ver Detalles</td>
                                </tr>
                                <tr className="bg-white dark:bg-[#111a22] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Carlos Sánchez Martín</td>
                                    <td className="px-6 py-4">SGE24003</td>
                                    <td className="px-6 py-4">4to Grado</td>
                                    <td className="px-6 py-4">A</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">91.0</span></td>
                                    <td className="px-6 py-4 text-primary hover:underline cursor-pointer">Ver Detalles</td>
                                </tr>
                                <tr className="bg-white dark:bg-[#111a22] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Laura Gómez Fernández</td>
                                    <td className="px-6 py-4">SGE24004</td>
                                    <td className="px-6 py-4">5to Grado</td>
                                    <td className="px-6 py-4">A</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">90.2</span></td>
                                    <td className="px-6 py-4 text-primary hover:underline cursor-pointer">Ver Detalles</td>
                                </tr>
                                <tr className="bg-white dark:bg-[#111a22] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">David Martínez Ruiz</td>
                                    <td className="px-6 py-4">SGE24005</td>
                                    <td className="px-6 py-4">3er Grado</td>
                                    <td className="px-6 py-4">C</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">89.5</span></td>
                                    <td className="px-6 py-4 text-primary hover:underline cursor-pointer">Ver Detalles</td>
                                </tr>
                                <tr className="bg-white dark:bg-[#111a22] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ana Díaz Pérez</td>
                                    <td className="px-6 py-4">SGE24006</td>
                                    <td className="px-6 py-4">4to Grado</td>
                                    <td className="px-6 py-4">B</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">88.7</span></td>
                                    <td className="px-6 py-4 text-primary hover:underline cursor-pointer">Ver Detalles</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label="Table navigation" className="flex items-center justify-between p-4">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Mostrando <span className="font-semibold text-gray-900 dark:text-white">1-6</span> de <span className="font-semibold text-gray-900 dark:text-white">85</span></span>
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <a className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#">Anterior</a>
                            </li>
                            <li>
                                <a aria-current="page" className="z-10 px-3 py-2 leading-tight text-primary bg-blue-50 border border-primary hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" href="#">1</a>
                            </li>
                            <li>
                                <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#">2</a>
                            </li>
                            <li>
                                <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#">3</a>
                            </li>
                            <li>
                                <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">...</span>
                            </li>
                            <li>
                                <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#">15</a>
                            </li>
                            <li>
                                <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#">Siguiente</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </main>
    )
}

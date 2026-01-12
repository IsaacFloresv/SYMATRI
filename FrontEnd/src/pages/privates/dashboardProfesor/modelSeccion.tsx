export default function ModalSeccion() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-4xl bg-white dark:bg-[#192733] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Alumnos de la Sección 11-B</h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Lista de alumnos de Matemáticas Avanzadas.</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div className="mt-4 relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        <input className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg dark:bg-[#233648] dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-primary focus:border-primary" placeholder="Buscar alumno por nombre..." type="search" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#233648] dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3" scope="col">
                                    Nombre Completo
                                </th>
                                <th className="px-6 py-3 text-center" scope="col">
                                    Promedio
                                </th>
                                <th className="px-6 py-3 text-center" scope="col">
                                    Conducta
                                </th>
                                <th className="px-6 py-3 text-center" scope="col">
                                    Ausencias
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    <span className="sr-only">Ver perfil</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-[#192733] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                                    Ana Sofía Martínez
                                </th>
                                <td className="px-6 py-4 text-center">
                                    8.9
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                        Buena
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    2
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="font-medium text-primary dark:text-blue-400 hover:underline" href="#">Ver perfil</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-[#192733] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                                    Carlos Alberto Rodríguez
                                </th>
                                <td className="px-6 py-4 text-center">
                                    9.5
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                        Excelente
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    0
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="font-medium text-primary dark:text-blue-400 hover:underline" href="#">Ver perfil</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-[#192733] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                                    Lucía Fernández
                                </th>
                                <td className="px-6 py-4 text-center">
                                    7.2
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400">
                                        Regular
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    5
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="font-medium text-primary dark:text-blue-400 hover:underline" href="#">Ver perfil</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-[#192733] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                                    Javier Gómez
                                </th>
                                <td className="px-6 py-4 text-center">
                                    8.1
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                        Buena
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    3
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="font-medium text-primary dark:text-blue-400 hover:underline" href="#">Ver perfil</a>
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#192733] hover:bg-gray-50 dark:hover:bg-white/5">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                                    Valentina Pérez
                                </th>
                                <td className="px-6 py-4 text-center">
                                    9.8
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                        Excelente
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    1
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a className="font-medium text-primary dark:text-blue-400 hover:underline" href="#">Ver perfil</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-gray-200 text-gray-800 text-sm font-medium leading-normal hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                        <span className="truncate">Cerrar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default function pageDataAlumno() {
    return (<main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <p className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Detalles del Alumno</p>
                    <p className="text-gray-600 dark:text-[#92aec9] text-base font-normal leading-normal">Información completa de Juan Pérez García.</p>
                </div>
                <a className="inline-flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary px-4 text-white text-sm font-medium leading-normal" href="#">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Volver al Panel
                </a>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6 text-center">
                        <div className="mx-auto bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 mb-4" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAR7zsX06ko-7vd3eH99gNRb5PAV3JHHmvC1ZDn5ISKy_dwqJ8KnClxUSw3FBV9RD05F-wwvF-VfIO_uWJ_c7jFT4U8T64kW_YgDKyElez9JC5AOfYVwdZX4HqaDRdkiU29gDJbWgGrAarNc4Zf-ERA2Px9jzU9jvPcWf9QKM6YfqC5YVm8LENyWs8DYiCeL9QNjmxapFUa_MLFYJ9kz6N7KvS5UzAv4qsjrGhFXdwQpHWwFCsjZFGQgQz5TgmFlA-qipGZD_jmU5kI');"></div>
                        <h2 className="text-black dark:text-white text-xl font-bold leading-tight">Juan Pérez García</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">ID Alumno: SGE24001</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            <span className="size-2 rounded-full bg-green-500"></span>
                            Activo
                        </span>
                    </div>
                    <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6">
                        <h3 className="text-black dark:text-white text-lg font-bold mb-4">Información de Contacto</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">mail</span>
                                <span className="text-gray-700 dark:text-gray-300">juan.perez@email.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">call</span>
                                <span className="text-gray-700 dark:text-gray-300">+52 55 1234 5678</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mt-0.5">home</span>
                                <span className="text-gray-700 dark:text-gray-300">Calle Falsa 123, Colonia Centro, Ciudad de México, CP 06000</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6">
                        <h3 className="text-black dark:text-white text-lg font-bold mb-4">Datos Generales</h3>
                        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Fecha de Nacimiento</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">15 de Mayo, 2012</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Género</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">Masculino</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Fecha de Admisión</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">01 de Septiembre, 2018</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Tutor / Padre</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">Carlos Pérez</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Teléfono de Emergencia</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">+52 55 8765 4321</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-6">
                        <h3 className="text-black dark:text-white text-lg font-bold mb-4">Información Académica</h3>
                        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Grado Actual</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">5to Grado</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Sección</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">A</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Profesor Titular</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">Laura Martínez</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Promedio General</dt>
                                <dd className="text-gray-900 dark:text-white mt-1"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">95.5</span></dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Ausencias (Año)</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">2</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 dark:text-gray-400 font-medium">Retardos (Año)</dt>
                                <dd className="text-gray-900 dark:text-white mt-1">1</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67]">
                        <div className="p-6">
                            <h3 className="text-black dark:text-white text-lg font-bold">Calificaciones por Materia</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#192734] dark:text-gray-300">
                                    <tr>
                                        <th className="px-6 py-3" scope="col">Materia</th>
                                        <th className="px-6 py-3" scope="col">Profesor</th>
                                        <th className="px-6 py-3 text-right" scope="col">Calificación Final</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white dark:bg-[#111a22] border-t dark:border-gray-700">
                                        <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Matemáticas</td>
                                        <td className="px-6 py-3">Ricardo Gómez</td>
                                        <td className="px-6 py-3 text-right font-semibold text-gray-800 dark:text-gray-200">98</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-[#111a22] border-t dark:border-gray-700">
                                        <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ciencias</td>
                                        <td className="px-6 py-3">Mónica Hernández</td>
                                        <td className="px-6 py-3 text-right font-semibold text-gray-800 dark:text-gray-200">94</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-[#111a22] border-t dark:border-gray-700">
                                        <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Historia</td>
                                        <td className="px-6 py-3">Laura Martínez</td>
                                        <td className="px-6 py-3 text-right font-semibold text-gray-800 dark:text-gray-200">92</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-[#111a22] border-t dark:border-gray-700">
                                        <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Español</td>
                                        <td className="px-6 py-3">Laura Martínez</td>
                                        <td className="px-6 py-3 text-right font-semibold text-gray-800 dark:text-gray-200">97</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}

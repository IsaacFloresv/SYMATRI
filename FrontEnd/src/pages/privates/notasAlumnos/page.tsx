export default function notasAlumnos() {
    return (
        <main className="flex-1 p-6 lg:p-10">
            <div className="mx-auto max-w-7xl flex gap-8">

                <aside className="w-64 shrink-0 rounded-xl bg-white dark:bg-[#111a22] p-4 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-10 rounded-full bg-gray-300" />
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                                Prof. Alejandro Rojas
                            </p>
                            <p className="text-sm text-gray-500 dark:text-[#92aec9]">
                                Matemáticas
                            </p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {["Inicio", "Calificaciones", "Asistencia", "Alumnos"].map(item => (
                            <a
                                key={item}
                                href="#"
                                className="px-3 py-2 rounded-lg text-sm font-medium
                hover:bg-gray-100 dark:hover:bg-[#233648]"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </aside>
                <section className="flex-1 flex flex-col gap-6">

                    <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                        Gestión de Calificaciones
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-[#111a22] p-4 rounded-xl border">
                        <select className="h-12 rounded-lg border px-3 bg-background-light dark:bg-[#192733]">
                            <option>5º A</option>
                            <option>5º B</option>
                        </select>

                        <select className="h-12 rounded-lg border px-3 bg-background-light dark:bg-[#192733]">
                            <option>Matemáticas</option>
                            <option>Historia</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto rounded-xl border bg-white dark:bg-[#111a22]">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-[#192733]">
                                <tr>
                                    {["Alumno", "Examen", "Tarea", "Proyecto", "Promedio"].map(h => (
                                        <th key={h} className="px-4 py-3 text-left">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {[
                                    { nombre: "Ana Torres", promedio: "9.18" },
                                    { nombre: "Carlos Vega", promedio: "8.13" },
                                ].map(alumno => (
                                    <tr key={alumno.nombre}>
                                        <td className="px-4 py-3">{alumno.nombre}</td>
                                        <td className="px-4 py-3"><input type="number" className="w-20 input" /></td>
                                        <td className="px-4 py-3"><input type="number" className="w-20 input" /></td>
                                        <td className="px-4 py-3"><input type="number" className="w-20 input" /></td>
                                        <td className="px-4 py-3 font-medium">{alumno.promedio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button className="px-5 h-12 rounded-lg bg-gray-200 dark:bg-[#233648]">
                            Cancelar
                        </button>
                        <button className="px-5 h-12 rounded-lg bg-primary text-white">
                            Guardar
                        </button>
                    </div>

                </section>
            </div>
        </main>
    )
}
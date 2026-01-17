export default function DashBoardAlumno() {
    return (

        <main className="flex-1 p-8 bg-background-dark flex flex-col">

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground-dark">Tabla de Rendimiento Académico</h2>
                            <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden">
                                <table className="min-w-full divide-y divide-border-dark">
                                    <thead className="bg-card-dark/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-dark uppercase tracking-wider" scope="col">Materia</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-dark uppercase tracking-wider" scope="col">Promedio Actual</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-dark uppercase tracking-wider" scope="col">Promedio Anterior</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-dark uppercase tracking-wider" scope="col">Cambio (%)</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-dark uppercase tracking-wider" scope="col">Tendencia</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-dark">
                                        <tr className="hover:bg-card-dark/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground-dark">Matemáticas</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground-dark font-bold">93.5</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-dark">92.0</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+1.63%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-end h-8 w-16 gap-1">
                                                    <div className="w-1/3 bg-green-500 rounded-sm" style="height: 90%;"></div>
                                                    <div className="w-1/3 bg-green-500 rounded-sm" style="height: 92%;"></div>
                                                    <div className="w-1/3 bg-green-500 rounded-sm" style="height: 93.5%;"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-card-dark/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground-dark">Lengua Española</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground-dark font-bold">89.0</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-dark">90.0</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">-1.11%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-end h-8 w-16 gap-1">
                                                    <div className="w-1/3 bg-green-500 rounded-sm" style="height: 91%;"></div>
                                                    <div className="w-1/3 bg-green-500 rounded-sm" style="height: 90%;"></div>
                                                    <div className="w-1/3 bg-green-500 rounded-sm" style="height: 89%;"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-card-dark/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground-dark">Ciencias Naturales</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground-dark font-bold">80.5</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-dark">81.0</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">-0.62%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-end h-8 w-16 gap-1">
                                                    <div className="w-1/3 bg-green-500 rounded-sm" style="height: 78%;"></div>
                                                    <div className="w-1/3 bg-green-500 rounded-sm" style="height: 81%;"></div>
                                                    <div className="w-1/3 bg-green-500 rounded-sm" style="height: 80.5%;"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-card-dark/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground-dark">Educación Física</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground-dark font-bold">75.0</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-dark">68.0</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+10.29%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-end h-8 w-16 gap-1">
                                                    <div className="w-1/3 bg-yellow-500 rounded-sm" style="height: 72%;"></div>
                                                    <div className="w-1/3 bg-red-500 rounded-sm" style="height: 68%;"></div>
                                                    <div className="w-1/3 bg-yellow-500 rounded-sm" style="height: 75%;"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-card-dark/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground-dark">Historia</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground-dark font-bold">64.5</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-dark">65.0</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">-0.77%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-end h-8 w-16 gap-1">
                                                    <div className="w-1/3 bg-red-500 rounded-sm" style="height: 62%;"></div>
                                                    <div className="w-1/3 bg-red-500 rounded-sm" style="height: 65%;"></div>
                                                    <div className="w-1/3 bg-red-500 rounded-sm" style="height: 64.5%;"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-lg border border-border-dark bg-card-dark space-y-4">
                                <h3 className="text-xl font-bold text-foreground-dark">Mis Ausencias</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-2xl text-yellow-500">event_note</span>
                                        <p className="text-base text-foreground-dark">Semanal:</p>
                                    </div>
                                    <p className="text-xl font-semibold text-foreground-dark">1</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-2xl text-yellow-500">calendar_month</span>
                                        <p className="text-base text-foreground-dark">Mensual:</p>
                                    </div>
                                    <p className="text-xl font-semibold text-foreground-dark">2</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-dark pt-2 border-t border-border-dark/30">
                                    <span className="material-symbols-outlined text-lg text-red-500">trending_up</span>
                                    <p>Tendencia: <span className="text-red-500">En aumento</span></p>
                                </div>
                            </div>
                            <div className="p-6 rounded-lg border border-border-dark bg-card-dark space-y-4">
                                <h3 className="text-xl font-bold text-foreground-dark">Mi Conducta</h3>
                                <div className="flex items-center gap-2 text-foreground-dark">
                                    <span className="material-symbols-outlined text-2xl text-green-500">sentiment_satisfied</span>
                                    <p className="text-base">Estado: <span className="font-semibold text-green-500">Excelente</span></p>
                                </div>
                                <p className="text-sm text-muted-dark">Has mantenido un comportamiento ejemplar en todas tus clases. ¡Sigue así, Sofía!</p>
                                <a className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium" href="#">
                                    Ver méritos y deméritos
                                    <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="lg:col-span-1 flex flex-col space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-foreground-dark">Próximos Eventos</h2>
                        <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden max-h-[350px] overflow-y-auto">
                            <ul className="divide-y divide-border-dark">
                                <li className="p-4 flex items-center justify-between hover:bg-card-dark/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/20 text-primary rounded-full size-8 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-lg">event</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground-dark text-sm">18 Nov: Feria de Ciencias</p>
                                            <p className="text-xs text-muted-dark">Gimnasio, 09:00 - 15:00</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-muted-dark px-2 py-0.5 bg-primary/10 rounded-full">Próximo</span>
                                </li>
                                <li className="p-4 flex items-center justify-between hover:bg-card-dark/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/20 text-primary rounded-full size-8 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-lg">school</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground-dark text-sm">20 Nov: Día Festivo</p>
                                            <p className="text-xs text-muted-dark">Sin actividades escolares</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-muted-dark px-2 py-0.5 bg-yellow-500/10 rounded-full">Feriado</span>
                                </li>
                                <li className="p-4 flex items-center justify-between hover:bg-card-dark/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/20 text-primary rounded-full size-8 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-lg">sports_soccer</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground-dark text-sm">22 Nov: Torneo de Fútbol</p>
                                            <p className="text-xs text-muted-dark">Campo Principal, 16:00</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-muted-dark px-2 py-0.5 bg-primary/10 rounded-full">Próximo</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-foreground-dark">Mensajes No Leídos</h2>
                        <div className="rounded-lg border border-border-dark bg-card-dark overflow-hidden max-h-[350px] overflow-y-auto">
                            <ul className="divide-y divide-border-dark">
                                <li className="p-4 flex items-center gap-3 hover:bg-card-dark/50 transition-colors">
                                    <div className="bg-primary/20 text-primary rounded-full size-8 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-lg">mail</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-medium text-foreground-dark text-sm truncate">Prof. Martínez</p>
                                        <p className="text-xs text-muted-dark truncate">Material para el examen final...</p>
                                    </div>
                                    <span className="ml-auto text-[10px] text-muted-dark whitespace-nowrap">Hace 1h</span>
                                </li>
                                <li className="p-4 flex items-center gap-3 hover:bg-card-dark/50 transition-colors">
                                    <div className="bg-primary/20 text-primary rounded-full size-8 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-lg">campaign</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-medium text-foreground-dark text-sm truncate">Coordinación</p>
                                        <p className="text-xs text-muted-dark truncate">Nuevas reglas de laboratorio</p>
                                    </div>
                                    <span className="ml-auto text-[10px] text-muted-dark whitespace-nowrap">Ayer</span>
                                </li>
                                <li className="p-4 flex items-center gap-3 hover:bg-card-dark/50 transition-colors">
                                    <div className="bg-primary/20 text-primary rounded-full size-8 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-lg">edit_note</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-medium text-foreground-dark text-sm truncate">Bibliotecaria</p>
                                        <p className="text-xs text-muted-dark truncate">Libro pendiente de entrega</p>
                                    </div>
                                    <span className="ml-auto text-[10px] text-muted-dark whitespace-nowrap">2 días</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )

}       

export default function NotificationsPage() {
    return (
        <main className="flex-1 overflow-y-auto">
            <header className="h-16 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 dark:text-zinc-500">Ajustes</span>
                    <span className="material-symbols-outlined text-sm text-slate-400 dark:text-zinc-500">chevron_right</span>
                    <span className="font-medium">Notificaciones</span>
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-500 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </header>
            <div className="max-w-4xl mx-auto py-10 px-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Configuración de Notificaciones</h1>
                    <p className="text-slate-500 dark:text-zinc-400 mt-2">Personaliza cómo y cuándo recibes las alertas del sistema escolar.</p>
                </div>
                <div className="space-y-8 pb-20">
                    <section className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Canales de Notificación</h2>
                            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Elige los medios por los cuales deseas ser contactado.</p>
                        </div>
                        <div className="p-0 divide-y divide-slate-200 dark:divide-zinc-800">
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-zinc-100">Notificaciones por Correo</p>
                                        <p className="text-sm text-slate-500 dark:text-zinc-500">Recibe resúmenes y alertas en tu bandeja de entrada.</p>
                                    </div>
                                </div>
                                <button className="switch switch-on" type="button">
                                    <span className="switch-thumb switch-thumb-on"></span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                                        <span className="material-symbols-outlined">smartphone</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-zinc-100">Notificaciones al Celular</p>
                                        <p className="text-sm text-slate-500 dark:text-zinc-500">Alertas push instantáneas en la aplicación móvil.</p>
                                    </div>
                                </div>
                                <button className="switch switch-on" type="button">
                                    <span className="switch-thumb switch-thumb-on"></span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                                        <span className="material-symbols-outlined">desktop_windows</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-zinc-100">Notificaciones del Navegador</p>
                                        <p className="text-sm text-slate-500 dark:text-zinc-500">Avisos en el escritorio mientras usas el sistema.</p>
                                    </div>
                                </div>
                                <button className="switch switch-off" type="button">
                                    <span className="switch-thumb switch-thumb-off"></span>
                                </button>
                            </div>
                        </div>
                    </section>
                    <section className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preferencias de Eventos</h2>
                            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Selecciona qué tipos de actividades disparan una notificación.</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                                <input checked="" className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-primary focus:ring-primary focus:ring-offset-zinc-950" type="checkbox" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-900 dark:text-zinc-100">Mensajes nuevos</span>
                                    <span className="text-xs text-slate-500 dark:text-zinc-500">Recibe un aviso cuando un profesor o administrador te escriba.</span>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                                <input checked="" className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-primary focus:ring-primary focus:ring-offset-zinc-950" type="checkbox" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-900 dark:text-zinc-100">Cambios de notas</span>
                                    <span className="text-xs text-slate-500 dark:text-zinc-500">Alertas inmediatas cuando se publiquen o modifiquen calificaciones.</span>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                                <input className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-primary focus:ring-primary focus:ring-offset-zinc-950" type="checkbox" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-900 dark:text-zinc-100">Eventos del colegio</span>
                                    <span className="text-xs text-slate-500 dark:text-zinc-500">Recordatorios de reuniones, feriados y actividades extracurriculares.</span>
                                </div>
                            </label>
                        </div>
                    </section>
                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors" type="button">
                            Restablecer
                        </button>
                        <button className="px-6 py-2.5 bg-primary hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98]" type="submit">
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

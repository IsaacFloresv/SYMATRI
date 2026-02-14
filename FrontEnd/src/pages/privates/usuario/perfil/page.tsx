export default function PerfilPage() {
    return (
        <main className="flex-1 overflow-y-auto">
            <header className="h-16 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 dark:text-zinc-500">Ajustes</span>
                    <span className="material-icons-round text-sm text-slate-400 dark:text-zinc-500">chevron_right</span>
                    <span className="font-medium">Perfil</span>
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-500 transition-colors">
                    <span className="material-icons-round">notifications</span>
                </button>
            </header>
            <div className="max-w-4xl mx-auto py-10 px-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Mi Perfil</h1>
                    <p className="text-slate-500 dark:text-zinc-400 mt-2">Gestiona tu información personal y configuración de cuenta.</p>
                </div>
                <form className="space-y-8">
                    <section className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                            <h2 className="text-lg font-semibold">Información de Cuenta</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="userName">Nombre de Usuario</label>
                                <input className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="userName" type="text" value="soporte_admin" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="email">Correo Electrónico</label>
                                <input className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="email" type="email" value="soporte@example.com" />
                            </div>
                        </div>
                    </section>
                    <section className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                            <h2 className="text-lg font-semibold">Datos Personales</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="firstName">Nombre</label>
                                    <input className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="firstName" type="text" value="Soporte" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="lastName">Apellido</label>
                                    <input className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="lastName" type="text" value="Soporte" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="address">Dirección</label>
                                <input className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="address" type="text" value="Calle Principal 123, Ciudad" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="telefono">Teléfono</label>
                                    <input className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="telefono" type="tel" value="+34 600 000 000" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-950/50 rounded-lg border border-dashed border-slate-200 dark:border-zinc-800">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">Estado de la cuenta</span>
                                        <span className="text-xs text-slate-500 dark:text-zinc-500">Activo / Inactivo</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input checked="" className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <button className="px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors" type="button">
                            Cancelar
                        </button>
                        <button className="px-6 py-2.5 bg-primary hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98]" type="submit">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

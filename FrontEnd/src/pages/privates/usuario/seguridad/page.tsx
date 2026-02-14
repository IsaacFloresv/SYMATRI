export default function SeguridadPage() {
    return (
        <main className="flex-1 overflow-y-auto">
            <header className="h-16 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 dark:text-zinc-500">Ajustes</span>
                    <span className="material-symbols-outlined text-sm text-slate-400 dark:text-zinc-500">chevron_right</span>
                    <span className="font-medium">Seguridad</span>
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-500 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </header>
            <div className="max-w-4xl mx-auto py-10 px-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Seguridad de la Cuenta</h1>
                    <p className="text-slate-500 dark:text-zinc-400 mt-2">Gestiona tus credenciales y procesos de verificación de identidad.</p>
                </div>
                <div className="space-y-8">
                    <section className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Cambiar Contraseña</h2>
                            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Sigue los pasos para actualizar tu contraseña de forma segura.</p>
                        </div>
                        <form className="p-6 space-y-6">
                            <div className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-end gap-3 flex-wrap md:flex-nowrap">
                                        <div className="flex-1 min-w-[240px] space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="verificationCode">Código de Verificación</label>
                                            <input className="w-full bg-slate-50 dark:bg-zinc-950 border-red-500 dark:border-red-900/80 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none text-red-600 dark:text-red-400" id="verificationCode" placeholder="Ingresa el código" type="text" value="123456" />
                                        </div>
                                        <button className="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-zinc-100 text-sm font-medium rounded-lg border border-slate-200 dark:border-zinc-700 transition-all flex items-center gap-2" type="button">
                                            <span className="material-symbols-outlined text-[18px]">send</span>
                                            Enviar Código
                                        </button>
                                        <button className="px-5 py-2.5 bg-primary text-white border border-primary shadow-sm hover:bg-blue-600 text-sm font-medium rounded-lg transition-all active:scale-95" id="verifyButton" type="button">
                                            Verificar Código
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-xs w-fit">
                                            <span className="material-symbols-outlined text-[16px]">error</span>
                                            <span>Código inválido. Por favor, inténtalo de nuevo.</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400 text-xs w-fit opacity-50">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                            <span>Código enviado con éxito a tu correo registrado.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-px bg-slate-200 dark:bg-zinc-800 my-2"></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="newPassword">Nueva Contraseña</label>
                                        <input className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" disabled="" id="newPassword" placeholder="••••••••••••" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="confirmPassword">Confirmar Nueva Contraseña</label>
                                        <input className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" disabled="" id="confirmPassword" placeholder="••••••••••••" type="password" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end border-t border-slate-200 dark:border-zinc-800 pt-6">
                                <button className="px-6 py-2.5 bg-primary hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98]" disabled="" type="submit">
                                    Actualizar Contraseña
                                </button>
                            </div>
                        </form>
                    </section>
                    <section className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold">Métodos de Recuperación</h2>
                                <span className="bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase px-1.5 py-0.5 rounded font-bold tracking-wider text-zinc-500">Solo Lectura</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Estos datos se utilizan para enviarte el código de verificación.</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="recoveryEmail">Correo Electrónico</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-sm text-slate-400 dark:text-zinc-600">lock</span>
                                        </div>
                                        <input className="w-full bg-slate-100 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 rounded-lg pl-10 pr-4 py-2 cursor-not-allowed italic" id="recoveryEmail" readonly="" type="email" value="soporte@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" for="recoveryPhone">Teléfono de Recuperación</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-sm text-slate-400 dark:text-zinc-600">lock</span>
                                        </div>
                                        <input className="w-full bg-slate-100 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 rounded-lg pl-10 pr-4 py-2 cursor-not-allowed italic" id="recoveryPhone" readonly="" type="tel" value="+34 600 000 000" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
                                <div className="flex gap-3">
                                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-[20px]">info</span>
                                    <p className="text-sm text-amber-700 dark:text-amber-300">
                                        Los métodos de recuperación no pueden modificarse desde esta pantalla por razones de seguridad. Contacta con administración si necesitas actualizarlos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

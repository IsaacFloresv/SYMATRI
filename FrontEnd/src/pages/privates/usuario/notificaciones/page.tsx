import { useState, useEffect } from "react";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { toast } from "sonner";

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"

export default function NotificationsPage() {
    const session = useAuthStorage((s) => s.user);
    const setUser = useAuthStorage((s) => s.setUser);

    const defaultPrefs = {
      channels: { email: true, mobile: true, browser: false },
      events: { messages: true, grades: true, schoolEvents: false },
    };

    const [channels, setChannels] = useState(defaultPrefs.channels);
    const [events, setEvents] = useState(defaultPrefs.events);

    // load from session when available
    useEffect(() => {
      if (session?.notifications) {
        setChannels(session.notifications.channels || defaultPrefs.channels);
        setEvents(session.notifications.events || defaultPrefs.events);
      }
    }, [session]);

    const handleReset = () => {
      setChannels(defaultPrefs.channels);
      setEvents(defaultPrefs.events);
    };

    const handleSave = () => {
      const newSession = { ...session, notifications: { channels, events } };
      setUser(newSession);
      toast.success('Preferencias guardadas');
    };

    return (
        <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-10 px-8">
                <div className="mb-10">
                    <p className="text-slate-500 dark:text-zinc-400 mt-2">Personaliza cómo y cuándo recibes las alertas del sistema escolar.</p>
                </div>
                <div className="space-y-8 pb-20">
                    <Card className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                      <CardHeader className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                        <div>
                          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Canales de Notificación</h2>
                          <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Elige los medios por los cuales deseas ser contactado.</p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 divide-y divide-slate-200 dark:divide-zinc-800">
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
                          <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <Checkbox
                                checked={channels.email}
                                onCheckedChange={(v) => setChannels((c) => ({ ...c, email: Boolean(v) }))}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-red-500 dark:bg-red-600 peer-focus:outline-none rounded-full peer peer-data-[state=checked]:after:translate-x-full rtl:peer-data-[state=checked]:after:-translate-x-full peer-data-[state=checked]:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-data-[state=checked]:bg-green-500 dark:peer-data-[state=checked]:bg-green-600 peer-data-[state=unchecked]:bg-red-500 dark:peer-data-[state=unchecked]:bg-red-600"></div>
                            </label>
                            <span aria-live="polite" className={`${channels.email ? 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.55)] animate-pulse' : 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.55)]'} text-sm font-semibold transition-colors duration-200`}>{channels.email ? 'Activo' : 'Inactivo'}</span>
                          </div>
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
                          <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <Checkbox
                                checked={channels.mobile}
                                onCheckedChange={(v) => setChannels((c) => ({ ...c, mobile: Boolean(v) }))}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-red-500 dark:bg-red-600 peer-focus:outline-none rounded-full peer peer-data-[state=checked]:after:translate-x-full rtl:peer-data-[state=checked]:after:-translate-x-full peer-data-[state=checked]:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-data-[state=checked]:bg-green-500 dark:peer-data-[state=checked]:bg-green-600 peer-data-[state=unchecked]:bg-red-500 dark:peer-data-[state=unchecked]:bg-red-600"></div>
                            </label>
                            <span aria-live="polite" className={`${channels.mobile ? 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.55)] animate-pulse' : 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.55)]'} text-sm font-semibold transition-colors duration-200`}>{channels.mobile ? 'Activo' : 'Inactivo'}</span>
                          </div>
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
                          <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <Checkbox
                                checked={channels.browser}
                                onCheckedChange={(v) => setChannels((c) => ({ ...c, browser: Boolean(v) }))}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-red-500 dark:bg-red-600 peer-focus:outline-none rounded-full peer peer-data-[state=checked]:after:translate-x-full rtl:peer-data-[state=checked]:after:-translate-x-full peer-data-[state=checked]:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-data-[state=checked]:bg-green-500 dark:peer-data-[state=checked]:bg-green-600 peer-data-[state=unchecked]:bg-red-500 dark:peer-data-[state=unchecked]:bg-red-600"></div>
                            </label>
                            <span aria-live="polite" className={`${channels.browser ? 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.55)] animate-pulse' : 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.55)]'} text-sm font-semibold transition-colors duration-200`}>{channels.browser ? 'Activo' : 'Inactivo'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                      <CardHeader className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                        <div>
                          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preferencias de Eventos</h2>
                          <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Selecciona qué tipos de actividades disparan una notificación.</p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                          <Checkbox checked={events.messages} onCheckedChange={(v) => setEvents((e) => ({ ...e, messages: Boolean(v) }))} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-primary focus:ring-primary focus:ring-offset-zinc-950" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-900 dark:text-zinc-100">Mensajes nuevos</span>
                            <span className="text-xs text-slate-500 dark:text-zinc-500">Recibe un aviso cuando un profesor o administrador te escriba.</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                          <Checkbox checked={events.grades} onCheckedChange={(v) => setEvents((e) => ({ ...e, grades: Boolean(v) }))} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-primary focus:ring-primary focus:ring-offset-zinc-950" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-900 dark:text-zinc-100">Cambios de notas</span>
                            <span className="text-xs text-slate-500 dark:text-zinc-500">Alertas inmediatas cuando se publiquen o modifiquen calificaciones.</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                          <Checkbox checked={events.schoolEvents} onCheckedChange={(v) => setEvents((e) => ({ ...e, schoolEvents: Boolean(v) }))} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 bg-transparent text-primary focus:ring-primary focus:ring-offset-zinc-950" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-900 dark:text-zinc-100">Eventos del colegio</span>
                            <span className="text-xs text-slate-500 dark:text-zinc-500">Recordatorios de reuniones, feriados y actividades extracurriculares.</span>
                          </div>
                        </label>
                      </CardContent>
                    </Card>
                    <div className="flex items-center justify-end gap-3 pt-4">
                        <Button onClick={handleReset} className="px-8 py-3 text-sm font-semibold bg-red-200 dark:bg-red-800/60 text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-300 dark:hover:bg-red-700 border-2 border-red-300 dark:border-red-600 rounded-lg shadow-lg shadow-red-500/20 transition-all transform active:scale-[0.98]" variant="ghost" size="sm" type="button">
                            Restablecer
                        </Button>
                        <Button onClick={handleSave} className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98] border-2 border-blue-700" type="button">
                            Guardar Cambios
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

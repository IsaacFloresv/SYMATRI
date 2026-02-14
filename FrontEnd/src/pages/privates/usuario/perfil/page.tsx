import { useState, useEffect, useRef } from "react";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { getToken } from "@/lib/authStorage";
import { api } from "@/lib/api";
import { toast } from "sonner"

export default function PerfilPage() {
    const session = useAuthStorage((s) => s.user)
    const rawRole = session?.role ? String(session.role).toLowerCase() : ""
    const isPrivileged = rawRole.includes("admin") || rawRole.includes("soporte")

    // Estado local para el switch 'Estado de la cuenta' — se usará luego en el submit
    const [accountActive, setAccountActive] = useState<boolean>(Boolean((session as any)?.active ?? true))
    const [saving, setSaving] = useState(false)

    // form state para detectar cambios
    const [formValues, setFormValues] = useState(() => ({
      userName: (session as any)?.datosPersonales?.name_user ?? '',
      email: (session as any)?.email ?? '',
      firstName: (session as any)?.datosPersonales?.firstName ?? '',
      lastName: (session as any)?.datosPersonales?.lastName ?? '',
      address: (session as any)?.datosPersonales?.address ?? '',
      telefono: (session as any)?.datosPersonales?.telefono ?? '',
    }))

    const initialRef = useRef({ ...formValues, accountActive })
    const [isModified, setIsModified] = useState(false)

    // sincronizar cuando cambia la session (p. ej. al cargar la página)
    useEffect(() => {
      const next = {
        userName: (session as any)?.datosPersonales?.name_user ?? '',
        email: (session as any)?.email ?? '',
        firstName: (session as any)?.datosPersonales?.firstName ?? '',
        lastName: (session as any)?.datosPersonales?.lastName ?? '',
        address: (session as any)?.datosPersonales?.address ?? '',
        telefono: (session as any)?.datosPersonales?.telefono ?? '',
      }
      setFormValues(next);
      const nextActive = Boolean((session as any)?.active ?? true);
      setAccountActive(nextActive);
      initialRef.current = { ...next, accountActive: nextActive };
      setIsModified(false);

      // También intentar obtener el usuario desde el backend (contiene userName y active reales)
      (async () => {
        try {
          if (!session?.id) return
          const token = getToken()
          const res = await fetch(`${api.baseUrl}/users/byid?id=${session.id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          })
          if (!res.ok) return
          const json = await res.json()
          const remote = {
            userName: json?.userName ?? next.userName,
            email: json?.email ?? next.email,
            firstName: json?.datosPersonales?.firstName ?? next.firstName,
            lastName: json?.datosPersonales?.lastName ?? next.lastName,
            address: json?.datosPersonales?.address ?? next.address,
            telefono: json?.datosPersonales?.telefono ?? next.telefono,
          }
          const remoteActive = Boolean(json?.active ?? nextActive)
          setFormValues(remote);
          setAccountActive(remoteActive);
          initialRef.current = { ...remote, accountActive: remoteActive };
          setIsModified(false);
        } catch (e) {
          /* silently ignore */
        }
      })()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.id])

    // detectar cambios respecto a initialRef
    useEffect(() => {
      const i = initialRef.current
      const changed = (
        formValues.userName !== i.userName ||
        formValues.email !== i.email ||
        formValues.firstName !== i.firstName ||
        formValues.lastName !== i.lastName ||
        formValues.address !== i.address ||
        formValues.telefono !== i.telefono ||
        accountActive !== i.accountActive
      )
      setIsModified(Boolean(changed))
    }, [formValues, accountActive])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormValues((p) => ({ ...p, [name]: value }))
    }

    const setUser = useAuthStorage((s) => s.setUser)

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      if (!session) return toast.error('Sesión no encontrada')
      if (!isModified) return
      setSaving(true)
      try {
        // --- users/update payload (account-level fields) ---
        const userPayload: any = { id: session.id, active: accountActive }
        const maybeUserName = String(formValues.userName || '').trim()
        const maybeEmail = String(formValues.email || '').trim()
        if (isPrivileged && maybeUserName) userPayload.userName = maybeUserName
        if (isPrivileged && maybeEmail) userPayload.email = maybeEmail

        const token = getToken()

        // enviar user update (si hay cambios de nivel usuario)
        const userRes = await fetch(`${api.baseUrl}/users/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify(userPayload),
        })

        if (!userRes.ok) {
          const errText = await userRes.text().catch(() => null)
          throw new Error(errText || 'Error actualizando usuario')
        }

        // --- dataUsers/update payload (personal data) ---
        const dataPayload: any = { userId: session.id }
        const firstName = String(formValues.firstName || '').trim()
        const lastName = String(formValues.lastName || '').trim()
        const address = String(formValues.address || '').trim()
        const telefono = String(formValues.telefono || '').trim()

        if (isPrivileged) {
          if (firstName) dataPayload.firstName = firstName
          if (lastName) dataPayload.lastName = lastName
        }
        if (address) dataPayload.address = address
        if (telefono) dataPayload.telefono = telefono

        if (Object.keys(dataPayload).length > 1) {
          const dataRes = await fetch(`${api.baseUrl}/dataUsers/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
            body: JSON.stringify(dataPayload),
          })
          if (!dataRes.ok) {
            const errText = await dataRes.text().catch(() => null)
            throw new Error(errText || 'Error actualizando datos personales')
          }
        }

        // Actualizar sesión local (Zustand + localStorage) sólo si backend respondió ok
        const newSession = {
          ...session,
          active: accountActive,
          email: isPrivileged && maybeEmail ? maybeEmail : session.email,
          datosPersonales: {
            ...((session as any).datosPersonales || {}),
            ...(firstName ? { firstName } : {}),
            ...(lastName ? { lastName } : {}),
            ...(address ? { address } : {}),
            ...(telefono ? { telefono } : {}),
          },
        }
        setUser(newSession)

        // actualizar referencia inicial (ya no está dirty)
        initialRef.current = { ...formValues, accountActive };
        setIsModified(false);

        // mensaje solicitado (desaparece en 1s)
        toast.success('informacion actualizada con exito', { duration: 1000 })
      } catch (err) {
        console.error('Perfil:update', err)
        toast.error('Error al guardar los cambios')
      } finally {
        setSaving(false)
      }
    }

    return (
        <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-10 px-8">
                <div className="mb-10">
                    <p className="text-slate-500 dark:text-zinc-400 mt-2">Gestiona tu información personal y configuración de cuenta.</p>
                    {!isPrivileged ? (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">Solo puedes modificar <strong>Teléfono</strong> y <strong>Dirección</strong>. Para otros cambios contacta al administrador o soporte.</p>
                    ) : null}
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <section className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                            <h2 className="text-lg font-semibold">Información de Cuenta</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" htmlFor="userName">Nombre de Usuario</label>
                                <input name="userName" value={formValues.userName} onChange={handleInputChange} disabled={!isPrivileged} className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="userName" type="text" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" htmlFor="email">Correo Electrónico</label>
                                <input name="email" value={formValues.email} onChange={handleInputChange} disabled={!isPrivileged} className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="email" type="email" />
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
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" htmlFor="firstName">Nombre</label>
                                    <input name="firstName" value={formValues.firstName} onChange={handleInputChange} disabled={!isPrivileged} className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="firstName" type="text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" htmlFor="lastName">Apellido</label>
                                    <input name="lastName" value={formValues.lastName} onChange={handleInputChange} disabled={!isPrivileged} className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="lastName" type="text" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" htmlFor="address">Dirección</label>
                                <input name="address" value={formValues.address} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="address" type="text" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-zinc-300" htmlFor="telefono">Teléfono</label>
                                    <input name="telefono" value={formValues.telefono} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" id="telefono" type="tel" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-950/50 rounded-lg border border-dashed border-slate-200 dark:border-zinc-800">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">Estado de la cuenta</span>
                                        <span className="text-xs text-slate-500 dark:text-zinc-500">Activo / Inactivo</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <label className="relative inline-flex items-center cursor-pointer">
                                        <Checkbox
                                          checked={accountActive}
                                          onCheckedChange={(v) => setAccountActive(Boolean(v))}
                                          disabled={!isPrivileged}
                                          className="sr-only peer"
                                        />

                                        <div className="w-11 h-6 bg-red-500 dark:bg-red-600 peer-focus:outline-none rounded-full peer peer-data-[state=checked]:after:translate-x-full rtl:peer-data-[state=checked]:after:-translate-x-full peer-data-[state=checked]:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-data-[state=checked]:bg-green-500 dark:peer-data-[state=checked]:bg-green-600 peer-data-[state=unchecked]:bg-red-500 dark:peer-data-[state=unchecked]:bg-red-600"></div>
                                      </label>

                                      <span aria-live="polite" className={`${accountActive ? 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.55)] animate-pulse' : 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.55)]'} text-sm font-semibold transition-colors duration-200`}>{accountActive ? 'Activo' : 'Inactivo'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Button className="px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors" variant="ghost" size="sm" type="button">
                            Cancelar
                        </Button>
                        <Button disabled={saving || !isModified} className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98]" type="submit">
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

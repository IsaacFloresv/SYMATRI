import { useState, useEffect } from "react";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { getToken } from "@/lib/authStorage";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { sendVerificationEmail } from "@/lib/serviceMail";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SeguridadPage() {
    const session = useAuthStorage((s) => s.user);
    const [verificationCode, setVerificationCode] = useState('');
    const [sentCode, setSentCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [verificationSuccess, setVerificationSuccess] = useState('');

    // clear inline messages after 1 second
    useEffect(() => {
      if (!verificationError) return;
      const timer = setTimeout(() => setVerificationError(''), 1000);
      return () => clearTimeout(timer);
    }, [verificationError]);
    useEffect(() => {
      if (!verificationSuccess) return;
      const timer = setTimeout(() => setVerificationSuccess(''), 1000);
      return () => clearTimeout(timer);
    }, [verificationSuccess]);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changing, setChanging] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);

    const sendCode = async () => {
      if (!session?.email) {
        toast.error('Email de usuario no disponible', { duration: 1000 });
        return;
      }
      try {
        const fullName = `${session.datosPersonales.firstName} ${session.datosPersonales.lastName}`;
        const code = await sendVerificationEmail(fullName, session.email);
        setSentCode(code);
        setCodeSent(true);
        setVerificationSuccess('Código enviado con éxito a tu correo registrado.');
        setVerificationError('');
      } catch (err) {
        console.error('sendCode error', err);
        setVerificationError('Error enviando código');
      }
    };

    const verifyCode = () => {
      if (verificationCode && verificationCode === sentCode) {
        setCodeVerified(true);
        setVerificationSuccess('Código verificado correctamente.');
        setVerificationError('');
        toast.success('Código verificado', { duration: 1000 });
        // la clase del input se actualizará inmediatamente gracias a codeVerified
      } else {
        setCodeVerified(false);
        setVerificationError('Código inválido. Por favor, inténtalo de nuevo.');
        setVerificationSuccess('');
        toast.error('Código inválido', { duration: 1000 });
      }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!session?.id) return toast.error('Sesión no encontrada', { duration: 1000 });
      if (!codeVerified) return toast.error('Debes verificar el código primero', { duration: 1000 });
      if (!newPassword || newPassword !== confirmPassword) return toast.error('Contraseñas no coinciden', { duration: 1000 });
      setChanging(true);
      try {
        const token = getToken();
        const res = await fetch(`${api.baseUrl}/users/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify({ id: session.id, pass: newPassword }),
        });
        if (!res.ok) throw new Error((await res.text()) || '');
        toast.success('Contraseña actualizada', { duration: 1000 });
        setNewPassword('');
        setConfirmPassword('');
        setCodeVerified(false);
        setCodeSent(false);
        setVerificationCode('');
      } catch (err) {
        console.error('Seguridad:password', err);
        toast.error('Error cambiando contraseña', { duration: 1000 });
      } finally {
        setChanging(false);
      }
    };

    return (
        <main className="flex-1 z-9999">
            <div className="max-w-4xl mx-auto py-2 px-2">
                <div className="space-y-8">
                    <Card className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                        <CardHeader className="text-center px-6 py-1 border-b border-slate-200 dark:border-zinc-800">
                            <div>
                                <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Cambiar Contraseña</h1>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-2">
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-end gap-3 flex-wrap md:flex-nowrap">
                                        <div className="flex-1 min-w-[240px] space-y-2">
                                            <Label className="text-sm font-medium text-slate-700 dark:text-zinc-300" htmlFor="verificationCode">Código de Verificación</Label>
                                            <Input
                                            className={`w-full bg-slate-50 dark:bg-zinc-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none ${
                                                codeVerified
                                                    ? 'border-emerald-500 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400'
                                                    : 'border-red-500 dark:border-red-900/80 text-red-600 dark:text-red-400'
                                            }`}
                                            id="verificationCode"
                                            placeholder="Ingresa el código"
                                            type="text"
                                            value={verificationCode}
                                            disabled={!codeSent}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                        />
                                        </div>
                                        <Button onClick={sendCode} className="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-zinc-100 text-sm font-medium rounded-lg border border-slate-200 dark:border-zinc-700 transition-all flex items-center gap-2" type="button">
                                            Enviar Código
                                        </Button>
                                        <Button
                                            onClick={verifyCode}
                                            className="px-5 py-2.5 bg-blue-500 text-white border border-blue-600 shadow-sm hover:bg-blue-600 text-sm font-medium rounded-lg transition-all active:scale-95"
                                            id="verifyButton"
                                            type="button"
                                            disabled={!codeSent || !verificationCode}
                                        >
                                            Verificar Código
                                        </Button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {verificationError ? (
                                          <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-xs w-fit">
                                            <span className="material-symbols-outlined text-[16px]">error</span>
                                            <span>{verificationError}</span>
                                          </div>
                                        ) : null}
                                        {verificationSuccess ? (
                                          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400 text-xs w-fit">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                            <span>{verificationSuccess}</span>
                                          </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="h-px bg-slate-200 dark:bg-zinc-800 my-2">
                                <div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-zinc-300" htmlFor="newPassword">Nueva Contraseña</Label>
                                        <Input
                                            className="w-full bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-lg px-2 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            disabled={!codeVerified}
                                            id="newPassword"
                                            placeholder="••••••••••••"
                                            type={showPasswords ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e)=>setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-sm font-medium text-slate-700 dark:text-zinc-300" htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                                        <Input
                                            className={`w-full bg-slate-50 dark:bg-zinc-950 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${
                                                confirmPassword && newPassword !== confirmPassword
                                                    ? 'border-red-500 dark:border-red-700 text-red-600 dark:text-red-400'
                                                    : 'border-slate-200 dark:border-zinc-800'
                                            }`}
                                            disabled={!codeVerified}
                                            id="confirmPassword"
                                            placeholder="••••••••••••"
                                            type={showPasswords ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e)=>setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <div className="flex items-center gap-2">
                                    <input
                                        id="showPasswords"
                                        type="checkbox"
                                        checked={showPasswords}
                                        onChange={(e) => setShowPasswords(e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        disabled={!codeVerified}
                                    />
                                    <Label htmlFor="showPasswords" className="text-sm text-slate-700 dark:text-zinc-300">Mostrar contraseñas</Label>
                                    </div>
                                    <Button onClick={handlePasswordSubmit} className="px-2 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98]" disabled={changing || !codeVerified || !newPassword || newPassword !== confirmPassword} type="submit">
                                       {changing ? 'Actualizando...' : 'Actualizar Contraseña'}
                                    </Button>
                                </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}

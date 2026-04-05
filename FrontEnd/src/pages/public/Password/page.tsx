import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ChangePasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [step, setStep] = useState<"email" | "code" | "reset">("email");
    const [verificationCode, setVerificationCode] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changing, setChanging] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const rol = "guest";

    useEffect(() => {
        if (!errorMessage) return;
        const timer = setTimeout(() => setErrorMessage(""), 2000);
        return () => clearTimeout(timer);
    }, [errorMessage]);

    useEffect(() => {
        if (!statusMessage) return;
        const timer = setTimeout(() => setStatusMessage(""), 2500);
        return () => clearTimeout(timer);
    }, [statusMessage]);

    const sendCode = async () => {
        if (!email) {
            setErrorMessage("Ingrese su correo para solicitar el código");
            return;
        }

        try {
            const resp = await fetch(`${api.baseUrl}/auth/request-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, rol }),
            });

            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err?.error || "Error enviando código");
            }

            setStatusMessage("Código enviado correctamente. Revisa tu correo.");
            setStep("code");
        } catch (error) {
            console.error("forgot pass sendCode error", error);
            setErrorMessage((error as Error).message || "Error enviando código");
        }
    };

    const verifyCode = async () => {
        if (!email || !verificationCode) {
            setErrorMessage("Email y código son necesarios");
            return;
        }

        try {
            const resp = await fetch(`${api.baseUrl}/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, rol, code: verificationCode }),
            });

            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err?.error || "Código inválido");
            }

            setStatusMessage("Código verificado correctamente. Ahora puedes cambiar tu contraseña.");
            setStep("reset");
        } catch (error) {
            console.error("verifyCode error", error);
            setErrorMessage((error as Error).message || "Código inválido");
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step !== "reset") {
            setErrorMessage("Debes verificar el código antes de cambiar la contraseña");
            return;
        }

        if (!newPassword || newPassword !== confirmPassword) {
            setErrorMessage("Las contraseñas deben ser iguales");
            return;
        }

        setChanging(true);

        try {
            const resp = await fetch(`${api.baseUrl}/auth/definePass`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: verificationCode, password: newPassword }),
            });

            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err?.error || "No fue posible actualizar la contraseña");
            }

            setStatusMessage("Contraseña actualizada con éxito. Ingresa al sistema ahora.");
            setNewPassword("");
            setConfirmPassword("");
            setStep("email");
            setVerificationCode("");
            setEmail("");
        } catch (error) {
            console.error("resetPassword error", error);
            setErrorMessage((error as Error).message || "No fue posible actualizar la contraseña");
        } finally {
            setChanging(false);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-10 px-8">
                <div className="mb-10">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recuperar contraseña</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Sigue el flujo: enviar correo → verificar código → actualizar contraseña.</p>
                </div>

                <div className="space-y-6">
                    <Card className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        <CardContent className="p-6 space-y-4">

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                                <div className="md:col-span-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-zinc-300">Email</Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@institucion.edu" className="mt-1" disabled={step !== 'email'} />
                                </div>
                                <Button onClick={sendCode} className="h-12" type="button" disabled={!email || step !== 'email'}>
                                    Enviar código
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                                <div className="md:col-span-2">
                                    <Label htmlFor="verificationCode" className="text-sm font-medium text-slate-700 dark:text-zinc-300">Código de verificación</Label>
                                    <Input id="verificationCode" type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="000000" className="mt-1" disabled={step !== 'code'} />
                                </div>
                                <Button onClick={verifyCode} className="h-12" type="button" disabled={step !== 'code' || !verificationCode}>
                                    Validar código
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="newPassword" className="text-sm font-medium text-slate-700 dark:text-zinc-300">Nueva contraseña</Label>
                                    <Input id="newPassword" type={showPasswords ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="mt-1" disabled={step !== 'reset'} />
                                </div>
                                <div>
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 dark:text-zinc-300">Confirmar contraseña</Label>
                                    <Input id="confirmPassword" type={showPasswords ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="mt-1" disabled={step !== 'reset'} />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input id="showPasswords" type="checkbox" checked={showPasswords} onChange={(e) => setShowPasswords(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" disabled={step !== 'reset'} />
                                <Label htmlFor="showPasswords" className="text-sm text-slate-700 dark:text-zinc-300">Mostrar contraseñas</Label>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button onClick={() => navigate("/login")} variant="secondary" className="h-11 w-40" type="button">
                                    Cancelar
                                </Button>
                                <Button onClick={handlePasswordSubmit} className="h-11 w-40" type="button" disabled={step !== 'reset' || changing || !newPassword || newPassword !== confirmPassword}>
                                    {changing ? 'Guardando...' : 'Guardar cambios'}
                                </Button>
                            </div>

                            {errorMessage ? <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm">{errorMessage}</div> : null}
                            {statusMessage ? <div className="p-3 rounded-md bg-emerald-100 text-emerald-700 text-sm">{statusMessage}</div> : null}
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                        <CardHeader className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-semibold">Paso actual:</h3>
                                <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase px-1.5 py-0.5 rounded font-bold tracking-wider text-zinc-500">
                                    {step === 'email' ? 'Email' : step === 'code' ? 'Verificar código' : 'Cambiar contraseña'}
                                </Badge>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </main>
    );
}

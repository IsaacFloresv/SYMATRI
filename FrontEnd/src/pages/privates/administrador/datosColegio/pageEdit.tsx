"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useConfig } from "@/hooks/useConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { updateConfigs } from "@/services/configServices";
import type { ConfigItem } from "@/services/configServices";
import { toast } from "sonner";

export default function EditDatosColegio() {
    const navigate = useNavigate();
    const handleCancel = () => navigate("/admin/datos-colegio");

    const { data, isLoading } = useConfig();
    const queryClient = useQueryClient();

    // form state, initialized once config is available
    const [form, setForm] = React.useState({
        school_name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        logo_url: "",
    });
    const [original, setOriginal] = React.useState<ConfigItem[]>([]);

    React.useEffect(() => {
        if (data) {
            // TypeScript may still consider `data` possibly undefined outside the guard,
            // so assert non-null here to satisfy the state setter's expected type.
            setOriginal(data as ConfigItem[]);
            const arr = data as ConfigItem[];
            const map = arr.reduce<Record<string, string>>((acc, cur) => {
                acc[cur.clave] = cur.valor;
                return acc;
            }, {});
            setForm({
                school_name: map.school_name || "",
                address: map.address || "",
                phone: map.phone || "",
                email: map.email || "",
                website: map.website || "",
                logo_url: map.logo_url || "",
            });
        }
    }, [data]);

    const mutation: UseMutationResult<any, Error, ConfigItem[], unknown> =
      useMutation<any, Error, ConfigItem[], unknown>({
        mutationFn: (configs) => updateConfigs(configs),
        onSuccess: () => {
            toast.success("Configuración guardada");
            queryClient.invalidateQueries({ queryKey: ["config"] });
            navigate("/admin/datos-colegio");
        },
        onError: (err: any) => {
            toast.error(`Error al guardar: ${err.message || err}`);
        },
    });
    // helper aliases
    const mutate = mutation.mutate;
    // react-query mutation status uses 'pending' rather than 'loading'
    const mutationLoading = mutation.status === "pending";

    const validate = () => {
        if (!form.school_name.trim()) {
            toast.error("El nombre del colegio es obligatorio");
            return false;
        }
        if (form.email && !form.email.includes("@")) {
            toast.error("Email inválido");
            return false;
        }
        if (form.website && !/^https?:\/\//.test(form.website)) {
            toast.error("La URL del sitio web debe comenzar con http:// o https://");
            return false;
        }
        // phone: allow digits, spaces, parentheses, +, -
        if (form.phone && !/^[0-9\s()+-]+$/.test(form.phone)) {
            toast.error("Teléfono inválido");
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        if (original.length === 0) {
          toast.error("No hay datos disponibles para guardar.");
          return;
        }
        const payloadItems = original.map((it) => {
            const key = it.clave as keyof typeof form;
            if (key in form) {
                return { ...it, valor: form[key] };
            }
            // leave other configuration entries untouched
            return it;
        });
        mutate(payloadItems as any);
    };

    if (isLoading) {
        return <main className="flex-1 p-6 lg:p-10">Cargando...</main>;
    }

    return (
        <main className="flex-1 p-6 lg:p-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Editar Información del Colegio</h1>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">Actualiza los detalles generales y la información de contacto de la institución.</p>
                </div>
                <Card className="bg-white dark:bg-[#1C2A38] p-6 sm:p-8 rounded-xl shadow-sm">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold leading-7 text-slate-900 dark:text-white">Información Básica</h2>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300" htmlFor="school-name">Nombre del Colegio</label>
                                <div className="mt-2">
                                    <Input
                                        className="block w-full rounded-md border-0 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        id="school-name"
                                        name="school-name"
                                        type="text"
                                        value={form.school_name}
                                        onChange={(e) => setForm({ ...form, school_name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300" htmlFor="school-address">Dirección</label>
                                <div className="mt-2">
                                    <Input
                                        className="block w-full rounded-md border-0 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        id="school-address"
                                        name="school-address"
                                        type="text"
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300" htmlFor="school-logo">Logo del Colegio</label>
                                <div className="mt-2 flex items-center gap-x-4">
                                    <div
                                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-16"
                                        data-alt="Logo actual del colegio"
                                        style={{
                                            backgroundImage: form.logo_url
                                                ? `url("${form.logo_url}")`
                                                : undefined,
                                        }}
                                    ></div>
                                    <div className="flex items-center gap-2">
                                        <label className="cursor-pointer rounded-md bg-white dark:bg-slate-700 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600" htmlFor="logo-upload">
                                            <span>Cambiar Logo</span>
                                            <input className="sr-only" id="logo-upload" name="logo-upload" type="file" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-slate-200 dark:border-slate-700"></div>
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold leading-7 text-slate-900 dark:text-white">Información de Contacto</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300" htmlFor="school-phone">Teléfono Principal</label>
                                    <div className="mt-2">
                                        <Input
                                            className="block w-full rounded-md border-0 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            id="school-phone"
                                            name="school-phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300" htmlFor="school-email">Email de Contacto</label>
                                    <div className="mt-2">
                                        <Input
                                            className="block w-full rounded-md border-0 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            id="school-email"
                                            name="school-email"
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300" htmlFor="school-website">Sitio Web</label>
                                <div className="mt-2">
                                    <Input
                                        className="block w-full rounded-md border-0 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        id="school-website"
                                        name="school-website"
                                        type="url"
                                        value={form.website}
                                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <Button className="w-50" variant="outline" type="button" onClick={handleCancel}>Cancelar</Button>
                            <Button
                                className="w-50 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                type="submit"
                                disabled={mutationLoading || isLoading || original.length === 0}
                            >
                                {mutationLoading ? "Guardando..." : "Guardar Cambios"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </main >
    );
}

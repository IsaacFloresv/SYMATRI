"use client"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/authServices";

type RegisterFormData = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [apiStatus, setApiStatus] = useState<string>("Verificando API...");

  const form = useForm<RegisterFormData>({
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (values: RegisterFormData) => {
      if (values.password !== values.confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }
      const payload = {
        userName: values.userName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        password: values.password,
        rol: "guest",
      };

      return await registerUser(payload);
    },
    onSuccess: () => {
      setStatusMessage("Registro exitoso. Redirigiendo a iniciar sesión...");
      setTimeout(() => navigate("/login"), 1200);
    },
    onError: (err) => {
      setStatusMessage((err as Error).message ?? "Error en el registro");
    },
  });

  useEffect(() => {
    async function checkApi() {
      try {
        const response = await fetch(`${api.baseUrl}/begin`);
        if (!response.ok) throw new Error("API no disponible");
        setApiStatus("Conexión con API correcta");
      } catch (error) {
        setApiStatus("No fue posible conectar con API");
      }
    }
    checkApi();
  }, []);

  const onSubmit = (values: RegisterFormData) => {
    setStatusMessage("Enviando datos...");
    registerMutation.mutate(values);
  };

  return (
    <section className={cn("flex-1 lg:ml-64 bg-surface-dim flex flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden")}>
      <div className="w-full max-w-2xl space-y-10">
        <div className="flex justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight">Crear una cuenta</h1>
        </div>

        <Card className="rounded-xl p-6 md:p-10 shadow-lg border border-outline-variant/20">
          <CardHeader className="text-center">
            <CardTitle>Registro de nuevo usuario</CardTitle>
            <CardDescription>La información se envía directamente a tu backend</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="userName"
                  rules={{ required: "Nombre de usuario requerido", minLength: { value: 3, message: "3 o más caracteres" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="ej. jdoe_academic" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.userName?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{ required: "Email requerido", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="usuario@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: "Contraseña requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{ required: "Confirmar contraseña es requerido" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2 pt-4">
                  <Button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Registrando..." : "Registrarse"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-on-surface-variant tracking-wide uppercase opacity-70">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-primary font-bold underline underline-offset-4"
          >
            Iniciar Sesión
          </button>
        </div>

        {statusMessage && (
          <p className="text-center text-sm mt-3 text-slate-700 dark:text-slate-200">
            {statusMessage}
          </p>
        )}
      </div>
    </section>
  );
}


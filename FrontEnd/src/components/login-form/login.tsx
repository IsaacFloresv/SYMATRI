import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useAuth } from "@/hooks/useAuth"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { form, loginMutation, onSubmit, onError } = useAuth()

  return (
    <div className={cn("total-login flex flex-col gap-6", className)} {...props}>
      <Card className="bg-blur overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit, onError)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bienvenido</h1>
                  <p className="text-muted-foreground text-balance">
                    Ingresa a tu cuenta de MatriCool
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electronico</FormLabel>
                        <FormControl>
                          <Input placeholder="ejemplo@ejemplo.com"{...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password_user"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Constrasena</FormLabel>
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                          >
                            Olvidaste tu contrasena?
                          </a>
                        </div>
                        <FormControl>
                          <Input placeholder="An3t14mm@d"{...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {loginMutation.isPending ? "Cargando..." : "Entrar"}
                </Button>
                <div className="text-center text-sm">
                  No tiene una cuenta?{" "}
                  <a href="#" className="underline underline-offset-4">
                     Registrate
                  </a>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-logoLogin relative hidden md:block">
            <img
              id="logoLogin"
              src=".\src\assets\logo.png"
              alt="Image"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-Terms *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

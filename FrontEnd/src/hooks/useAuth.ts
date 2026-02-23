import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStorage } from "./useAuthStorage";
import { login } from "@/services/authServices";
import { useForm } from "react-hook-form";
import type { loginData } from "@/schemas/authSchema";
import { removeSession } from "@/lib/authStorage";

export const useAuth = () => {
  const navigate = useNavigate();
  const setUser = useAuthStorage((state) => state.setUser);

  const form = useForm<loginData>({
    defaultValues: { name_user: "", password_user: "" },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (fullSession) => {
      // Guardar sesión completa en Zustand
      setUser(fullSession);
      const rawRole = fullSession.role ? String(fullSession.role).toLowerCase() : "guest";

      // Mapear roles a rutas existentes
      const roleToPath = (r: string, modules: number[]) => {
        // soporte users should land on the admin dashboard – they are treated like admins
        // backend description is "soporte" but just in case an english word is used
        const isSupportRole = r.includes("soporte") || r.includes("support");
        // older data stored support/admin in modules 1..10
        const hasSupportModule = modules.some((m) => m >= 1 && m <= 10);
        console.log("Determining redirect path for role:", r, "with modules:", modules);
        if (isSupportRole || hasSupportModule) return "/dashboard/admin";
        if (r.includes("admin")) return "/dashboard/admin";
        if (r === "student" || r === "alumno") return "/dashboard/student";
        if (r === "profesor" || r === "teacher") return "/profesor/dashboard";
        if (r === "asistente") return "/asistente/dashboard";
        if (r === "encargado") return "/encargado/dashboard";
        if (r === "soporte") return "/dashboard/admin";
        // guest u otros -> ruta genérica
        return "/dashboard";
      };

      const redirectPath = roleToPath(rawRole, fullSession.modulos || []);
      // Navegar al dashboard correspondiente
      navigate(redirectPath);
    },
    onError: (err) => console.error(err),
  });

  const onSubmit = (data: loginData) => loginMutation.mutate(data);

  const onLogout = () => {
    // Eliminar la sesión canónica y limpiar estado en memoria
    removeSession();
    setUser(null);

    // Limpiar claves legacy por compatibilidad
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return { form, loginMutation, onSubmit, onLogout };
};
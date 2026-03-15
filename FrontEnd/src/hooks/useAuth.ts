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
      // Normalize role from backend. Some backends return roleId instead of role string.
      const rawRole = (() => {
        if (fullSession.role) return String(fullSession.role).toLowerCase();
        const rid = (fullSession as any).roleId;
        if (typeof rid === "number") {
          switch (rid) {
            case 1:
              return "student";
            case 2:
              return "encargado";
            case 3:
              return "profesor";
            case 4:
              return "admin1";
            case 5:
              return "admin007";
            default:
              return "guest";
          }
        }
        return "guest";
      })();

      // Guardar sesión completa en Zustand (con role normalizado)
      const sessionToStore = { ...fullSession, role: rawRole };
      setUser(sessionToStore);
      // Update api token so authenticated calls include it.
      import("@/lib/api")
        .then(({ api }) => {
          api.token = sessionToStore.token;
        })
        .catch((e) => {
          console.warn("Unable to update api token", e);
        });

      // Mapear roles a rutas existentes
      const roleToPath = (r: string) => {
        if (r === "admin1" || r === "admin007") return "/admin/dashboard";
        if (r === "student") return "/alumno/dashboard";
        if (r === "profesor") return "/profesor/dashboard";
        if (r === "asistente") return "/asistente/dashboard";
        if (r === "encargado") return "/encargado/dashboard";
        // guest u otros -> ruta genérica
        else return "/dashboard";
      };

      const redirectPath = roleToPath(rawRole);
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

    // Clear token from api helper as well
    import("@/lib/api")
      .then(({ api }) => {
        api.token = null;
      })
      .catch((e) => {
        console.warn("Unable to clear api token", e);
      });

    // Limpiar claves legacy por compatibilidad
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return { form, loginMutation, onSubmit, onLogout };
};
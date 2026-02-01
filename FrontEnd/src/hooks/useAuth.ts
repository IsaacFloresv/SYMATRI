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
      let role = fullSession.role.toLowerCase();
      if(role === "admin1") role = "admin";
      if(role === "admin2") role = "admin";
      if(role === "alumno") role = "student";

      // Navegar al dashboard
      navigate(`/dashboard/${role}`);
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
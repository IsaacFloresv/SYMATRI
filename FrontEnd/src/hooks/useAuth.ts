import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStorage } from "./useAuthStorage";
import { login } from "@/services/authServices";
import { useForm } from "react-hook-form";
import type { loginData } from "@/schemas/authSchema";

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

      // Navegar al dashboard
      navigate("/dashboard/admin");
    },
    onError: (err) => console.error(err),
  });

  const onSubmit = (data: loginData) => loginMutation.mutate(data);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return { form, loginMutation, onSubmit, onLogout };
};
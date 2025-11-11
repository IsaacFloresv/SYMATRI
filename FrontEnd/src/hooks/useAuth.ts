import { useForm } from "react-hook-form";
import { loginSchema, type loginData } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { validateLogin } from "../services/authServices";
import { useNavigate } from "react-router";
import { useAuthStorage } from "./useAuthStorage";


export const useAuth = () => {
    const navigate = useNavigate();
    const { setUser } = useAuthStorage();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email_user: "",
            password_user: ""
        }
    })

    const loginMutation = useMutation({
        mutationFn: async (data: loginData) => {
            const response = await validateLogin(data);
            localStorage.setItem("user", response.email);
            navigate("/dashboard/admin");
            setUser(response.email);
            return response;
        },
        onSuccess: (data: loginData) => { console.log("Login exitoso:", data); },
        onError: (error) => { console.error("Error en login:", error); }
    });

    const onSubmit = (data: loginData) => {
        loginMutation.mutate({ email_user: data.email_user, password_user: data.password_user });
    }

    const onError = (errors: unknown) => {
        console.error("Errores en el formulario:", errors);
    }

    const onLogout = () => {
        localStorage.removeItem("user");
        useAuthStorage.getState().setUser(null);
        navigate("/login");
    }

    return { form, loginMutation, onSubmit, onError, onLogout };
}

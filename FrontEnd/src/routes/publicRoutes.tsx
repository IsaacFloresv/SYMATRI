import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
}
import { useAuthStorage } from "@/hooks/useAuthStorage";
export function PublicRoutes({ children }: Props) {
    const session = useAuthStorage((s) => s.user);

    // Si ya hay sesión, redirigir al dashboard (no mostrar rutas públicas como /login)
    if (session) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <>
            {children}
        </>
    )
}
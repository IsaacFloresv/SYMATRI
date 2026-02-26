import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
}
import { useAuthStorage } from "@/hooks/useAuthStorage";
export function PublicRoutes({ children }: Props) {
    const session = useAuthStorage((s) => s.user);

    if (session) {
        let rol = session?.role;
        if(rol === "admin1" || rol === "admin007") rol = "admin";
        return <Navigate to={`/${rol}/dashboard`} replace />;
    }

    return (
        <>
            {children}
        </>
    )
}
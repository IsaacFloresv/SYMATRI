import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
}
export function PublicRoutes({ children }: Props) {
    const sessionRaw = localStorage.getItem("session");
    const session = sessionRaw ? JSON.parse(sessionRaw) : null;

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {children}
        </>
    )
}
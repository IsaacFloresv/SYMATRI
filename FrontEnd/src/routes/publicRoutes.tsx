import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
}
import { useAuthStorage } from "@/hooks/useAuthStorage";
export function PublicRoutes({ children }: Props) {
    const session = useAuthStorage((s) => s.user);

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {children}
        </>
    )
}
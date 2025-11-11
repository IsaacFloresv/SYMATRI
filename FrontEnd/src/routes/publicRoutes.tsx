import { Navigate } from "react-router";
import type { ReactNode } from "react";

type Props = {
    children : ReactNode;
}
export function PublicRoutes({ children }: Props) {
    const user = localStorage.getItem("user");
    
    if (user) {
        return <Navigate to="/dashboard" />;
    }

  return children;
}
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import LayoutMain from "@/pages/privates/layout-main/layout-main";

type Props = {
    children: ReactNode;
}
export function PrivateRoutes({ children }: Props) {
    const sessionRaw = localStorage.getItem("session");
    const session = sessionRaw ? JSON.parse(sessionRaw) : null;

    if (!session) {
        return <Navigate to="/login" />;
    }

    return (
        <LayoutMain>
            {children}
        </LayoutMain>
    )
}

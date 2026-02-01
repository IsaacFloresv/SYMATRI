import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import LayoutMain from "@/pages/privates/layout-main/layout-main";

type Props = {
    children: ReactNode;
}
import { useAuthStorage } from "@/hooks/useAuthStorage";
export function PrivateRoutes({ children }: Props) {
    const session = useAuthStorage((s) => s.user);

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return (
        <LayoutMain>
            {children}
        </LayoutMain>
    )
}

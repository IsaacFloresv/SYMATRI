import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

import LayoutMain from "@/pages/privates/layout-main/layout-main";

import { useAuthStorage } from "@/hooks/useAuthStorage";
import { isPathAllowed } from "@/lib/routeAccess";

type Props = {
    children: ReactNode;
}
export function PrivateRoutes({ children }: Props) {
    const session = useAuthStorage((s) => s.user);
    const location = useLocation();

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    // Validar permiso para la ruta actual
    const ids = session?.modulos || [];
    const allowed = isPathAllowed(location.pathname, ids);
    // debug unexpected denials
    if (!allowed) {
        console.log("PrivateRoutes denial", {
          pathname: location.pathname,
          role: session?.role,
          modules: ids,
        });
        // show 403 modal and redirigir al dashboard si no tiene acceso a this route
        useAuthStorage.getState().showForbidden();
        return <Navigate to="/admin/dashboard" replace />;
    }

    return (
        <LayoutMain>
            {children}
        </LayoutMain>
    )
}

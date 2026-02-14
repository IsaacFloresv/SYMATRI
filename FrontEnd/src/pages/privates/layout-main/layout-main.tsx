import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/layout-main/app-sidebar"
import { SiteHeader } from "@/components/layout-main/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import type { ReactNode } from "react";

import { getStoredTheme, type Theme } from "@/lib/theme"

type Props = {
  children: ReactNode;
}

import { useAuthStorage } from "@/hooks/useAuthStorage";
import ForbiddenModal from "@/components/forbidden/ForbiddenModal";

// user panels (render inside layout without changing route)
import PerfilPage from "@/pages/privates/usuario/perfil/page"
import SeguridadPage from "@/pages/privates/usuario/seguridad/page"
import NotificacionesPage from "@/pages/privates/usuario/notificaciones/page"
import { useUiStore } from "@/hooks/useUiStore"
import { useLocation } from "react-router-dom";

export default function LayoutMain({ children }: Props) {
  const session = useAuthStorage((s) => s.user);

  if (!session) {
    return null; // o un loader
  }

  const { role } = session;
  const [theme, setTheme] = useState<Theme>(() => (typeof window !== "undefined" ? (getStoredTheme() as Theme) || "system" : "system"))

  const activeUserPage = useUiStore((s) => s.activeUserPage)
  const setActiveUserPage = useUiStore((s) => s.setActiveUserPage)
  const location = useLocation()

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "app.theme") setTheme((e.newValue as Theme) || "system")
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  // clear in-layout user panels when the route changes
  useEffect(() => {
    if (activeUserPage) setActiveUserPage(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} ${theme === 'dim' ? 'dim' : ''}`}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" role={role} />
        <SidebarInset>
          <SiteHeader role={role} />
          {activeUserPage ? (
            activeUserPage === 'perfil' ? (
              <PerfilPage />
            ) : activeUserPage === 'seguridad' ? (
              <SeguridadPage />
            ) : (
              <NotificacionesPage />
            )
          ) : (
            children
          )}
        </SidebarInset>
      </SidebarProvider>

      {/* global forbidden modal for 403 redirects */}
      <ForbiddenModal />
    </div>
  )

}
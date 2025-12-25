"use client";

import * as React from "react";
import { NavMain } from "@/components/layout-main/nav-main";
import { NavUser } from "@/components/layout-main/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { moduleMap } from "@/config/moduleMaps";
import type { ModuleConfig } from "@/config/moduleMaps";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Obtener la sesión
  const sessionRaw = localStorage.getItem("session");
  const session = sessionRaw ? JSON.parse(sessionRaw) : null;

  // Validar sesión y módulos
  const modulos = Array.isArray(session?.modulos) ? session.modulos : [];
  const datos = session?.datosPersonales;

  if (!session || !datos) return null;

  // Construir menú dinámico
  const navMain = modulos
    .map((id: number) => moduleMap[id])
    .filter(Boolean)
    .map((m: ModuleConfig) => ({
      title: m.label,
      url: m.path,
      icon: m.icon,
    }));

  // Datos del usuario para el footer
  const userData = {
    name: `${datos.firstName} ${datos.lastName}`,
    email: datos.email || "sin-email",
    avatar: "/avatar.png", // puedes personalizar esto luego
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div>
                <span className="text-xl font-semibold">MatriCool</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}

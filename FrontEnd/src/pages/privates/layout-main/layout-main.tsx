import { AppSidebar } from "@/components/layout-main/app-sidebar"
import { SiteHeader } from "@/components/layout-main/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export default function LayoutMain({ children }: Props) {
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
      <AppSidebar variant="inset" />
      <SidebarInset>
      <SiteHeader />
      {children}
      </SidebarInset>
       </SidebarProvider>
    </>
    )

}
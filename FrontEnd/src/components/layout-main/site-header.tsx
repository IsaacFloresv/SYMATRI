//import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Monitor, Circle, ArrowLeft } from "lucide-react"
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme"
import { useUiStore } from "@/hooks/useUiStore"

type Props = {
  datosPersonales?: {
    firstName?: string;
    lastName?: string;
    name_user?: string;
    email?: string;
  } | null;
  role?: string | null;
};

const THEMES: { id: Theme; label: string; icon: any }[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "dim", label: "Dim", icon: Circle },
  { id: "system", label: "System", icon: Monitor },
]

export function SiteHeader({ role }: Props) {
  let roleLabel = "guest"
  if (role === "admin1") {
    roleLabel = "Administrador"
  } else if (role === "admin007") {
    roleLabel = "Soporte"
  } else {
    roleLabel = role ? String(role) : "guest"
  }
  const [theme, setTheme] = useState<Theme>(() => (getStoredTheme() as Theme) || "system")
  const activeUserPage = useUiStore((s) => s.activeUserPage)

  useEffect(() => {
    // keep local state in sync with persisted value (other tabs)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "app.theme") setTheme((e.newValue as Theme) || "system")
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  function onSelect(t: Theme) {
    applyTheme(t)
    setTheme(t)
  }

  const { state, isMobile } = useSidebar()
  const sidebarOpen = !isMobile && state === "expanded"

  const CurrentIcon = THEMES.find((x) => x.id === theme)?.icon || Sun

  const headerZClass = isMobile ? "z-40" : "z-60"

  return (
    <header
      className={cn(
        "uppercase fixed top-0 h-[var(--header-height)] flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-x-hidden transition-all",
        headerZClass,
        // always full width on mobile, resize on desktop when sidebar open
        isMobile ? "left-0 w-full" : "left-0 w-full",
        sidebarOpen && "md:left-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))]"
      )}
    >
  <div
    className="
      flex items-center justify-between
      w-full
      flex-shrink
      px-4 md:px-6
      gap-2 md:gap-4
      overflow-hidden
    "
  >
    <SidebarTrigger className="-ml-1" />

    <Separator
      orientation="vertical"
      className="mx-2 data-[orientation=vertical]:h-4"
    />

    {activeUserPage ? (
      <div className="flex items-center gap-2 flex-shrink min-w-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 p-0"
          onClick={() => useUiStore.getState().clearActiveUserPage()}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="font-medium truncate">
          {activeUserPage === "perfil"
            ? "Mi Perfil"
            : activeUserPage === "seguridad"
            ? "Seguridad"
            : "Notificaciones"}
        </h1>
      </div>
    ) : (
      <h1 className="font-medium truncate">Dashboard</h1>
    )}

    <div className="ml-auto flex items-center gap-2 flex-shrink-0">
      <div className="text-sm text-muted-foreground text-right">
        <div className="text-base font-semibold truncate">{roleLabel}</div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 p-0 text-foreground"
          >
            <CurrentIcon className="size-4" />
            <span className="sr-only">Cambiar tema</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          {THEMES.map((t) => {
            const Icon = t.icon
            return (
              <DropdownMenuItem key={t.id} onClick={() => onSelect(t.id)}>
                <Icon className="size-4 mr-2" />
                <span className="flex-1">{t.label}</span>
                {theme === t.id ? (
                  <span className="text-primary">✓</span>
                ) : null}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</header>
  )
}

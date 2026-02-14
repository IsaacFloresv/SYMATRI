//import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
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
  const roleLabel = role ? String(role) : "guest"
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

  const CurrentIcon = THEMES.find((x) => x.id === theme)?.icon || Sun

  return (
    <header className="uppercase sticky top-0 z-50 flex h-(--header-height) text-xl text-foreground shrink-0 items-center gap-2 border-b transition-width ease-linear bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {activeUserPage ? (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 p-0" onClick={() => useUiStore.getState().clearActiveUserPage()}>
              <ArrowLeft className="size-4" />
            </Button>
            <h1 className="font-medium">{activeUserPage === 'perfil' ? 'Mi Perfil' : activeUserPage === 'seguridad' ? 'Seguridad' : 'Notificaciones'}</h1>
          </div>
        ) : (
          <h1 className="font-medium">Dashboard</h1>
        )}
        <div className="ml-auto flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            <div className="text-base font-semibold">{roleLabel}</div>
          </div>

          {/* Theme switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 p-0 text-foreground">
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
                    {theme === t.id ? <span className="text-primary">✓</span> : null}
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

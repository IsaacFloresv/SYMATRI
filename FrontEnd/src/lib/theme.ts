export type Theme = "light" | "dark" | "dim" | "system"

const STORAGE_KEY = "app.theme"

function prefersDark() {
  return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return

  const html = document.documentElement
  const body = document.body
  const rootEl = document.getElementById("root")

  const applyDark = (v: boolean) => {
    if (v) {
      html.classList.add("dark")
      body.classList.add("dark")
      rootEl?.classList.add("dark")
    } else {
      html.classList.remove("dark")
      body.classList.remove("dark")
      rootEl?.classList.remove("dark")
    }
  }

  const applyDim = (v: boolean) => {
    if (v) {
      html.classList.add("dim")
      body.classList.add("dim")
      rootEl?.classList.add("dim")
    } else {
      html.classList.remove("dim")
      body.classList.remove("dim")
      rootEl?.classList.remove("dim")
    }
  }

  switch (theme) {
    case "light":
      applyDark(false)
      applyDim(false)
      break
    case "dark":
      applyDark(true)
      applyDim(false)
      break
    case "dim":
      applyDark(true)
      applyDim(true)
      break
    case "system":
      applyDark(prefersDark())
      applyDim(false)
      break
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch (e) {
    // ignore
  }
} 

export function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (!v) return null
    if (v === "light" || v === "dark" || v === "dim" || v === "system") return v
  } catch (e) {
    /* ignore */
  }
  return null
}

export function initTheme() {
  // apply stored theme or system preference
  const stored = getStoredTheme()
  if (stored) {
    applyTheme(stored)
    return
  }

  // default: system
  applyTheme("system")
}

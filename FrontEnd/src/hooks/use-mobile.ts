import * as React from "react"

export function useIsMobile(mobileBreakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // En SSR no hay window
    if (typeof window === "undefined") return false;
    return window.innerWidth < mobileBreakpoint;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Compatibilidad: algunos navegadores antiguos usan addListener
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      // asegurar valor inicial
      setIsMobile(window.innerWidth < mobileBreakpoint);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // @ts-ignore - legacy API
      mql.addListener(onChange);
      setIsMobile(window.innerWidth < mobileBreakpoint);
      return () => {
        // @ts-ignore - legacy API
        mql.removeListener(onChange);
      };
    }
  }, [mobileBreakpoint]);

  return isMobile;
}
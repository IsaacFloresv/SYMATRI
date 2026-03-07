import { useQuery } from "@tanstack/react-query";
import type { RawSeccion } from "@/services/seccionServices";
import { fetchSecciones } from "@/services/seccionServices";

export function useSecciones() {
  return useQuery<RawSeccion[], Error>({
    queryKey: ["secciones"],
    queryFn: fetchSecciones,
    staleTime: 1000 * 60 * 5,
  });
}
import { useQuery } from "@tanstack/react-query";
import type { ErrorItem } from "@/services/errorServices";
import { fetchErrors } from "@/services/errorServices";

export function useErrors() {
  return useQuery<ErrorItem[], Error>({
    queryKey: ["errores"],
    queryFn: fetchErrors,
    staleTime: 1000 * 60 * 5,
  });
}

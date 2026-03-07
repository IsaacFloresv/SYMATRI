import { useQuery } from "@tanstack/react-query";
import type { LogPage } from "@/services/logServices";
import { fetchLogs } from "@/services/logServices";

import type { UseQueryResult } from "@tanstack/react-query";

export function useLogs(options?: { page?: number; pageSize?: number; q?: string; table?: string; status?: string }): UseQueryResult<LogPage, Error> {
  return useQuery<LogPage, Error>({
    queryKey: ["logs", options],
    queryFn: () => fetchLogs(options),
    staleTime: 1000 * 60 * 2,
  });
}
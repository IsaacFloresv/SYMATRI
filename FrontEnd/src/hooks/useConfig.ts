import { useQuery } from "@tanstack/react-query";
import type { ConfigItem } from "@/services/configServices";
import { fetchConfigs } from "@/services/configServices";

export function useConfig() {
  // react-query v5 uses object argument signature
  return useQuery<ConfigItem[], Error>({
    queryKey: ["config"],
    queryFn: fetchConfigs,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}

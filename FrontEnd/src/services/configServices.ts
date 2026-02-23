// configServices.ts
export type ConfigItem = {
  id: number;
  clave: string;
  valor: string;
  tipo: "INTEGER" | "STRING" | "BOOLEAN";
};

const BASE = "http://localhost:4321/api/v1";

export async function fetchConfigs(): Promise<ConfigItem[]> {
  const res = await fetch(`${BASE}/config/all`);
  if (!res.ok) {
    throw new Error("Error fetching configuration");
  }
  return res.json();
}

export async function updateConfig(item: ConfigItem): Promise<any> {
  const res = await fetch(`${BASE}/config/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(text || "Error updating configuration");
  }
  return res.json();
}

export async function updateConfigs(items: ConfigItem[]): Promise<any[]> {
  // perform all updates in parallel rather than sequential await-in-loop
  return Promise.all(items.map(updateConfig));
}

/**
 * Helper to build a simple key/value object from the array response.
 */
export function configsToMap(items: ConfigItem[] = []) {
  return items.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.clave] = cur.valor;
    return acc;
  }, {});
}

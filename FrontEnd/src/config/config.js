import { api } from "@/lib/api";

// Validador genérico
export function required(name) {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`❌ Falta la variable de entorno: ${name}`);
  }
  return value;
}

export const config = {
  // Variables obligatorias para el servicio de API
  token: required("VITE_API_TOKEN"),
  apiKeyHash: required("VITE_APIKEYHASH_APP"),

  // URL del servicio de email según entorno
  servicemail:
    import.meta.env.VITE_ENVIRONMENT === "development"
      ? required("VITE_DEV_SERVICEMAIL_URL")
      : required("VITE_PROD_SERVICEMAIL_URL"),
};
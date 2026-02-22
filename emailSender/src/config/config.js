process.loadEnvFile();

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Falta la variable de entorno: ${name}`);
  }
  return value;
}

export const config = {
  serviceEmail: required("SERVICE_EMAIL"),
  appPort: Number(required("APP_PORT")),
  apiKeyHash: required("APIKEYHASH_APP"),
  userEmail: required("USEREMAIL_APP"),
  userPass: required("USERPASS_APP"),
  emailHost: required("EMAILHOST_APP"),
  emailPort: Number(required("EMAILPORT_APP")),
  emailPorts: Number(required("EMAILPORTS_APP")),
  frontendUrl: required("FRONTEND_URL"),
  genericUrl: required("GENERIC_URL"),
  serviceUrl: process.env.NODE_ENV === "development" ? required("DEV_SERVICE_URL") : required("PROD_SERVICE_URL"),
};

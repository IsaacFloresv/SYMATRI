import { config } from "#config/config.js";

export function corsMiddleware(req, res, next) {
  const allowedOrigin = config.genericUrl;

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Manejo del preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
}
import bcrypt from "bcrypt";
import { config } from "#config/config.js";

export async function apiKeyMiddleware(req, res, next) {
  try {
    console.log("headers", req.headers);
    console.log("config.apikeyHash", config.apiKeyHash);
    const clientKey = req.headers["x-api-key"];

    if (!clientKey) {
      return res.status(401).json({ error: "API key missing" });
    }

    const isValid = await config.apiKeyHash === clientKey ? true : false;
    
    //bcrypt.compare(clientKey, config.apiKeyHash);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    next();
  } catch (error) {
    console.error("API Key validation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
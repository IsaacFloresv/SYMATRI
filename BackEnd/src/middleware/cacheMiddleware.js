const { client } = require("../config/redisClient");

function cacheMiddleware() {
  const ttl = 60; // tiempo de vida en segundos
  return async (req, res, next) => {
    try {
      const key = `cache:${req.originalUrl}`;
      const cached = await client.get(key);

      if (cached) {
        console.log("Respuesta desde cache");
        return res.json(JSON.parse(cached));
      }

      const originalJson = res.json.bind(res);
      res.json = (data) => {
        client.setEx(key, ttl, JSON.stringify(data));
        return originalJson(data);
      };

      next();
    } catch (err) {
      console.error("Error en cache middleware:", err);
      next();
    }
  };
}

module.exports = cacheMiddleware;
//const { createClient } = require("redis");

const client = /* createClient({
  socket: {
    host: "127.0.0.1", // 👈 fuerza IPv4
    port: 6379
  }
}); 

client.on("error", (err) => console.error("Redis error:", err));*/

async function connectRedis() {
  /* if (!client.isOpen) {
    await client.connect();
  } */
}

module.exports = { client, connectRedis };
require('module-alias/register');
const express = require("express")
const cors = require("cors"); 
const config = require("@config/config")
const router = require("@routes/index")

const app = express()

// habilitar CORS para todas las rutas
app.use(cors());


//rate limit
const rateLimit = require("express-rate-limit");

// Configuración del limitador
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // ventana de 1 minuto
  max: 50,                // máximo 100 requests por IP en ese minuto
  message: "Demasiadas solicitudes desde esta IP, inténtalo más tarde."
});

// Aplicar a todas las rutas
app.use(limiter);

//Redis conectar una vez al iniciar antes de levantar el server
/* const { connectRedis } = require("./src/config/redisClient");
(async () => {
  await connectRedis();
})(); */



//Setting
const PORT = config.aport


//Rutas
app.use(`/api/v1`, router)

app.listen(PORT, function(){
    console.log(`La app esta escuchando por http://localhost/api/v1:${PORT}`)
    console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
})
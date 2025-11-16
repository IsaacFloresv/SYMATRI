require('module-alias/register');
const express = require("express")
const config = require("@config/config")
const router = require("@routes/index")

const app = express()


//Setting
const PORT = config.aport


//Rutas
app.use(`/`, router)

app.listen(PORT, function(){
    console.log(`La app esta escuchando por http://localhost:${PORT}`)
    console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
})
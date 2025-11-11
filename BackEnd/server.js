const express = require("express")
const config = require("./src/config/config")
const { sequelize } = require("./src/database/models/index")
const userRouter = require("./src/routes/usersRoutes")
const dataUserRouter = require("./src/routes/dataUsersRoutes")
const seccionProfesorRouter = require("./src/routes/seccionProfesorRoutes")
const loginRouter = require("./src/routes/loginRoutes")

//asegurador de rutas, verificador de token
const verificarToken = require("../middleware/verificarToken");


//swagger implementacion
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yamljs');
const swaggerFile = fs.readFileSync('./swagger/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(swaggerFile);

const app = express()


//Setting
const PORT = config.aport

//Middleware
//Para poder rellenar el req.body
app.use(express.json())
app.use(express.urlencoded({ extended:false}))

// Middleware de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Rutas
app.get("/", (req, res) => res.json({ foo: "bar" }));
app.use(`/users`, verificarToken, userRouter)
app.use(`/login`, loginRouter)
app.use(`/dataUsers`, verificarToken, dataUserRouter)
app.use(`/seccionProfesor`, verificarToken, seccionProfesorRouter)

app.listen(PORT, function(){
    console.log(`La app esta escuchando por http://localhost:${PORT}`)
    console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
})
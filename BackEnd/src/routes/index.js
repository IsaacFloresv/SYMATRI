require('module-alias/register');
const express = require("express")
const router = express.Router();

const actividadesRoutes = require("./actividadesRoutes")
const configRoutes = require("./configRoutes")
const dataUserRouter = require("./dataUsersRoutes")
const encargadoAlumnosRoutes = require("./encargadoAlumnosRoutes")
const horariosRoutes = require("./horariosRoutes")
const loginRouter = require("./loginRoutes")
const materiasProfesoresRoutes = require("./materiasProfesoresRoutes")
const materiasRoutes = require("./materiasRoutes")
const mensajesRoutes = require("./mensajesRoutes")
const mensajeReceptorRoutes = require("./mensajeReceptorRoutes")
const notasRoutes = require("./notasRoutes")
const rolesRoutes = require("./rolesRoutes")
const seccionAlumnosRoutes = require("./seccionAlumnosRoutes")
const seccionesRoutes = require("./seccionesRoutes")
const seccionProfesorRouter = require("./seccionProfesorRoutes")
const userRouter = require("./usersRoutes")

//asegurador de rutas, verificador de token
const { verifyToken, authorizeRole } = require("@middlewares/auth");


//swagger implementacion
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yamljs');
const swaggerFile = fs.readFileSync(require.resolve('@swagger/swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(swaggerFile);


//Middleware
//Para poder rellenar el req.body
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

// Middleware de documentación Swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Rutas
router.get("/", (req, res) => res.json({ foo: "bar" }));





router.use(`/actividades`, verifyToken, authorizeRole('admin1','admin2','alumno','encargado','profesor'), actividadesRoutes)
router.use(`/asistencia`, verifyToken, authorizeRole('admin1','admin2','alumno','encargado','profesor'), actividadesRoutes)
router.use(`/config`, verifyToken, authorizeRole('admin1'), configRoutes)
router.use(`/errores`, verifyToken, authorizeRole('admin007'), configRoutes)
router.use(`/logs`, verifyToken, authorizeRole('admin007','admin1'), configRoutes)
router.use(`/dataUsers`, verifyToken, authorizeRole('admin1','admin2'), dataUserRouter)
router.use(`/encargadoAlumnos`, verifyToken, authorizeRole('admin1','admin2','profesor'), encargadoAlumnosRoutes)
router.use(`/horarios`, verifyToken, authorizeRole('admin1','admin2','alumno','encargado','profesor'), horariosRoutes)
router.use(`/begin`, authorizeRole('guest'), loginRouter)
router.use(`/materiasProfesores`, verifyToken, authorizeRole('admin1'), materiasProfesoresRoutes)
router.use(`/materias`, verifyToken, authorizeRole('admin1'), materiasRoutes)
router.use(`/mensajes`, verifyToken, authorizeRole('admin1','admin2','alumno','encargado','profesor'), mensajesRoutes)
router.use(`/mensajeReceptor`, verifyToken, authorizeRole('admin1','admin2','alumno','encargado','profesor'), mensajeReceptorRoutes)
router.use(`/notas`, verifyToken, authorizeRole('admin1','admin2','alumno','encargado','profesor'), notasRoutes)
router.use(`/roles`, verifyToken, authorizeRole('admin1'), rolesRoutes)
router.use(`/seccionAlumnos`, verifyToken, authorizeRole('admin1','admin2','profesor'), seccionAlumnosRoutes)
router.use(`/secciones`, verifyToken, authorizeRole('admin1','admin2'), seccionesRoutes)
router.use(`/seccionProfesor`, verifyToken, authorizeRole('admin1','admin2'), seccionProfesorRouter)
router.use(`/users`, verifyToken, authorizeRole('admin1'), userRouter)

module.exports = router;

require('module-alias/register');
const express = require("express")
const router = express.Router();

const actividadesRoutes = require("./actividadesRoutes")
const asistenciaRoutes = require("./asistenciaRoutes")
const configRoutes = require("./configRoutes")
const dataUserRoutes = require("./dataUsersRoutes")
const encargadoAlumnosRoutes = require("./encargadoAlumnosRoutes")
const horariosRoutes = require("./horariosRoutes")
const loginRoutes = require("./loginRoutes")
const logsRoutes = require("./logsRoutes")
const erroresRoutes = require("./erroresRoutes")
const materiasProfesoresRoutes = require("./materiasProfesoresRoutes")
const materiasRoutes = require("./materiasRoutes")
const mensajesRoutes = require("./mensajesRoutes")
const mensajeReceptorRoutes = require("./mensajeReceptorRoutes")
const notasRoutes = require("./notasRoutes")
const rolesRoutes = require("./rolesRoutes")
const seccionAlumnosRoutes = require("./seccionAlumnosRoutes")
const seccionesRoutes = require("./seccionesRoutes")
const seccionProfesorRoutes = require("./seccionProfesorRoutes")
const userRoutes = require("./usersRoutes")

//asegurador de rutas, verificador de token
const { verifyToken, authorizeRole } = require("@middlewares/auth");

//cache middleware
/* const cacheMiddleware = require("@middlewares/cacheMiddleware");
router.use(cacheMiddleware()); */





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





router.use(`/actividades`, verifyToken, authorizeRole('admin1', 'admin2', 'alumno', 'encargado', 'profesor'), actividadesRoutes)
router.use(`/asistencia`, verifyToken, authorizeRole('admin1', 'admin2', 'alumno', 'encargado', 'profesor'), asistenciaRoutes)
router.use(`/config`, verifyToken, authorizeRole('admin1'), configRoutes)
router.use(`/errores`, verifyToken, authorizeRole('admin007'), erroresRoutes)
router.use(`/logs`, verifyToken, authorizeRole('admin007', 'admin1'), logsRoutes)
router.use(`/dataUsers`, verifyToken, authorizeRole('admin1', 'admin2'), dataUserRoutes)
router.use(`/encargadoAlumnos`, verifyToken, authorizeRole('admin1', 'admin2', 'profesor'), encargadoAlumnosRoutes)
router.use(`/horarios`, verifyToken, authorizeRole('admin1', 'admin2', 'alumno', 'encargado', 'profesor'), horariosRoutes)
router.use(`/begin`, authorizeRole('guest'), loginRoutes)
router.use(`/materiasProfesores`, verifyToken, authorizeRole('admin1'), materiasProfesoresRoutes)
router.use(`/materias`, verifyToken, authorizeRole('admin1'), materiasRoutes)
router.use(`/mensajes`, verifyToken, authorizeRole('admin1', 'admin2', 'alumno', 'encargado', 'profesor'), mensajesRoutes)
router.use(`/mensajeReceptor`, verifyToken, authorizeRole('admin1', 'admin2', 'alumno', 'encargado', 'profesor'), mensajeReceptorRoutes)
router.use(`/notas`, verifyToken, authorizeRole('admin1', 'admin2', 'alumno', 'encargado', 'profesor'), notasRoutes)
router.use(`/roles`, verifyToken, authorizeRole('admin1'), rolesRoutes)
router.use(`/seccionAlumnos`, verifyToken, authorizeRole('admin1', 'admin2', 'profesor'), seccionAlumnosRoutes)
router.use(`/secciones`, verifyToken, authorizeRole('admin1', 'admin2'), seccionesRoutes)
router.use(`/seccionProfesor`, verifyToken, authorizeRole('admin1', 'admin2'), seccionProfesorRoutes)
router.use(`/users`, verifyToken, authorizeRole('admin1'), userRoutes)

module.exports =  router;

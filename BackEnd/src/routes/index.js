require('module-alias/register');
const express = require("express")
const router = express.Router();

const actividadesRoutes = require("./actividadesRoutes")
const asistenciaRoutes = require("./asistenciaRoutes")
const authRoutes = require("./authRoutes")
const configRoutes = require("./configRoutes")
const dataUserRoutes = require("./dataUsersRoutes")
const encargadoAlumnosRoutes = require("./encargadoAlumnosRoutes")
const horariosRoutes = require("./horariosRoutes")
const loginRoutes = require("./loginRoutes")
const logsRoutes = require("./logsRoutes")
const erroresRoutes = require("./erroresRoutes")
const materiasProfesoresRoutes = require("./materiasProfesoresRoutes")
const materiasRoutes = require("./materiasRoutes")
const gradosRoutes = require("./gradosRoutes")
const mensajesRoutes = require("./mensajesRoutes")
const mensajeReceptorRoutes = require("./mensajeReceptorRoutes")
const notasRoutes = require("./notasRoutes")
const rolesRoutes = require("./rolesRoutes")
const seccionAlumnosRoutes = require("./seccionAlumnosRoutes")
const seccionesRoutes = require("./seccionesRoutes")
const seccionProfesorRoutes = require("./seccionProfesorRoutes")
const eventosRoutes = require("./eventosRoutes")
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

// Endpoint público para crear usuarios desde registro
// hacemos una ruta sine token para registro. Esto solo crea archivo de users.
const { create: createUser } = require("../controllers/usersControllers");
router.post("/users/create", createUser);





router.use(`/actividades`, verifyToken, authorizeRole('admin007', 'admin1', 'alumno', 'encargado', 'profesor'), actividadesRoutes)
router.use(`/asistencia`, verifyToken, authorizeRole('admin007', 'admin1', 'alumno', 'encargado', 'profesor'), asistenciaRoutes)
router.use(`/auth`, authorizeRole('guest'), authRoutes)
router.use(`/config`, verifyToken, authorizeRole('admin007', 'admin1'), configRoutes)
router.use(`/errores`, verifyToken, authorizeRole('admin007', 'admin007'), erroresRoutes)
router.use(`/logs`, verifyToken, authorizeRole('admin007', 'admin1'), logsRoutes)
router.use(`/dataUsers`, verifyToken, authorizeRole('admin007', 'admin1', 'admin2'), dataUserRoutes)
router.use(`/encargadoAlumnos`, verifyToken, authorizeRole('admin007', 'admin1', 'profesor'), encargadoAlumnosRoutes)
router.use(`/horarios`, verifyToken, authorizeRole('admin1', 'alumno', 'encargado', 'profesor'), horariosRoutes)
router.use(`/begin`, authorizeRole('guest'), loginRoutes)
router.use(`/materiasProfesores`, verifyToken, authorizeRole('admin007', 'admin1'), materiasProfesoresRoutes)
router.use(`/materias`, verifyToken, authorizeRole('admin007', 'admin1'), materiasRoutes)
router.use(`/grados`, verifyToken, authorizeRole('admin007', 'admin1'), gradosRoutes)
router.use(`/mensajes`, verifyToken, authorizeRole('admin007', 'admin1', 'alumno', 'encargado', 'profesor'), mensajesRoutes)
router.use(`/mensajeReceptor`, verifyToken, authorizeRole('admin007', 'admin1', 'alumno', 'encargado', 'profesor'), mensajeReceptorRoutes)
router.use(`/notas`, verifyToken, authorizeRole('admin007', 'admin1', 'alumno', 'encargado', 'profesor'), notasRoutes)
router.use(`/roles`, verifyToken, authorizeRole('admin007', 'admin1'), rolesRoutes)
router.use(`/seccionAlumnos`, verifyToken, authorizeRole('admin007', 'admin1', 'profesor'), seccionAlumnosRoutes)
router.use(`/secciones`, verifyToken, authorizeRole('admin007', 'admin1', 'admin2'), seccionesRoutes)
router.use(`/seccionProfesor`, verifyToken, authorizeRole('admin007', 'admin1', 'admin2'), seccionProfesorRoutes)
router.use(`/eventos`, verifyToken, authorizeRole('admin007', 'admin1', 'alumno', 'encargado', 'profesor'), eventosRoutes)
router.use(`/users`, verifyToken, authorizeRole('admin007', 'admin1'), userRoutes)

module.exports = router;

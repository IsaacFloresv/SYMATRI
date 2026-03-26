// Rutas del sistema
import React from "react";
import { createBrowserRouter } from "react-router-dom"
import { PublicRoutes } from "./publicRoutes";
import { PrivateRoutes } from "./privateRoutes";

// lazy-loaded pages
const LeerMensaje = React.lazy(() => import('@/pages/privates/alumno/vistaComunicaciones/leerMensaje'));

import LoginPage from '@/pages/public/login/page';
import RegisterPage from "@/pages/public/register/page";
import NotFoundPage from "@/pages/public/404/NotFoundPage";

// Administrador Pages
import DashBoardAdmin from "@/pages/privates/administrador/dashboardAdmin/page";
import DatosColegio from "@/pages/privates/administrador/datosColegio/page";
import EditDatosColegio from "@/pages/privates/administrador/datosColegio/pageEdit";
import GestionAlumnos from "@/pages/privates/administrador/gestionAlumnos/page";
import EditAlumno from "@/pages/privates/administrador/gestionAlumnos/editAlumno";
import NuevoAlumno from "@/pages/privates/administrador/gestionAlumnos/nuevoAlumno";
import NuevoEvento from "@/pages/privates/administrador/gestionEventos/nuevoEvento";
import EditarEvento from "@/pages/privates/administrador/gestionEventos/editarEvento";
import GestionEventos from "@/pages/privates/administrador/gestionEventos/page";
import GestionGrados from "@/pages/privates/administrador/gestionGrados/page";
import NuevoGrado from "@/pages/privates/administrador/gestionGrados/gestion";
import GestionInformes from "@/pages/privates/administrador/gestionInformes/page";
import NuevoInforme from "@/pages/privates/administrador/gestionInformes/nuevoInforme";
import EditarInforme from "@/pages/privates/administrador/gestionInformes/editarInforme";
import GestionMaterias from "@/pages/privates/administrador/gestionMaterias/page";
import GestionProfesores from "@/pages/privates/administrador/gestionProfesores/page";
import NuevoUsuario from "@/pages/privates/administrador/gestionUsuarios/gestionUsuarios";
import NuevoProfesor from "@/pages/privates/administrador/gestionProfesores/gestionProfesores";
import GestionSecciones from "@/pages/privates/administrador/gestionSecciones/page";
import NuevoSeccion from "@/pages/privates/administrador/gestionSecciones/gestionSecciones";
import GestionUsuarios from "@/pages/privates/administrador/gestionUsuarios/page";
import EditarUsuario from "@/pages/privates/administrador/gestionUsuarios/editarPerfilU";
// roles management
import GestionRoles from "@/pages/privates/administrador/gestionRoles/page";
import NuevoRol from "@/pages/privates/administrador/gestionRoles/gestionRoles";
import VistaEventos from "@/pages/privates/administrador/vistaEventos/page";
import VistaInformes from "@/pages/privates/administrador/vistaInformes/page";
import NuevoMateria from "@/pages/privates/administrador/gestionMaterias/gestionMaterias";
import VistaSecciones from "@/pages/privates/administrador/vistaSecciones/page";

// Usuario Pages
import PerfilPage from "@/pages/privates/usuario/perfil/page";
import SeguridadPage from "@/pages/privates/usuario/seguridad/page";
import NotificacionesPage from "@/pages/privates/usuario/notificaciones/page";

// Alumno Pages
import DashBoardStudent from "@/pages/privates/alumno/dashboardStudent/page";
import VistaCalificacionesMaterias from "@/pages/privates/alumno/vistaCalificacionesMaterias/page";
import VistaComunicaciones from "@/pages/privates/alumno/vistaComunicaciones/page";
import VistaEventosAlumno from "@/pages/privates/alumno/vistaEventos/page";

// Profesor Pages
import DashBoardProfesor from "@/pages/privates/profesor/dashboardProfesor/page";
import GestionAsistencia from "@/pages/privates/profesor/gestionAsistencia/page";
import GestionCalificaciones from "@/pages/privates/profesor/gestionCalificaciones/page";
import GestionComunicados from "@/pages/privates/profesor/gestionComunicados/page";
import GestionEventosProfesor from "@/pages/privates/profesor/gestionEventos/page";
import GestionInformesProfesor from "@/pages/privates/profesor/gestionInformes/page";
import VistaEventosProfesor from "@/pages/privates/profesor/vistaEventos/page";
import VistaInformesProfesor from "@/pages/privates/profesor/vistaInformes/page";
import VistaSeccionesProfesor from "@/pages/privates/profesor/vistaSecciones/page";

// Asistente Pages
import DashBoardAsistente from "@/pages/privates/asistente/dashboardAsistente/page";
import VistaEventosAsistente from "@/pages/privates/asistente/vistaEventos/page.tsx";
import EditarEventoAsistente from "@/pages/privates/asistente/vistaEventos/editarEvento.tsx";
import GestionEventosAsistente from "@/pages/privates/asistente/vistaEventos/gestionEventos.tsx";
import VistaInformesAsistente from "@/pages/privates/asistente/vistaInformes/page.tsx";
import VistaInformeAsistente from "@/pages/privates/asistente/vistaInformes/vistaInforme.tsx";
import VistaProfesores from "@/pages/privates/asistente/vistaProfesores/page";
import VistaSeccionesAsistente from "@/pages/privates/asistente/vistaSecciones/page";
import DatosAlumno from "@/pages/privates/asistente/dashboardAsistente/datosAlumno";
import DatosDashBoard from "@/pages/privates/asistente/dashboardAsistente/datosDashBoard";

// Encargado Pages
import DashBoardEncargado from "@/pages/privates/encargado/dashboardEncargado/page";
import GestionComunicacion from "@/pages/privates/encargado/gestionComunicacion/page";
import GestionMatricula from "@/pages/privates/encargado/gestionMatricula/page";
import AsistenteMatricula from "@/pages/privates/encargado/gestionMatricula/asistenteMatricula";
import VistaCalificacionesMateriasEncargado from "@/pages/privates/encargado/vistaCalificacionesMaterias/page.tsx";
import VistaEventosEncargado from "@/pages/privates/encargado/vistaEventos/page.tsx";
import LectorMensajes from "@/pages/privates/encargado/gestionComunicacion/lectorMensajes"; // dinámica (reemplaza MessageDetail)

// Encargado Pages
import DashBoard from "@/pages/privates/dashboard/page";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes>
      <LoginPage />
    </PublicRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <PublicRoutes>
      <LoginPage />
    </PublicRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/register",
    element: <PublicRoutes>
      <RegisterPage />
    </PublicRoutes>,
    errorElement: <NotFoundPage />,
  },
  // Administrador Routes
  {
    path: "/admin/dashboard",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/datos-colegio",
    element: <PrivateRoutes>
      <DatosColegio />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/datos-colegio/editar",
    element: <PrivateRoutes>
      <EditDatosColegio />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-alumnos",
    element: <PrivateRoutes>
      <GestionAlumnos />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-alumnos/nuevo",
    element: <PrivateRoutes>
      <NuevoAlumno />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-alumnos/editar/:id",
    element: <PrivateRoutes>
      <EditAlumno />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-eventos",
    element: <PrivateRoutes>
      <GestionEventos />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-eventos/nuevo",
    element: <PrivateRoutes>
      <NuevoEvento />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-eventos/editar/:id",
    element: <PrivateRoutes>
      <EditarEvento />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-grados",
    element: <PrivateRoutes>
      <GestionGrados />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-grados/nuevo",
    element: <PrivateRoutes>
      <NuevoGrado />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-grados/editar/:id",
    element: <PrivateRoutes>
      <NuevoGrado />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-informes",
    element: <PrivateRoutes>
      <GestionInformes />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-informes/nuevo",
    element: <PrivateRoutes>
      <NuevoInforme />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-informes/editar/:id",
    element: <PrivateRoutes>
      <EditarInforme />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-materias",
    element: <PrivateRoutes>
      <GestionMaterias />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-materias/nuevo",
    element: <PrivateRoutes>
      <NuevoMateria />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-materias/editar/:id",
    element: <PrivateRoutes>
      <NuevoMateria />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-profesores",
    element: <PrivateRoutes>
      <GestionProfesores />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-profesores/nuevo",
    element: <PrivateRoutes>
      <NuevoProfesor />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-secciones",
    element: <PrivateRoutes>
      <GestionSecciones />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-secciones/nuevo",
    element: <PrivateRoutes>
      <NuevoSeccion />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-usuarios",
    element: <PrivateRoutes>
      <GestionUsuarios />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-usuarios/nuevo",
    element: <PrivateRoutes>
      <NuevoUsuario />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-usuarios/editar/:id",
    element: <PrivateRoutes>
      <EditarUsuario />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-roles",
    element: <PrivateRoutes>
      <GestionRoles />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-roles/nuevo",
    element: <PrivateRoutes>
      <NuevoRol />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/gestion-roles/editar/:id",
    element: <PrivateRoutes>
      <NuevoRol />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/vista-eventos",
    element: <PrivateRoutes>
      <VistaEventos />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/vista-informes",
    element: <PrivateRoutes>
      <VistaInformes />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/vista-secciones",
    element: <PrivateRoutes>
      <VistaSecciones />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  // Ruta genérica de dashboard (para guest y fallback)
  {
    path: "/dashboard",
    element: <PrivateRoutes>
      <DashBoard />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  // Alumno Routes
  {
    path: "/alumno/dashboard",
    element: <PrivateRoutes>
      <DashBoardStudent />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/alumno/calificaciones",
    element: <PrivateRoutes>
      <VistaCalificacionesMaterias />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/alumno/comunicaciones",
    element: <PrivateRoutes>
      <VistaComunicaciones />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/alumno/comunicaciones/leer",
    element: <PrivateRoutes>
      <React.Suspense fallback={<div>Cargando...</div>}>
        <LeerMensaje />
      </React.Suspense>
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {    path: "/alumno/eventos",
    element: <PrivateRoutes>
      <VistaEventosAlumno />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  // Usuario Routes
  {
    path: "/usuario/perfil",
    element: <PrivateRoutes>
      <PerfilPage />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/usuario/seguridad",
    element: <PrivateRoutes>
      <SeguridadPage />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/usuario/notificaciones",
    element: <PrivateRoutes>
      <NotificacionesPage />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  // Profesor Routes
  {
    path: "/profesor/dashboard",
    element: <PrivateRoutes>
      <DashBoardProfesor />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profesor/gestion-asistencia",
    element: <PrivateRoutes>
      <GestionAsistencia />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profesor/gestion-calificaciones",
    element: <PrivateRoutes>
      <GestionCalificaciones />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profesor/gestion-comunicados",
    element: <PrivateRoutes>
      <GestionComunicados />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profesor/gestion-eventos",
    element: <PrivateRoutes>
      <GestionEventosProfesor />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profesor/gestion-informes",
    element: <PrivateRoutes>
      <GestionInformesProfesor />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profesor/vista-eventos",
    element: <PrivateRoutes>
      <VistaEventosProfesor />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profesor/vista-informes",
    element: <PrivateRoutes>
      <VistaInformesProfesor />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profesor/vista-secciones",
    element: <PrivateRoutes>
      <VistaSeccionesProfesor />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  // Asistente Routes
  {
    path: "/asistente/dashboard",
    element: <PrivateRoutes>
      <DashBoardAsistente />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/asistente/datos-dashboard",
    element: <PrivateRoutes>
      <DatosDashBoard />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/asistente/vista-eventos",
    element: <PrivateRoutes>
      <VistaEventosAsistente />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/asistente/vista-eventos/nuevo",
    element: <PrivateRoutes>
      <GestionEventosAsistente />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/asistente/vista-eventos/editar/:id",
    element: <PrivateRoutes>
      <EditarEventoAsistente />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/asistente/vista-informes",
    element: <PrivateRoutes>
      <VistaInformesAsistente />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/asistente/vista-informe/:id",
    element: <PrivateRoutes>
      <VistaInformeAsistente />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/asistente/vista-profesores",
    element: <PrivateRoutes>
      <VistaProfesores />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/asistente/vista-secciones",
    element: <PrivateRoutes>
      <VistaSeccionesAsistente />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/asistente/alumno/:id",
    element: <PrivateRoutes>
      <DatosAlumno />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  // Encargado Routes
  {
    path: "/encargado/dashboard",
    element: <PrivateRoutes>
      <DashBoardEncargado />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/encargado/gestion-comunicacion",
    element: <PrivateRoutes>
      <GestionComunicacion />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/encargado/gestion-comunicacion/:id",
    element: <PrivateRoutes>
      {/* use lectorMensajes for compatibility; messageDetail still available as alias */}
      <LectorMensajes />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/encargado/gestion-matricula",
    element: <PrivateRoutes>
      <GestionMatricula />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/encargado/asistente-matricula",
    element: <PrivateRoutes>
      <AsistenteMatricula />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/encargado/calificaciones",
    element: <PrivateRoutes>
      <VistaCalificacionesMateriasEncargado />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/encargado/eventos",
    element: <PrivateRoutes>
      <VistaEventosEncargado />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  // catch-all must come last
  {
    path: "*",
    element: <PublicRoutes>
      <NotFoundPage />
    </PublicRoutes>,
    errorElement: <NotFoundPage />,
  },
]);

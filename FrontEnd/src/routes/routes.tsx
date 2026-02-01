// Rutas del sistema
import { createBrowserRouter } from "react-router-dom"
import { PublicRoutes } from "./publicRoutes";
import { PrivateRoutes } from "./privateRoutes";

import LoginPage from '@/pages/public/login/page';
import RegisterPage from "@/pages/public/register/page";
import NotFoundPage from "@/pages/public/404/NotFoundPage";

// Administrador Pages
import DashBoardAdmin from "@/pages/privates/administrador/dashboardAdmin/page";
import DatosColegio from "@/pages/privates/administrador/datosColegio/page";
import GestionAlumnos from "@/pages/privates/administrador/gestionAlumnos/page";
import GestionEventos from "@/pages/privates/administrador/gestionEventos/page";
import GestionGrados from "@/pages/privates/administrador/gestionGrados/page";
import GestionInformes from "@/pages/privates/administrador/gestionInformes/page";
import GestionMaterias from "@/pages/privates/administrador/gestionMaterias/page";
import GestionProfesores from "@/pages/privates/administrador/gestionProfesores/page";
import GestionSecciones from "@/pages/privates/administrador/gestionSecciones/page";
import GestionUsuarios from "@/pages/privates/administrador/gestionUsuarios/page";
import VistaEventos from "@/pages/privates/administrador/vistaEventos/page";
import VistaInformes from "@/pages/privates/administrador/vistaInformes/page";
import VistaSecciones from "@/pages/privates/administrador/vistaSecciones/page";

// Alumno Pages
import DashBoardStudent from "@/pages/privates/alumno/dashboardStudent/page";
import DashBoardAlumno from "@/pages/privates/alumno/dashboardAlumno/page";
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
import VistaEventosAsistente from "@/pages/privates/asistente/vistaEventos/page";
import VistaInformesAsistente from "@/pages/privates/asistente/vistaInformes/page";
import VistaProfesores from "@/pages/privates/asistente/vistaProfesores/page";
import VistaSeccionesAsistente from "@/pages/privates/asistente/vistaSecciones/page";

// Encargado Pages
import DashBoardEncargado from "@/pages/privates/encargado/dashboardEncargado/page";
import GestionComunicacion from "@/pages/privates/encargado/gestionComunicacion/page";
import GestionMatricula from "@/pages/privates/encargado/gestionMatricula/page";
import VistaCalificacionesMateriasEncargado from "@/pages/privates/encargado/vistaCalificacionesMaterias/page";
import VistaEventosEncargado from "@/pages/privates/encargado/vistaEventos/page";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <PublicRoutes>
      <NotFoundPage />
    </PublicRoutes>,
    errorElement: <NotFoundPage />,
  },
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
    path: "/dashboard/admin",
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
    path: "/admin/gestion-alumnos",
    element: <PrivateRoutes>
      <GestionAlumnos />
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
    path: "/admin/gestion-grados",
    element: <PrivateRoutes>
      <GestionGrados />
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
    path: "/admin/gestion-materias",
    element: <PrivateRoutes>
      <GestionMaterias />
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
    path: "/admin/gestion-secciones",
    element: <PrivateRoutes>
      <GestionSecciones />
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
  // Alumno Routes
  {
    path: "/dashboard/student",
    element: <PrivateRoutes>
      <DashBoardStudent />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/alumno/dashboard",
    element: <PrivateRoutes>
      <DashBoardAlumno />
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
    path: "/alumno/eventos",
    element: <PrivateRoutes>
      <VistaEventosAlumno />
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
    path: "/asistente/vista-eventos",
    element: <PrivateRoutes>
      <VistaEventosAsistente />
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
    path: "/encargado/gestion-matricula",
    element: <PrivateRoutes>
      <GestionMatricula />
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
]);

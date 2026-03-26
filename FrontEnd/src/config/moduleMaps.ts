import {
  IconBell,
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconListDetails,
  IconReport,
  IconSettings,
  IconShieldLock,
  IconUsers,
} from "@tabler/icons-react"
import type { Icon } from "@tabler/icons-react";

export type ModuleConfig = {
  id: number;
  label: string;
  path: string;
  icon?: Icon;
};

export const moduleMap: Record<number, ModuleConfig> = {
  // Soporte modules
  1: { id: 1, label: "Dashboard", path: "/admin/dashboard", icon: IconDashboard },
  95: { id: 95, label: "Datos Alumnos", path: "/admin/dashboard/data-alumno", icon: IconDashboard },
  96: { id: 96, label: "Lista Alumnos", path: "/admin/dashboard/lista-alumnos", icon: IconDashboard },
  2: { id: 2, label: "Datos del colegio", path: "/admin/datos-colegio", icon: IconSettings },
  3: { id: 3, label: "Materias", path: "/admin/gestion-materias", icon: IconChartBar },
  301: { id: 301, label: "Gestion de Materias", path: "/admin/gestion-materias", icon: IconChartBar },
  4: { id: 4, label: "Profesores", path: "/admin/gestion-profesores", icon: IconFolder },
  401: { id: 401, label: "Detalles del Profesor", path: "/admin/detalles-profesor", icon: IconFolder },
  402: { id: 402, label: "Editar Profesor", path: "/admin/editar-profesor", icon: IconFolder },
  5: { id: 5, label: "Alumnos", path: "/admin/gestion-alumnos", icon: IconUsers },
  501: { id: 501, label: "Nuevo Alumno", path: "/admin/nuevo-alumno", icon: IconListDetails },
  502: { id: 502, label: "Editar Alumno", path: "/admin/editar-alumno", icon: IconListDetails },
  6: { id: 6, label: "Secciones", path: "/admin/gestion-secciones", icon: IconUsers },
  601: { id: 601, label: "Gestion de Secciones", path: "/admin/gestion-secciones", icon: IconUsers },
  7: { id: 7, label: "Grados", path: "/admin/gestion-grados", icon: IconListDetails },
  701: { id: 701, label: "Gestion de Grados", path: "/admin/gestion-grados", icon: IconListDetails },
  8: { id: 8, label: "Usuarios", path: "/admin/gestion-usuarios", icon: IconUsers },
  801: { id: 801, label: "Gestion de Usuarios", path: "/admin/gestion-usuarios", icon: IconUsers },
  9: { id: 9, label: "Informes", path: "/admin/gestion-informes", icon: IconReport },
  901: { id: 901, label: "Nuevo Informe", path: "/admin/nuevo-informe", icon: IconReport },
  902: { id: 902, label: "Editar Informe", path: "/admin/editar-informe", icon: IconReport },
  10: { id: 10, label: "Eventos", path: "/admin/gestion-eventos", icon: IconListDetails },
  101: { id: 101, label: "Gestion Evento", path: "/admin/nuevo-evento", icon: IconListDetails },
  // roles management
  20: { id: 20, label: "Roles", path: "/admin/gestion-roles", icon: IconShieldLock },
  201: { id: 201, label: "Gestion de Roles", path: "/admin/gestion-roles", icon: IconShieldLock },
  93: { id: 93, label: "Configuración", path: "/admin/configuracion", icon: IconSettings },
  931: { id: 931, label: "Gestion de Configuración", path: "/admin/gestion-configuracion", icon: IconSettings },
  94: { id: 94, label: "Editar Configuración", path: "/admin/gestion-configuracion", icon: IconSettings },

  
  // Admin modules
  11: { id: 11, label: "Dashboard", path: "/admin/dashboard", icon: IconDashboard },
  12: { id: 12, label: "Materias", path: "/admin/gestion-materias", icon: IconChartBar },
  13: { id: 13, label: "Profesores", path: "/admin/gestion-profesores", icon: IconFolder },
  14: { id: 14, label: "Alumnos", path: "/admin/gestion-alumnos", icon: IconUsers },
  15: { id: 15, label: "Secciones", path: "/admin/gestion-secciones", icon: IconUsers },
  16: { id: 16, label: "Grados", path: "/admin/gestion-grados", icon: IconListDetails },
  17: { id: 17, label: "Usuarios", path: "/admin/gestion-usuarios", icon: IconUsers },
  18: { id: 18, label: "Informes", path: "/admin/gestion-informes", icon: IconReport },
  19: { id: 19, label: "Eventos", path: "/admin/gestion-eventos", icon: IconListDetails },
  97: { id: 97, label: "Datos del Colegio", path: "/admin/datos-colegio", icon: IconListDetails },
  98: { id: 98, label: "Editar Datos del Colegio", path: "/admin/gestion-datos-colegio", icon: IconListDetails },

  // additional admin-only view pages (not restricted by module selection)
  90: { id: 90, label: "Vista: Eventos", path: "/admin/vista-eventos", icon: IconListDetails },
  91: { id: 91, label: "Vista: Informes", path: "/admin/vista-informes", icon: IconReport },
  92: { id: 92, label: "Vista: Secciones", path: "/admin/vista-secciones", icon: IconListDetails },

  // Asistente modules
  51: { id: 51, label: "Dashboard Asistente", path: "/asistente/dashboard", icon: IconDashboard },
  52: { id: 52, label: "Vistas: Secciones", path: "/asistente/vista-secciones", icon: IconListDetails },
  53: { id: 53, label: "Vistas: Profesores", path: "/asistente/vista-profesores", icon: IconFolder },
  54: { id: 54, label: "Vistas: Eventos", path: "/asistente/vista-eventos", icon: IconListDetails },
  55: { id: 55, label: "Generación Informes", path: "/asistente/vista-informes", icon: IconReport },

  // Profesor modules
  21: { id: 21, label: "Dashboard Profesor", path: "/profesor/dashboard", icon: IconDashboard },
  22: { id: 22, label: "Calificaciones", path: "/profesor/gestion-calificaciones", icon: IconChartBar },
  23: { id: 23, label: "Asistencia", path: "/profesor/gestion-asistencia", icon: IconListDetails },
  24: { id: 24, label: "Informes Profesor", path: "/profesor/gestion-informes", icon: IconReport },
  25: { id: 25, label: "Eventos Profesor", path: "/profesor/gestion-eventos", icon: IconListDetails },
  26: { id: 26, label: "Comunicados", path: "/profesor/gestion-comunicados", icon: IconFolder },

  // Encargado modules
  31: { id: 31, label: "Dashboard Encargado", path: "/encargado/dashboard", icon: IconDashboard },
  32: { id: 32, label: "Comunicaciones", path: "/encargado/gestion-comunicacion", icon: IconListDetails },
  33: { id: 33, label: "Matrícula", path: "/encargado/gestion-matricula", icon: IconFolder },
  331: { id: 331, label: "Asistente Matrícula", path: "/encargado/asistente-matricula", icon: IconFolder },
  34: { id: 34, label: "Vistas: Notas", path: "/encargado/calificaciones", icon: IconReport },

  // Alumno modules
  41: { id: 41, label: "Dashboard Alumno", path: "/alumno/dashboard", icon: IconDashboard },
  42: { id: 42, label: "Eventos Alumno", path: "/alumno/eventos", icon: IconListDetails },
  43: { id: 43, label: "Calificaciones por materia", path: "/alumno/calificaciones", icon: IconChartBar },
  44: { id: 44, label: "Comunicaciones", path: "/alumno/comunicaciones", icon: IconFolder },
  441: { id: 441, label: "Leer Mensaje", path: "/alumno/leer-mensaje", icon: IconFolder },

  // Usuarios modules
  61: { id: 61, label: "Perfil", path: "/usuario/perfil", icon: IconDashboard },
  62: { id: 62, label: "Seguridad", path: "/usuario/seguridad", icon: IconShieldLock },
  63: { id: 63, label: "Notificaciones", path: "/usuario/notificaciones", icon: IconBell },
};

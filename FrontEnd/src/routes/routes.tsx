import { createBrowserRouter } from "react-router-dom"
import { PublicRoutes } from "./publicRoutes";
import { PrivateRoutes } from "./privateRoutes";

import LoginPage from '@/pages/public/login/page';
import RegisterPage from "@/pages/public/register/page";
import NotFoundPage from "@/pages/public/404/NotFoundPage";
import DashBoardAdmin from "@/pages/privates/dashboardAdmin/page";
import DashBoardStudent from "@/pages/privates/dashboardStudent/page";

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
  {
    path: "/dashboard/admin1",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/student",
    element: <PrivateRoutes>
      <DashBoardStudent />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/calendario",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/usuarios",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profesores",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/alumnos",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/secciones",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/mensajes",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/calificaciones",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
]);

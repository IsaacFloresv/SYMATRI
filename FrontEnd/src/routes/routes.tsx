import { createBrowserRouter } from "react-router-dom"
import { PublicRoutes } from "./publicRoutes";
import { PrivateRoutes } from "./privateRoutes";

import LoginPage from '@/pages/public/login/page'
import NotFoundPage from "@/pages/public/404/NotFoundPage";
import DashBoardAdmin from "@/pages/privates/dashboardAdmin/page";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <PublicRoutes>
      <NotFoundPage />
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
    path: "/dashboard/admin",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
    errorElement: <NotFoundPage />,
  },
]);

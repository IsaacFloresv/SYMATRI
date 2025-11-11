import { createBrowserRouter } from "react-router"
import LoginPage from '@/pages/public/login/page'
import { PublicRoutes } from "./publicRoutes";
import { PrivateRoutes } from "./privateRoutes";
import DashBoardAdmin from "@/pages/privates/dashboardAdmin/page";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <PublicRoutes>
      <LoginPage />
    </PublicRoutes>,
  },
  {
    path: "/dashboard/admin",
    element: <PrivateRoutes>
      <DashBoardAdmin />
    </PrivateRoutes>,
  },
]);

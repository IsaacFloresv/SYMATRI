import { Navigate } from "react-router";
import type { ReactNode } from "react";

import LayoutMain from "@/pages/privates/layout-main/layout-main";

type Props = {
    children : ReactNode;
}
export function PrivateRoutes({ children }: Props) {
    const user = localStorage.getItem("user");

    if (!user) {
        return 
                <Navigate to="/" />
                
    }

  return (
            <>
            <LayoutMain>
              {children};
              </LayoutMain>
       </>
    )
}
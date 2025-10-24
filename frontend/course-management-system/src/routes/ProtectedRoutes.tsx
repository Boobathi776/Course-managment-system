import { Navigate, Outlet } from "react-router-dom";
import { loginPage } from "./reactRoutes";
import type { JSX } from "react";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
};

const ProtectedRoutes : React.FC<ProtectedRouteProps> = ({ isAuthenticated }: ProtectedRouteProps):JSX.Element => {
  {
    return !isAuthenticated ? <Navigate to={loginPage} /> : <Outlet />;
  }
};

export default ProtectedRoutes;

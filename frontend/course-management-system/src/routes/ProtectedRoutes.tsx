import { Navigate, Outlet } from "react-router-dom";
import { loginPage } from "./reactRoutes";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
};

const ProtectedRoutes : React.FC<ProtectedRouteProps> = ({ isAuthenticated }: ProtectedRouteProps) => {
  {
    return !isAuthenticated ? <Navigate to={loginPage} /> : <Outlet />;
  }
};

export default ProtectedRoutes;

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  if (user) {
    if (user.admin) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;

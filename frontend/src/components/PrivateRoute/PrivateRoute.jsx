import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ form: location }} replace />
  );
};

export default PrivateRoute;

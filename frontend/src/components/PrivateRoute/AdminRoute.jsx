import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NotFound } from "../../pages";

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user || !user.role?.includes("ADMIN")) {
    return <NotFound />;
  }
  return <Outlet />;
};

export default AdminRoute;

import { useSelector } from "react-redux";
import { Navigate, Outlet,useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className=" flex h-[calc(100vh-5rem)] overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/sign-in" state={{form:location}} replace />
  );
};

export default PrivateRoute;

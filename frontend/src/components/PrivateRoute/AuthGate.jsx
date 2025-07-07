import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthGate() {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    !user?.accessToken ? verifyToken() : setLoading(false);
  }, []);

  useEffect(() => {
    console.log("Loading--", loading);
    console.log("Auth state", user?.accessToken);
  }, [loading]);

  if (loading) return <p>Loading....</p>;
  return <Outlet />;
}

export default AuthGate;

import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setLoading } from "../../features/auth/authSlice";
import FullPageLoader from "../Loader/FullPageLoader";

function AuthGate() {
  const refresh = useRefreshToken();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    const verifyToken = async () => {
      dispatch(setLoading(true));
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    !user?.accessToken ? verifyToken() : dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    console.log("Loading--", loading);
    console.log("Auth state", user?.accessToken);
  }, [loading]);

  if (loading) return <FullPageLoader />;
  return <Outlet />;
}

export default AuthGate;

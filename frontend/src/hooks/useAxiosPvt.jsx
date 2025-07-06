import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivateInstance } from "../utils/api/axios";
import { useSelector } from "react-redux";

function useAxiosPrivateInstance() {
  const refresh = useRefreshToken();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivateInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.response.eject(responseInterceptor);
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [refresh, user]);

  return axiosPrivateInstance;
}

export default useAxiosPrivateInstance;
import { useEffect } from "react";
import { axiosInstance } from "../utils/api";
import { REFRESH_TOKEN_ENPOINT } from "../utils/api/api_enpoints";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../features/auth/authSlice";

function useRefreshToken() {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const response = await axiosInstance.post(
        REFRESH_TOKEN_ENPOINT,
        {},
        {
          withCredentials: true,
        }
      );
      const result = response?.data;
      // console.log("RESPONSE", response);
      dispatch(
        signIn({
          ...result?.data?.user,
          accessToken: result?.data?.accessToken,
        })
      );
      return result?.data?.accessToken;
    } catch (error) {
      console.log("ERROR UPDATING TOKEN", error);
    }
  };

  return refresh;
}

export default useRefreshToken;

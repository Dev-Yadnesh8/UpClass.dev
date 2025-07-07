import { useDispatch } from "react-redux";
import { signIn } from "../features/auth/authSlice";
import { axiosPrivateInstance } from "../utils/api/axios";
import { LOGOUT_ENPOINT } from "../utils/api/api_enpoints";

function useLogout(){
   const dispatch =  useDispatch();

   const logout = async()=>{
    try {
     dispatch(signIn(null));
    await axiosPrivateInstance.post(LOGOUT_ENPOINT);
   } catch (error) {
    console.error("Error while logout",error);
    
   }
   }

   return logout;

}

export default useLogout;
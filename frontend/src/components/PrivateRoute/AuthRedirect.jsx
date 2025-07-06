import { useSelector } from "react-redux";
import { Home, Landing } from "../../pages";

export default function AuthRedirect() {
  
    const { user } = useSelector((state) => state.auth);

  return user  ? <Home /> : <Landing />;
}

import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log(isAuthenticated);
  // console.log(user);
  return (
    <header className="sticky top-0 z-50 w-full h-20   bg-darkerBg/90 backdrop-blur shadow-md text-white border-b-2 border-footer-Bg">
      <div className=" mx-auto px-6 py-7 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">UpClass.dev</div>

        {isAuthenticated ? (
          <Button
            text={<MdLogout />}
            variant="outline"
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/sign-in", { replace: true });
              toast.success("Logout Successful!");
            }}
          />
        ) : (
          <Button
            text={"Login"}
            variant="outline"
            onClick={() => navigate("/sign-in")}
          />
        )}
      </div>
    </header>
  );
}
export default Header;

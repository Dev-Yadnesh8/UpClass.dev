import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import {
  toggleSidebarCollapse,
  toggleSidebarOpen,
} from "../../features/sidebar/sidebarSlice";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector(
    (state) => state.sidebar.isSidebarCollapsed
  );

  // console.log(isAuthenticated);
  // console.log(user);
  return (
    <header className="sticky top-0 z-50 w-full h-20   bg-darkerBg/90 backdrop-blur shadow-md text-white border-b-2 border-footer-Bg ">
      <div className=" mx-auto px-6 py-7 flex items-center justify-between">
        {/* Logo */}
        <div className="flex justify-start items-center">
          {isSidebarCollapsed ? (
            <RiMenuFold2Line
              className="hidden md:flex mr-6 cursor-pointer"
              onClick={() => dispatch(toggleSidebarCollapse())}
              size={24}
            />
          ) : (
            <RiMenuUnfold2Line
              className="hidden md:flex mr-6 cursor-pointer"
              onClick={() => dispatch(toggleSidebarCollapse())}
              size={24}
            />
          )}
          <RiMenuFold2Line
            className="md:hidden mr-2 cursor-pointer"
            onClick={() => dispatch(toggleSidebarOpen())}
            size={24}
          />

          <div className="text-xl font-bold tracking-wide">UpClass.dev</div>
        </div>

        {!isAuthenticated && (
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

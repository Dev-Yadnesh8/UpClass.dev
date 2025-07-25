import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import {
  toggleSidebarCollapse,
  toggleSidebarOpen,
} from "../../features/sidebar/sidebarSlice";
import useLogout from "../../hooks/useLogout";
import { FiLogOut } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const logout = useLogout();
  const location = useLocation();
  const isSidebarCollapsed = useSelector(
    (state) => state.sidebar.isSidebarCollapsed
  );

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-darkerBg/90 backdrop-blur shadow-md text-white border-b-2 border-footer-Bg">
      <div className="mx-auto px-6 py-7 flex items-center justify-between">
        {/* Logo + Sidebar toggles */}
        <div className="flex justify-start items-center">
          {user && (
            <>
              {/* Desktop toggle */}
              {isSidebarCollapsed ? (
                <RiMenuUnfold2Line
                  className="hidden md:flex mr-6 cursor-pointer"
                  onClick={() => dispatch(toggleSidebarCollapse())}
                  size={24}
                />
              ) : (
                <RiMenuFold2Line
                  className="hidden md:flex mr-6 cursor-pointer"
                  onClick={() => dispatch(toggleSidebarCollapse())}
                  size={24}
                />
              )}

              {/* Mobile toggle */}
              <RiMenuFold2Line
                className="md:hidden mr-2 cursor-pointer"
                onClick={() => dispatch(toggleSidebarOpen())}
                size={24}
              />
            </>
          )}
          <div className="text-xl font-bold tracking-wide">UpClass.dev</div>
        </div>

        {/* Auth Action */}
        {!user ? (
          <Button
            text={"Login"}
            variant="outline"
            onClick={() => navigate("/sign-in", { state: { from: location } })}
          />
        ) : (
          <Button
            text={<FiLogOut/>}
            variant="outline"
            onClick={() => {
              logout();
              navigate("/sign-in", {
                replace: true,
                state: { from: location }
              });
            }}
          />
        )}
      </div>
    </header>
  );
}

export default Header;

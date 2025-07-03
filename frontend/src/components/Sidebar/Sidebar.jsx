import { FiHome, FiBookOpen, FiUser, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  setSidebarOpen,
  toggleSidebarCollapse,
} from "../../features/sidebar/sidebarSlice";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { isSidebarOpen, isSidebarCollapsed } = useSelector(
    (state) => state.sidebar
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      dispatch(setSidebarOpen(!isMobile));
    };

    handleResize(); // on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const collapsed = isSidebarCollapsed;

  return (
    <aside
      className={`fixed md:sticky top-0 left-0 h-full bg-darkerBg p-4 z-40 border-r border-footer-Bg
  transform transition-all duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    ${collapsed ? "w-[72px]" : "w-64"}`}
    >
      <nav className="flex flex-col gap-4">
        <SidebarLink
          icon={<FiHome size={18} />}
          text="Home"
          collapsed={collapsed}
          to={"/home"}
        />
        <SidebarLink
          icon={<FiBookOpen size={18} />}
          text="My Courses"
          collapsed={collapsed}
          to={"/my-courses"}
        />
      </nav>
    </aside>
  );
}

function SidebarLink({ icon, text, collapsed, to }) {
  return (
    <div className="relative group">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center ${
            collapsed ? "justify-center px-0" : "gap-3 px-3"
          } py-3 rounded-lg transition-all w-full text-left cursor-pointer
          ${
            isActive
              ? "bg-footer-Bg/50 text-white"
              : "hover:bg-footer-Bg/30 text-white"
          }`
        }
      >
        <span className={`${collapsed ? "text-xl" : "text-base"}`}>{icon}</span>
        {!collapsed && <span>{text}</span>}
      </NavLink>

      {/* Tooltip when collapsed */}
      {collapsed && (
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          {text}
        </span>
      )}
    </div>
  );
}

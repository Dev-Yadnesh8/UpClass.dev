import { FiHome, FiBookOpen, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  setSidebarCollapsed,
  setSidebarOpen,
} from "../../features/sidebar/sidebarSlice";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { isSidebarOpen, isSidebarCollapsed } = useSelector(
    (state) => state.sidebar
  );

  // Auto-toggle based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      dispatch(setSidebarOpen(width >= 768));
      dispatch(setSidebarCollapsed(width < 1280));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const collapsed = isSidebarCollapsed;
  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Overlay on mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-darkerBg/50 z-40 md:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      <aside
        className={`
        fixed md:sticky top-20 left-0 h-[calc(100vh-5rem)]
        z-50 bg-darkerBg border-r border-footer-Bg
        overflow-y-auto p-4 transition-all duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-64"}
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        <nav className="flex flex-col gap-4">
          <SidebarLink
            icon={<FiHome size={18} />}
            text="Home"
            to="/"
            collapsed={collapsed}
          />
          <SidebarLink
            icon={<FiBookOpen size={18} />}
            text="My Courses"
            to="/courses"
            collapsed={collapsed}
          />

        </nav>
      </aside>
    </>
  );
}

function SidebarLink({ icon, text, to, collapsed }) {
  return (
    <div className="relative group">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center py-3 rounded-lg w-full text-left text-white transition-all ${
            collapsed ? "justify-center px-0" : "gap-3 px-3"
          } ${isActive ? "bg-footer-Bg/50" : "hover:bg-footer-Bg/30"}`
        }
      >
        <span className={`${collapsed ? "text-xl" : "text-base"}`}>{icon}</span>
        {!collapsed && <span>{text}</span>}
      </NavLink>

      {collapsed && (
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          {text}
        </span>
      )}
    </div>
  );
}

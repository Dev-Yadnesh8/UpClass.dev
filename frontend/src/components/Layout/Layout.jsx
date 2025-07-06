import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen flex flex-col bg-darkBg text-white">
      <Header />

      <div className="flex flex-1">
        {user && <Sidebar />}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
      {!user && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
}

export default Layout;

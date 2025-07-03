import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function Layout() {
  const {isAuthenticated} = useSelector((state)=>state.auth);
  return (
    <div className="min-h-screen flex flex-col bg-darkBg text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
        <Toaster position="top-right" />
      </main>
     {!isAuthenticated && <Footer />}
    </div>
  );
}

export default Layout;

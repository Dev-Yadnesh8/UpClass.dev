import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-darkBg text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
        <Toaster position="top-right" />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

import { Outlet } from "react-router-dom";
import Navbar from "../components/home/navbar";
import Footer from "../components/footer/footer";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Toaster } from "sonner";
import AuthProvider from "@/provider/auth-provider";

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="w-full h-full">
          <Outlet />
        </main>
        <Footer />

        <div
          className={`fixed bottom-4 z-50 right-4 transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={scrollToTop}
            className="bg-black cursor-pointer text-white p-2 rounded-full shadow-lg hover:bg-black/70 transition"
          >
            <ChevronUp size={24} />
          </button>
        </div>

        <Toaster position="top-center" />
      </div>
    </AuthProvider>
  );
};

export default Layout;

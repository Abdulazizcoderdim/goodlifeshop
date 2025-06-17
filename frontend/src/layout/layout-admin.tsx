import Sidebar from "@/components/admin-panel/common/Sidebar";
import KeepAlive from "@/components/KeepAlive";
import { useAuthStore } from "@/hooks/useAuthStore";
import AuthProvider from "@/provider/auth-provider";
import { UserRole } from "@/types";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const LayoutAdmin = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Пожалуйста, войдите в систему еще раз.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return;
    }

    if (!user) return;

    if (user.role !== UserRole.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
      <Toaster position="top-center" />

      <KeepAlive />
    </AuthProvider>
  );
};

export default LayoutAdmin;

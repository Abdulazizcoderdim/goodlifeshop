import Sidebar from "@/components/admin-panel/common/Sidebar";
import { useAuthStore } from "@/hooks/useAuthStore";
import AuthProvider from "@/provider/auth-provider";
import { UserRole } from "@/types";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const LayoutAdmin = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return; // user hali kelmagan bo‘lsa hech narsa qilma

    if (user.role !== UserRole.ADMIN) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
      <Toaster position="top-center" />
    </AuthProvider>
  );
};

export default LayoutAdmin;

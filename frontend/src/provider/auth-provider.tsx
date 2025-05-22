import { useAuthStore } from "@/hooks/useAuthStore";
import api from "@/http/axios";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { checkAuth, logout, setIsAuth, setLoading } = useAuthStore();
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/auth/refresh");
      if (!data.accessToken) throw new Error("Access token not found");

      localStorage.setItem("accessToken", data.accessToken);
      setIsAuth(true);
      return data.accessToken;
    } catch {
      logout();
      navigate("/");
      localStorage.removeItem("accessToken");
    } finally {
      setIsAuth(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch {
        await refreshToken();
        await checkAuth();
      }
    };

    verifyAuth();

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const interval = setInterval(refreshToken, 3600000);
    return () => clearInterval(interval);
  }, []);
  return <>{children}</>;
};

export default AuthProvider;

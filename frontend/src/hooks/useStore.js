export const useStore = create((set) => ({
  user: null,
  isAuth: false,
  loading: false,

  setLoading: (loading) => set({ loading }),
  setIsAuth: (isAuth) => set({ isAuth }),
  setUser: (user) => set({ user }),

  checkAuth: async () => {
    try {
      set({ loading: true });

      const token = localStorage.getItem("accessToken");

      if (!token) {
        set({ isAuth: false, user: null });
      }

      const {} = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) set({ isAuth: true, user: data });
      else set({ isAuth: false, user: null });
    } catch (error) {
      set({ isAuth: false, user: null });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: false });
      const token = localStorage.getItem("accessToken");

      if (token) {
        await api.delete("/auth/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      localStorage.removeItem("accessToken");

      set({ isAuth: false, user: null, loading: false });
    } catch (error) {
      throw error;
    } finally {
      set({ isAuth: false, user: null, loading: false });
    }
  },
}));

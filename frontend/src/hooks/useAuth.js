// hooks/useAuth.js
import { useAuthStore } from "../store/authStore";
import axios from "../utils/api";

export const useAuth = () => {
  const { setUser, clearUser, user } = useAuthStore();

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error?.response?.data?.message || "Login failed";
    }
  };
  const updateUser = async (id, updatedData) => {
    try {
      const res = await axios.patch(`/auth/update-profile/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        withCredentials: true,
      });
      setUser(res.data.data); // Update user in store
    } catch (error) {
      console.error("Update error:", error);
      throw error?.response?.data?.message || "Update failed";
    }
  };
  const register = async (name, email, password,role) => {
    try {
      const res = await axios.post(
        "/auth/register",
        { name, email, password ,role},
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (error) {
      console.error("Registration error:", error);
      throw error?.response?.data?.message || "Registration failed";
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      clearUser();
    } catch (error) {
      console.error("Logout error:", error);
      throw error?.response?.data?.message || "Logout failed";
    }
  };

  return { login, register, logout, user, updateUser };
};

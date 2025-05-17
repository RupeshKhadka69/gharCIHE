import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import axios from "../utils/api";
import toast from "react-hot-toast";

const API = "/auth";

export const useAllUsers = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const {
    data: allUsers,
    isLoading: userLoading,
    error,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: () =>
      axios
        .get(`${API}/get-all-user`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => res.data),
  });

  const updateUserRole = useMutation({
    mutationFn: ({ id, role }) =>
      axios.patch(
        `${API}/update-user/${id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      toast.success("User role updated successfully ");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while updating role "
      );
    },
  });

  return {
    allUsers,
    userLoading,
    error,
    updateUserRole,
  };
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import axios from "../utils/api";

const API = "/listings";

export const useListings = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const {
    data: listings,
    isLoading: isListingsLoading,
    error: listingsError,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: () => axios.get(API).then((res) => res.data),
  });

  const {
    data: ownerListings,
    isLoading: isOwnerLoading,
    error: ownerError,
  } = useQuery({
    queryKey: ["ownerListings"],
    queryFn: () =>
      axios
        .get(`${API}/owner`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => res.data),
    enabled: !!user?.token,
  });

  const createListing = useMutation({
    mutationFn: (formData) =>
      axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownerListings"] });
    },
  });

  const updateListing = useMutation({
    mutationFn: ({ id, formData }) =>
      axios.put(`${API}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (data, variables) => {
      // Invalidate the cache of the listing after successful update
      queryClient.invalidateQueries({ queryKey: ["listing", variables.id] });
    },
  });

  const deleteListing = useMutation({
    mutationFn: ({id}) =>
      axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownerListings"] });
    },
  });

  // ✅ Hook returned, not directly called inside a regular function
  const useFetchListing = (id) =>
    useQuery({
      queryKey: ["listing", id],
      queryFn: () => axios.get(`${API}/${id}`).then((res) => res.data),
      enabled: !!id,
    });

  return {
    listings,
    isListingsLoading,
    listingsError,
    ownerListings,
    isOwnerLoading,
    ownerError,
    createListing,
    updateListing,
    deleteListing,
    useFetchListing, // return as a hook
  };
};


// Separate hook for fetching single listing
export const useListing = (id) =>
  useQuery({
    queryKey: ["listing", id],
    queryFn: () => axios.get(`${API}/${id}`).then((res) => res.data),
  });

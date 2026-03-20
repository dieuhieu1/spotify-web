import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useArtists = (page = 1, size = 100, sortBy = "name", sortOrder = "asc") =>
  useQuery({
    queryKey: ["artists", "list", page, size, sortBy, sortOrder],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/artists?pageNo=${page}&pageSize=${size}&sortBy=${sortBy}-${sortOrder}`
      );
      return res.data.result.items;
    },
  });

export const useArtistById = (artistId) =>
  useQuery({
    queryKey: ["artists", artistId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/artists/${artistId}`);
      return res.data.result;
    },
    enabled: !!artistId,
  });

export const useAddArtist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (artistData) => {
      const res = await axiosInstance.post("/artists", artistData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      toast.success("Artist added successfully!");
    },
    onError: () => toast.error("Error adding artist"),
  });
};

export const useUpdateArtist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, artistData }) => {
      const res = await axiosInstance.put(`/artists/${id}`, artistData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      toast.success("Artist updated successfully!");
    },
    onError: () => toast.error("Error updating artist"),
  });
};

export const useDeleteArtist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (artistId) => {
      await axiosInstance.delete(`/artists/${artistId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      toast.success("Artist deleted successfully!");
    },
    onError: () => toast.error("Error deleting artist"),
  });
};

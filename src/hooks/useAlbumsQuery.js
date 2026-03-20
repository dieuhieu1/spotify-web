import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useAlbums = (page = 1, size = 10) =>
  useQuery({
    queryKey: ["albums", "list", page, size],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/albums?pageNo=${page}&pageSize=${size}&nameSortOrder=asc`
      );
      return res.data.result.items;
    },
  });

export const useAlbumById = (albumId) =>
  useQuery({
    queryKey: ["albums", albumId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/albums/${albumId}`);
      return res.data.result;
    },
    enabled: !!albumId,
  });

export const useAddAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const res = await axiosInstance.post("/albums", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      toast.success("Album created successfully!");
    },
    onError: () => toast.error("Error creating album"),
  });
};

export const useDeleteAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (albumId) => {
      await axiosInstance.delete(`/albums/${albumId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      toast.success("Album deleted successfully!");
    },
    onError: () => toast.error("Error deleting album"),
  });
};

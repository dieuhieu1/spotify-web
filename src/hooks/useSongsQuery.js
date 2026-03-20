import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useTrendingSongs = () =>
  useQuery({
    queryKey: ["songs", "trending"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/songs?pageNo=1&pageSize=100&viewerSortOrder=desc"
      );
      return res.data.result.items;
    },
  });

export const useSongs = (page = 1, size = 100) =>
  useQuery({
    queryKey: ["songs", "list", page, size],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/songs?pageNo=${page}&pageSize=${size}&nameSortOrder=asc`
      );
      return res.data.result.items;
    },
  });

export const useSongById = (songId) =>
  useQuery({
    queryKey: ["songs", songId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/songs/${songId}`);
      return res.data.result;
    },
    enabled: !!songId,
  });

export const useSongsByGenre = (genreId) =>
  useQuery({
    queryKey: ["songs", "genre", genreId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/songs/genre/${genreId}`);
      return res.data.result;
    },
    enabled: !!genreId,
  });

export const useAddSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (songData) => {
      const res = await axiosInstance.post("/songs", songData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      toast.success("Song created successfully!");
    },
    onError: () => toast.error("Error creating song"),
  });
};

export const useUpdateSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, songData }) => {
      const res = await axiosInstance.put(`/songs/${id}`, songData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      toast.success("Song updated successfully!");
    },
    onError: () => toast.error("Error updating song"),
  });
};

export const useDeleteSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/songs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      toast.success("Song deleted successfully!");
    },
    onError: () => toast.error("Error deleting song"),
  });
};

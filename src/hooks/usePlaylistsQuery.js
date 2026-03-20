import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const usePlaylists = (page = 1, size = 10) =>
  useQuery({
    queryKey: ["playlists", "list", page, size],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/playlists?pageNo=${page}&pageSize=${size}&titleSortOrder=asc`
      );
      return res.data.result.items;
    },
  });

export const usePlaylistById = (id) =>
  useQuery({
    queryKey: ["playlists", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/playlists/${id}`);
      return res.data.result;
    },
    enabled: !!id,
  });

export const useSavedPlaylists = () =>
  useQuery({
    queryKey: ["playlists", "saved"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/saved-playlists");
      return res.data.result.items;
    },
  });

export const useAddPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (playlistData) => {
      const res = await axiosInstance.post("/playlists", playlistData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      toast.success("Playlist created successfully!");
    },
    onError: () => toast.error("Error creating playlist"),
  });
};

export const useUpdatePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ playlistId, updatedData }) => {
      const res = await axiosInstance.put(
        `/playlists/${playlistId}`,
        updatedData
      );
      return res.data.result;
    },
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["playlists", playlistId] });
      queryClient.invalidateQueries({ queryKey: ["playlists", "saved"] });
      toast.success("Playlist updated successfully!");
    },
    onError: () => toast.error("Error updating playlist"),
  });
};

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (playlistId) => {
      await axiosInstance.delete(`/playlists/${playlistId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      toast.success("Playlist deleted successfully!");
    },
    onError: () => toast.error("Error deleting playlist"),
  });
};

export const useDeleteSongFromPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ songId, playlistId }) => {
      await axiosInstance.delete(`/playlists/${playlistId}/songs/${songId}`);
    },
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["playlists", playlistId] });
      toast.success("Song removed from playlist!");
    },
    onError: () => toast.error("Error removing song"),
  });
};

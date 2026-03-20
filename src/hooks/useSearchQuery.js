import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useTopResults = (query) =>
  useQuery({
    queryKey: ["search", "top", query],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/search-by-priority?name=${query}&pageNo=1&pageSize=10`
      );
      return res.data?.result?.items || [];
    },
    enabled: !!query?.trim(),
  });

export const useSearchSongs = (query) =>
  useQuery({
    queryKey: ["search", "songs", query],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/songs/search?pageNo=1&pageSize=20&search=name~${query}`
      );
      return res.data?.result?.items || [];
    },
    enabled: !!query?.trim(),
  });

export const useSearchPlaylists = (query) =>
  useQuery({
    queryKey: ["search", "playlists", query],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/playlists/search?pageNo=1&pageSize=20&search=name~${query}`
      );
      return res.data?.result?.items || [];
    },
    enabled: !!query?.trim(),
  });

export const useSearchArtists = (query) =>
  useQuery({
    queryKey: ["search", "artists", query],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/artists/search?pageNo=1&pageSize=20&search=name~${query}`
      );
      return res.data?.result?.items || [];
    },
    enabled: !!query?.trim(),
  });

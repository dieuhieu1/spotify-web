import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useAllFiles = () =>
  useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const res = await axiosInstance.get("/file/all");
      return res.data;
    },
  });

export const useUploadSong = () =>
  useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("fileVideo", file);
      const res = await axiosInstance.post("/file/upload/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
  });

export const useUploadImage = () =>
  useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("fileImage", file);
      const res = await axiosInstance.post("/file/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
  });

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/file/delete?id=${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
};

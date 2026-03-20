import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useUsers = (page = 1, size = 10) =>
  useQuery({
    queryKey: ["users", "list", page, size],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/users?pageNo=${page}&pageSize=${size}&nameSortOrder=asc`
      );
      return res.data.result.items;
    },
  });

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const res = await axiosInstance.post("/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully!");
    },
    onError: () => toast.error("Error creating user"),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      await axiosInstance.delete(`/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully!");
    },
    onError: () => toast.error("Error deleting user"),
  });
};

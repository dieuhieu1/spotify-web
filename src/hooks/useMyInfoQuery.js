import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useMyInfo = () => {
  const token = sessionStorage.getItem("authToken");
  return useQuery({
    queryKey: ["myInfo"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/myInfo");
      return res.data.result;
    },
    enabled: !!token,
    retry: false,
  });
};

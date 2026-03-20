import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useStats = () =>
  useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/stats");
      return res.data.result;
    },
  });

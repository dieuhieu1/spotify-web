import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

export const useForgotPassword = () => {
  const { setEmail } = useAuthStore();
  return useMutation({
    mutationFn: async (email) => {
      const res = await axiosInstance.post("/auth/forgot-password", email, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data.result;
    },
    onSuccess: (data) => {
      if (data?.email) setEmail(data.email);
    },
  });
};

export const useVerifyCode = () => {
  const { setForgotPasswordToken } = useAuthStore();
  return useMutation({
    mutationFn: async (verificationData) => {
      const res = await axiosInstance.post(
        "/auth/forgot-password/verify-code",
        verificationData,
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data.result;
    },
    onSuccess: (data) => {
      if (data?.forgotPassword) setForgotPasswordToken(data.forgotPassword);
    },
  });
};

import { useState } from "react";
import VerificationInput from "./VerificationInput";
import { useAuthStore } from "@/store/useAuthStore";
import { useVerifyCode } from "@/hooks/useAuthMutations";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyCodePage = () => {
  const navigate = useNavigate();

  const { email } = useAuthStore();
  const verifyCodeMutation = useVerifyCode();

  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyCodeMutation.mutate({ email, verificationCode });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white">
      <div className="bg-zinc-900 p-8 rounded-lg max-w-md w-full">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-transparent hover:bg-gray-700 rounded-md transition-all duration-200"
        >
          <MoveLeft className="text-3xl transition-all duration-200 hover:text-green-400 hover:scale-110" />
        </button>
        <h1 className="text-xl font-bold mb-6 text-center">
          Nhập mã gồm 6 chữ số mà bạn nhận được qua địa chỉ: {email}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input for the verification code */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Mã xác nhận
            </label>
            <VerificationInput
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
            />
          </div>
          {verifyCodeMutation.isError && (
            <p className="text-red-500 text-sm">{verifyCodeMutation.error?.message}</p>
          )}

          {/* Submit button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCodePage;

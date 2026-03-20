import { useState } from "react";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "@/hooks/useAuthMutations";
import { validateEmail } from "@/utils/validateEmail";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const forgotPasswordMutation = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Vui lòng nhập email của bạn!");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Email không đúng định dạng! Vui lòng kiểm tra lại");
      return;
    }
    setErrorMessage("");
    forgotPasswordMutation.mutate({ email });
    navigate("/verify");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-stone-600 to-black text-white">
      <div className="bg-[#121212] p-8 rounded-lg max-w-md w-full">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-transparent hover:bg-gray-700 rounded-md transition-all duration-200"
        >
          <MoveLeft className="text-3xl transition-all duration-200 hover:text-green-400 hover:scale-110" />
        </button>
        <h1 className="text-4xl font-bold mb-6 text-center">Quên mật khẩu</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Nhập Email của bạn để nhận mã xác nhận
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-2 w-full bg-[#121212] text-white rounded-md border-[1px] border-slate-400"
              placeholder="Nhập email của bạn"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-md"
            >
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

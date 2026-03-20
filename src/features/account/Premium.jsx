import Logo from "@/UI/Logo";

import { Link, useNavigate } from "react-router-dom";
import User from "../auth/User/User";
import BackButton from "@/UI/BackButton";
import { paymentAPI } from "@/services/apiPayment";
import { useAuth } from "@/providers/AuthProvider";
import { LogIn } from "lucide-react";

const Premium = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const handlePayment = async (value) => {
    const res = await paymentAPI(value);
    console.log(res);
    window.location.href = res.paymentUrl;
  };
  return (
    <div className="bg-primary text-white min-h-screen p-8">
      <div className="flex justify-between mb-8">
        <Link to="/">
          <Logo />
        </Link>

        {isLogin ? <User /> : <LogIn />}
      </div>
      <BackButton onClick={() => navigate(-1)} />
      <div>
        {/* Tiêu đề */}
        <h1 className="text-5xl font-bold text-center mb-4">
          Lợi ích của tất cả các gói Premium
        </h1>

        {/* Lợi ích */}
        <ul className="text-gray-400 text-center text-xl mt-10 ">
          <li>✔ Nghe nhạc không quảng cáo</li>
          <li>✔ Tải xuống để nghe không cần mạng</li>
          <li>✔ Phát nhạc theo thứ tự bất kỳ</li>
          <li>✔ Chất lượng âm thanh cao</li>
        </ul>
      </div>

      {/* Các Gói Premium */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mt-[5%] ">
        {/* Gói Mini */}
        <div className="bg-gray-800 p-6 rounded-lg w-full md:w-1/3 shadow-lg">
          <h3 className="text-green-400 text-2xl font-bold">Mini</h3>
          <p className="text-gray-400 mb-4">30.000đ/ 1 tháng</p>
          <ul className="text-sm mb-6">
            <li>
              • Nghe tới 30 bài hát trên 1 thiết bị khi không có kết nối mạng
            </li>
            <li>• Thanh toán một lần</li>
            <li>• Chất lượng âm thanh cơ bản</li>
            <li>• Có thể hủy bất cứ lúc nào</li>
          </ul>
          <button
            onClick={() => handlePayment(1)}
            className="bg-green-400 text-black font-bold w-full py-2 rounded-lg hover:bg-green-300 transition"
          >
            Mua Premium Mini
          </button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Có áp dụng điều khoản.
          </p>
        </div>

        {/* Gói Individual */}
        <div className="bg-gray-800 p-6 rounded-lg w-full md:w-1/3 shadow-lg">
          <h3 className="text-pink-400 text-2xl font-bold">Individual</h3>
          <p className="text-gray-400 mb-4">79.000đ/ 3 tháng</p>
          <ul className="text-sm mb-6">
            <li>• 1 tài khoản Premium</li>
            <li>• Hủy bất cứ lúc nào</li>
            <li>• Đăng ký hoặc thanh toán một lần</li>
          </ul>
          <button
            onClick={() => handlePayment(3)}
            className="bg-pink-400 text-black font-bold w-full py-2 rounded-lg hover:bg-pink-300 transition mt-5"
          >
            Mua Premium Individual
          </button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Có áp dụng điều khoản.
          </p>
        </div>

        {/* Gói Student */}
        <div className="bg-gray-800 p-6 rounded-lg w-full md:w-1/3 shadow-lg">
          <h3 className="text-blue-400 text-2xl font-bold">Super</h3>
          <p className="text-gray-400 mb-4">169.500đ / 6 tháng</p>
          <ul className="text-sm mb-6">
            <li>• 1 tài khoản Premium đã xác minh</li>
            <li>• Giảm hời chỉ 28.000đ/ 1 tháng</li>
            <li>• Đăng ký hoặc thanh toán một lần</li>
          </ul>
          <button
            onClick={() => handlePayment(6)}
            className="bg-blue-400 text-black font-bold w-full py-2 rounded-lg hover:bg-blue-300 transition mt-5"
          >
            Mua Premium Student
          </button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Có áp dụng điều khoản.
          </p>
        </div>

        {/* Gói Legend */}
        <div className="bg-gray-800 p-6 rounded-lg w-full md:w-1/3 shadow-lg">
          <h3 className="text-purple-400 text-2xl font-bold">Diamond</h3>
          <p className="text-gray-400 mb-4">349.000 đ / 1 năm</p>
          <ul className="text-sm mb-6">
            <li>• 1 tài khoản Premium đã xác minh</li>
            <li>• Đăng ký hoặc thanh toán một lần</li>
          </ul>
          <button
            onClick={() => handlePayment(12)}
            className="bg-purple-400 text-black font-bold w-full py-2 rounded-lg hover:bg-purple-300 transition mt-10"
          >
            Mua Premium Student
          </button>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Có áp dụng điều khoản.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;

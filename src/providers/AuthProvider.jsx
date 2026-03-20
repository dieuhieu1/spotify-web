import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useMyInfo } from "@/hooks/useMyInfoQuery";
import Spinner from "@/UI/Spinner";
import { createContext, useContext, useEffect, useState } from "react";

const updateApiToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [token, setToken] = useState(() => {
    const saved = sessionStorage.getItem("authToken");
    if (saved) updateApiToken(saved);
    return saved || "";
  });

  const { setUserData, reset } = useAuthStore();
  const { data: userInfo, isLoading } = useMyInfo();

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
      setIsLogin(true);
    }
  }, [userInfo, setUserData]);

  useEffect(() => {
    updateApiToken(token);
    if (!token) {
      reset();
      setIsLogin(false);
    }
  }, [token, reset]);

  if (isLoading) {
    return (
      <div className="h-screen w-full items-center flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        token,
        setToken,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

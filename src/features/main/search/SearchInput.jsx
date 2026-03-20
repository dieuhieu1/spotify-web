import { useAuth } from "@/providers/AuthProvider";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchInput = () => {
  const [, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isLogin, isDialogOpen, setIsDialogOpen } = useAuth();

  return (
    <div>
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative w-[450px] w-">
          <input
            type="text"
            placeholder="Bạn muốn phát nội dung gì?"
            className="w-full px-[50px] py-4 bg-[#121212] border border-black text-white rounded-full opacity-80 placeholder-white placeholder-opacity-80 cursor-pointer transition-opacity duration-100 hover:opacity-100 hover:border-white"
            onClick={() =>
              isLogin ? navigate("/search") : setIsDialogOpen(true)
            }
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchParams({ query: e.target.value });
            }}
          />
          <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;

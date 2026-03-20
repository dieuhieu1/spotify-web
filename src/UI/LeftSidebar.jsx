import stack_icon from "../assets/client-assets/stack.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/loadingSkeleton/PlaylistSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useAuthStore } from "@/store/useAuthStore";
import { useMyInfo } from "@/hooks/useMyInfoQuery";

function LeftSidebar() {
  const { userPlaylists } = useAuthStore();
  const navigate = useNavigate();
  const { isLogin, setIsDialogOpen } = useAuth();
  const { isLoading } = useMyInfo();

  const handleCreate = () => {
    if (isLogin) {
      navigate("playlist");
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="h-[100%] flex flex-col gap-2 rounded-md bg-primary p-4 font-medium text-stone-300">
      {/* Navigation Menu */}
      <header className="h-25 w-full sticky">
        <div className="flex items-center justify-between mb-7">
          <div className="flex">
            <img src={stack_icon} alt="Stack Icon" className="w-6 mr-3" />
            <p className="font-bold text-textPrimary">Thư viện</p>
          </div>
          <div className="flex items-center gap-5 mr-3 text-xl">
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => navigate("playlist")}
            />
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>

        {isLogin && (
          <div className="flex gap-2">
            <div className="rounded-full bg-padding py-1 px-4">Playlist</div>
            <div className="rounded-full bg-padding py-1 px-4">Nghệ sĩ</div>
            <div className="rounded-full bg-padding py-1 px-4">Album</div>
          </div>
        )}
      </header>

      {/* Library Section */}
      <main>
        <ScrollArea className="h-[calc(100vh-300px)]">
          {isLoading ? (
            <PlaylistSkeleton />
          ) : userPlaylists.length > 0 ? (
            userPlaylists.map((playlist) => (
              <Link
                to={`/playlist/${playlist?.id}`}
                key={playlist?.id}
                className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
              >
                <img
                  src={
                    playlist?.imageURL ||
                    "https://discussions.apple.com/content/attachment/592590040"
                  }
                  alt="Playlist IMG"
                  className="size-12 rounded-md flex-shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0 hidden md:block">
                  <p className="font-medium truncate">
                    {playlist?.title || "Unknown Playlist"}
                  </p>
                  <p className="text-sm text-zinc-400 truncate">
                    Playlist • {playlist?.creator || "Unknown User"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-[#1F1F1F] text-white p-6 rounded-lg w-80 shadow-lg mt-10">
              <h2 className="font-bold text-lg mb-2">
                Tạo danh sách phát đầu tiên của bạn
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Rất dễ! Chỉ cần vài bước đơn giản
              </p>
              <button
                onClick={handleCreate}
                className="bg-white text-black font-bold py-2 px-4 rounded-full hover:bg-gray-200 transition duration-200"
              >
                Tạo danh sách phát
              </button>
            </div>
          )}
        </ScrollArea>
      </main>
    </div>
  );
}

export default LeftSidebar;

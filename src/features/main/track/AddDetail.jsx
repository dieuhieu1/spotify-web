import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUpdatePlaylist } from "@/hooks/usePlaylistsQuery";
import { useSavedPlaylists } from "@/hooks/usePlaylistsQuery";
import { useNavigate, useParams } from "react-router-dom";

const PlaylistMenu = ({ showDetail }) => {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const updatePlaylistMutation = useUpdatePlaylist();
  const { data: savedPlaylists = [] } = useSavedPlaylists();
  const { user } = useAuthStore();

  const combinedPlaylists = [
    ...(savedPlaylists || []),
    ...(user?.createdPlaylists || []),
  ];

  const handleUpdate = (playlist) => {
    const songId = Number.parseInt(trackId.valueOf());
    updatePlaylistMutation.mutate({
      playlistId: playlist.id,
      updatedData: { songIds: [songId] },
    });
  };

  return (
    <>
      {showDetail && (
        <div className="relative text-left">
          <div className="bg-zinc-800 text-white rounded-md w-70 p-2 shadow-lg">
            <div
              className="flex items-center justify-between px-3 py-2 hover:bg-zinc-700 rounded cursor-pointer"
              onMouseEnter={() => setShowSubMenu(true)}
            >
              <span className="flex items-center gap-2">
                <Plus size={18} /> Thêm vào danh sách phát
              </span>
              <ChevronRight size={18} />
            </div>
          </div>

          {showSubMenu && (
            <div
              className="absolute top-0 left-64 z-10 bg-[#282828] text-white rounded-md w-64 shadow-lg"
              onMouseLeave={() => setShowSubMenu(false)}
            >
              <ul className="px-2 py-2">
                <li
                  className="flex hover:bg-[#3E3E3E] w-full px-3 py-2 rounded-md cursor-pointer"
                  onClick={() => navigate("/playlist")}
                >
                  <Plus className="mr-2" />
                  <p>Danh Sách Phát Mới</p>
                </li>

                {combinedPlaylists.length > 0 ? (
                  combinedPlaylists.map((playlist) => (
                    <li
                      onClick={() => handleUpdate(playlist)}
                      key={playlist?.id}
                      className="px-3 py-2 hover:bg-zinc-700 rounded cursor-pointer"
                    >
                      {playlist?.title}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-400">
                    Chưa có danh sách phát nào
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PlaylistMenu;

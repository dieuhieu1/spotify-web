import PlayButton from "@/features/main/playController/PlayButtonPlaylist";
import FeaturedGridSkeleton from "@/loadingSkeleton/FeaturedGridSkeleton";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

const FeaturedSection = ({ savedPlaylists = [], isLoading }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  if (isLoading) return <FeaturedGridSkeleton />;

  const combinedPlaylists = [
    ...(savedPlaylists || []),
    ...(user?.createdPlaylists || []),
  ];

  return (
    <>
      {combinedPlaylists && combinedPlaylists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {combinedPlaylists.map((playlist) => (
            <div
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              key={playlist?.id}
              className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
              hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
            >
              <img
                src={
                  playlist?.imageURL ||
                  "https://discussions.apple.com/content/attachment/592590040"
                }
                alt={playlist?.title || "Playlist Image"}
                className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
              />
              <div className="flex-1 p-4">
                <p className="font-medium truncate">
                  {playlist?.title || "Danh sách phát không tên"}
                </p>
                <p className="text-sm text-zinc-400 truncate">
                  {playlist?.artist ||
                    playlist?.creator ||
                    "Nghệ sĩ không xác định"}
                </p>
              </div>
              <PlayButton playlist={playlist} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FeaturedSection;

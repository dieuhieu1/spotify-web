import { useSearchSongs } from "@/hooks/useSearchQuery";
import { formatTime } from "@/features/player/PlaybackControls";
import PlayButtonSong from "../playController/PlayBtnSong";

const SearchSong = ({ query }) => {
  const { data: songs = [] } = useSearchSongs(query);

  return (
    <div className="p-6 bg-primary text-white font-sans">
      <div className="space-y-4">
        {songs.length > 0 ? (
          songs.map((song) => (
            <div
              key={song.id}
              className="flex justify-between items-center py-4 px-6 bg-[#121212] hover:bg-[#282828] rounded-md transition group relative"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={song.imageURL || "https://via.placeholder.com/150"}
                  alt={song?.name}
                  className="w-16 h-16 object-cover rounded-sm transition-transform duration-300 group-hover:scale-105"
                />
                <div>
                  <h3 className="font-semibold">{song?.name}</h3>
                  <p className="text-sm text-gray-400">
                    {song?.artists[0]?.name || "Unknown Artist"}
                  </p>
                  <p className="text-xs text-gray-400">{song?.album?.name}</p>
                </div>
              </div>
              <div className="text-gray-400 flex-1">
                {formatTime(song?.duration)}
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <PlayButtonSong song={song} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            Không tìm thấy bài hát nào
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchSong;

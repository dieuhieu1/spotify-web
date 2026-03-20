import { useState, useEffect } from "react";
import { formatTime } from "@/features/player/PlaybackControls";
import { Check } from "lucide-react";
import { useSearchSongs } from "@/hooks/useSearchQuery";

const SongSearch = ({ query, setQuery, handleAdd, addedSongs }) => {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: songs = [] } = useSearchSongs(debouncedQuery);

  return (
    <div className="mt-2">
      <div className="flex flex-col items-center gap-4 mb-3">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="🔍 Tìm bài hát và tập podcast"
          className="bg-zinc-800 w-full p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />

        <ul className="w-full">
          {songs?.length > 0 &&
            songs.map((song) => (
              <li
                key={song?.id}
                className="flex justify-between items-center py-2 px-4 hover:bg-zinc-800 rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={song?.imageURL}
                    alt={song?.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{song?.name}</p>
                    <p className="text-sm text-gray-400">
                      {song?.artists?.[0]?.name}
                    </p>
                  </div>
                  <div className="text-gray-400 text-center flex-shrink-0 w-[120px]">
                    {song?.listener} lượt nghe
                  </div>
                  <div className="text-gray-400 text-center flex-shrink-0 w-[120px]">
                    {formatTime(song?.duration)}
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(song?.id)}
                  className="flex gap-4 items-center border border-white px-4 py-2 rounded-full hover:scale-105 opacity-90 transition-all hover:opacity-100"
                >
                  {addedSongs?.includes(song.id) ? (
                    <Check className="text-green-500" size={24} />
                  ) : (
                    <span className="text-white font-bold">Thêm</span>
                  )}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SongSearch;

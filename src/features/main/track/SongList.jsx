import { formatTime } from "@/features/player/PlaybackControls";
import { useSongsByGenre } from "@/hooks/useSongsQuery";
import { useArtistById } from "@/hooks/useArtistsQuery";

const SongList = ({ song: current }) => {
  const { data: suggestSongs = [] } = useSongsByGenre(current?.genre?.id);
  const { data: currentArtist } = useArtistById(current?.artists?.[0]?.id);

  const uniqueSongs = suggestSongs.filter((s) => s.name !== current?.name);
  const artistPopularSongs = currentArtist?.songs?.filter(
    (s) => s.name !== current?.name
  );

  return (
    <div className="bg-primary text-white min-h-screen px-6 py-4">
      <section>
        <h2 className="text-2xl font-bold mb-4">Đề xuất</h2>
        <p className="text-gray-400 text-sm mb-4">Dựa trên bài hát này</p>
        <ul>
          {uniqueSongs?.map((song) => (
            <li
              key={song?.id}
              className={`flex justify-between items-center py-2 hover:bg-zinc-800 rounded-md px-3`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={song?.imageURL}
                  alt={song?.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{song?.name}</p>
                  <p className="text-sm text-gray-400">
                    {song?.artists?.[0]?.name}
                  </p>
                </div>
              </div>
              <span className="text-gray-400">{song?.listener} lượt nghe</span>
              <div className="flex gap-6 items-center">
                <span className="text-gray-400">
                  {formatTime(song?.duration)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SongList;

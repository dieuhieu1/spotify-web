import { Play, Pause } from "lucide-react";
import { formatDuration } from "@/utils/formatDuration";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useArtistById } from "@/hooks/useArtistsQuery";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Artist = () => {
  const { artistId } = useParams();
  const { data: currentArtist } = useArtistById(artistId);
  const { currentSong, isPlaying, playArtist, togglePlay } = usePlayerStore();

  const handlePlayArtist = () => {
    if (!currentArtist) return;
    const isCurrentArtistPlaying = currentArtist?.songs.some(
      (song) => song?.id === currentSong?.id
    );
    if (isCurrentArtistPlaying) {
      togglePlay();
    } else {
      playArtist(currentArtist?.songs, 0);
    }
  };

  const handlePlaySong = (index) => {
    if (!currentArtist) return;
    playArtist(currentArtist?.songs, index);
  };

  return (
    <div className="text-white overflow-auto h-full  bg-gradient-to-b from-stone-600 to-primary">
      <div
        className="relative h-[300px] w-full bg-center bg-cover rounded-md overflow-hidden"
        style={{ backgroundImage: `url(${currentArtist?.imageURL})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative flex items-center p-8 gap-6">
          <img
            src={currentArtist?.imageURL}
            alt={currentArtist?.name}
            className="w-48 h-48 rounded object-cover shadow-xl"
          />
          <div>
            <p className="flex items-center gap-2 text-sm">
              <span className="inline-block bg-blue-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline-block text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Nghệ sĩ được xác minh
              </span>
            </p>
            <h1 className="text-9xl font-bold">{currentArtist?.name}</h1>
            <p className="mt-4 text-xl">
              {currentArtist?.follower} người nghe hằng tháng
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 flex items-center gap-6">
        <Button
          onClick={handlePlayArtist}
          size="icon"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
        >
          {isPlaying &&
          currentArtist?.songs.some((song) => song?.id === currentSong?.id) ? (
            <Pause className="h-7 w-7 text-black" />
          ) : (
            <Play className="h-7 w-7 text-black" />
          )}
        </Button>
      </div>

      <div className="px-8">
        <h2 className="text-2xl font-bold mb-4">Phổ biến</h2>
        <div className="text-gray-400">
          <div className="space-y-2 py-4">
            {currentArtist?.songs?.map((song, index) => {
              const isCurrentSong = currentSong?.id === song.id;
              return (
                <div
                  key={song.id}
                  className="grid grid-cols-[16px_4fr_2fr_1fr_0.25fr] gap-4 py-2 px-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                >
                  <div
                    className="flex items-center justify-center group"
                    onClick={() => handlePlaySong(index)}
                  >
                    {isCurrentSong && isPlaying && (
                      <>
                        <div className="size-4 text-green-500 group-hover:hidden">
                          ♫
                        </div>
                        <span className="group-hover:block hidden">
                          <Pause className="h-4 w-4 text-green-500" />
                        </span>
                      </>
                    )}
                    {isCurrentSong && !isPlaying && (
                      <>
                        <span className="size-4 text-green-500 group-hover:hidden">
                          {index + 1}
                        </span>
                        <Play className="h-4 w-4 hidden group-hover:block text-green-500" />
                      </>
                    )}
                    {!isCurrentSong && <span>{index + 1}</span>}
                  </div>

                  <div className="flex items-center gap-2 ">
                    <img
                      src={
                        song.imageURL ||
                        "https://discussions.apple.com/content/attachment/592590040"
                      }
                      alt=""
                      className="w-[40px] h-[40px]"
                    />
                    <div>
                      <div className="font-medium text-white truncate hover:underline cursor-pointer">
                        {song.name}
                      </div>
                      <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                        {song?.artists?.[0]?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">{song.listener}</div>
                  <div className="flex items-center">{song.createdAt}</div>
                  <div className="flex items-center">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;

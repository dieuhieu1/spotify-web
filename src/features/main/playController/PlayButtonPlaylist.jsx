import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Pause, Play } from "lucide-react";

const PlayButtonPlaylist = ({ playlist }) => {
  const { isPlaying, togglePlay, playPlaylist, currentSong } = usePlayerStore();

  const isCurrentPlaylistPlaying = playlist?.songs?.some(
    (song) => song?.id === currentSong?.id
  );

  const handlePlay = () => {
    if (isCurrentPlaylistPlaying) {
      togglePlay();
    } else {
      playPlaylist(playlist?.songs, 0);
    }
  };

  return (
    <Button
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-green-500
        rounded-[50%] w-[20px] h-auto hover:bg-green-400 hover:scale-105 transition-all
        opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentPlaylistPlaying
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentPlaylistPlaying && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};

export default PlayButtonPlaylist;

import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Pause, Play } from "lucide-react";

const PlayButtonArtist = ({ artist }) => {
  const { isPlaying, togglePlay, playArtist, currentSong } = usePlayerStore();

  const isCurrentArtistPlaying = artist?.songs?.some(
    (song) => song?.id === currentSong?.id
  );

  const handlePlay = () => {
    if (isCurrentArtistPlaying) {
      togglePlay();
    } else {
      playArtist(artist?.songs, 0);
    }
  };

  return (
    <Button
      onClick={handlePlay}
      className={`absolute bottom-4 right-2 bg-green-500
        rounded-[50%] w-[20px] h-auto hover:bg-green-400 hover:scale-105 transition-all
        opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentArtistPlaying
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentArtistPlaying && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};

export default PlayButtonArtist;

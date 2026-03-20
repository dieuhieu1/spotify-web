import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useSongById } from "@/hooks/useSongsQuery";
import { formatDuration } from "@/utils/formatDuration";
import { Ellipsis, Pause, Play } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistMenu from "./AddDetail";
import SongList from "./SongList";

const Track = () => {
  const { trackId } = useParams();
  const { data: current, isLoading } = useSongById(trackId);
  const { currentSong, isPlaying, togglePlay, playSong } = usePlayerStore();
  const [showDetail, setShowDetail] = useState(false);

  const handleShow = () => {
    setShowDetail((prev) => !prev);
  };

  const handlePlaySong = () => {
    if (!current) return;
    const isCurrentSong = currentSong?.id === current?.id;
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(current, 0);
    }
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full bg-gradient-to-b from-[red] via-zinc-900/80 to-zinc-900 ">
        <div className="relative min-h-full ">
          <div className="absolute inset-0  z-0 h-full" aria-hidden="true">
            <div className="relative z-10">
              <div className="flex p-6 gap-6 pb-8">
                <img
                  src={current?.imageURL}
                  alt=""
                  className="w-[240px] h-[240px] shadow-xl rounded object-cover"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">Song</p>
                  <h1 className="text-7xl font-bold my-4">{current?.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-zinc-100">
                    <span className="font-medium text-white">
                      • {current?.artists?.[0]?.name}
                    </span>
                    <span>• {current?.album?.name} Songs</span>
                    <span>• {current?.createdAt}</span>
                    <span>• {formatDuration(current?.duration)}</span>
                    <span>• {current?.listener} lượt nghe</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlaySong}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                {isPlaying ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black" />
                )}
              </Button>
              <div
                className="hover:scale-105 transition-all cursor-pointer"
                onClick={() => handleShow()}
              >
                <Ellipsis size={32} />
              </div>
              <PlaylistMenu showDetail={showDetail} />
            </div>

            <SongList song={current} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Track;

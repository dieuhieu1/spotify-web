import FeaturedSection from "@/features/main/home/FeaturedSection";
import SectionGrid from "@/features/main/home/SectionGrid";
import Suggest from "@/features/main/home/Suggest";
import { useAuth } from "@/providers/AuthProvider";
import { updatePremium } from "@/services/apiPayment";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useArtists } from "@/hooks/useArtistsQuery";
import { useTrendingSongs } from "@/hooks/useSongsQuery";
import { useSavedPlaylists } from "@/hooks/usePlaylistsQuery";
import { getResponsePayment } from "@/utils/getToken";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect } from "react";

function Home() {
  const { data: trendingSongs = [], isLoading: isTrendingLoading } =
    useTrendingSongs();
  const { data: savedPlaylists = [] } = useSavedPlaylists();
  const { data: artists = [], isLoading: isArtistsLoading } = useArtists(
    1,
    100,
    "follower",
    "desc"
  );
  const { initializeQueue, setTrendingSongs } = usePlayerStore();
  const { isLogin } = useAuth();

  const data = getResponsePayment();
  useEffect(() => {
    const { responseCode, amount } = data;
    if (responseCode && amount) {
      updatePremium(responseCode, amount);
    }
  }, [data]);

  useEffect(() => {
    if (savedPlaylists.length > 0 && trendingSongs.length > 0) {
      const songInSaved = savedPlaylists.flatMap((playlist) => playlist.songs);
      const allSongs = [...songInSaved, ...trendingSongs];
      const uniqueSongs = [
        ...new Map(allSongs.map((song) => [song.id, song])).values(),
      ];
      initializeQueue(uniqueSongs);
    }
    setTrendingSongs(trendingSongs);
  }, [trendingSongs, savedPlaylists, initializeQueue, setTrendingSongs]);

  const isMainLoading = isTrendingLoading || isArtistsLoading;

  return (
    <div>
      <main className="rounded-md overflow-auto h-full bg-gradient-to-b from-stone-700 to-primary">
        <ScrollArea className="h-[calc(100vh-200px)] ">
          <div className="p-4 sm:p-6 pb-10">
            <div>
              {isLogin ? (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Good afternoon
                  </h1>
                  <FeaturedSection
                    savedPlaylists={savedPlaylists}
                    isLoading={isMainLoading}
                  />
                  <SectionGrid
                    title="Trending Songs"
                    songs={trendingSongs}
                    isMainLoading={isMainLoading}
                  />
                  <SectionGrid
                    title="Popular Artists"
                    artists={artists}
                    isMainLoading={isMainLoading}
                  />
                </>
              ) : (
                <Suggest />
              )}
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

export default Home;

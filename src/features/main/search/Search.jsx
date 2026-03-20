import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import TopResults from "./TopResults";
import SearchArtist from "./SearchArtist";
import SearchSong from "./SearchSong";
import SearchPlaylist from "./SearchPlaylist";
import TopResultsSkeleton from "@/loadingSkeleton/TopResultsSkeleton";
import { useTopResults } from "@/hooks/useSearchQuery";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState("Tất cả");
  const query = searchParams.get("query") || "";
  const { isLoading } = useTopResults(query);

  if (!query || isLoading) {
    return <TopResultsSkeleton />;
  }

  return (
    <>
      <div className="bg-primary text-white h-[calc(100vh-200px)] p-6 font-sans overflow-auto">
        <div className="flex gap-3 mb-6">
          {["Tất cả", "Nghệ sĩ", "Bài hát", "Playlist"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`py-1 px-4 rounded-full transition ${
                selectedTab === tab
                  ? "bg-gray-600 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {selectedTab === "Tất cả" && <TopResults query={query} />}
        {selectedTab === "Nghệ sĩ" && <SearchArtist query={query} />}
        {selectedTab === "Bài hát" && <SearchSong query={query} />}
        {selectedTab === "Playlist" && <SearchPlaylist query={query} />}
      </div>
    </>
  );
};

export default Search;

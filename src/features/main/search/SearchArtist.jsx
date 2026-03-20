import { useNavigate } from "react-router-dom";
import PlayButtonArtist from "../playController/PlayBtnArtists";
import { useSearchArtists } from "@/hooks/useSearchQuery";

const SearchArtist = ({ query }) => {
  const { data: artists = [] } = useSearchArtists(query);
  const navigate = useNavigate();

  return (
    <div className=" bg-primary text-white font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(6,_235px)] gap-5">
        {artists?.map((artist) => (
          <div
            onClick={() => navigate(`/artist?${artist.id}`)}
            key={artist?.id}
            className="p-2 rounded-md w-[100%] hover:bg-zinc-700/40 transition-all cursor-pointer relative group"
          >
            <div className="aspect-square rounded-full shadow-sm  shadow-black overflow-hidden">
              <img
                src={
                  artist?.imageURL ||
                  "https://discussions.apple.com/content/attachment/592590040"
                }
                alt={artist?.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 "
              />
            </div>
            <div className="mt-2">
              <p className="text-md font-semibold">{artist?.name}</p>
              <p className="text-sm text-gray-400">Nghệ sĩ</p>
            </div>
            <PlayButtonArtist artist={artist} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchArtist;

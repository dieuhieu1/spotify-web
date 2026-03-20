import { useNavigate } from "react-router-dom";
import PlayButtonPlaylist from "../playController/PlayButtonPlaylist";
import { useSearchPlaylists } from "@/hooks/useSearchQuery";

const SearchPlaylist = ({ query }) => {
  const { data: playlists = [] } = useSearchPlaylists(query);
  const navigate = useNavigate();

  return (
    <div className=" bg-primary text-white font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(6,_235px)] gap-5">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              key={playlist.id}
              className="w-[200px] h-[250px] flex flex-col hover:bg-zinc-700/40 transition-all cursor-pointer relative group p-3 rounded-md"
            >
              <div className=" aspect-square shadow-sm rounded-md shadow-black overflow-hidden">
                <img
                  src={playlist.imageURL}
                  alt={playlist.title}
                  className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105 "
                />
              </div>
              <p className="text-md font-semibold mt-2">{playlist.title}</p>
              <p className="text-sm text-gray-400">Của {playlist?.creator}</p>
              <div onClick={(e) => e.stopPropagation()}>
                <PlayButtonPlaylist playlist={playlist} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            Không tìm thấy playlist nào
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPlaylist;

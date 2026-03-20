import { formatTime } from "@/features/player/PlaybackControls";
import SectionGrid from "../home/SectionGrid";
import PlayButtonArtist from "../playController/PlayBtnArtists";
import PlayButtonPlaylist from "../playController/PlayButtonPlaylist";
import PlayButtonSong from "../playController/PlayBtnSong";
import { useNavigate } from "react-router-dom";
import {
  useTopResults,
  useSearchSongs,
  useSearchArtists,
  useSearchPlaylists,
} from "@/hooks/useSearchQuery";

const TopResults = ({ query }) => {
  const { data: topResults = [] } = useTopResults(query);
  const { data: songs = [] } = useSearchSongs(query);
  const { data: artists = [] } = useSearchArtists(query);
  const { data: playlists = [] } = useSearchPlaylists(query);
  const navigate = useNavigate();

  const renderPlayButton = (type, data) => {
    switch (type) {
      case "Artist":
        return <PlayButtonArtist artist={data} />;
      case "Playlist":
        return <PlayButtonPlaylist playlist={data} />;
      case "Song":
        return <PlayButtonSong song={data} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-row gap-[18%]">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Kết quả hàng đầu</h2>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Bài hát</h2>
      </div>
      <div className="flex">
        {topResults.length > 0 ? (
          <div
            className="flex items-start flex-col justify-center bg-bgPrimary hover:bg-bgHover cursor-pointer rounded-lg p-8 gap-4 w-[30%] group transition-all relative"
            onClick={() => navigate(`/track/${topResults?.[0]?.response?.id}`)}
          >
            <img
              src={topResults?.[0]?.response?.imageURL}
              alt={topResults?.[0]?.response?.name}
              className="w-24 h-24 rounded-full aspect-square object-cover"
            />
            <div>
              <h3 className="font-bold text-4xl">
                {topResults?.[0]?.response?.name ||
                  topResults?.[0]?.response?.title}
              </h3>
              <p className="text-gray-400 text-lg mt-2">
                {topResults?.[0]?.type} •{" "}
                {topResults?.[0]?.response?.creator || ""}
              </p>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              {renderPlayButton(
                topResults?.[0]?.type,
                topResults?.[0]?.response
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-start flex-col justify-center bg-bgPrimary hover:bg-bgHover cursor-pointer rounded-lg p-8 gap-4 w-[30%]">
            <img
              src="https://via.placeholder.com/150"
              alt=""
              className="w-24 h-24 rounded-full aspect-square object-cover"
            />
            <div>
              <h3 className="font-bold text-4xl">Không có tìm kiếm phù hợp</h3>
              <p className="text-gray-400 text-lg"> Không có kết quả phù hợp</p>
            </div>
          </div>
        )}

        {songs.length > 0 ? (
          <div className="ml-3 w-[70%]">
            <ul>
              {songs.slice(0, 5).map((song) => (
                <li
                  key={song.id}
                  className="flex justify-between gap-x-4 items-center py-2 px-4 hover:bg-bgHover cursor-pointer rounded-lg transition ml-4 relative group"
                  onClick={() => navigate(`/track/${song.id}`)}
                >
                  <div className="flex gap-4 flex-1">
                    <img
                      src={song?.imageURL}
                      alt={song?.name}
                      className="w-10 h-10 object-cover rounded-sm "
                    />
                    <div>
                      <h3 className="font-semibold">{song?.name}</h3>
                      <p className="text-sm text-gray-400">
                        {song?.artists?.[0]?.name || ""}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 flex-1">
                    {formatTime(song?.duration)}
                  </span>
                  <div onClick={(e) => e.stopPropagation()}>
                    <PlayButtonSong song={song} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="ml-14">Không có bài hát trùng khớp</p>
        )}
      </div>

      {playlists.length > 0 ? (
        <div className="mt-8">
          <SectionGrid playlists={playlists} title={"Playlists"} />
        </div>
      ) : (
        <div className="mt-4 h-[200px]">
          <SectionGrid title={"Không tìm thấy Danh Sách Phát trùng khớp"} />
        </div>
      )}

      {artists.length > 0 ? (
        <div className="mt-8">
          <SectionGrid artists={artists} title={"Nghệ Sĩ"} />
        </div>
      ) : (
        <div className="mt-4 h-[200px]">
          <SectionGrid title={"Không tìm thấy Nghệ Sĩ trùng khớp"} />
        </div>
      )}
    </>
  );
};

export default TopResults;

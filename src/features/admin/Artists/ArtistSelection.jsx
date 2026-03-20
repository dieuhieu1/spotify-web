import { useState } from "react";
import { X } from "lucide-react";
import { useArtists } from "@/hooks/useArtistsQuery";

const ArtistSelection = ({ song, setSong }) => {
  const { data: artists = [] } = useArtists();
  const [selectedArtistsId, setSelectedArtistsId] = useState(
    song?.artistIds || []
  );
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [filteredArtists, setFilteredArtists] = useState([]); // Filtered artists based on search

  // Handle artist selection
  const handleSelectArtist = (artistId) => {
    if (!selectedArtistsId.includes(artistId)) {
      const updatedArtists = [...selectedArtistsId, artistId];
      setSelectedArtistsId(updatedArtists);
      setSong({ ...song, artistIds: updatedArtists });
    }
  };

  // Handle removing artist from the selected list
  const handleRemoveArtist = (artistId) => {
    const updatedArtists = selectedArtistsId.filter((id) => id !== artistId);
    setSelectedArtistsId(updatedArtists);
    setSong({ ...song, artistIds: updatedArtists });
  };

  // Filter artists based on search term
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    // Filter the artists based on the search term
    const filtered = artists.filter((artist) =>
      artist.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredArtists(filtered);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">Artists </label>

      {/* Search input for filtering artists */}
      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 bg-zinc-800 border border-zinc-700 text-white rounded-md"
      />

      {/* Dropdown with filtered artists */}
      {searchTerm && filteredArtists.length > 0 && (
        <div className="bg-zinc-800 border border-zinc-700 text-white shadow-md rounded-md mt-2">
          {filteredArtists.map((artist) => (
            <div
              key={artist._id}
              onClick={() => {
                handleSelectArtist(artist.id);
                setSearchTerm("");
              }}
              className="px-4 py-2 hover:bg-zinc-700 cursor-pointer rounded-md"
            >
              {artist.name}
            </div>
          ))}
        </div>
      )}

      {/* Display selected artists with a remove button */}
      <div className="mt-4 flex flex-wrap">
        {selectedArtistsId.map((id) => {
          const artist = artists.find((a) => a.id === id);
          console.log(artist);
          return artist ? (
            <div
              key={artist.id}
              className="flex items-center bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2"
            >
              <span className="text-sm text-gray-700">{artist.name}</span>
              <X
                className="ml-2 text-gray-500 cursor-pointer hover:text-red-500"
                onClick={() => handleRemoveArtist(artist.id)} // Remove artist by ID
              />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default ArtistSelection;

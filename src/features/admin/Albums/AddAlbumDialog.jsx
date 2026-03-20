import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useArtists } from "@/hooks/useArtistsQuery";
import { useSongs } from "@/hooks/useSongsQuery";
import { useAddAlbum } from "@/hooks/useAlbumsQuery";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable";

const AddAlbumDialog = () => {
  const { data: artists = [] } = useArtists();
  const { data: songs = [] } = useSongs(1, 100);
  const addAlbumMutation = useAddAlbum();
  const isLoading = addAlbumMutation.isPending;
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [newAlbum, setNewAlbum] = useState({
    name: "",
    description: "",
    followers: "",
    artists: [],
    songs: [],
  });

  const [files, setFiles] = useState({
    image: null,
  });

  const imageInputRef = useRef(null);
  const clearData = () => {
    setNewAlbum({
      name: "",
      description: "",
      followers: "",
      artists: [],
      songs: [],
    });

    setFiles({
      image: null,
    });
  };
  const handleSongsChange = (selectedOptions) => {
    const songsArray = selectedOptions.map((option) => option.value);
    setNewAlbum({ ...newAlbum, songs: songsArray });
  };
  const handleArtistsChange = (selectedOptions) => {
    const artistsArray = selectedOptions.map((option) => option.value);
    setNewAlbum({ ...newAlbum, artists: artistsArray });
  };
  const handleSubmit = async () => {
    if (!files.image) {
      return toast.error("Please upload image files");
    }

    const formData = new FormData();

    formData.append("name", newAlbum.name);
    formData.append("description", newAlbum.description);
    formData.append("follower", newAlbum.followers);
    formData.append("artists", newAlbum.artists);
    formData.append("songs", newAlbum.songs);

    formData.append("image", files.image);
    // Cách để log các cặp key-value trong formData
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // In key và value của mỗi phần tử trong FormData
    }
    addAlbumMutation.mutate(formData);
    clearData();
    setSongDialogOpen(false);
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto text-white">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your music library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            ref={imageInputRef}
            className="hidden text-white"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFiles((prev) => ({ ...prev, image: file }));
            }}
          />

          {/* Image upload area */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs">{files.image.name.slice(0, 20)}</div>
                  {/* Image Preview */}
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(files.image)} // Create a preview URL for the selected image
                      alt="Song Artwork Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm">Upload artwork</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-white"
                  >
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Title</label>
            <Input
              value={newAlbum.name}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, name: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Description
            </label>
            <Input
              value={newAlbum.description}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, description: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Follower</label>
            <Input
              type="number"
              min="0"
              value={newAlbum.follower}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, follower: e.target.value || "0" })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          {/* Songs Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white ">
              Songs (Optional)
            </label>
            <CreatableSelect
              isMulti
              options={songs.map((song) => ({
                label: song.name,
                value: song.id,
              }))}
              onChange={handleSongsChange}
              placeholder="Select or add songs..."
              className="bg-zinc-800 border-zinc-700"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#27272a", // Màu nền bg-zinc-800
                  borderColor: "#3F3F46", // Màu viền border-zinc-700
                  color: "white", // Màu chữ text-white
                  borderRadius: "0.375rem", // Rounded-lg
                  padding: "0.25rem", // Padding nội bộ
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#27272a", // Menu nền
                  borderColor: "#3F3F46", // Viền menu
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#3F3F46" : "#27272a", // Nền khi hover
                  color: state.isFocused ? "white" : "#A1A1AA", // Màu chữ hover
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#3F3F46", // Màu nền thẻ chọn
                  color: "white",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "white", // Màu chữ của thẻ chọn
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "#A1A1AA", // Màu nút xóa
                  ":hover": {
                    backgroundColor: "#EF4444", // Nền khi hover nút xóa
                    color: "white",
                  },
                }),
                input: (base) => ({
                  ...base,
                  color: "white", // Màu chữ khi gõ vào input
                }),
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white ">
              Artists (Optional)
            </label>
            <CreatableSelect
              isMulti
              options={artists.map((artist) => ({
                label: artist.name,
                value: artist.id,
              }))}
              onChange={handleArtistsChange}
              placeholder="Select or add songs..."
              className="bg-zinc-800 border-zinc-700"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#27272a", // Màu nền bg-zinc-800
                  borderColor: "#3F3F46", // Màu viền border-zinc-700
                  color: "white", // Màu chữ text-white
                  borderRadius: "0.375rem", // Rounded-lg
                  padding: "0.25rem", // Padding nội bộ
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#27272a", // Menu nền
                  borderColor: "#3F3F46", // Viền menu
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#3F3F46" : "#27272a", // Nền khi hover
                  color: state.isFocused ? "white" : "#A1A1AA", // Màu chữ hover
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#3F3F46", // Màu nền thẻ chọn
                  color: "white",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "white", // Màu chữ của thẻ chọn
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "#A1A1AA", // Màu nút xóa
                  ":hover": {
                    backgroundColor: "#EF4444", // Nền khi hover nút xóa
                    color: "white",
                  },
                }),
                input: (base) => ({
                  ...base,
                  color: "white", // Màu chữ khi gõ vào input
                }),
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setSongDialogOpen(false);
              clearData();
            }}
            disabled={isLoading}
            className="text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="text-white"
          >
            {isLoading ? "Uploading..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumDialog;

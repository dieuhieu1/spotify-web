import CreatableSelect from "react-select/creatable";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddPlaylist } from "@/hooks/usePlaylistsQuery";
import { useSongs } from "@/hooks/useSongsQuery";
import UploadImage from "../file-upload/UploadImage";

const AddPlaylistDialog = () => {
  const addPlaylistMutation = useAddPlaylist();
  const { data: songs = [] } = useSongs(1, 100);
  const isLoading = addPlaylistMutation.isPending;
  const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);
  const [image, setImage] = useState(false);

  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    description: "",
    imageURL: "",
    follower: "",
    listener: "",
    songIds: [],
  });

  const clearData = () => {
    setNewPlaylist({
      title: "",
      description: "",
      imageURL: "",
      follower: "",
      listener: "",
      songIds: [],
    });

    setImage(null);
  };
  const handleSongsChange = (selectedOptions) => {
    const songsArray = selectedOptions.map((option) => {
      return option.id;
    });
    setNewPlaylist({ ...newPlaylist, songIds: songsArray });
  };
  const handleSubmit = async () => {
    if (!image) {
      return toast.error("Please upload image files");
    }
    newPlaylist.imageURL = image.url;
    addPlaylistMutation.mutate(newPlaylist);
    clearData();
    setPlaylistDialogOpen(false);
  };

  return (
    <Dialog open={playlistDialogOpen} onOpenChange={setPlaylistDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Playlist
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto text-white">
        <DialogHeader>
          <DialogTitle>Add New Playlist</DialogTitle>
          <DialogDescription>
            Add a new playlist to your music app
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <UploadImage
            image={image}
            setImage={setImage}
            nameField={"Playlist Image"}
          />
          {/* Other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Title</label>
            <Input
              value={newPlaylist.title}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Description
            </label>
            <Input
              value={newPlaylist.description}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, description: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          {/* Follower */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Follower</label>
            <Input
              type="number"
              min="0"
              value={newPlaylist.follower}
              onChange={(e) =>
                setNewPlaylist({
                  ...newPlaylist,
                  follower: e.target.value || "0",
                })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          {/* Listener */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Listener</label>
            <Input
              type="number"
              min="0"
              value={newPlaylist.listener}
              onChange={(e) =>
                setNewPlaylist({
                  ...newPlaylist,
                  listener: e.target.value || "0",
                })
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
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setPlaylistDialogOpen(false);
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
            {isLoading ? "Uploading..." : "Add Playlist"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlaylistDialog;

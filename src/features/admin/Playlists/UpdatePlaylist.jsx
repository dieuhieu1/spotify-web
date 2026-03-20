import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import UploadImage from "../file-upload/UploadImage";
import { useUpdatePlaylist } from "@/hooks/usePlaylistsQuery";
import { useSongs } from "@/hooks/useSongsQuery";
import { useAllFiles } from "@/hooks/useUploadMutation";
import SongSelection from "./SongSelection";

const UpdatePlaylist = ({ playlist }) => {
  const { data: songs = [] } = useSongs(1, 100);
  const updatePlaylistMutation = useUpdatePlaylist();
  const { data: files } = useAllFiles();
  const isLoading = updatePlaylistMutation.isPending;
  const [image, setImage] = useState(null);
  const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);

  const [updatedPlaylist, setUpdatedPlaylist] = useState({
    title: playlist.title,
    imageURL: playlist.imageURL,
    songIds: playlist.songs.map((item) => item.id),
  });

  useEffect(() => {
    if (files) {
      const image = files?.find((item) => item.url === playlist.imageURL);
      setImage(image);
    }
  }, [files, playlist.imageURL]);

  const clearData = () => {
    setUpdatedPlaylist({
      title: "",
      imageURL: "",
      songIds: [],
    });
    setImage(null);
  };

  const handleSubmit = async () => {
    if (image) {
      updatedPlaylist.imageURL = image.imageURL;
    }

    updatePlaylistMutation.mutate({ playlistId: playlist.id, updatedData: updatedPlaylist });
    clearData();
    setPlaylistDialogOpen(false);
  };

  return (
    <Dialog open={playlistDialogOpen} onOpenChange={setPlaylistDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
        >
          <Pen className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto text-white">
        <DialogHeader>
          <DialogTitle>Update Song</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Image upload area */}
          <UploadImage
            image={image}
            setImage={setImage}
            nameField={"Playlist Image"}
          />

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Name</label>
            <Input
              value={updatedPlaylist.title}
              onChange={(e) =>
                setUpdatedPlaylist({
                  ...updatedPlaylist,
                  title: e.target.value,
                })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          {/* Songs Input */}
          <SongSelection
            playlist={updatedPlaylist}
            setPlaylist={setUpdatedPlaylist}
            songs={songs}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setPlaylistDialogOpen(false);
              clearData();
            }}
            disabled={isLoading}
            className="text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
          >
            {isLoading ? "Uploading..." : "Update Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlaylist;

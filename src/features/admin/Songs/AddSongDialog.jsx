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
import UploadSong from "../file-upload/UploadSong";
import UploadImage from "../file-upload/UploadImage";
import ArtistSelection from "../Artists/ArtistSelection";
import { useAddSong } from "@/hooks/useSongsQuery";

const AddSongDialog = () => {
  const addSongMutation = useAddSong();
  const isLoading = addSongMutation.isPending;
  const isUploading = false;
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [songDialogOpen, setSongDialogOpen] = useState(false);

  const [newSong, setNewSong] = useState({
    name: "",
    imageURL: "",
    fileSongURL: "",
    duration: 0,
    listener: 0,
    artistIds: [],
  });

  const clearData = () => {
    setNewSong({
      name: "",
      imageURL: "",
      fileSongURL: "",
      duration: 0,
      listener: 0,
      artistIds: [],
    });

    setAudio(null);
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!audio || !image) {
      return toast.error("Please upload both audio and image files");
    }
    newSong.imageURL = image.url;
    newSong.duration = Math.floor(audio.duration);
    newSong.fileSongURL = audio.url;
    addSongMutation.mutate(newSong);
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

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[95vh] max-w-[60vh] overflow-auto text-white">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your music library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Image upload area */}
          <UploadImage
            image={image}
            setImage={setImage}
            nameField={"Song Image"}
          />
          {/* Upload Song */}
          <UploadSong audio={audio} setAudio={setAudio} />

          {/* Other fields */}

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Name</label>
            <Input
              value={newSong.name}
              onChange={(e) => setNewSong({ ...newSong, name: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          {/* Artists Decription */}
          <ArtistSelection song={newSong} setSong={setNewSong} />
          {/* Duration Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Duration (seconds)
            </label>
            <Input
              type="number"
              value={Math.floor(audio?.duration) || 0}
              onChange={(e) =>
                setNewSong({ ...newSong, duration: e.target.value || "0" })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
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
            disabled={isLoading || isUploading}
            className="text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || isUploading}
            className="text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
          >
            {isLoading ? "Uploading..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;

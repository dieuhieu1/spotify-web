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
import toast from "react-hot-toast";
import UploadSong from "../file-upload/UploadSong";
import UploadImage from "../file-upload/UploadImage";
import ArtistSelection from "../Artists/ArtistSelection";
import { useUpdateSong } from "@/hooks/useSongsQuery";
import { useAllFiles } from "@/hooks/useUploadMutation";

const UpdateSong = ({ song }) => {
  const updateSongMutation = useUpdateSong();
  const { data: files } = useAllFiles();
  const isUploading = updateSongMutation.isPending;

  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [songDialogOpen, setSongDialogOpen] = useState(false);

  const [updatedSong, setUpdatedSong] = useState({
    name: song.name,
    imageURL: song.imageURL,
    fileSongURL: song.fileSongURL,
    duration: song.duration,
    listener: song.listener,
    artistIds: song?.artists?.map((item) => item.id),
  });

  useEffect(() => {
    if (files) {
      const image = files?.find((item) => item.url === song.imageURL);
      const audio = files?.find((item) => item.url === song.fileSongURL);
      // Ensure you use `===` for comparison and assign `image` and `audio` properly
      setImage(image);
      setAudio(audio);
    }
  }, [files, song.fileSongURL, song.imageURL]);

  const clearData = () => {
    setUpdatedSong({
      name: "",
      imageURL: "",
      fileSongURL: "",
      duration: "",
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
    if (image) {
      updatedSong.imageURL = image.imageURL;
    }
    if (audio) {
      updatedSong.fileSongURL = audio.fileSongURL;
    }
    updateSongMutation.mutate({ id: song.id, songData: updatedSong });
    clearData();
    setSongDialogOpen(false);
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
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
            nameField={"Song Image"}
          />
          {/* Upload Song */}
          <UploadSong audio={audio} setAudio={setAudio} />

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Name</label>
            <Input
              value={updatedSong.name}
              onChange={(e) =>
                setUpdatedSong({ ...updatedSong, name: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          {/* Artists Selection */}
          <ArtistSelection song={updatedSong} setSong={setUpdatedSong} />

          {/* Duration Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Duration (seconds)
            </label>
            <Input
              type="number"
              min="0"
              value={updatedSong.duration}
              onChange={(e) =>
                setUpdatedSong({
                  ...updatedSong,
                  duration: e.target.value || "0",
                })
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
            disabled={isUploading}
            className="text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isUploading}
            className="text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
          >
            {isUploading ? "Uploading..." : "Update Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSong;

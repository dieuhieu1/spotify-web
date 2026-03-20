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
import { useUpdateArtist } from "@/hooks/useArtistsQuery";
import { useAllFiles } from "@/hooks/useUploadMutation";

const UpdateArtist = ({ artist }) => {
  const updateArtistMutation = useUpdateArtist();
  const { data: files } = useAllFiles();
  const isLoading = updateArtistMutation.isPending;

  const [image, setImage] = useState(null);
  const [artistDialogOpen, setArtistDialogOpen] = useState(false);
  const [updatedArtist, setUpdatedArtist] = useState({
    name: artist.name,
    imageURL: artist.imageURL,
    follower: artist.follower,
  });

  useEffect(() => {
    if (files) {
      const image = files?.find((item) => item.url === artist.imageURL);
      // Ensure you use `===` for comparison and assign `image` and `audio` properly
      setImage(image);
    }
  }, [artist.imageURL]);

  const clearData = () => {
    setUpdatedArtist({
      name: "",
      imageURL: "",
      follower: 0,
    });

    setImage(null);
  };

  const handleSubmit = async () => {
    updatedArtist.imageURL = image.imageURL;

    updateArtistMutation.mutate({ id: artist.id, artistData: updatedArtist });
    clearData();
    setArtistDialogOpen(false);
  };

  return (
    <Dialog open={artistDialogOpen} onOpenChange={setArtistDialogOpen}>
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
          <DialogTitle>Update Artist</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <UploadImage
            nameField={"Artist Image"}
            image={image}
            setImage={setImage}
          />

          {/* Other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Name</label>
            <Input
              value={updatedArtist.name}
              onChange={(e) =>
                setUpdatedArtist({ ...updatedArtist, name: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Follower</label>
            <Input
              type="number"
              min="0"
              value={updatedArtist.follower}
              onChange={(e) =>
                setUpdatedArtist({
                  ...updatedArtist,
                  follower: e.target.value || "0",
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
              setArtistDialogOpen(false);
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
            {isLoading ? "Uploading..." : "Add Artist"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateArtist;

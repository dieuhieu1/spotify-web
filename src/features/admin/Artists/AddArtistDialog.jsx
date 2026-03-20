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
import { useAddArtist } from "@/hooks/useArtistsQuery";
import UploadImage from "../file-upload/UploadImage";

const AddArtistsDialog = () => {
  const addArtistMutation = useAddArtist();
  const isLoading = addArtistMutation.isPending;
  const [artistDialogOpen, setArtistDialogOpen] = useState(false);

  const [newArtist, setNewArtist] = useState({
    name: "",
    follower: "",
    imageURL: "",
  });
  const [image, setImage] = useState(null);

  const clearData = () => {
    setNewArtist({
      name: "",
      follower: "",
      imageURL: "",
    });

    setImage(null);
  };

  const handleSubmit = async () => {
    if (!image) {
      return toast.error("Please upload image files");
    }
    newArtist.imageURL = image.url;

    addArtistMutation.mutate(newArtist);
    clearData();
    setArtistDialogOpen(false);
  };

  return (
    <Dialog open={artistDialogOpen} onOpenChange={setArtistDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Artist
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto text-white">
        <DialogHeader>
          <DialogTitle>Add New Artist</DialogTitle>
          <DialogDescription>
            Add a new artist to your music app
          </DialogDescription>
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
              value={newArtist.name}
              onChange={(e) =>
                setNewArtist({ ...newArtist, name: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Follower</label>
            <Input
              type="number"
              min="0"
              value={newArtist.follower}
              onChange={(e) =>
                setNewArtist({ ...newArtist, follower: e.target.value || "0" })
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

export default AddArtistsDialog;

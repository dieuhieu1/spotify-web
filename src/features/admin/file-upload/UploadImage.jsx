import { Button } from "@/components/ui/button";
import { useUploadImage, useDeleteFile } from "@/hooks/useUploadMutation";

import { Upload, X } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";

const SkeletonLoader = () => {
  return (
    <div className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer">
      {/* Skeleton for file upload area */}

      <div className="w-full h-12 bg-gray-300 animate-pulse rounded-lg"></div>
    </div>
  );
};

const UploadImage = ({ image, setImage, nameField }) => {
  const uploadMutation = useUploadImage();
  const deleteMutation = useDeleteFile();
  const isUploading = uploadMutation.isPending || deleteMutation.isPending;
  const imageInputRef = useRef(null);

  const handleUploadImage = async (fileUpload) => {
    const result = await uploadMutation.mutateAsync(fileUpload);
    setImage(result);
    if (result) {
      toast.success("Image uploaded successfully");
    } else {
      toast.error("Failed to upload Image");
    }
  };

  const handleDeleteImage = async () => {
    if (!image) {
      return toast.error("No file existed for delete");
    }

    await deleteMutation.mutateAsync(image.id);
    setImage(null);
    toast.success("Image deleted successfully");
  };
  if (isUploading) return <SkeletonLoader />;
  return (
    <>
      <input
        type="file"
        ref={imageInputRef}
        className="hidden text-white"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            handleUploadImage(file);
          }
        }}
      />
      <div className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer">
        <div className="text-center">
          {image ? (
            <div className="space-y-2">
              <div className="text-sm text-emerald-500">Image selected:</div>
              <div className="text-xs">{image?.fileName.slice(0, 20)}</div>
              {/* Image Preview */}
              <div className="mt-2">
                <img
                  src={image?.url} // Create a preview URL for the selected image
                  alt="Song Artwork Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
              <Button
                onClick={handleDeleteImage}
                disabled={isUploading}
                className="text-white hover:bg-red-600 transition duration-200"
              >
                <X />
              </Button>
            </div>
          ) : (
            <>
              <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                <Upload className="h-6 w-6 text-zinc-400" />
              </div>
              <div className="text-sm">Upload {nameField}</div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
                onClick={() => imageInputRef.current?.click()}
              >
                Choose File
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadImage;

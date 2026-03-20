/* eslint-disable react/prop-types */
import { useRef } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useUploadSong, useDeleteFile } from "@/hooks/useUploadMutation";
import { Button } from "@/components/ui/button";

const UploadSong = ({ audio, setAudio }) => {
  const uploadMutation = useUploadSong();
  const deleteMutation = useDeleteFile();
  const isUploading = uploadMutation.isPending || deleteMutation.isPending;
  const audioInputRef = useRef(null);

  const handleUploadSong = async (fileUpload) => {
    if (!fileUpload) {
      return toast.error("Please upload audio files");
    }
    const result = await uploadMutation.mutateAsync(fileUpload);
    setAudio(result);
    if (result) {
      toast.success("Song uploaded successfully");
    } else {
      toast.error("Failed to upload song");
    }
  };

  const handleDeleteSong = async () => {
    if (!audio) {
      return toast.error("No file existed for delete");
    }

    await deleteMutation.mutateAsync(audio.id);
    setAudio(null);
    toast.success("Song deleted successfully");
  };

  if (isUploading) return;

  const getFileName = (fileName) => {
    if (fileName && fileName.length > 20) {
      return fileName.slice(0, 50) + "..."; // Cắt 20 ký tự đầu và thêm "..."
    }
    return fileName; // Nếu tên file ngắn hơn 20 ký tự, giữ nguyên
  };

  return (
    /* Audio upload */
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">Audio File</label>
      <div className="flex items-center gap-2">
        {/* Hidden Input For Upload */}
        <input
          className="text-white"
          type="file"
          accept="audio/*"
          ref={audioInputRef}
          hidden
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
              // Automatically upload after file selection
              handleUploadSong(selectedFile);
            }
          }}
        />

        <Button
          variant="outline"
          onClick={() => audioInputRef.current?.click()}
          className="w-full text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
        >
          {audio ? getFileName(audio?.fileName) : "Choose Audio File"}
        </Button>

        {audio && (
          <Button
            onClick={handleDeleteSong}
            disabled={isUploading}
            className="text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
          >
            <X />
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadSong;

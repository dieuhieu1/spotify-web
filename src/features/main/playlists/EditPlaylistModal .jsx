import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUploadImage, useDeleteFile } from "@/hooks/useUploadMutation";
import { X } from "lucide-react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
const LoadingSkel = () => {
  return <Skeleton className="h-[112px] w-[250px] bg-gray-600" />;
};
const EditPlaylistModal = ({
  onClose,
  file,
  setFile,
  playlist,
  setPlaylist,
}) => {
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [localTitle, setLocalTitle] = useState(playlist?.title); // State cục bộ cho tiêu đề

  const uploadMutation = useUploadImage();
  const deleteMutation = useDeleteFile();
  const isUploading = uploadMutation.isPending || deleteMutation.isPending;
  const fileInputRef = useRef(null); // Tạo ref cho input file
  const modalRef = useRef();
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Gọi hàm đóng modal
    }
  };

  // Hàm mở file picker khi click vào ảnh
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Hàm xử lý khi file được tải lên
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // Upload File to Cloudinary
    const result = await uploadMutation.mutateAsync(file);
    if (result) {
      toast.success("Image uploaded successfully");
      setFile(result);
    } else {
      toast.error("Failed to upload Image");
    }
  };
  const handleDeleteFile = async () => {
    if (!file) {
      return toast.error("No file existed for delete");
    }
    await deleteMutation.mutateAsync(file.id);
    toast.success("Image deleted successfully");
    setFile(null);
  };
  const handleSave = () => {
    setPlaylist({
      ...playlist,
      description: playlistDescription,
      title: localTitle,
    }); // Cập nhật ảnh về component cha

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => handleOutsideClick(e)}
    >
      <div
        ref={modalRef}
        className="bg-zinc-900 p-6 rounded-lg shadow-lg w-96 text-white"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sửa thông tin chi tiết
        </h2>

        {/* Nội dung */}
        {/* Hình đại diện */}
        <div className="flex gap-4 mb-6">
          {isUploading ? (
            <LoadingSkel />
          ) : (
            <div className="w-[112px] h-[112px] bg-zinc-700 flex items-center justify-center rounded-md cursor-pointer">
              {file ? (
                <div className="relative w-full h-full ">
                  <img
                    src={file?.url}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                    onClick={handleImageClick}
                  />
                  <Button
                    className="absolute top-2 right-2 p-1"
                    size={20}
                    onClick={handleDeleteFile}
                  >
                    <X />
                  </Button>
                </div>
              ) : (
                <span
                  className="text-5xl text-gray-400"
                  onClick={handleImageClick}
                >
                  🎵
                </span>
              )}
            </div>
          )}

          {/* Input file ẩn */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Thông tin playlist */}
          <div className="flex flex-col gap-2 flex-1">
            <input
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className="bg-zinc-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <textarea
              placeholder="Thêm phần mô tả không bắt buộc"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              className="bg-zinc-800 p-2 rounded-md h-16 resize-none focus:outline-none focus:ring-2 focus:ring-gray-600"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-white text-black font-bold py-2 px-4 rounded-full hover:bg-gray-200 transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylistModal;

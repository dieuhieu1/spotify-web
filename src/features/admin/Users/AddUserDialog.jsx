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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useAddUser } from "@/hooks/useUsersQuery";
import { usePlaylists } from "@/hooks/usePlaylistsQuery";

const AddUserDialog = () => {
  const addUserMutation = useAddUser();
  const { data: playlists = [] } = usePlaylists(1, 100);
  const isLoading = addUserMutation.isPending;
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const roles = [
    {
      name: "ADMIN",
      description: "Admin Role",
    },
    {
      name: "USER",
      description: "User Role",
    },
    {
      name: "PREMIUM",
      description: "Premium Role",
    },
  ];
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    createdPlaylists: [],
    roles: [],
  });

  const clearData = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      dob: "",
      createdPlaylists: [],
      roles: [],
    });
  };
  const handlePlaylistChange = (selectedOptions) => {
    const playlistsArray = selectedOptions.map((option) => option.label);
    setNewUser({ ...newUser, createdPlaylists: playlistsArray });
  };
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", newUser.name);
    formData.append("email", newUser.email);
    formData.append("password", newUser.password);
    formData.append("dob", newUser.dob);
    formData.append("createdPlaylists", newUser.createdPlaylists);
    formData.append("roles", newUser.roles);

    // Cách để log các cặp key-value trong formData
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // In key và value của mỗi phần tử trong FormData
    }
    addUserMutation.mutate(formData);
    clearData();
    setUserDialogOpen(false);
  };

  return (
    <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto text-white">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Add a new artist to your music app
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Name</label>
            <Input
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email</label>
            <Input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value || "" })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Password</label>
            <Input
              type="number"
              min="0"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value || "" })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          {/* Songs Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white ">
              Playlists (Optional)
            </label>
            <CreatableSelect
              isMulti
              options={playlists.map((playlist) => ({
                label: playlist.title,
                value: playlist.id,
              }))}
              onChange={handlePlaylistChange}
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

          {/* Albums Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Roles (Optional)
            </label>
            <Select
              value={newUser.roles}
              onValueChange={(value) =>
                setNewUser({ ...newUser, roles: value })
              }
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Set The Role" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                {roles.map((role) => (
                  <SelectItem key={role.description} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setUserDialogOpen(false);
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
            {isLoading ? "Uploading..." : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;

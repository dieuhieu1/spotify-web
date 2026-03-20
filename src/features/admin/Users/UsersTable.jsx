import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Calendar, Trash2 } from "lucide-react";
import TableSkel from "../../../loadingSkeleton/TableSkel";
import { useUsers, useDeleteUser } from "@/hooks/useUsersQuery";

const UsersTable = () => {
  const { data: users = [], isLoading } = useUsers(1, 10);
  const deleteUserMutation = useDeleteUser();

  if (isLoading) {
    return <TableSkel />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead>User Name</TableHead>
          <TableHead>Date Of Birth</TableHead>
          <TableHead>Created Playlists</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => {
          const userName = user?.name || "Unknown User";
          const userEmail = user?.email || "Unknown Email";
          const dob = user?.dob || "Unknown Date Of Birth";
          const createdPlaylists = user?.createdPlaylists || [];
          const roles = user?.roles || [];

          return (
            <TableRow key={user.id} className="hover:bg-zinc-800/50">
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <p>{userName}</p>
                  <p>{userEmail}</p>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {dob}
                </span>
              </TableCell>
              <TableCell className="font-medium">
                {createdPlaylists.length > 0 ? (
                  <div>
                    {createdPlaylists.slice(0, 2).map((playlist) => (
                      <span key={playlist.id} className="inline-block mr-2">
                        {playlist.name},
                      </span>
                    ))}
                    {createdPlaylists.length > 2 && (
                      <span className="text-gray-400">...</span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">No Created Playlists</span>
                )}
              </TableCell>
              <TableCell className="font-medium">
                {roles.length > 0 ? (
                  <div>
                    {roles.slice(0, 2).map((role) => (
                      <span
                        key={role.description}
                        className="inline-block mr-2"
                      >
                        {role.name},
                      </span>
                    ))}
                    {roles.length > 2 && (
                      <span className="text-gray-400">...</span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">No Role</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => deleteUserMutation.mutate(user.id)}
                    disabled={deleteUserMutation.isPending}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UsersTable;

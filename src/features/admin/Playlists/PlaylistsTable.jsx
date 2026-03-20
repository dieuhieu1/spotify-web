import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRoundCheck } from "lucide-react";
import TableSkel from "../../../loadingSkeleton/TableSkel";
import DeleteDialog from "@/UI/DeleteDialog";
import UpdatePlaylist from "./UpdatePlaylist";
import { usePlaylists, useDeletePlaylist } from "@/hooks/usePlaylistsQuery";

const PlaylistTable = () => {
  const { data: playlists = [], isLoading } = usePlaylists(1, 10);
  const deletePlaylistMutation = useDeletePlaylist();

  if (isLoading) {
    return <TableSkel />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Playlists Info</TableHead>
          <TableHead>Playlists&apos;s songs</TableHead>
          <TableHead>Follower</TableHead>
          <TableHead>Listner</TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playlists?.map((playlist) => {
          const playlistName = playlist.title || "Unknown playlist"; // Default to "Unknown Title"
          const follower = playlist.follower || "Unknown Date"; // Default to "Unknown Date"
          const imageURL =
            playlist.imageURL ||
            "https://discussions.apple.com/content/attachment/592590040"; // Fallback to an empty string if imageURL is not provided
          const songs = playlist.songs || [];
          const listener = playlist.listener || 0;
          return (
            <TableRow key={playlist.id} className="hover:bg-zinc-800/50">
              <TableCell>
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt={playlistName}
                    className="size-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-zinc-800 rounded" /> // Placeholder if no image
                )}
              </TableCell>
              <TableCell>{playlistName}</TableCell>
              <TableCell className="font-medium">
                {songs.length > 0 ? (
                  <div>
                    {songs.slice(0, 2).map((song) => (
                      <span key={song.id} className="inline-block mr-2">
                        {song.name},
                      </span>
                    ))}
                    {songs.length > 2 && (
                      <span className="text-gray-400">...</span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">No songs</span>
                )}
              </TableCell>

              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <UserRoundCheck className="h-4 w-4" />
                  {follower}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <UserRoundCheck className="h-4 w-4" />
                  {listener}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <DeleteDialog
                    id={playlist.id}
                    deleteAPI={(id) => deletePlaylistMutation.mutate(id)}
                    title={"Delete Playlist"}
                    isLoading={deletePlaylistMutation.isPending}
                    type={playlistName}
                  />
                  <UpdatePlaylist playlist={playlist} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PlaylistTable;

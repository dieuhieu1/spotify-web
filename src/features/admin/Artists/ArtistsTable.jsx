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
import UpdateArtist from "./UpdateArtist";
import { useArtists, useDeleteArtist } from "@/hooks/useArtistsQuery";

const ArtistsTable = () => {
  const { data: artists = [], isLoading } = useArtists(1, 100, "name", "asc");
  const deleteArtistMutation = useDeleteArtist();

  if (isLoading) {
    return <TableSkel />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Artist Info</TableHead>
          <TableHead>Artist&apos;s songs</TableHead>
          <TableHead>Follower</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {artists?.map((artist) => {
          const artistName = artist?.name || "Unknown Artist";
          const follower = artist?.follower || "Unknown Date";
          const imageURL = artist?.imageURL || "";
          const songs = artist?.songs || [];

          return (
            <TableRow key={artist.id} className=" hover:bg-zinc-800/50 ">
              <TableCell>
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt={artistName}
                    className="size-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-zinc-800 rounded" />
                )}
              </TableCell>
              <TableCell>{artistName}</TableCell>
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
              <TableCell className="text-right">
                <DeleteDialog
                  id={artist.id}
                  deleteAPI={(id) => deleteArtistMutation.mutate(id)}
                  type={artist.name}
                  isLoading={deleteArtistMutation.isPending}
                  title={"Delete Artist"}
                />
                <UpdateArtist artist={artist} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ArtistsTable;

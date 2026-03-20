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
import { useAlbums, useDeleteAlbum } from "@/hooks/useAlbumsQuery";

const AlbumsTable = () => {
  const { data: albums = [], isLoading } = useAlbums(1, 10);
  const deleteAlbumMutation = useDeleteAlbum();

  if (isLoading) {
    return <TableSkel />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Album Name</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead>Total Tracks in Album</TableHead>
          <TableHead>Followers</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums?.map((album) => {
          const albumName = album?.name || "Unknown Title";
          const artistName = album?.artists?.[0]?.name || "Unknown Artist";
          const releaseDate = album?.createdAt || "Unknown Date";
          const imageURL = album?.imageURL || "";
          const totalSongs = album?.totalTracks || 0;
          const followers = album?.follower || 0;

          return (
            <TableRow key={album.id} className="hover:bg-zinc-800/50">
              <TableCell>
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt={albumName}
                    className="size-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-zinc-800 rounded" />
                )}
              </TableCell>
              <TableCell className="font-medium">{albumName}</TableCell>
              <TableCell className="font-medium">{artistName}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {releaseDate}
                </span>
              </TableCell>
              <TableCell className="font-medium">{totalSongs}</TableCell>
              <TableCell className="font-medium">{followers}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => deleteAlbumMutation.mutate(album.id)}
                    disabled={deleteAlbumMutation.isPending}
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

export default AlbumsTable;

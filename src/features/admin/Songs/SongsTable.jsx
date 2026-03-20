import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import TableSkel from "../../../loadingSkeleton/TableSkel";
import UpdateSong from "../Songs/UpdateSong";
import DeleteDialog from "../../../UI/DeleteDialog";
import { useSongs, useDeleteSong } from "@/hooks/useSongsQuery";

const SongsTable = () => {
  const { data: songs = [], isLoading } = useSongs(1, 100);
  const deleteSongMutation = useDeleteSong();

  if (isLoading) {
    return <TableSkel />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Song Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs?.map((song) => {
          const songName = song?.name || "Unknown Title";
          const artistName = song?.artists?.[0]?.name || "Unknown Artist";
          const releaseDate = song?.createdAt || "Unknown Date";
          const imageURL = song?.imageURL || "";

          return (
            <TableRow key={song.id} className="hover:bg-zinc-800/50">
              <TableCell>
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt={songName}
                    className="size-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-zinc-800 rounded" />
                )}
              </TableCell>
              <TableCell className="font-medium">{songName}</TableCell>
              <TableCell className="font-medium">{artistName}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {releaseDate}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <DeleteDialog
                    id={song.id}
                    title={"Delete Song"}
                    deleteAPI={(id) => deleteSongMutation.mutate(id)}
                    type={song.name}
                    isLoading={deleteSongMutation.isPending}
                  />
                  <UpdateSong song={song} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SongsTable;

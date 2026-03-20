import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/features/admin/AdminHeader";
import AlbumsTabContent from "@/features/admin/Albums/AlbumsTabContent";
import SongsTabContent from "@/features/admin/Songs/SongsTabContent";
import UsersTabContent from "@/features/admin/Users/UsersTabContent";
import { useAuthStore } from "@/store/useAuthStore";
import { TabsContent } from "@radix-ui/react-tabs";
import { Album, ListMusic, Music, SquareUserRound } from "lucide-react";
import DashboardStats from "@/features/admin/Stats/DashboardStats";
import ArtistsTabContent from "@/features/admin/Artists/ArtitsTabContent";
import PlaylistsTabContent from "@/features/admin/Playlists/PlaylistsTabContent";

function Admin() {
  const { isAdmin } = useAuthStore();

  if (!isAdmin) return <div>Unauthorized</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-00 p-8 text-white">
      <AdminHeader />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Album className="mr-2 size-4" /> Albums
          </TabsTrigger>
          <TabsTrigger
            value="artists"
            className="data-[state=active]:bg-zinc-700"
          >
            <Album className="mr-2 size-4" /> Artists
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-zinc-700"
          >
            <SquareUserRound className="mr-2 size-4" /> Users
          </TabsTrigger>
          <TabsTrigger
            value="playlists"
            className="data-[state=active]:bg-zinc-700"
          >
            <ListMusic className="mr-2 size-4" /> Playlists
          </TabsTrigger>
        </TabsList>
        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
        <TabsContent value="artists">
          <ArtistsTabContent />
        </TabsContent>
        <TabsContent value="users">
          <UsersTabContent />
        </TabsContent>
        <TabsContent value="playlists">
          <PlaylistsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Admin;

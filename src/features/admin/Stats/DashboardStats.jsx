import {
  BookHeadphones,
  Library,
  ListMusic,
  MicVocal,
  SquareUserRound,
} from "lucide-react";
import StatsCard from "./StatsCard";
import { useStats } from "@/hooks/useStatsQuery";

const DashboardStats = () => {
  const { data: stats = {} } = useStats();

  const statsData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: stats.totalSongs || 0,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: stats.totalAlbums || 0,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: MicVocal,
      label: "Total Artists",
      value: stats.totalArtists || 0,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: SquareUserRound,
      label: "Total Users",
      value: stats.totalUsers || 0,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-sky-500",
    },
    {
      icon: BookHeadphones,
      label: "Total Playlists",
      value: stats.totalPlaylists || 0,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value.toString()}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default DashboardStats;


/* eslint-disable @typescript-eslint/no-unused-vars */
import { Match, ParticipantId, Tournament } from "@/mocks/types";
import { isPlayerWinner } from "@/models/match";
import { getPlayerPlace } from "@/models/player";
import PlayerStatsChart from "./PlayerStatsChart";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Target, Award, Users, TrendingUp } from "lucide-react";

type Props = {
  tournaments: Tournament[];
  playerId: ParticipantId;
  playedMatchesByTournament: Record<number, Match[]>;
}

export const Statistics: React.FC<Props> = ({playedMatchesByTournament, playerId}) => {
  let totalMatches = 0;
  let totalWins = 0;
  let tournamentsCount = 0;
  let titlesCount = 0;
  let withMedals = 0;

  Object.entries(playedMatchesByTournament).forEach(([_tournamentId, matches]) => {
    totalMatches += matches.length;

    matches.forEach(match => {
      if (isPlayerWinner(match, playerId)) {
        totalWins++;
      }
    });

    const place = getPlayerPlace(matches, playerId);
    switch(place) {
      case 1:
        titlesCount++;
        break;
      case 2:
      case 3:
          withMedals++;
    }
  
    tournamentsCount++;
  })

  // const winRate = totalMatches > 0 ? ((totalWins / totalMatches) * 100).toFixed(1) : 0;

  const stats = [
    {
      title: "Всего матчей",
      value: totalMatches,
      icon: Target,
      color: "bg-blue-500",
      textColor: "text-blue-600"
    },
    {
      title: "Побед",
      value: totalWins,
      icon: TrendingUp,
      color: "bg-green-500",
      textColor: "text-green-600"
    },
    {
      title: "Поражений",
      value: totalMatches - totalWins,
      icon: Target,
      color: "bg-red-500",
      textColor: "text-red-600"
    },
    {
      title: "Турниров",
      value: tournamentsCount,
      icon: Users,
      color: "bg-purple-500",
      textColor: "text-purple-600"
    },
    {
      title: "Титулов",
      value: titlesCount,
      icon: Trophy,
      color: "bg-yellow-500",
      textColor: "text-yellow-600"
    },
    {
      title: "Медалей",
      value: withMedals,
      icon: Award,
      color: "bg-tennis-clay",
      textColor: "text-tennis-clay"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-0  items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className={`text-center text-2xl font-bold ${stat.textColor}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full`}>
                    <IconComponent className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">Соотношение побед и поражений</h4>
          <PlayerStatsChart wins={totalWins} losses={totalMatches - totalWins} />
        </CardContent>
      </Card>
    </div>
  );
};

"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import { getPlayerName as getPlayerName1 } from "@/models/player";
import { playersMap } from "@/mocks/players";
import { ParticipantId, Match } from "@/mocks/types";
import { MatchHistory } from "@/components/player/MatchHistory";
import { tournamentsParticipants } from "@/mocks/tournamentsParticipants";
import { tournaments } from "@/mocks/tournaments";
import { matchesByTournament } from "@/mocks/matches";
import { Statistics } from "@/components/player/Statistics";
import { useParams, useRouter } from "next/navigation";

const Player = () => {
  const { player: id } = useParams<{ player: ParticipantId }>();
  const router = useRouter();

  const player = playersMap[id];
  const playedTournamentsIds = tournamentsParticipants
    .filter((x) => x.playerId.includes(id))
    .map((x) => x.tournamentId);
  const playedTournaments = tournaments
    .filter((x) => playedTournamentsIds.includes(x.id))
    .sort((a, b) => (b.date as any) - (a.date as any));

  const playedMatchesByTournament: Record<number, Match[]> =
    playedTournaments.reduce((res, tournament) => {
      const matches = matchesByTournament[tournament.id]
        .filter((x) => x.player1.includes(id) || x.player2.includes(id))
        .sort((a, b) => b.id - a.id);
      res[tournament.id] = matches;
      return res;
    }, {} as Record<number, Match[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button asChild variant="ghost" className="mb-4 px-0">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1
                  className={`text-4xl font-bold ${
                    true
                      ? "bg-gradient-to-r from-yellow-400 via-amber-500 via-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]"
                      : "text-gray-900"
                  }`}
                >
                  {getPlayerName1(player)}
                </h1>
                {player.isStar && (
                  <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 rounded-full p-2 shadow-lg">
                    <Star
                      size={24}
                      className="text-white animate-star-sparkle"
                    />
                  </div>
                )}

                {/* {player.isVip && (
                  <div className="flex items-center gap-2">
                    <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
                    <VipIndicator size="lg" />
                    <div className="flex items-center text-amber-600">
                      <Crown className="w-6 h-6 mr-1 animate-bounce" />
                      <span className="text-sm font-medium">Привилегированный участник</span>
                    </div>
                  </div>
                )} */}
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-tennis-clay">
                  <Star className="w-3 h-3 mr-1" />
                  Рейтинг: {player.rating}
                </Badge>
                <Badge variant="outline">Очки: {player.points}</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="matches">Матчи</TabsTrigger>
            <TabsTrigger value="stats">Статистика</TabsTrigger>
            {/* <TabsTrigger value="achievements">Достижения</TabsTrigger> */}
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>История матчей</CardTitle>
                <CardDescription>Последние игры по турнирам</CardDescription>
              </CardHeader>
              <CardContent>
                <MatchHistory
                  tournaments={playedTournaments}
                  playerId={id}
                  playedMatchesByTournament={playedMatchesByTournament}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Подробная статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <Statistics
                  tournaments={playedTournaments}
                  playerId={id}
                  playedMatchesByTournament={playedMatchesByTournament}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Player;

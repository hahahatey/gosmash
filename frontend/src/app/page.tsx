"use client";

import { isTournamentOutdated } from "@/lib/utils";
import { tournaments } from "@/mocks/tournaments";
import Navigation from "@/components/Navigation";
import ParallaxHero from "@/components/ParallaxHero";
import { Advantages } from "@/components/Advantages";
import { LatestTournaments } from "@/components/LatestTournaments";
import TournamentTimer from "@/components/TournamentTimer";
import { Trophy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const firstUpcomingTournament = tournaments
    .filter((tournament) => !isTournamentOutdated(tournament))
    .slice(-1)[0];

  const {user} = useAuth();

  return (
    <div>{JSON.stringify(user || {})}</div>
  )

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
  //     <Navigation />

  //     <ParallaxHero />

  //     <Advantages />

  //     <LatestTournaments />

  //     {firstUpcomingTournament && (
  //       <TournamentTimer date={firstUpcomingTournament.date} />
  //     )}

  //     <footer className="bg-gray-900 text-white py-12">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="text-center">
  //           <div className="flex items-center justify-center space-x-2 mb-4">
  //             <Trophy className="h-8 w-8 text-tennis-clay" />
  //             <span className="text-2xl font-bold">YaTennis</span>
  //           </div>
  //           <p className="text-gray-400 mb-6">
  //             Профессиональные теннисные турниры для игроков всех уровней
  //           </p>
  //           <div className="border-t border-gray-800 pt-6">
  //             <p className="text-gray-500">
  //               © 2025 YaTennis. Все права защищены.
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </footer>
  //   </div>
  // );
}

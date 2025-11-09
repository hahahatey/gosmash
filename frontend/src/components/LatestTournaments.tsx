import { Button } from "@/components/ui/button";
import { tournaments } from "@/mocks/tournaments";
import { TournamentCard } from "./TournamentCard";
import Link from "next/link";

export const LatestTournaments = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-tennis-light-clay to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Текущие турниры
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tournaments.slice(0, 3).map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              linkHref={`/tournaments/${tournament.id}`}
              linkLabel="Подробнее"
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/tournaments">Посмотреть все турниры</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

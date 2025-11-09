import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { declineNoun, formatDate } from "@/lib/utils";
import { Tournament } from "@/mocks/types";
import { getTournamentTitle } from "@/models/tournament";
import { Calendar, MapPin, Users, Trophy } from "lucide-react";
import Link from "next/link";

type Props = {
  tournament: Tournament;
  linkHref: string;
  linkLabel: string;
};

export const TournamentCard: React.FC<Props> = ({ tournament, linkHref, linkLabel }) => {
  const status = tournament.date < new Date() ? 'ended' : 'upcoming';

  return (
    <Card key={tournament.id} className="border-0 shadow-lg bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {getTournamentTitle({type: tournament.type, rating: tournament.rating})}
        </CardTitle>
        <Badge className={getStatusColor(status)}>
          {getStatusLabel(status)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(tournament.date)}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {tournament.location}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          {tournament.participantsNumber}{" "}
          {declineNoun(tournament.participantsNumber, [
            "участник",
            "участника",
            "участников",
          ])}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Trophy className="h-4 w-4 mr-2" />
          Призовой фонд: {tournament.prize} ₽
        </div>

        <div className="pt-4 flex gap-2">
          <Button asChild className="flex-1" variant="outline">
             <Link href={linkHref}>{linkLabel}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const getStatusLabel = (status: "ended" | "upcoming") => {
  if (status === "ended") {
    return "Завершен";
  } else {
    return "Открыт";
  }
};

const getStatusColor = (status: "ended" | "upcoming") => {
  switch (status) {
    case "upcoming":
      return "bg-green-100 text-green-800";
    // case 'Скоро':
    //     return 'bg-blue-100 text-blue-800';
    // case 'Идет турнир':
    //     return 'bg-orange-100 text-orange-800';
    case "ended":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

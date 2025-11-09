import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Tournaments = () => {
  const filteredTournaments = [{
    id: 0,
    date: new Date(),
    type: 'man-single',
    location: 'Нарым',
    participantsNumber: 12,
    rating: 7.0,
  }];
  
  return (
     <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Локация</TableHead>
                  <TableHead className="text-center">Участники</TableHead>
                  <TableHead className="text-center">Рейтинг</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {false ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-40" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-5 w-12 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-6 w-16 mx-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-5 w-24 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-5 w-20 ml-auto" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-9 w-24 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredTournaments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <p className="text-muted-foreground text-lg">
                        Турниры по заданным критериям не найдены
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTournaments.map((tournament) => (
                    <TableRow key={tournament.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {tournament.date.toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {tournamentTypeLabels[tournament.type]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="max-w-xs truncate">
                            {tournament.location}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {tournament.participantsNumber}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{tournament.rating}</Badge>
                      </TableCell>
                      {/* <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Trophy className="h-4 w-4 text-muted-foreground" />
                          {tournament.prize.toLocaleString("ru-RU")} ₽
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {tournament.entryFee.toLocaleString("ru-RU")} ₽
                      </TableCell> */}
                      <TableCell>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/tournament/${tournament.id}`}>
                            Подробнее
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
  );
};

const tournamentTypeLabels: Record<any, string> = {
  "woman-pairs": "Женские пары",
  "man-pairs": "Мужские пары",
  mix: "Микст",
  "man-single": "Мужской одиночный",
  "woman-single": "Женский одиночный",
};

export default Tournaments;

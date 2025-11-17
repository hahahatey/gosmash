"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { withOrganizerAuth } from "@/hoc/withOrganizerAuth";
import { useOrganizerTournaments } from "@/hooks/useOrganizerTournaments";
import { useTournamentsTemplates } from "@/hooks/useTournamentTemplates";
import { getTournamentCategoryLabel } from "@/models/tournaments/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { PlusIcon, TrashIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function TournamentsPage() {
  const { tournaments } = useOrganizerTournaments();
  const pathname = usePathname();
  const router = useRouter();

  const list = tournaments.isLoading ? [] : tournaments.data;

  const goToCreate = () => {
    router.push(`${pathname}/create`);
  };

  return (
    <div>
      <div className="flex justify-between p-3">
        <h2 className="text-card-foreground text-2xl">Турниры</h2>
        <Button variant="icon" size="icon" onClick={goToCreate}>
          <PlusIcon />
        </Button>
      </div>
      <Separator className="mt-1 mb-8" />
      <div>
        <div className="w-full flex flex-col gap-3">
          {list?.length ? (
            list?.map(({template: {name}, startsAt, rating, category, id }) => (
              <div
                className="flex justify-between items-center hover:bg-muted p-3 rounded-2xl"
                key={id}
              >
                <span className="">{formatDate(startsAt)}</span>
                <span className="">{getTournamentCategoryLabel({rating, category})}</span>
                <span className="">{name}</span>
                <Button
                  variant="icon"
                  size="icon"
                  // onClick={() => deleteTemplateMutation.mutate(id)}
                >
                  <TrashIcon />
                </Button>
              </div>
            ))
          ) : (
            <span>Данные отсутствуют</span>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return format(date, 'd MMMM', { locale: ru });
}

export const Tournaments = withOrganizerAuth(TournamentsPage);

"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTournamentsTemplates } from "@/hooks/useTournamentTemplates";
import { PlusIcon, TrashIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function TournamentTemplates() {
  const { templates, deleteTemplateMutation } = useTournamentsTemplates();
  const pathname = usePathname();
  const router = useRouter();

  const list = templates.isLoading ? [] : templates.data;

  const goToCreate = () => {
    router.push(`${pathname}/create`);
  };

  return (
    <div>
      <div className="flex justify-between p-3">
        <h2 className="text-card-foreground text-2xl">Шаблоны турниров</h2>
        <Button variant="icon" size="icon" onClick={goToCreate}>
          <PlusIcon />
        </Button>
      </div>
      <Separator className="mt-1 mb-8" />
      <div>
        <div className="w-full flex flex-col gap-3">
          {list?.length ? (
            list?.map(({ name, id }) => (
              <div
                className="flex justify-between items-center hover:bg-muted p-3 rounded-2xl"
                key={id}
              >
                <span className="">{name}</span>
                <Button
                  variant="icon"
                  size="icon"
                  onClick={() => deleteTemplateMutation.mutate(id)}
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

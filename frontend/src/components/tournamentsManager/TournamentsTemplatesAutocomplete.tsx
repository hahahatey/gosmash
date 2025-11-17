import { useEffect, useMemo, useState } from "react";
import { Autocomplete, AutocompleteOption } from "../ui/autocomplete";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTournamentTemplatesByQuery,
  getTournamentTemplatesByQueryKey,
  TOURNAMENT_TEMPLATES_KEY,
  TournamentTemplatesByQueryResponse,
} from "@/lib/tournaments/tournament-template";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Calendar } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounced";
import { Loader } from "../ui/loader";

type Props = {
  template?: TournamentTemplatesByQueryResponse[0];
  onTemplateSelected: (template: TournamentTemplatesByQueryResponse[0]) => void;
}

export const TournamentsTemplatesAutocomplete: React.FC<Props> = ({template, onTemplateSelected}) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300); // Используем хук

  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: getTournamentTemplatesByQueryKey(debouncedQuery),
    queryFn: ({ queryKey }) => {
      const [_, query] = queryKey;
      return getTournamentTemplatesByQuery(query);
    },
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    template && setQuery(template.name);
  }, [template?.id]);

  useEffect(() => () => {
    queryClient.removeQueries({queryKey: TOURNAMENT_TEMPLATES_KEY});
  }, []);

  return (
    <Command filter={() => 1} className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Поиск по названию, локации или дате..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="relative">
        {loading ? <Loader isVisible /> : null}
        <CommandEmpty>Шаблоны не найдены</CommandEmpty>
        <CommandGroup heading="Результаты поиска">
          {data?.map(({id, name}) => {
            return (
              <CommandItem
                key={id}
                value={name}
                onSelect={() => {
                  onTemplateSelected({id, name});
                  // const element = document.getElementById(
                  //   `tournament-${tournament.id}`
                  // );
                  // element?.scrollIntoView({
                  //   behavior: "smooth",
                  //   block: "center",
                  // });
                }}
              >
               <span>{name}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  // return (
  //   <Autocomplete
  //     placeholder="Поиск шаблона турнира..."
  //     options={options}
  //     // value={selectedOption}
  //     onInputChange={setQuery}
  //     onChange={(option) => {
  //       if (option && "value" in option) {
  //         setForm((prev) => ({ ...prev, templateId: option.value as number }));
  //       } else {
  //         setForm((prev) => {
  //           const { templateId, ...rest } = prev;
  //           return rest;
  //         });
  //       }
  //     }}
  //     isLoading={isLoading || isRefetching}
  //     noOptionsMessage={({ inputValue }) =>
  //       inputValue
  //         ? `Шаблоны не найдены для "${inputValue}"`
  //         : "Начните вводить название или локацию"
  //     }
  //     isClearable
  //   />
  // );
};

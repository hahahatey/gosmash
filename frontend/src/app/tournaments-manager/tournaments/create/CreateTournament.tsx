"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { RichText } from "@/components/ui/RichText";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "@/components/ui/time-picker";
import { Autocomplete, AutocompleteOption } from "@/components/ui/autocomplete";
import { useToast } from "@/hooks/use-toast";
import { useOrganizerTournaments } from "@/hooks/useOrganizerTournaments";
import { useTournamentsTemplates } from "@/hooks/useTournamentTemplates";
import {
  CreateTournamentDto,
  CreateTournamentTemplateDto,
} from "@/lib/dto/tournaments.dto";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategorySelect } from "@/components/tournaments/CategorySelect";
import { TournamentTemplate } from "@/models/tournaments/types";
import { useQuery } from "@tanstack/react-query";
import { RatingSelect } from "@/components/tournaments/RatingSelect";
import { TournamentsTemplatesAutocomplete } from "@/components/tournamentsManager/TournamentsTemplatesAutocomplete";
import { TournamentTemplatesByQueryResponse } from "@/lib/tournaments/tournament-template";

export function CreateTournament() {
  const [form, setForm] = useState<Partial<CreateTournamentDto>>({});
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [template, setTemplate] = useState<TournamentTemplatesByQueryResponse[0]>();
  const router = useRouter();
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { createTournamentMutation, creatingStatus } = useOrganizerTournaments({
    onCreateSuccessed: () => {
      timeoutRef.current = setTimeout(() => {
        router.replace("/tournaments-manager/tournaments");
      }, 300);

      toast({
        title: "Шаблон создан",
        description: "Можно увидеть его в списке",
      });
    },
  });

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const [error, setError] = useState<string | null>(null);


  // Объединяем дату и время в один объект Date
  useEffect(() => {
    if (startDate && startTime) {
      const [hours, minutes] = startTime.split(":").map(Number);
      const dateWithTime = new Date(startDate);
      dateWithTime.setHours(hours, minutes, 0, 0);
      setForm((prev) => ({ ...prev, startsAt: dateWithTime }));
    } else if (startDate) {
      // Если выбрана только дата, устанавливаем время на начало дня
      const dateWithTime = new Date(startDate);
      dateWithTime.setHours(0, 0, 0, 0);
      setForm((prev) => ({ ...prev, startsAt: dateWithTime }));
    }
  }, [startDate, startTime]);

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      setStartDate(date);
      if (date && startTime) {
        const [hours, minutes] = startTime.split(":").map(Number);
        const dateWithTime = new Date(date);
        dateWithTime.setHours(hours, minutes, 0, 0);
        setForm((prev) => ({ ...prev, startsAt: dateWithTime }));
      } else if (date) {
        const dateWithTime = new Date(date);
        dateWithTime.setHours(0, 0, 0, 0);
        setForm((prev) => ({ ...prev, startsAt: dateWithTime }));
      }
    },
    [startTime]
  );

  const handleTimeChange = useCallback(
    (time: string) => {
      setStartTime(time);
      if (startDate && time) {
        const [hours, minutes] = time.split(":").map(Number);
        const dateWithTime = new Date(startDate);
        dateWithTime.setHours(hours, minutes, 0, 0);
        setForm((prev) => ({ ...prev, startsAt: dateWithTime }));
      }
    },
    [startDate]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(null);

    // const { name, location, description } = form;
    // // Валидация на фронтенде (опционально)
    // if (!name.trim() || !location.trim()) {
    //   setError("Заполните все обязательные поля");
    //   return;
    // }

    createTournamentMutation.mutate({...(form as any), templateId: template!.id });
  };

  const loaderVisible = ["pending", "success"].some((status) =>
    creatingStatus.includes(status)
  );

  return (
    <div className="">
      <Loader isVisible={loaderVisible} />
      <h1 className="text-3xl font-bold text-foreground mb-5">
        Создание нового турнира
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Дата и время начала турнира
          </label>
          <div className="flex gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1 justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP", { locale: ru })
                  ) : (
                    <span>Выберите дату</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
            <TimePicker
              value={startTime}
              onChange={handleTimeChange}
              className="flex-1"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Шаблон турнира
          </label>
          {/* <Autocomplete
            placeholder="Поиск шаблона турнира..."
            options={templateOptions}
            value={selectedOption}
            onInputChange={(value) => setTemplateSearchInput(value)}
            onChange={(option) => {
              if (option && "value" in option) {
                setForm((prev) => ({
                  ...prev,
                  templateId: option.value as number,
                }));
              } else {
                setForm((prev) => {
                  const { templateId, ...rest } = prev;
                  return rest;
                });
              }
            }}
            isLoading={false}
            noOptionsMessage={({ inputValue }) =>
              inputValue
                ? `Шаблоны не найдены для "${inputValue}"`
                : "Начните вводить название или локацию"
            }
            isClearable
          /> */}
          <TournamentsTemplatesAutocomplete template={template} onTemplateSelected={setTemplate} />
        </div>
        <div>
          <label htmlFor="fee" className="block text-sm font-medium mb-1.5">
            Взнос
          </label>
          <Input
            type="number"
            id="fee"
            value={form.fee}
            onChange={handleChange}
            placeholder="Взнос"
          />
          {/* {errors.firstName && <FieldError field={errors.firstName} />} */}
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium mb-1.5"
          >
            Категория
          </label>
          <CategorySelect
            onCategoryChanged={(value) =>
              setForm((data) => ({ ...data, category: value }))
            }
            category={form.category}
          />
          {/* {errors.firstName && <FieldError field={errors.firstName} />} */}
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium mb-1.5"
          >
            Рейтинг
          </label>
          <RatingSelect
            onRatingChanged={(value) =>
              setForm((data) => ({ ...data, rating: value }))
            }
            rating={form.rating}
          />
          {/* {errors.firstName && <FieldError field={errors.firstName} />} */}
        </div>
        {/* <div>
           <Command className="rounded-lg border shadow-md">
              <CommandInput 
                placeholder="Поиск по названию, локации или дате..." 
                value={'searchQuery'}
                // onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>Шаблоны не найдены</CommandEmpty>
                <CommandGroup heading="Результаты поиска">
                  {[1, 2, 3].map((tournament) => {
                    return (
                      <CommandItem
                        key={tournament}
                        // onSelect={() => {
                        //   const element = document.getElementById(`tournament-${tournament.id}`);
                        //   element?.scrollIntoView({ behavior: "smooth", block: "center" });
                        // }}
                      >
                        <div className="flex flex-col">
                          {tournament}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
        </div> */}
        <Button type="submit" className="w-full mt-5">
          Создать
        </Button>
      </form>
    </div>
  );
}

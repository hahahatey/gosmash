"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { RichText } from "@/components/ui/RichText";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTournamentsTemplates } from "@/hooks/useTournamentTemplates";
import { CreateTournamentTemplateDto } from "@/lib/dto/tournaments.dto";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function CreateTournamentTemplate() {
  const [form, setForm] = useState<CreateTournamentTemplateDto>({
    name: "",
    location: "",
    description: "",
  });
  const router = useRouter();
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { createTemplateMutation, creatingStatus } = useTournamentsTemplates({
    onCreateSuccessed: () => {
      timeoutRef.current = setTimeout(() => {
        router.replace("/tournaments-manager/tournament-templates");
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
    setError(null);

    const { name, location, description } = form;
    // Валидация на фронтенде (опционально)
    if (!name.trim() || !location.trim()) {
      setError("Заполните все обязательные поля");
      return;
    }

    createTemplateMutation.mutate({ location, name, description });
    console.log(form);
  };

  const loaderVisible = ["pending", "success"].some((status) =>
    creatingStatus.includes(status)
  );

  return (
    <div className="">
      <Loader isVisible={loaderVisible} />
      <h1 className="text-3xl font-bold text-foreground mb-5">
        Создание нового шаблона
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Название
          </label>
          <Input
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Название турнира"
          />
          {/* {errors.firstName && <FieldError field={errors.firstName} />} */}
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium mb-1.5"
          >
            Локация
          </label>
          <Input
            type="text"
            id="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Локация"
          />
          {/* {errors.firstName && <FieldError field={errors.firstName} />} */}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1.5"
          >
            Описание
          </label>
          <Textarea
            id="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full mt-5">
          Создать
        </Button>
      </form>
    </div>
  );
}

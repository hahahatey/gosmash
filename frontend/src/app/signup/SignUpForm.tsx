"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignUpRequest } from "@/lib/dto/auth.dto";
import { cn } from "@/lib/utils";
import {
  Info,
  Mail,
  MessageCircle,
  User,
  Lock,
  CalendarIcon,
} from "lucide-react";
import { FormEvent, useCallback, useMemo, useState } from "react";
import { format } from 'date-fns';
import React from "react";
import { ru } from "date-fns/locale";
import { z } from "zod";
import { signup } from "@/lib/auth/auth.api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Схема валидации с использованием Zod
const createSignUpSchema = (minDate: Date, maxDate: Date, minAgeDate: Date) =>
  z
    .object({
      firstName: z
        .string()
        .trim()
        .min(1, "Введите имя")
        .min(2, "Имя должно содержать минимум 2 символа")
        .max(50, "Имя должно содержать не более 50 символов")
        .regex(
          /^[a-zA-Zа-яА-ЯёЁ\s'-]+$/,
          "Имя может содержать только буквы, пробелы, дефисы и апострофы"
        ),
      lastName: z
        .string()
        .trim()
        .min(1, "Введите фамилию")
        .min(2, "Фамилия должна содержать минимум 2 символа")
        .max(50, "Фамилия должна содержать не более 50 символов")
        .regex(
          /^[a-zA-Zа-яА-ЯёЁ\s'-]+$/,
          "Фамилия может содержать только буквы, пробелы, дефисы и апострофы"
        ),
      birthDate: z
        .string()
        .min(1, "Выберите дату рождения")
        .superRefine((dateStr, ctx) => {
          const date = new Date(dateStr);
          
          if (isNaN(date.getTime())) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Некорректная дата",
            });
            return;
          }
          
          if (date < minDate) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Дата рождения не может быть раньше 1900 года",
            });
            return;
          }
          
          if (date > maxDate) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Дата рождения не может быть в будущем",
            });
            return;
          }
          
          if (date > minAgeDate) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Вам должно быть минимум 13 лет",
            });
          }
        }),
      email: z
        .string()
        .trim()
        .min(1, "Введите email")
        .email("Некорректный email"),
      telegramNickname: z
        .string()
        .trim()
        .min(1, "Введите никнейм Telegram")
        .min(2, "Никнейм слишком короткий (минимум 2 символа, включая @)")
        .max(32, "Никнейм слишком длинный (максимум 32 символа)")
        .regex(
          /^@[\w]+$/,
          "Никнейм должен начинаться с @ и содержать только буквы, цифры и подчеркивания"
        ),
    });

export const SignUpForm = React.memo(function SignUpForm() {
  const [formData, setFormData] = useState<SignUpRequest>({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    telegramNickname: "",
  });
  const {toast} = useToast();

  const [birthDate, setBirthDate] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  // Мемоизируем минимальную и максимальную даты, чтобы не создавать их заново
  const minDate = useMemo(() => new Date("1900-01-01"), []);
  const maxDate = useMemo(() => new Date(), []);
  // Минимальный возраст: 13 лет (можно изменить на 16 или 18)
  const minAgeDate = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 13);
    return date;
  }, []);

  // Мемоизируем схему валидации
  const signUpSchema = useMemo(
    () => createSignUpSchema(minDate, maxDate, minAgeDate),
    [minDate, maxDate, minAgeDate]
  );

  // Мемоизируем функцию disabled, чтобы она не пересоздавалась на каждом рендере
  const isDateDisabled = useMemo(
    () => (date: Date) => date > maxDate || date < minDate,
    [maxDate, minDate]
  );

  // Мемоизируем обработчик выбора даты
  const handleDateSelect = useCallback((date: Date | undefined) => {
    setBirthDate(date);
    if (date) {
      // Синхронизируем с formData.birthDate в формате YYYY-MM-DD
      const formattedDate = format(date, 'yyyy-MM-dd');
      setFormData((prev) => ({ ...prev, birthDate: formattedDate }));
      // Удаляем ошибку при выборе даты
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.birthDate;
        return newErrors;
      });
    }
  }, []);

  const handleChange = (
    field: keyof SignUpRequest,
    value: SignUpRequest[keyof SignUpRequest]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    try {
      signUpSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            const field = issue.path[0] as string;
            // Берем первое сообщение об ошибке для каждого поля
            if (!formattedErrors[field]) {
              formattedErrors[field] = issue.message;
            }
          }
        });
        setErrors(formattedErrors);
        return false;
      }
      setErrors({});
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await signup(formData);
      toast({title: 'Пользователь создан', description: 'Для входа в аккаунт необходимо получить код подтверждения.'});
      router.replace('/signin');
    }
  };


  return (
    <div className="w-full h-full max-w-md m-auto flex items-center">
      <div className="rounded-2xl shadow-xl p-8 border bg-card text-card-foreground">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-card-foreground mb-2">
            Регистрация
          </h1>
          <p className="text-muted-foreground">Создайте свой аккаунт</p>
        </div>

        <div className="mb-6 p-4 bg-muted text-muted-foreground rounded-lg">
          <div className="flex gap-3">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-card-foreground" />
            <div className="text-sm">
              <p className="font-medium mb-1 text-card-foreground">
                Вход через Telegram бота
              </p>
              <p className="">
                Вход в сервис осуществляется через Telegram бота. Пароль
                необходим только для восстановления доступа.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-1.5"
              >
                Имя
              </label>
              <Input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Иван"
                className={cn(errors.firstName && "border-destructive focus-within:ring-destructive")}
              />
              {errors.firstName && <FieldError field={errors.firstName} />}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-1.5"
              >
                Фамилия
              </label>
              <Input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Иванов"
                className={cn(errors.lastName && "border-destructive focus-within:ring-destructive")}
              />
              {errors.lastName && <FieldError field={errors.lastName} />}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Дата рождения
            </label>
           <BirthDatePopover birthDate={birthDate} onDateSelect={handleDateSelect} disabledDates={isDateDisabled} hasError={!!errors.birthDate} />
            {errors.birthDate && <FieldError field={errors.birthDate} />}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Почта
            </label>

            <Input
              startIcon={<Mail className="h-5 w-5" />}
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="example@email.com"
              className={cn(errors.email && "border-destructive focus-within:ring-destructive")}
            />
            {errors.email && <FieldError field={errors.email} />}
          </div>

          <div>
            <label
              htmlFor="telegramUsername"
              className="block text-sm font-medium mb-1.5"
            >
              Telegram никнейм
            </label>

            <Input
              startIcon={<MessageCircle className="h-5 w-5" />}
              type="text"
              id="telegramUsername"
              value={formData.telegramNickname}
              onChange={(e) => handleChange("telegramNickname", e.target.value)}
              placeholder="@username"
              className={cn(errors.telegramNickname && "border-destructive focus-within:ring-destructive")}
            />
            {errors.telegramNickname && (
              <FieldError field={errors.telegramNickname} />
            )}
          </div>

          <Button type="submit" className="w-full mt-5">
            Далее
          </Button>
        </form>
      </div>
    </div>
  );
});

const FieldError = ({ field }: { field: string }) => (
  <p className="mt-1 text-xs text-destructive">{field}</p>
);


interface BirthDatePopoverProps {
  birthDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  disabledDates?: (date: Date) => boolean;
  hasError?: boolean;
}

const BirthDatePopover = React.memo<BirthDatePopoverProps>(
  ({ birthDate, onDateSelect, disabledDates, hasError }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = useCallback((date: Date | undefined) => {
      onDateSelect(date);
      if (date) setOpen(false);
    }, [onDateSelect]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !birthDate && "text-muted-foreground",
              hasError && "border-destructive focus-visible:ring-destructive"
            )}
          >
            <CalendarIcon className="mr-1 h-4 w-4" />
            {birthDate ? (
              format(birthDate, "PPP", { locale: ru })
            ) : (
              <span>Выберите дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
          <Calendar
            mode="single"
            selected={birthDate}
            onSelect={handleSelect}
            disabled={disabledDates}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    );
  }
);
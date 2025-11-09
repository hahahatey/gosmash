"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Info,
  Mail,
  MessageCircle,
  User,
  Lock,
  CalendarIcon,
} from "lucide-react";
import { FormEvent, useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    telegramUsername: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
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
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Введите имя";
    if (!formData.lastName.trim()) newErrors.lastName = "Введите фамилию";
    if (!formData.birthDate) newErrors.birthDate = "Выберите дату рождения";
    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }
    if (!formData.telegramUsername.trim()) {
      newErrors.telegramUsername = "Введите никнейм Telegram";
    } else if (!/^@?[a-zA-Z0-9_]{5,}$/.test(formData.telegramUsername)) {
      newErrors.telegramUsername = "Некорректный никнейм (минимум 5 символов)";
    }
    if (!formData.password) {
      newErrors.password = "Введите пароль";
    } else if (formData.password.length < 8) {
      newErrors.password = "Пароль должен содержать минимум 8 символов";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // if (validate()) {
    //   onSubmit({
    //     firstName: formData.firstName,
    //     lastName: formData.lastName,
    //     birthDate: formData.birthDate,
    //     email: formData.email,
    //     telegramUsername: formData.telegramUsername,
    //   });
    // }
  };

  return (
    <div className="w-full max-w-md m-auto flex items-center">
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
              />
              {errors.lastName && <FieldError field={errors.lastName} />}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Дата рождения
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.birthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {/* {formData.birthDate
                    ? format(formData.birthDate, "PPP", { locale: ru })
                    : "Выберите дату (необязательно)"} */}
                  Выберите дату (необязательно)
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.birthDate || new Date()}
                  onSelect={() => {}}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1940-01-01")
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
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
              value={formData.telegramUsername}
              onChange={(e) => handleChange("telegramUsername", e.target.value)}
              placeholder="@username"
            />
            {errors.telegramUsername && (
              <FieldError field={errors.telegramUsername} />
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1.5"
            >
              Пароль
            </label>
            <Input
              startIcon={<Lock className="h-5 w-5" />}
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Минимум 8 символов"
            />
            {errors.password && <FieldError field={errors.password} />}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1.5"
            >
              Подтвердите пароль
            </label>

            <Input
              startIcon={<Lock className="h-5 w-5" />}
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Повторите пароль"
            />
          </div>
          {errors.confirmPassword && (
            <FieldError field={errors.confirmPassword} />
          )}

          <Button type="submit" className="w-full mt-5">
            Далее
          </Button>
        </form>
      </div>
    </div>
  );
};

const FieldError = ({ field }: { field: string }) => (
  <p className="mt-1 text-xs text-destructive">{field}</p>
);

export default SignUp;

"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: string; // формат "HH:MM"
  onChange?: (value: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [hours, setHours] = React.useState<number>(0);
  const [minutes, setMinutes] = React.useState<number>(0);
  const hourButtonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const minuteButtonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Инициализация из value
  React.useEffect(() => {
    if (value) {
      const [h, m] = value.split(":").map(Number);
      setHours(h);
      setMinutes(m);
    }
  }, [value]);

  // Автопрокрутка к выбранным значениям при открытии
  React.useEffect(() => {
    if (open) {
      // Прокрутка к часам
      setTimeout(() => {
        const selectedHourButton = hourButtonRefs.current[hours];
        if (selectedHourButton) {
          selectedHourButton.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);

      // Прокрутка к минутам
      setTimeout(() => {
        const selectedMinuteButton = minuteButtonRefs.current[minutes];
        if (selectedMinuteButton) {
          selectedMinuteButton.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 150);
    }
  }, [open, hours, minutes]);

  const handleHoursChange = React.useCallback(
    (newHours: number) => {
      setHours(newHours);
      const formattedTime = `${String(newHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
      onChange?.(formattedTime);
    },
    [minutes, onChange]
  );

  const handleMinutesChange = React.useCallback(
    (newMinutes: number) => {
      setMinutes(newMinutes);
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        newMinutes
      ).padStart(2, "0")}`;
      onChange?.(formattedTime);
    },
    [hours, onChange]
  );

  const formattedValue = value
    ? value
    : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex-1 justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {formattedValue || <span>Выберите время</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex items-center gap-2">
          {/* Часы */}
          <div className="flex flex-col items-center">
            <label className="text-xs font-medium text-muted-foreground mb-2">
              Часы
            </label>
            <div 
              className="h-[200px] w-16 overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <div className="flex flex-col items-center gap-1 py-2">
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <button
                    key={h}
                    ref={(el) => {
                      hourButtonRefs.current[h] = el;
                    }}
                    type="button"
                    onClick={() => handleHoursChange(h)}
                    className={cn(
                      "w-12 h-8 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                      hours === h &&
                        "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {String(h).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Разделитель */}
          <div className="flex flex-col items-center justify-center pt-8">
            <span className="text-2xl font-bold">:</span>
          </div>

          {/* Минуты */}
          <div className="flex flex-col items-center">
            <label className="text-xs font-medium text-muted-foreground mb-2">
              Минуты
            </label>
            <div 
              className="h-[200px] w-16 overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <div className="flex flex-col items-center gap-1 py-2">
                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                  <button
                    key={m}
                    ref={(el) => {
                      minuteButtonRefs.current[m] = el;
                    }}
                    type="button"
                    onClick={() => handleMinutesChange(m)}
                    className={cn(
                      "w-12 h-8 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                      minutes === m &&
                        "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {String(m).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка подтверждения */}
        <div className="flex justify-end mt-4 pt-3 border-t">
          <Button
            type="button"
            size="sm"
            onClick={() => setOpen(false)}
            className="h-8"
          >
            Готово
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}


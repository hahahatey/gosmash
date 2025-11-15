import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayPickerProps } from "react-day-picker";
import { ru } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CalendarProps = DayPickerProps;

// Мемоизируем массивы вне компонента, чтобы они не пересоздавались
const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
] as const;

// Создаем массив годов один раз
const YEARS = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, i) => 1900 + i
).reverse();

// Мемоизируем компонент MonthCaption для предотвращения лишних ререндеров
const MonthCaption = React.memo(
  ({
    calendarMonth,
    onMonthChange,
    onYearChange,
    currentMonth: selectedMonth,
  }: {
    currentMonth: Date,
    calendarMonth: { date: Date };
    onMonthChange: (month: string | Date) => void;
    onYearChange: (year: string) => void;
  }) => {
    const currentMonth = calendarMonth.date.getMonth();
    const currentYear = calendarMonth.date.getFullYear();

    return (
      <div className="flex justify-center items-center gap-2">
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          onClick={() => {
            const newDate = new Date(selectedMonth);
            newDate.setMonth(selectedMonth.getMonth() - 1);
            onMonthChange(newDate);
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <Select value={currentMonth.toString()} onValueChange={onMonthChange}>
          <SelectTrigger className="h-8 w-[110px]">
            <SelectValue>{MONTHS[currentMonth]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={currentYear.toString()} onValueChange={onYearChange}>
          <SelectTrigger className="h-8 w-[80px]">
            <SelectValue>{currentYear}</SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {YEARS.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          onClick={() => {
            const newDate = new Date(selectedMonth);
            newDate.setMonth(selectedMonth.getMonth() + 1);
            onMonthChange(newDate);
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
MonthCaption.displayName = "MonthCaption";

// Мемоизируем объект classNames вне компонента, чтобы он не пересоздавался
const defaultClassNames = {
  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
  month: "space-y-4",
  month_caption: "flex justify-between pt-1 items-center mb-2 gap-2",
  caption_label: "hidden",
  nav: "flex items-center gap-1",
  button_previous: cn(
    buttonVariants({ variant: "outline" }),
    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
  ),
  button_next: cn(
    buttonVariants({ variant: "outline" }),
    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
  ),
  month_grid: "w-full border-collapse space-y-1",
  weekdays: "flex justify-between",
  weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
  week: "flex w-full justify-between",
  day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
  day_button: cn(
    buttonVariants({ variant: "ghost" }),
    "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
  ),
  range_end: "day-range-end",
  selected:
    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  today: "bg-accent text-accent-foreground",
  outside:
    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
  disabled: "text-muted-foreground opacity-50",
  range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
  hidden: "invisible",
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // Инициализируем месяц из selected даты, если она есть, иначе используем текущую дату
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() =>
    props.selected instanceof Date ? props.selected : new Date()
  );

  // Обновляем currentMonth когда selected меняется
  React.useEffect(() => {
    if (props.selected instanceof Date) {
      setCurrentMonth(props.selected);
    }
  }, [props.selected]);

  // Мемоизируем обработчики, чтобы они не пересоздавались на каждом рендере
  const handleMonthChange = React.useCallback((month: string | Date) => {
    setCurrentMonth((prev) => {
      if (month instanceof Date) {
        return month;
      }
      const newDate = new Date(prev);
      newDate.setMonth(parseInt(month));
      return newDate;
    });
  }, []);

  const handleYearChange = React.useCallback((year: string) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(parseInt(year));
      return newDate;
    });
  }, []);

  // Мемоизируем компоненты, чтобы они не пересоздавались на каждом рендере
  const components = React.useMemo(
    () => ({
      // Chevron: ({ orientation }: { orientation: "left" | "right" }) =>
      //   orientation === "left" ? (
      //     <ChevronLeft className="h-4 w-4" />
      //   ) : (
      //     <ChevronRight className="h-4 w-4" />
      //   ),
      MonthCaption: ({ calendarMonth }: { calendarMonth: { date: Date } }) => (
        <MonthCaption
          calendarMonth={calendarMonth}
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
      ),
    }),
    [handleMonthChange, handleYearChange, currentMonth]
  );

  // Мержим classNames один раз
  const mergedClassNames = React.useMemo(
    () => ({
      ...defaultClassNames,
      ...classNames,
    }),
    [classNames]
  );

  return (
    <DayPicker
      locale={ru}
      showOutsideDays={showOutsideDays}
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={mergedClassNames}
      components={components}
      // components={{
      //   MonthCaption: (props) => props.children,
      //   DropdownNav: (props) => (
      //     <div id="srak" className="flex w-full items-center gap-2">
      //       {props.children}
      //     </div>
      //   ),
      //   Dropdown: (props) => (
      //     <Select
      //       onValueChange={(value) => {
      //         if (props.onChange) {
      //           // handleCalendarChange(value, props.onChange);
      //         }
      //       }}
      //       value={String(props.value)}
      //     >
      //       <SelectTrigger className="first:flex-1 last:shrink-0">
      //         <SelectValue />
      //       </SelectTrigger>
      //       <SelectContent>
      //         {props.options?.map((option) => (
      //           <SelectItem
      //             disabled={option.disabled}
      //             key={option.value}
      //             value={String(option.value)}
      //           >
      //             {option.label}
      //           </SelectItem>
      //         ))}
      //       </SelectContent>
      //     </Select>
      //   ),
      // }}
      captionLayout="dropdown"
      hideNavigation
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

import { cn } from "@/lib/utils";
import {
  Root,
  Input,
  OneTimePasswordFieldProps,
  OneTimePasswordFieldInputProps,
} from "@radix-ui/react-one-time-password-field";

type Props = {
  value: string;
};

export const OneTImePasswordRoot: React.FC<OneTimePasswordFieldProps> = (
  props
) => {
  return (
    <Root
      {...props}
      className={cn(props.className, "flex gap-3 justify-center text-card-foreground")}
    />
  );
};

export const OneTImePasswordInput: React.FC<OneTimePasswordFieldInputProps> = (
  props
) => {
  return (
    <Input
      {...props}
      className={cn(
        props.className,
        `select-none w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg
                  ${false ? "border-red-300 bg-red-50" : "border-border"}
                  ${false ? "bg-gray-100" : "bg-card"}
                  focus:ring-2 focus:ring-ring outline-none`
      )}
    />
  );
};

import { cn } from "@/lib/utils"

export const AuthCard: React.FC<{ children: React.ReactNode, className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("w-full h-full max-w-md m-auto flex items-center", className)}>
      <div className="w-full rounded-2xl shadow-xl p-8 border bg-card text-card-foreground">
        {children}
      </div>
    </div>
  );
};

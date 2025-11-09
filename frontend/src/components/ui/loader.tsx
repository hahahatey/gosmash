import { cn } from "@/lib/utils"

interface LoaderProps {
  isVisible?: boolean
  className?: string
}

export function Loader({ isVisible = false, className }: LoaderProps) {
  if (!isVisible) return null

  return (
    <div 
      className={cn(
        "absolute inset-0 z-50 bg-background/80 backdrop-blur-sm",
        "flex items-center justify-center",
        "animate-in fade-in-0",
        className
      )}
    >
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>
    </div>
  )
}
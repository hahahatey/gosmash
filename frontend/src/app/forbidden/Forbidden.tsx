"use client";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export function Forbidden() {
  const router = useRouter();
  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-tennis-clay/5">
      {/* Animated tennis ball decoration */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-tennis-ball/20 blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-tennis-grass/20 blur-xl animate-pulse delay-700" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-tennis-clay/20 blur-lg animate-pulse delay-500" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Tennis court lines decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/2 w-px h-full bg-foreground transform -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-foreground transform -translate-y-1/2" />
        </div>

        {/* Main content */}
        <div className="relative">
          <div className="mb-6 inline-flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-tennis-ball/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative bg-linear-to-br to-primary text-foreground p-6 rounded-full">
                <ShieldAlert className="w-16 h-16" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-tennis-ball to-tennis-grass bg-clip-text text-transparent animate-fade-in">
            403
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground animate-fade-in delay-100">
            Аут! 🎾
          </h2>
          
          <p className="text-lg text-foreground mb-3 animate-fade-in delay-200">
            Вы вышли за пределы корта
          </p>
          
          <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto animate-fade-in delay-300">
            У вас нет доступа к этой части приложения.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-500">
            <Button 
              onClick={() => router.replace("/")}
              size="lg"
              // className="group relative overflow-hidden bg-gradient-to-r from-primary to-tennis-ball hover:shadow-lg hover:shadow-tennis-ball/20 transition-all duration-300"
            >
              <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Вернуться на главную
            </Button>
            
            {/* <Button 
              // onClick={() => navigate(-1)}
              variant="outline"
              size="lg"
              className="border-tennis-clay/30 hover:bg-tennis-clay/5 hover:border-tennis-clay transition-all duration-300"
            >
              Назад
            </Button> */}
          </div>
        </div>

        {/* Tennis net decoration at bottom */}
        <div className="mt-16 pt-8 border-t-2 border-dashed border-muted-foreground/20 relative">
          <div className="flex justify-center gap-8 opacity-30">
            <div className="text-4xl animate-bounce" style={{ animationDelay: "0s" }}>🎾</div>
            <div className="text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>🏆</div>
            <div className="text-4xl animate-bounce" style={{ animationDelay: "0.4s" }}>🎾</div>
          </div>
        </div>
      </div>
    </div>
  );
};
"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";

export default function TournamentsManager(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    router.push("/tournament-templates");
  };
  return <div></div>;
  
    // <div className="w-full h-full max-w-5xl m-auto flex items-center">
    //   <div className="flex w-full h-full bg-sidebar rounded-2xl border">
    //     <div className="h-full px-5 py-3 bg-sidebar text-sidebar-foreground rounded-2xl flex flex-col gap-1">
    //       <Button
    //         className="w-full"
    //         onClick={handleClick}
    //         variant={
    //           pathname.includes("/tournament-templates") ? "default" : "ghost"
    //         }
    //       >
    //         Шаблоны турниров
    //       </Button>
    //       {/* <Separator /> */}
    //       <Button className="w-full" variant="ghost">
    //         Турниры
    //       </Button>
    //     </div>
    //     <div className="grow-2 rounded-2xl m-3 bg-background"></div>
    //   </div>
    // </div>
  
}

"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const items = [
  {
    url: "/tournaments-manager/tournament-templates",
    label: "Шаблоны турниров",
  },
  {
    url: "/tournaments-manager/tournaments",
    label: "Турниры",
  },
];

export default function TournamentsManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (url: string) => () => {
    router.push(url);
  };

  return (
    <div className="page-container">
      <div className="flex w-full h-full bg-sidebar rounded-2xl border">
        <div className="h-full px-5 py-3 bg-sidebar text-sidebar-foreground rounded-2xl flex flex-col gap-1">
          {items.map(({url, label}) => (
            <Button
              className="w-full"
              onClick={handleClick(url)}
              variant={
                pathname.includes(url) ? "default" : "ghost"
              }
              key={url}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="grow-2 rounded-2xl m-3 bg-background p-5 relative overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

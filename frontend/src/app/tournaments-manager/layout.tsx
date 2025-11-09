"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const items = [
  {
    url: "tournament-templates",
    label: "Шаблоны турниров",
  },
  {
    url: "tournament-templates1",
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
    router.push(`${pathname}/${url}`);
  };

  return (
    <div className="w-full h-full max-w-5xl m-auto flex items-center">
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

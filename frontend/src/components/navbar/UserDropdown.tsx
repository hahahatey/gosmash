import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Fragment } from "react";

const items = [
  {
    label: "Мой профиль",
    url: "/profile",
    Icon: User,
  },
  {
    label: "Выйти",
    url: "logoit",
    Icon: LogOut,
  },
];

type Props = {
  userName: string;
};

export const UserDropdown: React.FC<Props> = ({ userName }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-sidebar-accent"
        >
          <div className="h-8 w-8 rounded-full bg-sidebar-foreground/20 flex items-center justify-center">
            <User className="h-4 w-4 text-sidebar-foreground" />
          </div>
          <span className="text-sm font-medium">{userName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        // align="end"
        className="w-56 bg-popover text-popover-foreground border border-border"
      >
        {/* <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" /> */}
        {items.map(({ url, Icon, label }, i) => (
          <Fragment key={url}>
            <DropdownMenuItem
              // onClick={() => navigate("/profile")}
              className="cursor-pointer"
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{label}</span>
            </DropdownMenuItem>
            {i !== items.length - 1 && (
              <DropdownMenuSeparator className="bg-border" />
            )}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

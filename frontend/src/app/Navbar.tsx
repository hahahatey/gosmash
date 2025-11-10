"use client";

import { useState } from "react";
import { Menu, X, Trophy, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useAuth } from "@/hooks/useAuth";
import { UserActionsDropdown } from "@/components/navbar/UserActionsDropdown";

//  const navItems = [
//     { name: 'Главная', path: '/' },
//     { name: 'Турниры', path: '/tournaments' },
//     // { name: 'Регистрация', path: '/register' },
//   ];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="bg-sidebar text-sidebar-foreground backdrop-blur-sm border-b border-sidebar-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:text-sidebar-foreground/80 transition-colors"
          >
            <Trophy className="h-8 w-8" />
            <span className="text-xl font-bold">GoSmash</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            {isAuthenticated && user && (
              <div className="hidden md:flex">
                 <UserActionsDropdown />
              </div>
            )}
            {!isAuthenticated && (
              <div className="hidden md:flex">
                <Button asChild size="sm">
                  <Link href="/signin">Войти</Link>
                </Button>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-tennis-clay hover:text-tennis-dark-clay"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {/* {isOpen && (
          <div className="md:hidden border-t border-tennis-clay/20 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-2 px-3 py-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-sidebar-foreground/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-sidebar-foreground" />
                  </div>
                  <span className="text-sm font-medium text-sidebar-foreground">
                    {getUserDisplayName()}
                  </span>
                </div>
              )}
              {!isAuthenticated && (
                <div className="px-2">
                  <Button asChild className="w-full" size="sm">
                    <Link href="/signin">Войти</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </nav>
  );
};

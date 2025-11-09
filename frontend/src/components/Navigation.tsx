
"use client"

import { useState } from 'react';
import { Menu, X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

 const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Турниры', path: '/tournaments' },
    // { name: 'Регистрация', path: '/register' },
  ];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-tennis-clay/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-tennis-clay hover:text-tennis-dark-clay transition-colors">
            <Trophy className="h-8 w-8" />
            <span className="text-xl font-bold">YaTennis</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? 'text-tennis-clay border-b-2 border-tennis-clay'
                    : 'text-gray-700 hover:text-tennis-clay'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-tennis-clay hover:text-tennis-dark-clay"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-tennis-clay/20 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    pathname === item.path
                      ? 'text-tennis-clay bg-tennis-clay/10'
                      : 'text-gray-700 hover:text-tennis-clay hover:bg-tennis-clay/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

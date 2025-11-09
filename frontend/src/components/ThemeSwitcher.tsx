import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    updateTheme(shouldBeDark);
  }, []);

  const updateTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);
  };

  if (!mounted) {
    return <div className="w-12 h-12" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-lg  dark:bg-gray-8001 hover:bg-gray-3001 dark:hover:bg-gray-7001 transition-colors flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute w-6 h-6 text-sidebar-foreground transition-all duration-300 transform ${
            isDark ? 'scale-0 opacity-0 rotate-180' : 'scale-100 opacity-100 rotate-0'
          }`}
        />
        <Moon
          className={`absolute w-6 h-6 text-sidebar-foreground transition-all duration-300 transform ${
            isDark ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'
          }`}
        />
      </div>
    </button>
  );
}

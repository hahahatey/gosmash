
"use client"

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
// import imageUrl from '../pages/8354.jpg';
import Link from 'next/link';

const ParallaxHero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = heroRef.current.querySelector('.parallax-bg') as HTMLElement;
        if (parallax) {
          const speed = 0.5;
          parallax.style.transform = `translateY(${scrolled * speed}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[70vh] flex items-center"
    >
      {/* Параллакс фон */}
      <div
        className="parallax-bg absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(./heroImage.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          transform: 'translateZ(0)', // Оптимизация для GPU
        }}
      ></div>

      {/* Градиент поверх фона */}
      <div className="absolute inset-0 clay-gradient"></div>
      <div className="absolute inset-0 court-pattern opacity-20"></div>

      {/* Контент */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in drop-shadow-lg">
          Ваш путь к победе начинается здесь!
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
          Участвуй в турнирах, расширяй круг общения и поднимайся в рейтинге теннисистов
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button asChild size="lg" className="bg-white text-tennis-clay hover:bg-gray-100">
            <Link href="/tournaments">
              Посмотреть турниры
            </Link>
          </Button>
          {/* <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-tennis-clay hover-lift">
            <Link to="/register">
              Зарегистрироваться
            </Link>
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;

import { useState, useEffect, useRef } from "react";
import { Calendar, Clock } from "lucide-react";
import { declineNoun, formatDate } from "@/lib/utils";

type Props = {
  date: Date;
  openSeason?: boolean;
};

const TournamentTimer: React.FC<Props> = ({ date, openSeason = false }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [ballVisible, setBallVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const timerRef = useRef<HTMLDivElement>(null);

  const targetDate = date.getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          console.log("Timer section is visible, starting ball animation");
          setBallVisible(true);
          setHasAnimated(true);

          // Сброс анимации через 4 секунды (длительность анимации)
          setTimeout(() => {
            setBallVisible(false);
          }, 4000);
        }
      },
      { threshold: 0.3 }
    );

    if (timerRef.current) {
      observer.observe(timerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="py-16 bg-gradient-to-br from-tennis-light-clay to-orange-50 relative overflow-hidden">
      {/* Анимация теннисного мяча */}
      {ballVisible && (
        <div className="absolute top-1/2 left-0 w-full h-16 pointer-events-none z-20">
          <div className="tennis-ball-animation">🎾</div>
        </div>
      )}

      <div
        ref={timerRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="h-8 w-8 text-tennis-clay mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">
              До ближайшего турнира
            </h2>
          </div>

          {openSeason && (
            <div className="text-lg text-gray-600 mb-8">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 mr-2" />
                Открытие сезона - Новосибирск
              </div>
              <p className="text-sm">{formatDate(date)}</p>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="bg-tennis-clay/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-tennis-clay">
                {timeLeft.days}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {declineNoun(timeLeft.days, ["день", "дня", "дней"])}
              </div>
            </div>

            <div className="bg-tennis-clay/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-tennis-clay">
                {timeLeft.hours}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {declineNoun(timeLeft.hours, ["час", "часа", "часов"])}
              </div>
            </div>

            <div className="bg-tennis-clay/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-tennis-clay">
                {timeLeft.minutes}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {declineNoun(timeLeft.minutes, ["минута", "минуты", "минут"])}
              </div>
            </div>

            <div className="bg-tennis-clay/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-tennis-clay">
                {timeLeft.seconds}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {declineNoun(timeLeft.seconds, [
                  "секунда",
                  "секунды",
                  "секунд",
                ])}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentTimer;

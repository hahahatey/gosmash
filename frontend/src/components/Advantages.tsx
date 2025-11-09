"use client"

const advantages = [
  {
    title: "Проверь свои навыки",
    description:
      "Соревнуйся с игроками твоего уровня и становись лучше с каждым матчем",
    src: '/nadal.jpg',
  },
  {
    title: "Найди единомышленников",
    description:
      "Познакомься с сообществом увлеченных теннисистов и найди партнеров для тренировок",
    src: '/pairs.jpg',
  },
  {
    title: "Покори вершину рейтинга",
    description: "Побеждай в турнирах и поднимайся в топ лучших игроков",
    src: '/carlos.jpg',
  },
];

export const Advantages = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map(({ title, description, src }) => {
            return (
              <div key={title} className="text-center">
                <div className="w-20 h-20 bg-tennis-clay/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src={src}
                    alt={title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

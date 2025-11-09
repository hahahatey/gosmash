
import first_3105 from './3105_first.jpg';
import second_3105 from './3105_second.jpg';
import third_3105 from './3105_third.jpg';
import dop_3105 from './3105_dop.jpg';

import all_1406 from './1406_all.jpg';
import winners_1406 from './1406_winners.jpg';
import dop_1406 from './1406_dop.jpg';

import winners_2806 from './2806.jpg';
import dop_2806 from './2806_dop.jpg';

import winners_0706 from './0706.jpg';
import all_0706 from './0706_all.jpg';
import { StaticImageData } from 'next/image';

type TournamentPhoto = {
  id: number;
  url: StaticImageData;
  caption?: string;
};

export const tournamentPhotosByTournament: Record<number, TournamentPhoto[]> = {
  1: [
    {
      id: 1,
      url: first_3105,
      caption: "Победители турнира"
    },
    {
      id: 2,
      url: second_3105,
      caption: "Серебрянные призеры"
    },
    {
      id: 3,
      url: third_3105,
      caption: "Бронза"
    },
    {
      id: 4,
      url: dop_3105,
      caption: "Победители доп. турнира"
    },
  ],
  3: [
    {
      id: 1,
      url: all_1406,
      caption: "Участники турнира"
    },
    {
      id: 2,
      url: winners_1406,
      caption: "Призеры турнира"
    },
    {
      id: 3,
      url: dop_1406,
      caption: "Победитель доп. турнира"
    },
  ],
  4: [
    {
      id: 1,
      url: winners_2806,
      caption: "Призеры турнира"
    },
    {
      id: 2,
      url: dop_2806,
      caption: "Победитель доп. турнира"
    },
  ],
  2: [
    {
      id: 1,
      url: winners_0706,
      caption: "Призеры турнира"
    },
    {
      id: 2,
      url: all_0706,
      caption: "Участники турнира"
    },
  ]
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Organizer, Tournament } from "./types";

export const YAROSLAV: Organizer = {
  firstName: "Ярослав",
  lastName: "Яковлев",
  phone: "+7 913 000-59-99",
  email: "Sting89@mail.ru",
};

const NARIM = "Нарымский сквер, Советская, 93 к.2";

export const tournamentsMap: Record<number, Tournament> = {
  1: {
    id: 1,
    date: new Date("2025-05-31T14:00:00"),
    location: NARIM,
    participantsNumber: 12,
    prize: 20000,
    type: "mix",
    entryFee: 5000,
    registrationDeadline: new Date("2025-05-30T14:00:00"),
    rating: 7,
    organaizer: YAROSLAV,
  },
  2: {
    id: 2,
    entryFee: 3000,
    organaizer: YAROSLAV,
    date: new Date("2025-06-07"),
    location: NARIM,
    registrationDeadline: new Date("2025-06-06T14:00:00"),
    participantsNumber: 12,
    prize: 20000,
    type: "woman-single",
    rating: 7,
  },
  3: {
    id: 3,
    entryFee: 5000,
    organaizer: YAROSLAV,
    date: new Date("2025-06-14"),
    location: NARIM,
    registrationDeadline: new Date("2025-06-13T14:00:00"),
    participantsNumber: 12,
    prize: 20000,
    type: "man-single",
    rating: 7,
  },
  4: {
    id: 4,
    entryFee: 5000,
    organaizer: YAROSLAV,
    date: new Date("2025-06-28"),
    location: NARIM,
    registrationDeadline: new Date("2025-06-27T14:00:00"),
    participantsNumber: 12,
    prize: 20000,
    type: "man-single",
    rating: 7,
  },
};

export const tournaments = Object.values(tournamentsMap).sort(
  (a, b) => (b.date as any) - (a.date as any)
);

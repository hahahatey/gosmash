export type ParticipantId =
  | "YAROSLAV_YAKOVLEV"
  | "YANA_DJIGIT"
  | "ALEKSEY_DOROSH"
  | "YULIA_KHON"
  | "OLEG_KHATEEV"
  | "SVETLANA_FROLOVA"
  | "ALEKEI_IVANOV"
  | "NASTYA_VOITOVICH"
  | "TANYA_SIMONYAK"
  | "ANDREY_SHEVCHENKO"
  | "EVG_CHYLGANOVA"
  | "MARIA_HOVALIG"
  | "SASHA_FRIDI"
  | "NINA_MALOFEEVA"
  | "EGOR_TARASOV"
  | "OLGA_SHMAKOVA"
  | "ANDREY_KOLT"
  | "PAVEL_SAMOLOVOV"
  | "VALERIA_IGAY"
  | "KATYA_KOLT"
  | "TANYA_LENE"
  | "ANTON_SKAKA"
  | "ANTON_KOSHEEV"
  | "IGOR_SOLOVIEV"
  | "NATASHA_ZAYCEVA"
  | "YULIA_ASANOVA"
  | "YULIA_ARTEMVIEVA"
  | "SASHA_RESHETNIKOVA"
  | "TAISIA_DRYGOCHENKO"
  | "KRISINA_OMELYANCHUK"
  | "KONSTANTIN_GOLIKOV"
  | "KSENIA_YPOROVA"
  | "IGOR_MAKARENKO"
  | "DENIS_MOSKALEV"
  | "ARTEM_BURDEY"
  | "MAKSIM_OMELYANCHUK"
  | "SASHA_VLASECKIY"
  | "EVG_RASSADNIKOV"
  | "ALEKSEI_STRAHOVENKO"
  | "DMITRIY_PLAKSIN"
  | "ROMAN_TASHKINOV"
  | "ALEKSEI_LOBKOV";
// [YAROSLAV_YAKOVLEV, YANA_DJIGIT],
//       [ALEKSEY_DOROSH, YULIA_KHON],
//       [OLEG_KHATEEV, SVETLANA_FROLOVA],
//       [ALEKEI_IVANOV, NASTYA_VOITOVICH],
//       [IGOR_SOLOVIEV, TANYA_SIMONYAK],
//       [ANDREY_SHEVCHENKO, EVG_CHYLGANOVA],
//       [ANTON_KOSHEEV, MARIA_HOVALIG],
//       [SASHA_FRIDI, NINA_MALOFEEVA],
//       [EGOR_TARASOV, OLGA_SHMAKOVA],
//       [ANDREY_KOLT, KATYA_KOLT],
//       [PAVEL_SAMOLOVOV, VALERIA_IGAY],
//       [ANTON_SKAKA, TANYA_LENE],
export type Tournament = {
  type: TournamentType;
  rating: number;
  date: Date;
  location: string;
  participantsNumber: number;
  prize: number;
  id: number;
  organaizer: Organizer;
  entryFee: number;
  registrationDeadline: Date;
};

export type Player = {
  firstName: string;
  lastName: string;
  rating: number;
  points: number;
  id: ParticipantId;
  participatedTournaments: number[];
  isStar?: boolean;
};

export type TournamentType =
  | "woman-pairs"
  | "man-pairs"
  | "mix"
  | "man-single"
  | "woman-single";

export type Organizer = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  whatsapp?: string;
};

export type Group = {
  id: number;
  tournamentId: number;
};

export type TournamentParticipants = {
  participantId: number;
  tournamentId: number;
  playerId: ParticipantId[];
  groupId: number;
  groupWeight: number;
};

export type Match = {
  id: number;
  tournamentId: number;
  player1: ParticipantId[];
  player2: ParticipantId[];
  winner: 1 | 2;
  scoreUp: number;
  scoreDown: number;
  tiebreakDown?: number;
  groupId?: number;
  round?: string;
  type?: "upper" | "lower";
  parentsMatch?: number[];
  nextMatch?: number;
};

import { groupBy } from "@/lib/utils";
import { ParticipantId, TournamentParticipants } from "./types";

let participantId = 0;

export const tournamentsParticipants: TournamentParticipants[] = [
  {
    groupId: 1,
    participantId: participantId++,
    playerId: ["ALEKSEY_DOROSH", "YULIA_KHON"],
    tournamentId: 1,
    groupWeight: 1,
  },
  {
    groupId: 1,
    participantId: participantId++,
    playerId: ["OLEG_KHATEEV", "SVETLANA_FROLOVA"],
    tournamentId: 1,
    groupWeight: 2,
  },
  {
    groupId: 1,
    participantId: participantId++,
    playerId: ["ALEKEI_IVANOV", "NASTYA_VOITOVICH"],
    tournamentId: 1,
    groupWeight: 3,
  },
  {
    groupId: 2,
    participantId: participantId++,
    playerId: ["IGOR_SOLOVIEV", "TANYA_SIMONYAK"],
    tournamentId: 1,
    groupWeight: 1,
  },
  {
    groupId: 2,
    participantId: participantId++,
    playerId: ["ANDREY_SHEVCHENKO", "EVG_CHYLGANOVA"],
    tournamentId: 1,
    groupWeight: 2,
  },
  {
    groupId: 2,
    participantId: participantId++,
    playerId: ["ANTON_KOSHEEV", "MARIA_HOVALIG"],
    tournamentId: 1,
    groupWeight: 3,
  },
  {
    groupId: 3,
    participantId: participantId++,
    playerId: ["SASHA_FRIDI", "NINA_MALOFEEVA"],
    tournamentId: 1,
    groupWeight: 1,
  },
  {
    groupId: 3,
    participantId: participantId++,
    playerId: ["EGOR_TARASOV", "OLGA_SHMAKOVA"],
    tournamentId: 1,
    groupWeight: 2,
  },
  {
    groupId: 3,
    participantId: participantId++,
    playerId: ["ANDREY_KOLT", "KATYA_KOLT"],
    tournamentId: 1,
    groupWeight: 3,
  },
  {
    groupId: 4,
    participantId: participantId++,
    playerId: ["YAROSLAV_YAKOVLEV", "YANA_DJIGIT"],
    tournamentId: 1,
    groupWeight: 1,
  },
  {
    groupId: 4,
    participantId: participantId++,
    playerId: ["PAVEL_SAMOLOVOV", "VALERIA_IGAY"],
    tournamentId: 1,
    groupWeight: 2,
  },
  {
    groupId: 4,
    participantId: participantId++,
    playerId: ["ANTON_SKAKA", "TANYA_LENE"],
    tournamentId: 1,
    groupWeight: 3,
  },
  {
    groupId: 1,
    participantId: participantId++,
    playerId: ["NATASHA_ZAYCEVA"],
    tournamentId: 2,
    groupWeight: 1,
  },
  {
    groupId: 1,
    participantId: participantId++,
    playerId: ["YULIA_ASANOVA"],
    tournamentId: 2,
    groupWeight: 2,
  },
  {
    groupId: 1,
    participantId: participantId++,
    playerId: ["KATYA_KOLT"],
    tournamentId: 2,
    groupWeight: 3,
  },
  {
    groupId: 2,
    participantId: participantId++,
    playerId: ["TANYA_LENE"],
    tournamentId: 2,
    groupWeight: 1,
  },
  {
    groupId: 2,
    participantId: participantId++,
    playerId: ["YULIA_ARTEMVIEVA"],
    tournamentId: 2,
    groupWeight: 2,
  },
  {
    groupId: 2,
    participantId: participantId++,
    playerId: ["SASHA_RESHETNIKOVA"],
    tournamentId: 2,
    groupWeight: 3,
  },
  {
    groupId: 3,
    participantId: participantId++,
    playerId: ["EVG_CHYLGANOVA"],
    tournamentId: 2,
    groupWeight: 1,
  },
  {
    groupId: 3,
    participantId: participantId++,
    playerId: ["NASTYA_VOITOVICH"],
    tournamentId: 2,
    groupWeight: 2,
  },
  {
    groupId: 3,
    participantId: participantId++,
    playerId: ["SVETLANA_FROLOVA"],
    tournamentId: 2,
    groupWeight: 3,
  },
  {
    groupId: 4,
    participantId: participantId++,
    playerId: ["TAISIA_DRYGOCHENKO"],
    tournamentId: 2,
    groupWeight: 1,
  },
  {
    groupId: 4,
    participantId: participantId++,
    playerId: ["VALERIA_IGAY"],
    tournamentId: 2,
    groupWeight: 2,
  },
  {
    groupId: 4,
    participantId: participantId++,
    playerId: ["KRISINA_OMELYANCHUK"],
    tournamentId: 2,
    groupWeight: 3,
  },
  {
    groupId: 1,
    participantId: participantId++,
    playerId: ["YAROSLAV_YAKOVLEV"],
    tournamentId: 3,
    groupWeight: 1,
  },
  {
    groupId: 1,
    participantId: participantId++,
    playerId: ["KONSTANTIN_GOLIKOV"],
    tournamentId: 3,
    groupWeight: 2,
  },
  {
    groupId: 1,
    participantId: participantId++,
    playerId: ["KSENIA_YPOROVA"],
    tournamentId: 3,
    groupWeight: 3,
  },
  {
    groupId: 2,
    participantId: participantId++,
    playerId: ["IGOR_MAKARENKO"],
    tournamentId: 3,
    groupWeight: 1,
  },
  {
    groupId: 2,
    participantId: participantId++,
    playerId: ["ANDREY_KOLT"],
    tournamentId: 3,
    groupWeight: 2,
  },
  {
    groupId: 2,
    participantId: participantId++,
    playerId: ["PAVEL_SAMOLOVOV"],
    tournamentId: 3,
    groupWeight: 3,
  },
  {
    groupId: 3,
    participantId: participantId++,
    playerId: ["DENIS_MOSKALEV"],
    tournamentId: 3,
    groupWeight: 1,
  },
  {
    groupId: 3,
    participantId: participantId++,
    playerId: ["ARTEM_BURDEY"],
    tournamentId: 3,
    groupWeight: 2,
  },
  {
    groupId: 3,
    participantId: participantId++,
    playerId: ["ALEKEI_IVANOV"],
    tournamentId: 3,
    groupWeight: 3,
  },
  {
    groupId: 4,
    participantId: participantId++,
    playerId: ["ANDREY_SHEVCHENKO"],
    tournamentId: 3,
    groupWeight: 1,
  },
  {
    groupId: 4,
    participantId: participantId++,
    playerId: ["MAKSIM_OMELYANCHUK"],
    tournamentId: 3,
    groupWeight: 2,
  },
  {
    groupId: 4,
    participantId: participantId++,
    playerId: ["SASHA_VLASECKIY"],
    tournamentId: 3,
    groupWeight: 3,
  },
  ...createGroups(
    [
      ["DENIS_MOSKALEV", "MAKSIM_OMELYANCHUK", "ANDREY_KOLT"],
      ["ANDREY_SHEVCHENKO", "ANTON_SKAKA", "EVG_RASSADNIKOV"],
      ['ALEKSEI_STRAHOVENKO', 'DMITRIY_PLAKSIN', 'ROMAN_TASHKINOV'],
      ['PAVEL_SAMOLOVOV', 'ALEKEI_IVANOV', 'ALEKSEI_LOBKOV']
    ],
    4
  ),
];

function createGroups(ids: ParticipantId[][], tournamentId: number) {
  const res: TournamentParticipants[] = [];

  ids.forEach((groups, groupIndex) => {
    groups.forEach((player, playerWeight) => {
      res.push({
        groupId: groupIndex + 1,
        participantId: participantId++,
        playerId: [player],
        tournamentId,
        groupWeight: playerWeight + 1,
      });
    });
  });

  return res;
}

export const participantsByTournament = groupBy(
  tournamentsParticipants,
  "tournamentId"
);

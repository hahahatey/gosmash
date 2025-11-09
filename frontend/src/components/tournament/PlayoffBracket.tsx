import { cn } from "@/lib/utils";
import { playersMap } from "@/mocks/players";
import { Match, ParticipantId } from "@/mocks/types";
import { getMatchLooser } from "@/models/match";
import { getParticipantName, playerEqual } from "@/models/player";
import {
  createPlayoffBracket2,
} from "@/models/tournament";

type Props = {
  tournamentId: number;
}

export const PlayoffBracket: React.FC<Props> = ({tournamentId}) => {
  // const root = createPlayoffBracket(1, 12);

  const { upper, third } = createPlayoffBracket2(tournamentId, 8);

  function renderRoundLabel(round: string) {
    return (
      <h3
        key={round}
        className="flex-1 min-w-0 text-sm font-medium text-gray-600 uppercase tracking-wide"
      >
        {round}
      </h3>
    );
  }

  const roundLabels = getRoundLabels(upper);

  return (
    <div className="w-screen lg:w-auto">
      <div className="flex gap-6 justify-center text-center mb-4">
        {roundLabels.map(renderRoundLabel)}
      </div>
      <div className="flex gap-6" style={{ fontSize: 11 }}>
        {upper.map((x, i) => {
          return (
            <div key={i} className="flex flex-col gap-6 justify-around flex-1 min-w-0">
              {x.map((y) => {
                return <PlayoffMatch key={y.id} match={y} />;
              })}
              {/* {index === 0 && (
                <div className="flex">
                  <PlayoffMatch match={third} />
                </div>
              )} */}
            </div>
          );
        })}
      </div>
      <div className="">
        <div className="inline-flex mt-14 flex-col" style={{ fontSize: 11 }}>
          <div className="mb-4">{renderRoundLabel('За третье место')}</div>
          <PlayoffMatch
            match={third!}
            // className="w-full"
            basis={`calc(calc(${100 / roundLabels.length}%) - 24px)`}
          />
        </div>
      </div>
    </div>
  );
};

const PlayoffMatch: React.FC<{
  match: Match;
  className?: string;
  basis?: string;
}> = ({ match, className, basis }) => {
  function renderRow(players: ParticipantId[], match: Match) {
    const playersData = players.map((x) => playersMap[x]);
    const label = getParticipantName(playersData);
    const looser = getMatchLooser(match);
    const isLooser = playerEqual(looser, players);

    return (
      <div
        className={cn(
          "flex justify-between gap-2",
          isLooser && "text-gray-400"
        )}
      >
        <span>{label}</span>
        <span>{isLooser ? match.scoreDown : match.scoreUp}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        // level !== 1 && "grow",
        `relative inline-flex flex-col w-[250px]] gap-2 py-2 px-3 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm before:absolute before:rounded-md before:border-ba before:border-ra before:w-1/2 before:h-full before:top-[var(--sryk)] before:-left-8 before:translate-y-[var(--pyk)]`,
        className
      )}
      style={{
        flexBasis: basis,
        // border: "1px solid gray",
        // "--pyk": `${offsetX}%`,
        // "--sryk": `${topY}px`,
      }}
    >
      {renderRow(match.player1, match)}
      {renderRow(match.player2, match)}
    </div>
  );
};

const getRoundLabels = (playoffMatches: Match[][]) => {
  const labels: string[] = [];

  playoffMatches.forEach((matches) => {
    const round = matches[0].round;

    if (round === "final") {
      labels.push("Финал");
    } else if (round === "1/2") {
      labels.push("Полуфинал");
    } else if (round === "1/4") {
      labels.push("Четвертьфинал");
    }
  });

  return labels;
};

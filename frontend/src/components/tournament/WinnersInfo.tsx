import { Player } from "@/mocks/types";
import { getPlayerName } from "@/models/player";
import { Trophy, Medal, Award } from "lucide-react";

type Props = {
  winners: [Player[], Player[], Player[]];
}

export const WinnersInfo: React.FC<Props> = ({winners}) => {
  return (
    <>
      {winners.slice(0, 3).map((players, index) => (
        <div key={index} className="flex items-center space-x-3">
          {getPlaceIcon(index + 1)}
          <div>
            <div className="font-medium text-sm">
              {index + 1 === 1
                ? "1-е место"
                : index + 1 === 2
                ? "2-е место"
                : "3-е место"}
            </div>
            <div className="text-sm text-gray-600">
              {players.map(player => getPlayerName(player, {short: true})).join(' / ')}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};


const getPlaceIcon = (place: number) => {
  switch (place) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return null;
  }
};
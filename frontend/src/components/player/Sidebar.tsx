import { Star, Target, Trophy } from "lucide-react";

type Props = {
  totalMatches: number;
  totalWins: number;
  playerRating: string;
}

export const Sidebar: React.FC<Props> = ({totalMatches, totalWins, playerRating}) => {
  return (
    <>
      <div className="flex items-center text-sm">
        <Trophy className="h-4 w-4 mr-3 text-tennis-clay" />
        <div>
          <div className="font-medium">Процент побед</div>
          <div className="text-gray-600">
            {(totalWins / totalMatches) * 100}%
          </div>
        </div>
      </div>
      <div className="flex items-center text-sm">
        <Target className="h-4 w-4 mr-3 text-tennis-clay" />
        <div>
          <div className="font-medium">Всего матчей</div>
          <div className="text-gray-600">{totalMatches}</div>
        </div>
      </div>
      <div className="flex items-center text-sm">
        <Star className="h-4 w-4 mr-3 text-tennis-clay" />
        <div>
          <div className="font-medium">Рейтинг</div>
          <div className="text-gray-600">{playerRating}</div>
        </div>
      </div>
    </>
  );
};

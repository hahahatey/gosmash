
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface GroupPlayer {
  name: string;
  matches: { [key: string]: string }; // результаты против других игроков
  place: number | null;
}

interface TournamentGroupTableProps {
  groupName: string;
  players: GroupPlayer[];
}

const TournamentGroupTable = ({ groupName, players }: TournamentGroupTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-tennis-clay hover:bg-tennis-clay">
            <TableHead className="text-white font-medium">{groupName}</TableHead>
            {players.map((_, index) => (
              <TableHead key={index} className="text-white font-medium text-center w-16">
                {index + 1}
              </TableHead>
            ))}
            {/* <TableHead className="text-white font-medium text-center w-20">Очки</TableHead> */}
            <TableHead className="text-white font-medium text-center w-20">Место</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell className="font-medium text-tennis-clay">
                {player.name}
              </TableCell>
              {players.map((_, colIndex) => (
                <TableCell 
                  key={colIndex} 
                  className={`text-center ${
                    rowIndex === colIndex 
                      ? 'bg-tennis-light-clay' 
                      : player.matches[colIndex.toString()] 
                        ? 'bg-orange-100' 
                        : 'bg-orange-50'
                  }`}
                >
                  {rowIndex === colIndex ? '' : (player.matches[colIndex.toString()] || '')}
                </TableCell>
              ))}
              {/* <TableCell className="text-center font-medium bg-tennis-light-clay">
                {player.points}
              </TableCell> */}
              <TableCell className="text-center font-medium">
                {player.place}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TournamentGroupTable;

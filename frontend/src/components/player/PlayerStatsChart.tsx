import { declineNoun } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PlayerStatsChartProps {
  wins: number;
  losses: number;
}

const PlayerStatsChart = ({ wins, losses }: PlayerStatsChartProps) => {
  const data = [
    { name: "Победы", value: wins, color: "#22c55e" },
    { name: "Поражения", value: losses, color: "#ef4444" },
  ];

  const total = wins + losses;
  const winPercentage = total > 0 ? ((wins / total) * 100).toFixed(1) : 0;

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-2">
        <div className="text-2xl font-bold">
          {winPercentage}%
        </div>
        <div className="text-sm text-gray-600">Процент побед</div>
        <div className="flex justify-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">
              {wins} {declineNoun(wins, ["победа", "победы", "побед"])}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm">
              {losses}{" "}
              {declineNoun(losses, ["поражение", "поражения", "поражений"])}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsChart;

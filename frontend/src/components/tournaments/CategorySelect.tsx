import { TournamentCategory } from "@/models/tournaments/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { categoryMap } from "@/models/tournaments/utils";

type Props = {
  category?: TournamentCategory;
  onCategoryChanged: (category: TournamentCategory) => void;
}

export const CategorySelect = ({onCategoryChanged, category}: Props) => {
  return (
    <Select value={category} onValueChange={onCategoryChanged}>
      <SelectTrigger>
        <SelectValue placeholder="Категория" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(TournamentCategory).map((category) => (
          <SelectItem key={category} value={category}>
            {categoryMap[TournamentCategory[category]]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

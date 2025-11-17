import { TournamentCategory } from "@/models/tournaments/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { categoryMap } from "@/models/tournaments/utils";
import { RATINGS } from "@/models/tournaments/consts";

type Props = {
  rating?: string;
  onRatingChanged: (rating: string) => void;
}

export const RatingSelect = ({onRatingChanged, rating}: Props) => {
  return (
    <Select value={rating} onValueChange={onRatingChanged}>
      <SelectTrigger>
        <SelectValue placeholder="Рейтинг" />
      </SelectTrigger>
      <SelectContent>
        {RATINGS.map((rating) => (
          <SelectItem key={rating} value={rating}>
            {rating}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

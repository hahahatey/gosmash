import { TournamentCategory } from "./types";

type Params = {
  rating: string;
  category: TournamentCategory;
};

export const getTournamentCategoryLabel = <T extends Params>({
  rating,
  category,
}: T) => `${categoryMap[category]} (${rating})`;

export const categoryMap = {
  [TournamentCategory.MENS_DOUBLES]: "Мужской парный",
  [TournamentCategory.MENS_SINGLES]: "Мужской",
  [TournamentCategory.WOMENS_DOUBLES]: "Женский парный",
  [TournamentCategory.WOMENS_SINGLES]: "Женский",
  [TournamentCategory.MIXED_DOUBLES]: "Микст",
  [TournamentCategory.PRO_AM]: "Pro-am",
};

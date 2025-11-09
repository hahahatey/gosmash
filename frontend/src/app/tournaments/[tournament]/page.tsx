import { tournamentsMap } from "@/mocks/tournaments";
import TournamentDetail from "./Tournament";

export function generateStaticParams() {
  return Object.keys(tournamentsMap).map(x => ({tournament: x}));
}

export default function Tournament() {
  return <TournamentDetail />;
}
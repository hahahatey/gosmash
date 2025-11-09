import { playersMap } from "@/mocks/players";
import PlayerClient from "./Player";

export function generateStaticParams() {
  return Object.keys(playersMap).map(x => ({player: x}));
}

export default function Player() {
  return <PlayerClient />
}
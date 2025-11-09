import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTournamentsTemplates } from "@/hooks/useTournamentTemplates";
import TournamentTemplates from "./TournamentsTemplates";

export default function TournamentTemplatesPage() {

  return <TournamentTemplates />;
}

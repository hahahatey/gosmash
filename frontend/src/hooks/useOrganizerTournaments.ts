import { DAY, HOUR } from "@/consts/timeConstants";
import { createOrganizerTournament, getOrganizerTournaments, ORGANIZER_TOURNAMENTS_KEY, TOURNAMENTS_KEY } from "@/lib/tournaments/tournaments";
import { tournaments } from "@/mocks/tournaments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Params = {
  onCreateSuccessed?: () => void;
  onDeleteSuccessed?: () => void;
};

export const useOrganizerTournaments = ({onCreateSuccessed}: Params = {}) => {
  const queryClient = useQueryClient();

  const data = useQuery({
    queryKey: ORGANIZER_TOURNAMENTS_KEY,
    queryFn: getOrganizerTournaments,
    gcTime: DAY,
    staleTime: 3 * HOUR,
  });

  const createTournamentMutation = useMutation({
    mutationFn: createOrganizerTournament,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORGANIZER_TOURNAMENTS_KEY });
      onCreateSuccessed?.();
    },
    retry: false,
  });

  // const deleteTemplateMutation = useMutation({
  //   mutationFn: deleteTournamentTemplate,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: TOURNAMENT_TEMPLATES_KEY });
  //     onDeleteSuccessed?.();
  //   },
  //   retry: false,
  // });

  return {
    tournaments: data,
    createTournamentMutation,
    // deleteTemplateMutation,
    isCreating: createTournamentMutation.isPending,
    creatingStatus: createTournamentMutation.status,
    // isDeleting: deleteTemplateMutation.isPending,
  };
};

import { DAY, HOUR } from "@/consts/timeConstants";
import {
  createTournamentTemplate,
  deleteTournamentTemplate,
  getTournamentTemplates,
  TOURNAMENT_TEMPLATES_KEY,
} from "@/lib/tournaments/tournament-template";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Params = {
  onCreateSuccessed?: () => void;
  onDeleteSuccessed?: () => void;
};

export const useTournamentsTemplates = ({
  onCreateSuccessed,
  onDeleteSuccessed,
}: Params = {}) => {
  const queryClient = useQueryClient();

  const data = useQuery({
    queryKey: TOURNAMENT_TEMPLATES_KEY,
    queryFn: getTournamentTemplates,
    gcTime: DAY,
    staleTime: 3 * HOUR,
  });

  const createTemplateMutation = useMutation({
    mutationFn: createTournamentTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TOURNAMENT_TEMPLATES_KEY });
      onCreateSuccessed?.();
    },
    retry: false,
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: deleteTournamentTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TOURNAMENT_TEMPLATES_KEY });
      onDeleteSuccessed?.();
    },
    retry: false,
  });

  return {
    templates: data,
    createTemplateMutation,
    deleteTemplateMutation,
    isCreating: createTemplateMutation.isPending,
    creatingStatus: createTemplateMutation.status,
    isDeleting: deleteTemplateMutation.isPending,
  };
};

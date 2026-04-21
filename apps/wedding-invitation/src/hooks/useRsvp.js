import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rsvpService } from '../services/rsvpService';

export const useSubmitRsvp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rsvpService.submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestbook'] });
    },
  });
};

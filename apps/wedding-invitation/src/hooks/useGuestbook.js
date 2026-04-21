import { useQuery } from '@tanstack/react-query';
import { rsvpService } from '../services/rsvpService';

export const useGuestbook = () => {
  return useQuery({
    queryKey: ['guestbook'],
    queryFn: rsvpService.getGuestbook,
  });
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/adminService';

export const useAdminRsvps = () => {
  return useQuery({
    queryKey: ['admin', 'rsvps'],
    queryFn: async () => {
      const res = await adminService.getRsvps();
      return res.data || [];
    },
    retry: false, // Don't retry if unauthorized (e.g. not logged in)
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const res = await adminService.getStats();
      return res.data || {
        totalSubmissions: 0,
        totalAttendingPax: 0,
        attendingCount: 0,
        absentCount: 0,
        maybeCount: 0,
      };
    },
    retry: false,
  });
};

export const useDeleteRsvp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.deleteRsvp,
    onSuccess: () => {
      // Invalidate both admin and public queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'rsvps'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['guestbook'] });
    },
  });
};

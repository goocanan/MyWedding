import { apiClient } from './apiClient';

export const adminService = {
  getRsvps: () => apiClient('/admin/rsvp'),
  getStats: () => apiClient('/admin/stats'),
  deleteRsvp: (id) => apiClient(`/admin/rsvp/${id}`, { method: 'DELETE' }),
};

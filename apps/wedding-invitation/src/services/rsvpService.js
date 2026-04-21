import { apiClient } from './apiClient';

export const rsvpService = {
  submit: (data) => apiClient('/rsvp', { method: 'POST', body: data }),
  getGuestbook: () => apiClient('/rsvp/guestbook'),
};

import { apiClient } from './apiClient';

export const configService = {
  get: (key) => apiClient(`/config/${key}`),
  update: (key, value) => apiClient(`/config/${key}`, { method: 'PUT', body: value }),
};

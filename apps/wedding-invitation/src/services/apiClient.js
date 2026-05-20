const API_HOST = import.meta.env.VITE_API_URL;
const BASE_URL = API_HOST ? `https://${API_HOST}/api` : '/api';

export const apiClient = async (endpoint, options = {}) => {
  const { method = 'GET', body, headers = {}, ...rest } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Something went wrong');
  }

  return response.json();
};

const API_HOST = import.meta.env.VITE_API_URL;
let BASE_URL = '/api';
if (API_HOST) {
  BASE_URL = API_HOST.startsWith('http') ? `${API_HOST}/api` : `https://${API_HOST}/api`;
}

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

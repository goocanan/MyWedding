import { createAuthClient } from "better-auth/react";

const API_HOST = import.meta.env.VITE_API_URL;
let BASE_URL = window.location.origin + '/api';
if (API_HOST) {
  BASE_URL = API_HOST.startsWith('http') ? `${API_HOST}/api` : `https://${API_HOST}/api`;
}

export const authClient = createAuthClient({
    baseURL: BASE_URL
});

export const { signIn, signUp, signOut, useSession } = authClient;

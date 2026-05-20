import { createAuthClient } from "better-auth/react";

const API_HOST = import.meta.env.VITE_API_URL;
const BASE_URL = API_HOST 
  ? `https://${API_HOST}/api` 
  : `${window.location.origin}/api`;

export const authClient = createAuthClient({
    baseURL: BASE_URL
});

export const { signIn, signUp, signOut, useSession } = authClient;

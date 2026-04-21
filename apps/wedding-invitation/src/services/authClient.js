import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "/api" // Since we use proxy
});

export const { signIn, signUp, signOut, useSession } = authClient;

import {defineStore} from "pinia";
import {authApi} from "../api/auth.api.ts";

export const useAuthStore = defineStore('auth', () => {
    async function loginUser(username: string, password: string) {
        await authApi.login({ username, password });
    }

    async function logoutUser() {
        await authApi.logout();
    }

    return { loginUser, logoutUser };
})
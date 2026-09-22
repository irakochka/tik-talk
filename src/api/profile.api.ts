import {http} from "./http.ts";
import type {Profile} from "../types/profile.ts";

export const profileApi = {
    async getTestAccounts() {
        return await http.get<Profile[]>('/account/test_accounts');
    },
}
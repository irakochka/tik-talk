import {http} from "./http.ts";
import type {Profile, UpdateProfileDto} from "../types/profile.ts";

export const profileApi = {
    async getTestAccounts() {
        return await http.get<Profile[]>('/account/test_accounts');
    },
    async me() {
        return await http.get<Profile>('/account/me');
    },
    async getAccount(id: number) {
        return await http.get<Profile>(`/account/${id}`);
    },
    async update(dto: UpdateProfileDto) {
        return await http.patch<Profile>('/account/me', dto);
    },
    async uploadAvatar(file: File) {
        const fd = new FormData();
        fd.append('image', file);

        return await http.post<Profile>('/account/upload_image', fd);
    }
}
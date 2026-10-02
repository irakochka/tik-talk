import {http} from "./http.ts";
import type {TokenResponse} from "../types/tokenResponse.ts";
import {tokens} from "./tokens.ts";

export const authApi = {
    async login(dto: { username: string; password: string }) {
        const fd = new FormData();
        fd.append('username', dto.username);
        fd.append('password', dto.password);

        const {data} = await http.post<TokenResponse>('/auth/token', fd);
        tokens.set(data.access_token, data.refresh_token);
    },
    async refresh(refresh_token: string) {
        const {data} = await http.post<TokenResponse>('/auth/refresh', {refresh_token});
        tokens.set(data.access_token, data.refresh_token);

        return data;
    },
    async logout() {
        try {
            await http.post<TokenResponse>('/auth/logout');
        } finally {
            tokens.clear();
        }
    }
}
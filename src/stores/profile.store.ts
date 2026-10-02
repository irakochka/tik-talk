import {defineStore} from "pinia";
import {ref} from "vue";
import type {Profile, UpdateProfileDto} from "../types/profile.ts";
import {profileApi} from "../api/profile.api.ts";

export const useProfileStore = defineStore('profile', () => {
    const testProfiles = ref<Profile[]>();
    const profile = ref<Profile>();

    async function loadTestAccounts() {
        const {data} = await profileApi.getTestAccounts();
        testProfiles.value = data.slice(0, 3);
    }

    async function loadMe() {
        const {data} = await profileApi.me();
        profile.value = data;
        return data;
    }

    async function loadAccount(id: number) {
        const { data } = await profileApi.getAccount(id);
        return data;
    }

    async function updateMe(dto: UpdateProfileDto) {
        const {data} = await profileApi.update(dto);
        profile.value = data;
    }

    async function updateAvatar(file: File) {
        const { data } = await profileApi.uploadAvatar(file);
        profile.value = data;
    }

    return { testProfiles, profile, loadTestAccounts, loadMe, loadAccount, updateMe, updateAvatar }
})
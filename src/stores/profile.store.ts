import {defineStore} from "pinia";
import {ref} from "vue";
import type {Profile} from "../types/profile.ts";
import {profileApi} from "../api/profile.api.ts";

export const useProfileStore = defineStore('profile', () => {
    const testProfiles = ref<Profile[]>();
    const profile = ref<Profile>();

    async function loadTestAccounts() {
        const {data} = await profileApi.getTestAccounts();
        testProfiles.value = data.slice(0, 3);
    }

    async function loadMe() {
        const {data} = await profileApi.getMe();
        profile.value = data;
    }

    return { testProfiles, profile, loadTestAccounts, loadMe }
})
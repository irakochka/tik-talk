<script setup lang="ts">

import AvatarCircle from "../ui/AvatarCircle.vue";
import type {Profile} from "../../types/profile.ts";

defineProps<{profile: Profile}>();
</script>

<template>
  <div class="profile-header">
    <AvatarCircle :avatar-url="profile.avatarUrl" class="profile-header__avatar mb4 size112"/>

    <div class="user-info profile-header__user-info">
      <h4 class="user-info__full-name h4">
        {{ profile.firstName }} {{ profile.lastName }}
      </h4>
      <span class="user-info__username regular">{{ profile.username }}</span>
    </div>
  </div>
</template>

<style scoped>
.profile-header {
  display: grid;
  grid-template-columns: 112px 1fr;
  grid-gap: 24px;
  align-items: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
<script setup lang="ts">

import SvgIcon from "../components/ui/SvgIcon.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import {useProfileStore} from "../stores/profile.store.ts";
import ProfileHeader from "../components/profile/ProfileHeader.vue";
import PostFeed from "../components/post/PostFeed.vue";
import {computed, ref, watch} from "vue";
import type {Profile} from "../types/profile.ts";
import {useRoute} from "vue-router";

const route = useRoute();
const profileStore = useProfileStore();
const profile = ref<Profile | null>(null);

const profileId = computed<number | null>(() => {
  const raw = route.params.id;
  if (typeof raw !== "string") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
});

watch(profileId, async (id) => {
  profile.value = id === null
      ? await profileStore.loadMe()
      : await profileStore.loadAccount(id);
}, { immediate: true });
</script>

<template>
  <div v-if="profile" class="profile-page">
    <div class="profile-page__header">
      <ProfileHeader :profile="profile"/>

      <div class="profile-page__actions">
        <BaseButton class="btn btn--primary" to="/settings">
          <span>Редактировать</span>
          <SvgIcon name="settings" class="icon16"/>
        </BaseButton>
      </div>
    </div>

    <div class="profile-page__body">
      <PostFeed/>

      <div class="sidebar profile-page__sidebar">
        <div class="subscribers sidebar__subscribers mb32">
          <div class="subscribers__title mb16">
            <h5 class="h5">Подписчики</h5>
          </div>
<!--          <ul class="subscribers__list">-->
<!--            <RouterLink to="/search" class="subscribers__btn">-->
<!--              <SvgIcon name="plus" class="icon16"/>-->
<!--            </RouterLink>-->
<!--          </ul>-->
          <div class="medium-text">
            У вас нет подписчиков
          </div>
        </div>
        <div class="skills sidebar__skills mb32">
          <h5 class="h5 mb16">Навыки</h5>
          <ul class="skills__list" v-if="profile.stack && profile.stack.length > 0">
            <li v-for="skill in profile.stack" :key="skill" class="stack-item">{{ skill }}</li>
          </ul>
          <div v-else class="medium-text">
            Добавьте навыки
          </div>
        </div>
        <div class="sidebar__description mb32">
          <h5 class="h5 mb16">О себе</h5>
          <p class="medium-text" v-if="profile.description">{{ profile.description }}</p>
          <div v-else class="medium-text">
            Добавьте информацию о себе
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.profile-page__header {
  display: grid;
  grid-template-columns: minmax(688px, 1fr) 340px;
  grid-gap: 64px;
  align-items: center;
}

.profile-page__actions {
  padding-left: 24px;
}

.profile-page__body {
  padding-top: 44px;
  display: grid;
  grid-template-columns: minmax(688px, 1fr) 340px;
  grid-gap: 64px;
}

.profile-page__sidebar {
  padding: 0 24px;
}

.subscribers__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.subscribers__amount {
  padding: 1px 5px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: var(--dark-color);
  background-color: var(--light-success-color);
}

.subscribers__list {
  display: flex;
  align-items: center;
  gap: 6px;
}

.subscribers__btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skills__list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 4px;
}
</style>
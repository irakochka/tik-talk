<script setup lang="ts">

import {useProfileStore} from "../stores/profile.store.ts";
import ProfileHeader from "../components/profile/ProfileHeader.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import {router} from "../app/router.ts";
import {computed, reactive, watch} from "vue";
import {useToast} from "vue-toastification";
import {useAuthStore} from "../stores/auth.store.ts";
import type {ProfileForm, UpdateProfileDto} from "../types/profile.ts";
import SvgIcon from "../components/ui/SvgIcon.vue";
import BaseLabel from "../components/ui/BaseLabel.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import AutoTextarea from "../components/ui/AutoTextarea.vue";
import AvatarUpload from "../components/ui/AvatarUpload.vue";
import TagInput from "../components/ui/TagInput.vue";

const toast = useToast();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const form = reactive<ProfileForm>({
  username: '',
  avatarUrl: '',
  avatarFile: null,
  firstName: '',
  lastName: '',
  description: '',
  city: '',
  stack: []
});

const profile = computed(() => profileStore.profile);

watch(
    () => profile.value,
    (p) => {
      if (!p) return;

      form.username = p.username ?? '';
      form.avatarUrl = p.avatarUrl ?? '';
      form.firstName = p.firstName ?? '';
      form.lastName = p.lastName ?? '';
      form.description = p.description ?? '';
      form.stack = p.stack ?? [];
    },
    { immediate: true }
);

async function updateProfile() {
  const dto: UpdateProfileDto = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    city: form.city.trim(),
    description: form.description.trim(),
    stack: form.stack,
  };

  try {
    if (form.avatarFile) {
      await profileStore.updateAvatar(form.avatarFile);
    }

    await profileStore.updateMe(dto);

    toast.success('Данные профиля обновлены!');
    // await router.push('/profile/me');
  } catch (err: unknown) {
    toast.error('Ошибка сервера. Попробуйте позже.');
  }
}

async function logout() {
  try {
    await authStore.logoutUser();

    toast.success('Вы вышли из системы!');
    await router.push('/login');
  } catch (err: unknown) {
    toast.error('Ошибка сервера. Попробуйте позже.');
  }
}
</script>

<template>
  <div v-if="profile" class="settings-page">
    <div class="settings-page__profile-info profile-info">
      <ProfileHeader :profile="profile" class="profile-info__header mb32"/>
      <div v-if="profile.stack && profile.stack.length > 0" class="skills settings__skills mb32">
        <h5 class="h5 mb16">Навыки</h5>
        <ul class="skills__list">
          <li v-for="stack in profile.stack" :key="stack" class="stack-item">{{ stack }}</li>
        </ul>
      </div>
      <div v-if="profile.description" class="settings__description mb32">
        <h5 class="h5 mb16">О себе</h5>
        <p class="medium-text">{{ profile.description }}</p>
      </div>
    </div>
    <div class="settings-page_profile-form profile-form">
      <div class="profile-form__controls">
        <div class="profile-form__two-columns">
          <BaseLabel label="Имя" class="form-label">
            <BaseInput placeholder="Укажите имя" type="text" v-model="form.firstName"/>
          </BaseLabel>

          <BaseLabel label="Фамилия" class="form-label">
            <BaseInput placeholder="Укажите фамилию" type="text" v-model="form.lastName"/>
          </BaseLabel>
        </div>

        <BaseLabel label="Telegram username" class="form-label">
          <BaseInput type="text" v-model="form.username" disabled/>
        </BaseLabel>

        <BaseLabel label="О себе" class="form-label">
          <AutoTextarea placeholder="Напишите что-нибудь о себе" type="text" v-model="form.description"/>
        </BaseLabel>

        <BaseLabel label="Аватарка">
          <AvatarUpload v-model:avatarFile="form.avatarFile" v-model:avatarUrl="form.avatarUrl"/>
        </BaseLabel>

        <BaseLabel label="Навыки" forId="stack-input" class="form-label">
          <TagInput id="stack-input" type="text" v-model="form.stack"/>
        </BaseLabel>
      </div>

      <div class="profile-form__actions">
        <div class="profile-form__actions-left">
          <BaseButton class="btn--secondary btn--icon negative-color">
            <SvgIcon name="trash" class="icon16"/>
          </BaseButton>
          <BaseButton class="btn--secondary btn--icon" @click="logout">
            <SvgIcon name="logout" class="icon16"/>
          </BaseButton>
        </div>
        <div class="profile-form__actions-right">
          <BaseButton class="btn--secondary" @click="router.push('/profile/me')">
            Отмена
          </BaseButton>
          <BaseButton class="btn--primary" @click="updateProfile()">
            Сохранить
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  display: grid;
  grid-template-columns: 380px minmax(664px, 1fr);
  grid-gap: 48px;
  height: calc(100vh - 48px);
}

.settings-page__profile-info {
  padding: 0 24px;
}

.profile-info__header {
  padding-bottom: 32px;
  border-bottom: 1px dashed var(--light-color);
}

.skills__list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 4px;
}

.profile-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  background-color: var(--dark-color);
  border: 1px solid var(--light-color);
}

.profile-form__two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.profile-form__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-form__actions-left,
.profile-form__actions-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
<script setup lang="ts">

import {toPublicUrl} from "../utils/url.ts";
import BaseButton from "../components/ui/BaseButton.vue";
import AuthInput from "../components/ui/AuthInput.vue";
import {ref} from "vue";
import AuthLabel from "../components/ui/AuthLabel.vue";
import SvgIcon from "../components/ui/SvgIcon.vue";
import {router} from "../app/router.ts";
import {useToast} from "vue-toastification";
import {useAuthStore} from "../stores/auth.store.ts";

const toast = useToast();
const authStore = useAuthStore();
const logoSrc = toPublicUrl('assets/svg/logo-big.svg');
const form = ref<{ username?: string; password?: string }>({});
const isPasswordVisible = ref<boolean>(false);

async function onSubmit(event: Event) {
  event.preventDefault();
  if (!form.value.username || !form.value.password) return;

  try {
    await authStore.loginUser(form.value.username, form.value.password);

    toast.success('Вы авторизовались в системе!');
    await router.push('/profile/me');
    form.value = {};
  } catch (err: any) {
    const status = err?.response?.status ?? err?.status ?? err?.response?.data?.statusCode;

    if (status === 401) {
      toast.error('Неверный логин или пароль!');
      return;
    }

    toast.error('Ошибка сервера. Попробуйте позже.');
  }
}
</script>

<template>
  <div class="auth">
    <form class="auth-form" @submit.prevent="onSubmit">
      <h1 class="h1 mb60">Вход</h1>

      <AuthLabel label="Telegram username" class="auth-form__label">
        <AuthInput
            v-model="form.username"
            placeholder="Введите username"
            type="text"
            autocomplete="username"
        >
          <SvgIcon name="telegram-link" class="common-icon field-icon icon20"/>
        </AuthInput>
      </AuthLabel>

      <AuthLabel label="Пароль" class="auth-form__label">
        <AuthInput
            v-model="form.password"
            :type="isPasswordVisible ? 'text' : 'password'"
            placeholder="Введите пароль"
            autocomplete="current-password"
        >
          <button
              class="field__action"
              :class="{ 'field__action--active': isPasswordVisible }"
              type="button"
              aria-label="Показать пароль"
              @click.stop="isPasswordVisible = !isPasswordVisible"
          >
            <SvgIcon name="password-eye" class="common-icon icon20"/>
          </button>
        </AuthInput>
      </AuthLabel>

      <BaseButton class="btn--primary" type="submit">Войти</BaseButton>
    </form>

    <img class="auth-illustration" :src="logoSrc" alt=""/>
  </div>
</template>

<style scoped>
.auth {
  max-width: 1112px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.auth-form {
  width: 440px;
}

.field__action {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
}

.field__action--active {
  color: var(--primary-color);
}

.field__action:focus-visible {
  color: var(--light-color);
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: 6px;
}

.auth .btn {
  width: 100%;
}

.auth-illustration {
  display: block;
}
</style>
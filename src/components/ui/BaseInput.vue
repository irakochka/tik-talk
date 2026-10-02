<script setup lang="ts">

import {computed, useSlots} from "vue";

const data = defineModel<string>();

const slots = useSlots();
const hasIcon = computed(() => !!slots.default);
</script>

<template>
  <div class="base-input" :class="{ 'base-input--with-action': hasIcon }">
    <input class="base-input__input" v-model="data" v-bind="$attrs"/>

    <slot></slot>
  </div>
</template>

<style scoped>
.base-input__input {
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid var(--light-color);
  background-color: var(--dark-color);
  color: var(--light-color);
  outline: none;
}

.base-input__input:disabled {
  cursor: not-allowed;
  color: var(--light-color-transparrent);
  border-color: var(--light-color-transparrent);
}

.base-input__input::placeholder {
  color: rgba(255, 255, 255, 0.55);
}

.base-input__input:focus-visible {
  border-bottom: 1px solid var(--primary-color);
}

.base-input {
  position: relative;
}

.base-input--with-action .base-input__input {
  padding-right: 44px;
}
</style>
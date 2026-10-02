<script setup lang="ts">
defineProps<{ label?: string; forId?: string }>();
</script>

<template>
  <label class="base-label mb20" :for="forId">
    <span v-if="label" class="base-label__text">{{ label }}</span>
    <slot />
  </label>
</template>

<style scoped>
.base-label {
  display: grid;
  gap: 8px;
}

.base-label__text {
  font-size: 12px;
  line-height: 16px;
  color: var(--light-color-transparrent);
}
</style>
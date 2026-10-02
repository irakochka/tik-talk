<script setup lang="ts">
defineProps<{ label?: string; forId?: string }>();
</script>

<template>
  <label class="auth-label mb20" :for="forId">
    <span v-if="label" class="auth-label__text">{{ label }}</span>
    <slot/>
  </label>
</template>

<style scoped>
.auth-label {
  display: grid;
  gap: 8px;
}

.auth-label__text {
  font-size: 12px;
  line-height: 16px;
  color: var(--light-color);
}
</style>
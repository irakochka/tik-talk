<script setup lang="ts">

import AvatarCircle from "./AvatarCircle.vue";

const props = withDefaults(defineProps<{
  to: string
  avatarUrl?: string
  fullName?: string
  showName?: boolean
}>(), {
  showName: false,
});
</script>

<template>
  <RouterLink :to="props.to" class="subscriber-link" :class="props.showName ? 'with-name' : ''">
    <AvatarCircle :avatarUrl="props.avatarUrl" class="size32" />
    <span v-if="props.showName && props.fullName" class="subscriber-link__name">{{ props.fullName }}</span>
  </RouterLink>
</template>

<style scoped>
.subscriber-link {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--light-color);
  text-decoration: none;
}

.subscriber-link.with-name {
  padding: 8px 0;
}

.subscriber-link__name {
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}
</style>
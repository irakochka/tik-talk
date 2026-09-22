<script setup lang="ts">
import {computed} from "vue";
import {toAssetUrl, toPublicUrl} from "../../utils/url.ts";

const props = defineProps<{ avatarUrl?: string | null }>();

const avatarSrc = computed(() => toAssetUrl(props.avatarUrl));
const placeholderSrc = computed(() => toPublicUrl('assets/images/avatar-placeholder.png'));
</script>

<template>
  <div class="avatar-circle">
    <img v-if="avatarSrc" :src="avatarSrc" alt="User avatar">
    <img v-else :src="placeholderSrc" alt="User avatar">
  </div>
</template>

<style scoped>
.avatar-circle img {
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>

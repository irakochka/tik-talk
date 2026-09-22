<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ name: string }>()

const href = computed(() => `/assets/svg/sprite.svg#${props.name}`)
</script>

<template>
  <svg class="common-icon" aria-hidden="true">
    <use :href="href" />
  </svg>
</template>

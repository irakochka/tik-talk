<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";

const text = defineModel<string>();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

async function autoResize() {
  await nextTick();
  const el = textareaRef.value;
  if (!el) return;

  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

onMounted(autoResize);
</script>

<template>
  <textarea class="auto-textarea" ref="textareaRef" v-model="text" @input="autoResize" v-bind="$attrs"></textarea>
</template>

<style scoped>
.auto-textarea {
  padding: 8px 0;
  height: 44px;
  color: var(--light-color);
  background-color: transparent;
  resize: none;
  border: none;
  border-bottom: 1px solid var(--light-color-transparrent);
}

.auto-textarea:hover,
.auto-textarea:focus-visible {
  border-bottom: 1px solid var(--primary-color);
  outline: none;
}
</style>
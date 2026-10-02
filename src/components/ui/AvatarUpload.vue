<script setup lang="ts">


import AvatarCircle from "./AvatarCircle.vue";
import SvgIcon from "./SvgIcon.vue";
import { vDnd } from "../../directives/dnd.ts";

const previewUrl = defineModel<string>('avatarUrl', { default: '' });
const avatarFile = defineModel<File | null>('avatarFile', { default: null });

function processFile(file: File | null | undefined) {
  if (!file || !file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target?.result?.toString() ?? '';
  };
  reader.readAsDataURL(file);

  avatarFile.value = file;
}

function fileBrowserHandler(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  processFile(file);
}

function onFileDropped(file?: File) {
  processFile(file);
}
</script>

<template>
  <div class="avatar-upload">
    <AvatarCircle :avatar-url="previewUrl" class="size140"/>

    <div class="dropzone" v-dnd="onFileDropped" tabindex="0">
      <div class="dropzone-content">
        <SvgIcon name="upload" class="icon20"/>
        <span class="medium-text">
          Перетащите изображение или Загрузите <br>
          (разрешение до 5,000 x 5,000 px)
        </span>
      </div>

      <input
          ref="fileInputRef"
          type="file"
          class="avatar-input"
          tabindex="-1"
          accept="image/*"
          @change="fileBrowserHandler"
      />
    </div>
  </div>
</template>

<style scoped>
.avatar-upload {
  padding-bottom: 16px;
  display: grid;
  grid-template-columns: 132px 1fr;
  grid-gap: 32px;
  border-bottom: 1px solid var(--light-color);
}

.dropzone {
  padding: 23px 16px;
  display: grid;
  place-content: center;
  text-align: center;
  border-radius: 2px;
  border: 1px dashed var(--light-color);
  cursor: pointer;
  transition: 0.2s linear;
}

.dropzone:hover {
  background-color: var(--primary-opacity-color);
  border-color: var(--primary-color);
}

.dropzone.fileover {
  background-color: var(--primary-opacity-color);
  border-color: var(--primary-color);
}

.dropzone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.avatar-input {
  display: none;
}
</style>

<script setup lang="ts">

import AppSidebar from "../components/sidebar/AppSidebar.vue";
</script>

<template>
  <div class="layout container">
    <AppSidebar/>
    <section class="main">
      <RouterView/>
    </section>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
}

.main {
  padding: 24px;
}
</style>
<script setup lang="ts">

import SvgIcon from "../ui/SvgIcon.vue";

const menuItems = [
  {
    label: 'Моя страница',
    icon: 'home',
    link: '/profile/me',
  },
  {
    label: 'Чаты',
    icon: 'chat',
    link: '/chats',
  },
  {
    label: 'Поиск',
    icon: 'search',
    link: '/search',
  },
  {
    label: 'Сообщества',
    icon: 'community',
    link: '/community',
  },
];
</script>

<template>
  <aside class="sidebar">
    <RouterLink class="sidebar__brand mb20" :to="'profile/me'">
      <img class="sidebar__brand-logo" src="/assets/svg/logo-small.svg" alt="Logo">
    </RouterLink>

    <nav class="sidebar__nav">
      <ul class="sidebar__nav-list">
        <li class="sidebar__nav-item" v-for="menuItem of menuItems" :key="menuItem.link">
          <RouterLink class="sidebar__nav-link" active-class="is-active" :to="menuItem.link">
            <span class="sidebar__nav-icon">
              <SvgIcon :name="menuItem.icon" class="icon16"/>
            </span>
            <span class="sidebar__nav-label">{{ menuItem.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <RouterLink :to="'/settings'" class="sidebar__footer">
      <div class="sidebar__user">
        <img src="/assets/images/avatar-placeholder.png" class="size32"/>
        <div class="sidebar__user-name">username</div>
      </div>

      <span class="sidebar__footer-icon">
      <SvgIcon :name="'settings'" class="icon16"/>
    </span>
    </RouterLink>
  </aside>
</template>

<style scoped>
.sidebar {
  position: relative;
  height: 100vh;
  padding: 20px 12px;
  background-color: var(--dark-color);
}

.sidebar:before {
  content: ' ';
  background-color: var(--dark-color);
  width: 1200px;
  position: absolute;
  height: 100%;
  left: -1200px;
  top: 0;
}

.sidebar__brand {
  display: block;
}

.sidebar__brand-logo {
  display: block;
}

.sidebar__nav-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar__nav-link {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  color: var(--light-color);

  border-radius: 2px;
  cursor: pointer;
}

.sidebar__nav-link:hover,
.sidebar__nav-link:focus-visible,
.sidebar__nav-link.is-active {
  background-color: var(--dark-hover-color);
  color: var(--primary-color);
}

.sidebar__nav-icon {
  display: inline-flex;
  align-items: center;
}

.sidebar__nav-label {
  display: inline-block;
}

.sidebar__footer {
  position: absolute;
  width: calc(100% - 24px);
  bottom: 20px;

  padding: 4px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--light-color);
  border-radius: 2px;
  cursor: pointer;
}

.sidebar__footer:hover,
.sidebar__footer:focus-visible,
.sidebar__footer.is-active {
  background-color: var(--dark-hover-color);
  color: var(--primary-color);
}

.sidebar__user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar__user-name {
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}

.sidebar__footer-icon {
  display: inline-flex;
  align-items: center;
}
</style>
import {createRouter, createWebHistory} from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainLayout,
            redirect: '/profile/me',
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'profile/:id',
                    name: 'profile',
                    component: () => import('../pages/ProfilePage.vue'),
                },
                {
                    path: 'chats',
                    name: 'chats',
                    component: () => import('../pages/ChatsPage.vue'),
                },
                {
                    path: 'search',
                    name: 'search',
                    component: () => import('../pages/SearchPage.vue'),
                },
                {
                    path: 'community',
                    name: 'community',
                    component: () => import('../pages/CommunityPage.vue'),
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: () => import('../pages/SettingsPage.vue'),
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../pages/AuthPage.vue'),
            meta: { guestOnly: true },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../pages/NotFoundPage.vue'),
        },
    ]
})
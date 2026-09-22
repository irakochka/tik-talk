import { createApp } from 'vue'
import '../styles/style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {router} from "./router.ts";

const app = createApp(App)

export const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
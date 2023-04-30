import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ToastPlugin from 'vue-toast-notification';

import './style.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue';

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(ToastPlugin)
    .mount('#app');

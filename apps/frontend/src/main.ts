import { createApp } from 'vue';

import { i18n } from '@/app/i18n';
import { pinia } from '@/app/pinia';

import App from './App.vue';
import { router } from '@/app/router';

createApp(App).use(pinia).use(i18n).use(router).mount('#app');

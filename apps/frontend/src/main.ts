import { createApp } from 'vue';

import { i18n } from '@/app/i18n';

import App from './App.vue';
import { router } from '@/app/router';

createApp(App).use(router).use(i18n).mount('#app');

import { createI18n } from 'vue-i18n';

import { DEFAULT_LANGUAGE } from '@/i18n/constants';
import { messages } from '@/i18n/messages';
import { getInitialLocale } from '@/i18n/utils';
import type { Language, Messages } from '@/i18n/types';

export const i18n = createI18n<[Messages], Language>({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LANGUAGE,
  messages,
});

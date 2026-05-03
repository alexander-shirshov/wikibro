import { DEFAULT_LANGUAGE, I18N_STORAGE_KEY } from '@/i18n/constants';
import { isLanguage, type Language } from '@/i18n/types';

export function getInitialLocale(): Language {
  const saved = localStorage.getItem(I18N_STORAGE_KEY);

  if (saved && isLanguage(saved)) {
    return saved;
  }

  const browserLanguage = navigator.language.slice(0, 2);

  if (isLanguage(browserLanguage)) {
    return browserLanguage;
  }

  return DEFAULT_LANGUAGE;
}

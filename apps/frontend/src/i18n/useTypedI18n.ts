import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { DEFAULT_LANGUAGE, I18N_STORAGE_KEY } from '@/i18n/constants';
import { messages, type TranslationKey } from '@/i18n/messages';
import { SUPPORTED_LANGUAGES, type Language } from '@/i18n/types';

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }

    return undefined;
  }, obj);
}

export function useTypedI18n() {
  const { locale } = useI18n();

  const currentLanguage = computed<Language>(() => locale.value as Language);

  function setLanguage(language: Language) {
    locale.value = language;
  }

  function t(key: TranslationKey): string {
    const currentValue = getNestedValue(messages[currentLanguage.value], key);
    const fallbackValue = getNestedValue(messages[DEFAULT_LANGUAGE], key);

    const value = currentValue ?? fallbackValue;

    return typeof value === 'string' ? value : key;
  }

  function getNextLanguage(): Language {
    const currentIndex = SUPPORTED_LANGUAGES.indexOf(currentLanguage.value);
    const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;

    return SUPPORTED_LANGUAGES[nextIndex];
  }

  function switchLanguage() {
    setLanguage(getNextLanguage());
  }

  watch(
    currentLanguage,
    language => {
      localStorage.setItem(I18N_STORAGE_KEY, language);
      document.documentElement.lang = language;
    },
    { immediate: true }
  );

  return {
    t,
    locale: currentLanguage,
    setLanguage,
    switchLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
}

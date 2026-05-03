import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

const THEME_STORAGE_KEY = 'wikibro_theme';

export const THEMES = ['light', 'dark', 'system'] as const;

export type Theme = (typeof THEMES)[number];

function isTheme(value: string): value is Theme {
  return THEMES.includes(value as Theme);
}

function getInitialTheme(): Theme {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);

  if (saved && isTheme(saved)) {
    return saved;
  }

  return 'system';
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(getInitialTheme());

  const isDark = computed(() => {
    if (theme.value === 'dark') {
      return true;
    }

    if (theme.value === 'light') {
      return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  function setTheme(nextTheme: Theme) {
    theme.value = nextTheme;
  }

  function toggleTheme() {
    if (theme.value === 'light') {
      setTheme('dark');
      return;
    }

    setTheme('light');
  }

  watch(
    theme,
    nextTheme => {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.classList.toggle('dark', isDark.value);
    },
    { immediate: true }
  );

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
});

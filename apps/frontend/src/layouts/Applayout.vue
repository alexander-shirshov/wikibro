<script setup lang="ts">
import { useTypedI18n } from '@/i18n/useTypedI18n';
import { useThemeStore } from '@/stores/theme.store';

const themeStore = useThemeStore();
const { t, locale, switchLanguage } = useTypedI18n();
</script>

<template>
  <div class="app-layout">
    <header>
      <RouterLink to="/">
        {{ t('app.name') }}
      </RouterLink>

      <nav>
        <RouterLink to="/">
          {{ t('app.nav.home') }}
        </RouterLink>

        <button type="button" :aria-label="t('app.language.switchLabel')" @click="switchLanguage">
          {{ locale.toUpperCase() }}
        </button>
        <button type="button" @click="themeStore.toggleTheme">{{ t('theme.button') }}</button>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTypedI18n } from '@/i18n/useTypedI18n';

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
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

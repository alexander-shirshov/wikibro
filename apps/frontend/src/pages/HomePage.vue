<script setup lang="ts">
import { useTypedI18n } from '@/i18n/useTypedI18n';

const { t } = useTypedI18n();
</script>

<template>
  <section>
    <h1>{{ t('pages.home.title') }}</h1>
    <p>{{ t('pages.home.description') }}</p>
  </section>
</template>

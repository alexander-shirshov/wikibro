<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useTypedI18n } from '@/i18n/useTypedI18n';
import { getHealth } from '@/shared/api/health';

const { t } = useTypedI18n();

const status = ref<string>('loading...');
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const res = await getHealth();
    status.value = res.status;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error';
  }
});
</script>

<template>
  <section>
    <h1>{{ t('pages.home.title') }}</h1>
    <p>{{ t('pages.home.description') }}</p>

    <div style="margin-top: 20px">
      <strong>Backend status:</strong>

      <span v-if="error"> ❌ {{ error }} </span>
      <span v-else> ✅ {{ status }} </span>
    </div>
  </section>
</template>

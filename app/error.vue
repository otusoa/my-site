<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({ statusCode: '例外的なエラー', message: '不明なエラー' }),
  },
});
</script>

<template>
  <!-- Gridで中央に配置 -->
  <div>
    <header class="text-center p-8">
      <h1 class="text-3xl font-bold mb-6">Eita.vueのポートフォリオ</h1>
    </header>
    <div class="max-w-3xl min-h-[60svh] mx-auto p-4 grid place-items-center">
      <main>
        <h1 class="text-8xl font-bold mb-6">{{ props.error.status }}</h1>
        <p class="text-gray-600 mb-4">エラーが発生しました</p>
        <p>理由:<br />
          {{ props.error.message }}</p>
        <!-- ボタン風 -->
        <NuxtLink to="/" class="inline-block mt-4 px-2 py-1 bg-primary text-white rounded hover:bg-primary/80">
          ホームへ戻る
        </NuxtLink>
      </main>
    </div>
  </div>
</template>

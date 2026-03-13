<script setup lang="ts">
const links = ref([
  {
    label: '詳しく見てみる',
    to: '#about-me',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>

<template>
  <UPageHero title="Eita.vue" description="小林栄太の個人サイトです。リンク集的なやつです。" class="bg-primary-400/10 rounded-xl"
    :links="links" />
</template>

<style scoped></style>
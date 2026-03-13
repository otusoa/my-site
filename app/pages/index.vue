<script setup lang="ts">
const { data: page } = await useAsyncData('page-root', () => {
  return queryCollection('content').path('/').first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description ?? "小林栄太(eita.vue)のリンク集",
  ogTitle: page.value.title,
  ogDescription: page.value.description ?? "小林栄太(eita.vue)のリンク集",
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>

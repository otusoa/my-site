<script setup lang="ts">
import "pita-css/ts"

const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
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

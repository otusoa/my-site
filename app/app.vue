<script setup lang="ts">
// faviconの指定
useHead({
  link: [
    {
      rel: 'icon',
      href: '/favicon.png',
    },
  ],
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator :throttle="1" color="#8bc170" />
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style></style>
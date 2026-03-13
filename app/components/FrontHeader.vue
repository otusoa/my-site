<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: 'About me',
    to: '/#about-me'
  },
  {
    label: 'Project',
    to: '/#リンク集project'
  },
  {
    label: 'Contact',
    to: '/#連絡先'
  },
  {
    label: '私のデザイン',
    to: '/#私のデザイン',
  }
]
</script>

<template>
  <UHeader>
    <template #title>
      <img src="/eita.svg" class="h-8 w-auto">
    </template>

    <template #body>
      <UNavigationMenu :items="items" variant="link" />
    </template>

    <UNavigationMenu :items="items" />
  </UHeader>
</template>
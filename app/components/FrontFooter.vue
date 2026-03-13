<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const links: NavigationMenuItem[] = [
  {
    label: 'ピタマイ(私のチーム)',
    to: 'https://pitamai.com',
    target: '_blank'
  },
  {
    label: 'GitHub',
    to: 'https://github.com/otusoa',
    target: '_blank'
  },
]
</script>

<template>
  <USeparator />
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        © {{ new Date().getFullYear() }} Eita Kobayashi
      </p>
    </template>

    <UNavigationMenu :items="links" variant="link" />

    <template #right>
      <UButton icon="i-skill-icons-github-dark" color="neutral" variant="ghost" to="https://github.com/otusoa"
        target="_blank" aria-label="GitHub" />
    </template>
  </UFooter>
</template>

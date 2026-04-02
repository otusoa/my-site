<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    to: '/',
    icon: 'i-lucide-house',
  },
  {
    label: 'About me',
    to: '/#about-me',
    icon: 'i-lucide-user',
    description: '自己紹介とこれまでの経歴について。'
  },
  {
    label: 'Project',
    to: '/#リンク集project',
    icon: 'i-lucide-box',
    children: [
      {
        label: 'Lism UI Vue',
        description: 'Lism CSSベースのVue.jsラッパー。',
        icon: 'i-tabler-file-type-css',
        to: 'https://github.com/otusoa/lism-ui-vue',
        target: '_blank'
      },
      {
        label: 'ピタマイ',
        description: '運営している共同創作コミュニティ。',
        icon: 'i-lucide-users-round',
        to: 'https://pitamai.com',
        target: '_blank'
      },
      {
        label: 'Qiita',
        description: '投稿している技術記事の一覧。',
        icon: 'i-simple-icons-qiita',
        to: 'https://qiita.com/eita_kobayashi',
        target: '_blank'
      }
    ]
  },
  {
    label: '私のデザイン',
    to: '/#私のデザイン',
    icon: 'i-lucide-palette',
  },
  {
    label: 'Contact',
    to: '/#連絡先',
    icon: 'i-lucide-send',
  }
])
</script>

<template>
  <UHeader sticky class="border-b bg-background/75 backdrop-blur shadow-sm">
    <template #title>
      <img src="/eita.svg" class="h-8 w-auto hover:opacity-80 transition-opacity" alt="Logo">
    </template>

    <!-- Desktop Navigation -->
    <template #default>
      <UNavigationMenu :items="items" highlight />
    </template>

    <!-- Mobile Navigation -->
    <template #body>
      <UNavigationMenu :items="items" variant="link" color="primary" orientation="vertical" />
    </template>

    <template #right>
      <div class="flex items-center gap-2">
        <UColorModeButton />
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/otusoa"
          target="_blank"
          aria-label="GitHub"
        />
      </div>
    </template>
  </UHeader>
</template>

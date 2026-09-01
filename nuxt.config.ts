// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@unocss/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxthub/core',
    '@vueuse/nuxt',
    'nuxt-studio',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/global.scss'],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'otusoa',
      repo: 'my-site',
      branch: 'refactor/v2',
    },
    media: {
      external: true,
      prefix: 'content',
      publicUrl: process.env.NUXT_PUBLIC_STUDIO_MEDIA_PUBLIC_URL ?? 'https://r2.eita.ptmi.jp',
      allowedTypes: [
        'image/*',
        'video/*',
        'audio/*',
        'application/pdf',
      ],
    },
  },
  hub: {
    blob: true,
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-dark',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai',
          },
        },
      },
    },
  },
})

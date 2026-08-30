import { defineConfig, presetMini, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
  ],

  transformers: [
    transformerDirectives(),
  ],

  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
    },
    boxShadow: {
      main: 'var(--box-shadow-primary)',
    },
  },
})
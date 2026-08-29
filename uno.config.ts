import { defineConfig, presetMini } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
  ],

  theme: {
    colors: {
      primary: 'var(--color-primary)',
      green: {
        500: '#87cc5c',
      }
    },
  },
})
<script setup lang="ts">
type FooterLink = {
  label: string
  to: string
}

type FooterGroup = {
  title: string
  links: FooterLink[]
}

const footerGroups: FooterGroup[] = [
  {
    title: 'このサイト',
    links: [
      { label: 'TOP', to: '/' },
      { label: '私について', to: '/about' },
    ],
  },
  {
    title: '研究',
    links: [
      { label: '研究について', to: '/research' },
      { label: '現在の研究テーマ', to: '/research/current' },
      { label: '論文', to: '/research/publications' },
      { label: '研究ノート', to: '/research/notes' },
    ],
  },
  {
    title: 'エンジニアリング',
    links: [
      { label: '開発・制作物', to: '/engineering' },
    ],
  },
  {
    title: 'お問い合わせ',
    links: [
      { label: 'コンタクトページ', to: '/contact' },
      { label: 'メール', to: 'mailto:eita@ptmi.jp' },
    ],
  },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <section class="contact-band" aria-labelledby="footer-contact-title">
      <div class="footer-inner contact-content">
        <h2 id="footer-contact-title">
          研究・その他のお問い合わせについて
        </h2>
        <p>お問い合わせは、コンタクトページからお気軽にご連絡ください。</p>

        <BaseButton to="#top" align="center" arrow="right"
          class="text-xl py-2 px-6 font-bold border-2 border-solid border-primary">
          お問い合わせ
        </BaseButton>
      </div>
    </section>

    <section class=" identity-band" aria-label="サイト情報">
      <div class="footer-inner identity-content">
        <NuxtLink class="footer-brand" to="/">
          <NuxtImg src="/logo.svg" alt="" width="72" height="72" />
          <span>eita.vue</span>
        </NuxtLink>
        <p>神道学の研究と、Vue.js／Nuxtを中心としたWeb開発をしています。</p>
      </div>
    </section>
    <div class="copyright-band">
      <div class="footer-inner copyright-content">
        <div class="flex flex-col flex-items-start gap-2 items-center text-sm">
          &copy; {{ currentYear }} Eita Kobayashi
          <NuxtLink id="cy-effective-orcid-url"
            class="flex gap-2 underline inline-block py-2 px-4 items-center text-white"
            to="https://orcid.org/0009-0000-6392-4911" target="orcid.widget" rel="me noopener noreferrer">
            <img src="https://orcid.org/sites/default/files/images/orcid_24x24.png" alt="ORCID iD icon" /> ORCID:
            0009-0000-6392-4911
          </NuxtLink>
        </div>
        <BaseButton to="#top" align="end" arrow="up" class="text-sm text-white">
          ページ上部へ戻る
        </BaseButton>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  @apply mt-20 text-neutral-100;

  a {
    @apply text-inherit no-underline;

    &:visited {
      @apply text-inherit;
    }
  }
}

.footer-inner {
  @apply w-full max-w-6xl mx-auto px-6;
}

.contact-band {
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 50%, transparent) 0%, var(--color-primary) 20% 0%, color-mix(in srgb, var(--color-secondary) 100%, transparent) 70%);
}

.contact-content {
  @apply flex flex-col items-center py-14 text-center px-10;
}

.identity-band {
  background: linear-gradient(120deg, #2f3833 0%, #242c28 55%, #1d2420 100%);
}

.identity-content {
  @apply flex flex-col items-center py-14 text-center;

  >p {
    @apply max-w-xl mt-4 mb-0 text-sm leading-7 text-neutral-300;
  }
}

.footer-brand {
  @apply inline-flex items-center gap-4 text-4xl font-bold tracking-[0.03em];

  font-family: var(--font-serif);

  img {
    @apply h-18 w-18;
  }
}

.copyright-band {
  background: linear-gradient(90deg, #0c0f0d 0%, #080a09 100%);
}

.copyright-content {
  @apply flex items-center justify-between gap-6 py-5;
}

@media (max-width: 800px) {
  .sitemap-grid {
    @apply grid-cols-2;
  }
}

@media (max-width: 520px) {
  .site-footer {
    @apply mt-14;
  }

  .contact-content,
  .identity-content {
    @apply py-11;
  }

  .footer-brand {
    @apply text-3xl;

    img {
      @apply h-14 w-14;
    }
  }

  .sitemap-band>.footer-inner {
    @apply py-12;
  }

  .sitemap-grid {
    @apply grid-cols-1;
  }

  .copyright-content {
    @apply flex-col items-start gap-2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-link {
    transition: none;
  }
}
</style>

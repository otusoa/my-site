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
          研究・Web開発について
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

    <nav class="sitemap-band" aria-labelledby="sitemap-title">
      <div class="footer-inner">
        <div class="sitemap-heading">
          <p class="section-label">
          </p>
          <h2 id="sitemap-title">
            人間用サイトマップ
          </h2>
        </div>

        <div class="sitemap-grid">
          <section v-for="group in footerGroups" :key="group.title" class="link-group">
            <h3>{{ group.title }}</h3>
            <ul>
              <li v-for="link in group.links" :key="link.to">
                <NuxtLink :to="link.to">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </nav>

    <div class="copyright-band">
      <div class="footer-inner copyright-content">
        &copy; {{ currentYear }} Eita Kobayashi
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
  background: linear-gradient(120deg,
      color-mix(in srgb, var(--color-primary) 55%, transparent) 0%,
      var(--color-primary) 40% 30%,
      color-mix(in srgb, var(--color-secondary) 90%, transparent) 100%);
}

.contact-content {
  @apply flex flex-col items-center py-14 text-center px-10 bg-gray-800/50 border-rounded-full;

  h2 {
    @apply mt-2 mb-2 text-2xl font-bold;

    font-family: var(--font-serif);
  }

  >p:not(.section-label) {
    @apply m-0 text-sm text-neutral-200;
  }
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

.sitemap-band {
  background: linear-gradient(120deg, #1c211e 0%, #151a17 55%, #101411 100%);
}

.sitemap-band>.footer-inner {
  @apply py-16;
}

.sitemap-heading {
  @apply mb-10 text-center;

  h2 {
    @apply mt-2 mb-0 text-3xl font-bold;

    font-family: var(--font-serif);
  }

  &::after {
    @apply block w-16 h-[3px] mx-auto mt-4 bg-primary;

    content: '';
  }
}

.sitemap-grid {
  @apply grid grid-cols-4 gap-x-10 gap-y-12;
}

.link-group {
  h3 {
    @apply m-0 pb-3 text-lg font-bold border-b border-neutral-600;
  }

  ul {
    @apply m-0 mt-4 p-0;
    list-style: none;
  }

  li+li {
    @apply mt-2;
  }

  a {
    @apply inline-flex items-center text-sm text-neutral-300;

    &::before {
      @apply me-2 text-primary line-height-none;

      content: '—';
    }

    &:hover {
      @apply text-white;
    }
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

<script setup lang="ts">
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
  <main class="content-page">
    <article class="content-article">
      <ContentRenderer v-if="page" :value="page" />
    </article>
  </main>
</template>

<style lang="scss" scoped>
.content-page {
  @apply w-full pt-10;
}

.content-article {
  @apply mx-auto text-gray-800;

  :deep(p) {
    @apply my-2 text-base leading-[2];
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    @apply font-bold leading-[1.4] tracking-[0.02em];

    font-family: var(--font-serif);

    a {
      @apply inline-flex items-center gap-2 text-inherit no-underline;

      &:visited {
        @apply text-inherit;
      }
    }
  }

  :deep(:is(h1, h2, h3, h4, h5, h6) > a[href^='#']::before) {
    @apply inline-block flex-none text-size-base leading-none text-primary p-1 opacity-0 translate-x-[-0.25em] bg-neutral-100 rounded-[0.2em];

    content: '#';
    transition:
      opacity 150ms ease,
      transform 150ms ease;
  }

  :deep(:is(h1, h2, h3, h4, h5, h6) > a[href^='#']:is(:hover, :focus-visible, :active)::before),
  :deep(:is(h1, h2, h3, h4, h5, h6):target > a[href^='#']::before) {
    @apply opacity-100 translate-x-0;
  }

  :deep(h1) {
    @apply mt-6 mb-8;

    font-size: clamp(2rem, 5vw, 3rem);
  }

  :deep(h2) {
    position: relative;

    @apply mt-10 mb-4 pb-2 border-b border-current;

    font-size: clamp(1.5rem, 3vw, 2rem);
    border-block-end-color: var(--border-primary);
  }

  :deep(h2::after) {
    position: absolute;
    inset-block-end: -1px;
    inset-inline-start: 0;

    width: 3.5rem;
    height: 3px;

    content: '';
    background: var(--color-primary);
  }

  :deep(h3) {
    position: relative;

    @apply mt-10 mb-2 text-[1.35rem];

    padding-inline-start: 1.1rem;
  }

  :deep(h3::before) {
    position: absolute;
    inset-block-start: 0.45em;
    inset-inline-start: 0.1rem;

    width: 0.9rem;
    height: 0.9rem;

    content: '';
    background: var(--color-primary);
    transform: rotate(45deg);
  }

  :deep(h4) {
    @apply mt-8 mb-3 text-[1.15rem];
  }

  /* すべてのリスト */
  :deep(ul),
  :deep(ol) {
    @apply my-6 ps-8;
  }

  /* li直下のネストされたリスト */
  :deep(li > :is(ul, ol)) {
    @apply my-2 ps-6;
  }

  /* ネストされたリスト内の項目 */
  :deep(li > :is(ul, ol) > li) {
    @apply my-1;
  }

  :deep(blockquote) {
    @apply my-8 mx-0 py-2 ps-5;

    border-inline-start: 3px solid var(--color-primary);

    p {
      @apply my-2;
    }
  }

  :deep(hr) {
    @apply my-16 border-0 opacity-20;

    border-block-start: 1px solid currentColor;
  }

  :deep(:not(pre) > code) {
    @apply px-[0.35em] py-[0.15em] text-[0.9em] bg-black/5 rounded-[0.2rem];

    font-family: var(--font-mono);
  }

  :deep(pre) {
    @apply my-8 p-5 bg-black overflow-x-auto;

    font-family: var(--font-mono);
  }

  :deep(img) {
    @apply max-w-full h-auto my-10;
  }

  :deep(table) {
    @apply w-full max-w-full mb-5 text-base;

    background: var(--table-bg, transparent);
    display: table;
    table-layout: fixed;
    border-collapse: collapse;

    @media (max-width: 1250px) {
      @apply block overflow-x-auto whitespace-nowrap;

      -webkit-overflow-scrolling: touch;

      thead,
      tbody,
      tr {
        @apply w-full;

        display: table;
      }

      th,
      td {
        @apply min-w-30;
      }
    }

    thead {
      @apply w-full;

      display: table-header-group;
    }

    tbody {
      @apply w-full;

      display: table-row-group;
    }

    tr {
      display: table-row;

      &:nth-child(even) {
        background: var(--table-row-alt, rgb(0 0 0 / 0.025));
      }
    }

    th,
    td {
      @apply max-w-0 px-2 py-[10px] text-start whitespace-normal;

      display: table-cell;
      overflow-wrap: break-word;
      word-wrap: break-word;

      border-inline-end: 1px solid var(--border-primary);

      &:last-child {
        border-inline-end: 0;
      }
    }

    th {
      @apply font-bold;

      background: var(--table-heading-bg, rgb(0 0 0 / 0.04));
    }

    >* {
      margin: 0 !important;
    }

    small {
      @apply block mt-[5px] text-[0.85em];

      color: var(--text-muted);
    }
  }
}
</style>

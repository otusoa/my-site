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
  @apply w-full px-6 py-16;
}

.content-article {
  @apply mx-auto;

  width: min(100%, 72ch);

  :deep(p) {
    @apply my-5 text-base leading-[1.9];
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    @apply font-bold leading-[1.4] tracking-[0.02em] position-relative;

    font-family: var(--font-serif);

    a {
      @apply text-inherit no-underline;

      &:visited {
        @apply text-inherit;
      }
    }
  }

  :deep(:is(h1, h2, h3, h4, h5, h6) > a[href^='#']::before) {
    @apply inline-block position-absolute text-size-base text-primary opacity-0 translate-x-[-0.25em] bg-neutral-300 rounded-[0.2em];

    margin-inline-start: 0.4em;
    top: 0.75em;
    left: -1.5em;

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
    @apply mt-0 mb-12;

    font-size: clamp(2rem, 5vw, 3rem);
  }

  :deep(h2) {
    @apply mt-16 mb-6 pb-2 border-b border-current;

    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  :deep(h3) {
    @apply mt-10 mb-4 text-[1.35rem];
  }

  :deep(h4) {
    @apply mt-8 mb-3 text-[1.15rem];
  }

  :deep(a) {
    @apply underline decoration-[0.08em] underline-offset-[0.18em];

    color: var(--link-primary);

    &:visited {
      color: var(--link-visited);
    }

    &:active {
      color: var(--link-active);
    }
  }

  :deep(ul),
  :deep(ol) {
    @apply my-6 ps-8;
  }

  :deep(li) {
    @apply my-[0.4rem];
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
    @apply my-8 p-5 overflow-x-auto border border-black/10;

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

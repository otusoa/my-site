<script setup lang="ts">
/**
 * プロフィール情報を表示するカード。
 * 画像を省略した場合は、名前の先頭文字を画像部分に表示する。
 *
 * @example
 * ```vue
 * <ProfileCard
 *   name="小林栄太"
 *   handle="eita.vue"
 *   role="研究者 / Webエンジニア"
 *   image="/images/profile.webp"
 * >
 *   <p>神道学の研究と、Vue.js／Nuxtを中心としたWeb開発をしています。</p>
 *
 *   <template #actions>
 *     <BaseButton to="/about">詳しく見る</BaseButton>
 *   </template>
 * </ProfileCard>
 * ```
 *
 * @example 画像を使用しない場合
 * ```vue
 * <ProfileCard name="小林栄太">
 *   <p>研究とWeb開発に取り組んでいます。</p>
 * </ProfileCard>
 * ```
 */
type HeadingLevel = 2 | 3

const props = withDefaults(defineProps<{
  name: string
  handle?: string
  role?: string
  image?: string
  imageAlt?: string
  headingLevel?: HeadingLevel
}>(), {
  handle: undefined,
  role: undefined,
  image: undefined,
  imageAlt: undefined,
  headingLevel: 2,
})

const headingTag = computed(() => `h${props.headingLevel}` as 'h2' | 'h3')
const resolvedImageAlt = computed(() => props.imageAlt ?? `${props.name}のプロフィール画像`)
const initial = computed(() => props.name.trim().charAt(0).toUpperCase())
</script>

<template>
  <article class="profile-card">
    <div class="profile-card__portrait">
      <NuxtImg v-if="image" class="profile-card__image" :src="image" :alt="resolvedImageAlt" width="320" height="320"
        loading="lazy" />
      <span v-else class="profile-card__initial" aria-hidden="true">
        {{ initial }}
      </span>
    </div>

    <div class="profile-card__content">
      <p class="profile-card__eyebrow">
        プロフィール
      </p>

      <header class="profile-card__header">
        <component :is="headingTag" class="profile-card__name">
          {{ name }}
        </component>
        <p v-if="handle" class="profile-card__handle">
          {{ handle }}
        </p>
      </header>

      <p v-if="role" class="profile-card__role">
        {{ role }}
      </p>

      <div v-if="$slots.default" class="profile-card__description">
        <slot />
      </div>

      <footer v-if="$slots.actions" class="profile-card__actions">
        <slot name="actions" />
      </footer>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.profile-card {
  @apply relative grid w-full max-w-5xl gap-8 mx-auto my-8 px-8 py-8 overflow-hidden border-y border-neutral-300 bg-green-100;

  grid-template-columns: minmax(8rem, 11rem) minmax(0, 1fr);

  &::before {
    @apply absolute inset-y-0 start-0 w-1 bg-primary;

    content: '';
  }

  &__portrait {
    @apply flex aspect-square w-full items-center justify-center overflow-hidden bg-neutral-100;

    border: 1px solid var(--border-primary);
  }

  &__image {
    @apply block h-full w-full object-cover;

    object-fit: cover;
  }

  &__initial {
    @apply text-5xl font-bold text-secondary;

    font-family: var(--font-serif);
  }

  &__content {
    @apply min-w-0 self-center;
  }

  &__eyebrow {
    @apply m-0 text-xs font-bold tracking-[0.16em] text-secondary;
  }

  &__header {
    @apply flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-2;
  }

  &__name {
    @apply m-0 p-0 border-0 font-bold leading-tight tracking-[0.02em];

    font-family: var(--font-serif);
    font-size: clamp(1.6rem, 4vw, 2.35rem);

    &::before,
    &::after {
      display: none;
    }
  }

  &__handle {
    @apply m-0 text-sm text-neutral-500;
  }

  &__role {
    @apply mt-2 mb-0 text-sm font-bold text-neutral-700;

  }

  &__description {
    @apply mt-4 text-neutral-700;

    :deep(p:first-child) {
      margin-block-start: 0;
    }

    :deep(p:last-child) {
      margin-block-end: 0;
    }
  }

  &__actions {
    @apply mt-5 pt-4 border-t border-neutral-200;

    :deep(.base-button) {
      margin-block: 0;
    }
  }

  @media (max-width: 640px) {
    @apply grid-cols-1 gap-5 px-5 py-6;

    grid-template-columns: minmax(0, 1fr);

    &__portrait {
      @apply w-28;
    }
  }
}
</style>
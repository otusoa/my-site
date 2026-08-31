<script setup lang="ts">
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from 'reka-ui'

/**
 * ProfileStepper内に配置する1件分の経歴。
 * 説明はdefault slotへMarkdownで入力する。
 *
 * @example MDC
 * ```mdc
 * ::profile-step{step="1" year="2022年" title="Web開発を開始"}
 * Vue.jsとNuxtを中心にWeb制作を始める。
 * ::
 * ```
 */
const props = defineProps<{
  step?: string
  year: string
  title: string
}>()

const resolvedStep = computed(() => Number(props.step))
</script>

<template>
  <StepperItem class="profile-step" as="li" :step="resolvedStep">
    <StepperTrigger class="profile-step__trigger">
      <StepperIndicator class="profile-step__indicator">
        <template v-if="resolvedStep || resolvedStep === 0">
          <span aria-hidden="true">{{ resolvedStep }}</span>
        </template>
        <template v-else>
          <Icon name="i-lucide-message-circle" aria-hidden="true" />
        </template>
      </StepperIndicator>

      <span class="profile-step__content">
        <time class="profile-step__year">{{ year }}</time>
        <StepperTitle class="profile-step__title">
          {{ title }}
        </StepperTitle>
      </span>
    </StepperTrigger>

    <StepperDescription v-if="$slots.default" as="div" class="profile-step__description">
      <slot />
    </StepperDescription>

    <StepperSeparator class="profile-step__separator" />
  </StepperItem>
</template>

<style lang="scss" scoped>
.profile-step {
  @apply relative grid pb-7;

  grid-template-columns: 2.5rem minmax(0, 1fr);

  &__trigger {
    @apply col-span-2 grid w-full gap-x-4 p-0 border-0 bg-transparent text-start cursor-pointer;

    grid-template-columns: 2.5rem minmax(0, 1fr);
    color: inherit;

    &:focus-visible {
      outline-offset: 0.35rem;
    }
  }

  &__indicator {
    @apply relative z-1 flex h-10 w-10 items-center justify-center rounded-full text-md font-bold text-neutral-900;

    background: var(--color-primary);
    font-family: var(--font-sans);

  }

  &__content {
    @apply min-w-0;
  }

  &__year {
    @apply block mb-1 text-sm font-bold tracking-[0.08em] text-neutral-500;
  }

  &__title {
    @apply block mt-2 text-xl font-bold leading-snug text-neutral-900;
  }

  &__description {
    @apply mt-2 leading-relaxed text-neutral-700;

    grid-column: 2;

    :deep(> :first-child) {
      margin-block-start: 0;
    }

    :deep(> :last-child) {
      margin-block-end: 0;
    }
  }

  &__separator {
    @apply absolute top-10 bottom-0 start-[1.225rem] w-px bg-neutral-300;
  }

  &:last-child &__separator {
    display: none;
  }

  &[data-state='active'] &__indicator,
  &[data-state='completed'] &__indicator {
    background: var(--color-primary);
  }

  @media (max-width: 640px) {

    &,
    &__trigger {
      grid-template-columns: 2rem minmax(0, 1fr);
    }

    &__trigger {
      @apply gap-x-3;
    }

    &__indicator {
      @apply h-8 w-8 text-xs;
    }

    &__separator {
      @apply top-8 start-[0.975rem];
    }
  }
}
</style>

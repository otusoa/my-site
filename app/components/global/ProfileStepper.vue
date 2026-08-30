<script setup lang="ts">
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from 'reka-ui'

/**
 * プロフィールの経歴を、キーボード操作可能な縦型ステッパーとして表示する。
 * 各項目は非線形に選択でき、初期状態では最初の項目を選択する。
 *
 * @example MDC
 * ```mdc
 * ::profile-stepper{:items='[{"year":"2019","title":"大学での研究を開始","description":"神道学と教派神道の研究に取り組み始める。"},{"year":"2022","title":"Web開発を開始","description":"Vue.jsとNuxtを中心にWeb制作を始める。"}]'}
 * ::
 * ```
 *
 * @example Vue
 * ```vue
 * <template>
 *   <ProfileStepper
 *     :items="[
 *       {
 *         year: '2019',
 *         title: '大学での研究を開始',
 *         description: '神道学と教派神道の研究に取り組み始める。',
 *       },
 *       {
 *         year: '2022',
 *         title: 'Web開発を開始',
 *         description: 'Vue.jsとNuxtを中心にWeb制作を始める。',
 *       },
 *     ]"
 *   />
 * </template>
 * ```
 */
interface ProfileStep {
  year: string
  title: string
  description?: string
}

const props = withDefaults(defineProps<{
  items?: ProfileStep[]
  defaultValue?: number
}>(), {
  items: () => [],
  defaultValue: 1,
})

const initialStep = computed(() => {
  if (!Array.isArray(props.items) || props.items.length === 0)
    return undefined

  return Math.min(Math.max(props.defaultValue, 1), props.items.length)
})

const steps = computed(() => Array.isArray(props.items) ? props.items : [])
</script>

<template>
  <StepperRoot v-if="steps.length" class="profile-stepper" :default-value="initialStep" orientation="vertical">
    <StepperItem v-for="(item, index) in steps" :key="`${item.year}-${item.title}`" class="profile-stepper__item"
      :step="index + 1">
      <StepperTrigger class="profile-stepper__trigger">
        <StepperIndicator class="profile-stepper__indicator">
          <span aria-hidden="true">{{ index + 1 }}</span>
        </StepperIndicator>

        <span class="profile-stepper__content">
          <time class="profile-stepper__year">{{ item.year }}</time>
          <StepperTitle class="profile-stepper__title">
            {{ item.title }}
          </StepperTitle>
          <StepperDescription v-if="item.description" class="profile-stepper__description">
            {{ item.description }}
          </StepperDescription>
        </span>
      </StepperTrigger>

      <StepperSeparator v-if="index < steps.length - 1" class="profile-stepper__separator" />
    </StepperItem>
  </StepperRoot>
</template>

<style lang="scss" scoped>
.profile-stepper {
  @apply grid w-full max-w-3xl gap-0 my-8;

  &__item {
    @apply relative grid;

    grid-template-columns: 2.5rem minmax(0, 1fr);
  }

  &__trigger {
    @apply col-span-2 grid w-full gap-x-4 p-0 border-0 bg-transparent text-start cursor-pointer;

    grid-template-columns: 2.5rem minmax(0, 1fr);
    color: inherit;

    &:focus-visible {
      outline-offset: 0.35rem;
    }
  }

  &__indicator {
    @apply relative z-1 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 bg-white text-md font-bold text-neutral-700 transition-colors;
    border-color: var(--color-primary);
    background: var(--color-primary);
    font-family: var(--font-sans);
  }

  // &__trigger[data-state='active'] &__indicator,
  // &__trigger[data-state='completed'] &__indicator {
  //   border-color: var(--color-primary);
  //   background: var(--color-primary);
  //   @apply text-neutral-900;
  // }

  &__content {
    @apply block min-w-0 pb-4;
  }

  &__year {
    @apply block mb-1 text-sm font-bold tracking-[0.08em] text-neutral-500;
  }

  &__title {
    @apply block text-xl mt-3 font-bold leading-snug text-neutral-900;
  }

  &__description {
    @apply block mt-2 leading-relaxed text-neutral-700;
  }

  &__separator {
    @apply absolute top-10 bottom-0 start-[1.225rem] w-px bg-neutral-300;
  }

  &__item[data-state='completed'] &__separator {
    background: var(--color-primary);
  }

  @media (max-width: 640px) {

    &__item,
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
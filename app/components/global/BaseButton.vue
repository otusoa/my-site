<script setup lang="ts">
type ArrowDirection = 'right' | 'left' | 'up' | 'down' | 'external' | 'none'
type ButtonAlign = 'start' | 'center' | 'end'

const props = withDefaults(defineProps<{
  text?: string
  to: string
  label?: string
  arrow?: ArrowDirection
  align?: ButtonAlign
  target?: '_self' | '_blank'
}>(), {
  text: undefined,
  label: undefined,
  arrow: 'right',
  align: 'start',
  target: '_self',
})

const arrowSymbols: Record<ArrowDirection, string> = {
  right: '→',
  left: '←',
  up: '↑',
  down: '↓',
  external: '↗',
  none: '',
}

const arrowSymbol = computed(() => arrowSymbols[props.arrow])
const isLeadingArrow = computed(() => props.arrow === 'left')
const rel = computed(() => props.target === '_blank' ? 'noopener noreferrer' : undefined)
</script>

<template>
  <NuxtLink class="base-button" :to="to" :target="target" :rel="rel" :data-arrow="arrow" :data-align="align">
    <span v-if="arrowSymbol && isLeadingArrow" class="base-button__arrow" aria-hidden="true">
      {{ arrowSymbol }}
    </span>

    <span class="base-button__label">
      <slot>{{ text || label }}</slot>
    </span>

    <span v-if="arrowSymbol && !isLeadingArrow" class="base-button__arrow" aria-hidden="true">
      {{ arrowSymbol }}
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.base-button {
  @apply flex w-fit items-center px-4 py-2 my-5 justify-center gap-3 bg-secondary rounded-full leading-[1] no-underline text-white;

  transition:
    color 150ms ease,
    background-color 150ms ease,
    border-color 150ms ease;

  &:visited {
    @apply text-white;
  }

  &[data-align='start'] {
    @apply me-auto;
  }

  &[data-align='center'] {
    @apply mx-auto;
  }

  &[data-align='end'] {
    @apply ms-auto;
  }

  &__arrow {
    @apply inline-block text-[1.2em] text-white font-normal leading-none;

    transition: transform 150ms ease;
  }

  &:is([data-arrow='right'], [data-arrow='external']):hover &__arrow {
    transform: translateX(0.4rem);
  }

  &[data-arrow='left']:hover &__arrow {
    transform: translateX(-0.4rem);
  }

  &[data-arrow='up']:hover &__arrow {
    transform: translateY(-0.15rem);
  }

  &[data-arrow='down']:hover &__arrow {
    transform: translateY(0.15rem);
  }

  @media (prefers-reduced-motion: reduce) {

    &,
    &__arrow {
      transition: none;
    }
  }
}
</style>

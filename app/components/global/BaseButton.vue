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
  right: 'i-lucide-arrow-right',
  left: 'i-lucide-arrow-left',
  up: 'i-lucide-arrow-up',
  down: 'i-lucide-arrow-down',
  external: 'i-lucide-external-link',
  none: '',
}

const arrowIcon = computed(() => arrowSymbols[props.arrow])
const isLeadingArrow = computed(() => props.arrow === 'left')
const rel = computed(() => props.target === '_blank' ? 'noopener noreferrer' : undefined)
</script>

<template>
  <NuxtLink class="base-button no-underline text-white" :to="to" :target="target" :rel="rel" :data-arrow="arrow"
    :data-align="align">
    <span v-if="arrowIcon && isLeadingArrow" aria-hidden="true">
      <Icon :name="arrowIcon" class="base-button__arrow" />
    </span>

    <span class="base-button__label">
      <slot>{{ text || label }}</slot>
    </span>

    <span v-if="arrowIcon && !isLeadingArrow" aria-hidden="true">
      <Icon :name="arrowIcon" class="base-button__arrow" />
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.base-button {
  @apply flex w-fit items-center px-4 py-2 my-5 justify-center gap-3 bg-secondary rounded-full leading-[1] text-white shadow-main;

  transition:
    color 150ms ease,
    background-color 150ms ease,
    border-color 150ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.base-button:visited {
  @apply text-white;
}

.base-button[data-align='start'] {
  @apply me-auto;
}

.base-button[data-align='center'] {
  @apply mx-auto;
}

.base-button[data-align='end'] {
  @apply ms-auto;
}

.base-button__arrow {
  @apply inline-block text-[1.2em] font-normal leading-none;

  color: currentColor;
  transition: transform 150ms ease;
}

.base-button:is([data-arrow='right'], [data-arrow='external']):hover .base-button__arrow {
  transform: translateX(0.4rem);
}

.base-button[data-arrow='left']:hover .base-button__arrow {
  transform: translateX(-0.4rem);
}

.base-button[data-arrow='up']:hover .base-button__arrow {
  transform: translateY(-0.15rem);
}

.base-button[data-arrow='down']:hover .base-button__arrow {
  transform: translateY(0.15rem);
}

@media (prefers-reduced-motion: reduce) {
  .base-button__arrow {
    transition: none;
  }
}
</style>

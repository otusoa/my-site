<script setup lang="ts">
import { StepperRoot } from 'reka-ui'

/**
 * プロフィールの経歴ブロックを、キーボード操作可能なステッパーとして表示する。
 * Studioでは内部にProfileStepブロックを追加して使用する。
 *
 * @example MDC
 * ```mdc
 * ::profile-stepper
 *   :::profile-step{step="1" year="2019年" title="大学での研究を開始"}
 *   神道学と教派神道の研究に取り組み始める。
 *   :::
 *
 *   :::profile-step{step="2" year="2022年" title="Web開発を開始"}
 *   Vue.jsとNuxtを中心にWeb制作を始める。
 *   :::
 * ::
 * ```
 */
withDefaults(defineProps<{
  defaultValue?: number
}>(), {
  defaultValue: 1,
})
</script>

<template>
  <StepperRoot class="profile-stepper" as="ol" orientation="vertical" :default-value="defaultValue">
    <slot />
  </StepperRoot>
</template>

<style lang="scss" scoped>
.profile-stepper {
  @apply grid w-full max-w-3xl gap-0 my-8 p-0 list-none;

}
</style>

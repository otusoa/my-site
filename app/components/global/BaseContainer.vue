<template>
  <section class="base-container max-w-5xl mx-auto max-xl:px-4 border-neutral-200">
    <slot />
  </section>
</template>

<style scoped>
.base-container~.base-container {
  border-block-start-width: 2px;
  border-block-start-style: solid;
}
</style>

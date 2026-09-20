<template>
  <div id="top">
    <BaseSticky v-slot="{ stickyClass, stickyStyle }" :breakpoint="1024" top="0rem">
      <FrontHeader :class="[stickyClass, 'z-50']" :style="stickyStyle" />
    </BaseSticky>
    <slot />
    <FrontFooter />
  </div>
</template>

<script setup lang="ts">
const isCookieSettingsOpen = ref(false)
</script>

<template>
  <div id="top">
    <BaseSticky v-slot="{ stickyClass, stickyStyle }" :breakpoint="1024" top="0rem">
      <FrontHeader :class="[stickyClass, 'z-50']" :style="stickyStyle" />
    </BaseSticky>
    <slot />
    <FrontFooter @open-cookie-settings="isCookieSettingsOpen = true" />
    <BaseSticky v-slot="{ stickyClass, stickyStyle }" :breakpoint="1024" top="0rem">
      <CookieConsentBanner :class="[stickyClass, 'z-60']" v-model:open="isCookieSettingsOpen" :style="stickyStyle" />
    </BaseSticky>
  </div>
</template>

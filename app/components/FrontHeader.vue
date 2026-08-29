<script setup lang="ts">
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

const route = useRoute()
const isOpen = ref(false)

type NavigationItem = {
  label: string
  to: string
  children?: Array<{
    label: string
    to: string
  }>
}

const navigationItems: NavigationItem[] = [
  { label: 'TOP', to: '/' },
  { label: '私について', to: '/about' },
  {
    label: '研究',
    to: '/research',
    children: [
      { label: '現在の研究テーマ', to: '/research/current' },
      { label: '論文', to: '/research/publications' },
      { label: '研究ノート', to: '/research/notes' },
    ],
  },
  { label: 'エンジニア', to: '/engineering' },
  { label: '問い合わせ', to: '/contact' },
]

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)
</script>

<template>
  <header class="site-header">
    <div class="mx-auto flex py-4 max-w-6xl items-center justify-between px-6">
      <NuxtLink class="site-name" to="/">
        <NuxtImg src="/logo.svg" alt="eita.vue" class="h-16 w-16" />
        <span class="text-sm text-neutral-700">eita.vue</span>
      </NuxtLink>

      <DialogRoot v-model:open="isOpen">
        <DialogTrigger class="menu-trigger rounded-full line-height-none" aria-label="メニューを開く">
          <span class="text-md">メニュー</span>
          <span aria-hidden="true">
            <Icon name="i-lucide-menu" class="text-xl" />
          </span>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay class="menu-overlay" />

          <DialogContent class="menu-panel" :aria-describedby="undefined">
            <div class="flex items-center justify-between border-b bg-green-100 border-neutral-300 px-6 py-5">
              <DialogTitle class="m-0 text-xl font-bold">
                メニュー
              </DialogTitle>

              <DialogClose class="menu-close rounded-full" aria-label="メニューを閉じる">
                <Icon name="i-lucide-x" class="line-height-none close-icon" />
              </DialogClose>
            </div>

            <nav class="px-6 py-8" aria-label="メインナビゲーション">
              <ul class="m-0 menu-list p-0">
                <li v-for="(item, index) in navigationItems" :key="item.to" class="border-b border-neutral-300">
                  <CollapsibleRoot v-if="item.children?.length">
                    <div class="submenu-heading">
                      <NuxtLink class="menu-link" :to="item.to"
                        :aria-current="route.path === item.to ? 'page' : undefined" @click="isOpen = false">
                        <span class="font-sans text-sm text-neutral-500" aria-hidden="true">
                          {{ String(index + 1).padStart(2, '0') }}
                        </span>
                        <span>{{ item.label }}</span>
                      </NuxtLink>

                      <CollapsibleTrigger class="submenu-trigger" :aria-label="`${item.label}のサブメニューを開閉する`">
                        <Icon name="i-lucide-chevron-down" class="submenu-icon" />
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent class="submenu-content">
                      <ul class="submenu-list">
                        <li v-for="child in item.children" :key="child.to">
                          <NuxtLink class="submenu-link" :to="child.to"
                            :aria-current="route.path === child.to ? 'page' : undefined" @click="isOpen = false">
                            {{ child.label }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </CollapsibleRoot>

                  <NuxtLink v-else class="menu-link" :to="item.to"
                    :aria-current="route.path === item.to ? 'page' : undefined" @click="isOpen = false">
                    <span class="font-sans text-sm text-neutral-500" aria-hidden="true">
                      {{ String(index + 1).padStart(2, '0') }}
                    </span>
                    <span>{{ item.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  @apply inset-x-0 top-0 bg-neutral-100;
  border-block-end: 1px solid var(--border-primary);
}

.site-name {
  color: inherit;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;

  @apply flex items-center gap-2 text-inherit no-underline;
}

.menu-trigger {
  display: inline-flex;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;

  color: inherit;
  cursor: pointer;
  background: transparent;
  border: 2px solid var(--border-primary);
  @apply bg-green-100
}

.menu-trigger:hover {
  border-color: var(--color-primary);
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-overlay {
  position: fixed;
  z-index: 40;
  inset: 0;

  background: rgb(20 20 20 / 0.38);
}

.menu-panel {
  position: fixed;
  z-index: 50;
  inset-block: 0;
  inset-inline-end: 0;

  width: min(88vw, 28rem);
  overflow-y: auto;

  @apply text-neutral-900 bg-neutral-100;
  border-inline-start: 1px solid var(--border-primary);
  box-shadow: -1rem 0 3rem rgb(0 0 0 / 0.08);
}

.menu-close {
  position: relative;

  display: inline-grid;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  place-items: center;

  color: inherit;
  line-height: 1;
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--border-primary);
}

.close-icon {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  line-height: 1;
}

.menu-close:hover {
  border-color: var(--color-primary);
}

.menu-link {
  display: grid;
  grid-template-columns: 2rem 1fr;
  padding-block: 1.25rem;
  align-items: baseline;
  gap: 0.75rem;

  color: inherit;
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  text-decoration: none;
}

.menu-link:hover,
.menu-link[aria-current='page'] {
  @apply text-secondary;
}

.menu-link::after {
  grid-column: 2;
  width: 0;
  height: 2px;

  content: '';
  background: var(--color-primary);
  transition: width 160ms ease;
}

.menu-link:hover::after,
.menu-link[aria-current='page']::after {
  width: 2.5rem;
}

.submenu-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
}

.submenu-trigger {
  display: inline-grid;
  width: 3.5rem;
  padding: 0;
  place-items: center;

  color: inherit;
  line-height: 1;
  cursor: pointer;
  background: transparent;
  border: 0;
  @apply bg-neutral-200;
}

.submenu-trigger:hover {
  color: var(--color-secondary);
  background: rgb(135 204 92 / 0.12);
}

.submenu-icon {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 160ms ease;
}

.submenu-trigger[data-state='open'] .submenu-icon {
  transform: rotate(180deg);
}

.submenu-content {
  overflow: hidden;
}

.submenu-content[data-state='open'] {
  animation: submenu-open 180ms ease-out;
}

.submenu-content[data-state='closed'] {
  animation: submenu-close 150ms ease-in;
}

.submenu-list {
  margin: 0;
  padding: 0 0 1rem 2.75rem;
  list-style: none;
}

.submenu-link {
  display: block;
  padding: 0.625rem 0.75rem;

  color: inherit;
  font-size: 1rem;
  text-decoration: none;
  border-inline-start: 2px solid var(--border-primary);
}

.submenu-link:hover,
.submenu-link[aria-current='page'] {
  color: #3f7621;
  border-inline-start-color: var(--color-primary);
}

.menu-overlay[data-state='open'] {
  animation: overlay-in 160ms ease-out;
}

.menu-overlay[data-state='closed'] {
  animation: overlay-out 120ms ease-in;
}

.menu-panel[data-state='open'] {
  animation: panel-in 200ms ease-out;
}

.menu-panel[data-state='closed'] {
  animation: panel-out 150ms ease-in;
}

@keyframes overlay-in {
  from {
    opacity: 0;
  }
}

@keyframes overlay-out {
  to {
    opacity: 0;
  }
}

@keyframes panel-in {
  from {
    transform: translateX(100%);
  }
}

@keyframes panel-out {
  to {
    transform: translateX(100%);
  }
}

@keyframes submenu-open {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }
}

@keyframes submenu-close {
  from {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }

  to {
    height: 0;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {

  .menu-overlay,
  .menu-panel,
  .menu-link::after,
  .submenu-content,
  .submenu-icon {
    animation: none;
    transition: none;
  }
}
</style>

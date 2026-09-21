<script setup lang="ts">
type AnalyticsConsentChoice = 'accepted' | 'denied'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const analyticsCookiePattern = /^(?:_ga(?:_|$)|_gid$|_gat(?:_|$))/

const consentChoice = useCookie<AnalyticsConsentChoice | null>('eita-analytics-consent-v1', {
  default: () => null,
  maxAge: CONSENT_COOKIE_MAX_AGE,
  path: '/',
  sameSite: 'lax',
  secure: import.meta.env.PROD,
})

const { consent } = useScriptGoogleAnalytics()

const isVisible = computed(() => consentChoice.value === null || props.open)
const hasSavedChoice = computed(() => consentChoice.value !== null)

function updateGoogleConsent(choice: AnalyticsConsentChoice) {
  consent.update({
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: choice === 'accepted' ? 'granted' : 'denied',
  })
}

function analyticsCookieDomains() {
  const hostname = window.location.hostname
  const labels = hostname.split('.')
  const domains = new Set<string>([hostname, `.${hostname}`])

  for (let index = 1; index < labels.length - 1; index++) {
    const parentDomain = labels.slice(index).join('.')
    domains.add(parentDomain)
    domains.add(`.${parentDomain}`)
  }

  return domains
}

function deleteAnalyticsCookies() {
  if (!import.meta.client)
    return

  const cookieNames = document.cookie
    .split(';')
    .map(cookie => decodeURIComponent(cookie.split('=')[0]?.trim() ?? ''))
    .filter(cookieName => analyticsCookiePattern.test(cookieName))

  for (const cookieName of cookieNames) {
    document.cookie = `${encodeURIComponent(cookieName)}=; Max-Age=0; Path=/; SameSite=Lax`

    for (const domain of analyticsCookieDomains())
      document.cookie = `${encodeURIComponent(cookieName)}=; Max-Age=0; Path=/; Domain=${domain}; SameSite=Lax`
  }
}

function saveChoice(choice: AnalyticsConsentChoice) {
  consentChoice.value = choice
  updateGoogleConsent(choice)

  if (choice === 'denied')
    deleteAnalyticsCookies()

  emit('update:open', false)
}

function closeSettings() {
  emit('update:open', false)
}

onMounted(() => {
  if (consentChoice.value) {
    updateGoogleConsent(consentChoice.value)

    if (consentChoice.value === 'denied')
      deleteAnalyticsCookies()
  }
})
</script>

<template>
  <Transition name="consent-banner" appear>
    <aside v-if="isVisible" class="consent-banner" aria-labelledby="consent-title"
      aria-describedby="consent-description">
      <div class="consent-banner__inner">
        <div class="consent-banner__body">
          <p class="consent-banner__eyebrow">
            プライバシー設定
          </p>
          <h2 id="consent-title" class="text-xl">
            アクセス解析Cookieについて
          </h2>
          <p id="consent-description" class="text-sm">
            このサイトでは、利用状況を把握し改善するためにGoogle Analyticsを使用しています。
            拒否した場合、解析Cookieは保存されませんが、Cookieを使わない計測信号が送信されることがあります。
            詳しくは
            <NuxtLink to="/privacy">プライバシーとCookie</NuxtLink>
            をご確認ください。
          </p>

          <div class="mt-6" v-if="consentChoice !== null">
            <p class="consent-banner__status" role="status">
              <template v-if="consentChoice === 'denied'">
                <span>現在、アクセス解析Cookieを拒否しています。
                  <Icon name="i-lucide-circle-x" />
                </span>
              </template>
              <template v-else-if="consentChoice === 'accepted'">
                <span>現在、アクセス解析Cookieを許可しています。
                  <Icon name="i-lucide-circle-check" />
                </span>
              </template>
            </p>
          </div>
        </div>

        <div class="consent-banner__actions">
          <button type="button" class="consent-button consent-button--accept" @click="saveChoice('accepted')">
            解析Cookieを許可
          </button>
          <button type="button" class="consent-button consent-button--deny" @click="saveChoice('denied')">
            拒否する
          </button>
          <button v-if="hasSavedChoice" type="button" class="consent-button consent-button--close"
            @click="closeSettings">
            変更せず閉じる
          </button>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<style scoped lang="scss">
.consent-banner {
  @apply bg-green-200/80 text-gray-900;
  inset-inline: 0;
  inset-block-end: 0;

  padding: 1rem;
  border-block-start: 1px solid rgb(255 255 255 / 0.22);
  box-shadow: 0 -8px 32px rgb(0 0 0 / 0.22);
}

.consent-banner-enter-active,
.consent-banner-leave-active {
  transition:
    opacity 280ms ease,
    transform 280ms ease;
}

.consent-banner-enter-from,
.consent-banner-leave-to {
  opacity: 0;
  transform: translateY(1.5rem);
}

.consent-banner__inner {
  @apply mx-auto grid max-w-6xl items-end gap-6;

  grid-template-columns: minmax(0, 1fr) auto;
}

.consent-banner__body {
  max-width: 48rem;
}

.consent-banner__eyebrow {
  @apply m-0 text-xs font-bold tracking-[0.12em] text-secondary;
}

.consent-banner h2 {
  @apply my-1 text-xl;
}

.consent-banner p {
  @apply mb-0 mt-2 leading-7;
}

.consent-banner a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.consent-banner__status {
  @apply py-0.5 px-2 font-bold text-gray-900 bg-primary rounded-md mr-auto w-fit;
}

.consent-banner__actions {
  @apply grid min-w-58 gap-2;
}

.consent-button {
  @apply w-full cursor-pointer border border-solid px-5 py-2.5 text-sm font-bold;

  min-height: 2.75rem;
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    color 150ms ease;
}

.consent-button--accept {
  color: #12210c;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.consent-button--deny {
  @apply text-white bg-gray-800;
}

.consent-button--close {
  background: transparent;
  border-color: transparent;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.consent-button:hover {
  filter: brightness(1.20);
  transition: 300ms ease;
}

@media (max-width: 760px) {
  .consent-banner__inner {
    grid-template-columns: 1fr;
  }

  .consent-banner__actions {
    @apply min-w-0;

    grid-template-columns: 1fr 1fr;
  }

  .consent-button--close {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .consent-banner {
    padding: 1rem 1.25rem;
  }

  .consent-banner__actions {
    grid-template-columns: 1fr;
  }

  .consent-button--close {
    grid-column: auto;
  }
}

@media (prefers-reduced-motion: reduce) {

  .consent-banner-enter-active,
  .consent-banner-leave-active,
  .consent-button {
    transition: none;
  }

  .consent-banner-enter-from,
  .consent-banner-leave-to {
    transform: none;
  }
}
</style>

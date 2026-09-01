<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import 'vue-pdf-embed/dist/styles/annotationLayer.css'
import 'vue-pdf-embed/dist/styles/textLayer.css'

/**
 * PDFを1ページずつ表示する、スライド向けのビューアー。
 * 前後移動、拡大縮小、全画面、ダウンロードに対応する。
 *
 * @example Vue
 * ```vue
 * <PdfSlides
 *   src="https://r2.eita.ptmi.jp/content/example.pdf"
 *   title="Vueとの出会い"
 *   :start-page="1"
 *   download-name="vue-history.pdf"
 * >
 *   <p>発表資料の概要や、PDFを開けない場合の補足説明。</p>
 * </PdfSlides>
 * ```
 *
 * @example MDC
 * ```mdc
 * ::pdf-slides{src="https://r2.eita.ptmi.jp/content/example.pdf" title="Vueとの出会い" start-page="1" download-name="vue-history.pdf"}
 * 発表資料の概要や、PDFを開けない場合の補足説明。
 * ::
 * ```
 */
const props = withDefaults(defineProps<{
  /** 公開されているPDFのHTTPS URL。 */
  src: string
  /** ツールバーとアクセシブルネームに表示する資料名。 */
  title: string
  /** 最初に表示するページ番号。 */
  startPage?: number | string
  /** ダウンロード時のファイル名。 */
  downloadName?: string
}>(), {
  startPage: 1,
  downloadName: undefined,
})

interface PdfDocument {
  numPages: number
}

interface PdfEmbedInstance {
  download: (filename?: string) => Promise<void>
}

interface PdfProgress {
  loaded: number
  total?: number
}

// PDF.jsをSSRバンドル上で実行しないよう、ビューアー本体を遅延読み込みする。
const VuePdfEmbed = defineAsyncComponent(() => import('vue-pdf-embed').then(module => module.default))

// DOM参照。表示幅の計測、Canvasの計測、全画面表示、ダウンロードに使用する。
const figure = ref<HTMLElement | null>(null)
const viewport = ref<HTMLElement | null>(null)
const pageSurface = ref<HTMLElement | null>(null)
const pdf = ref<PdfEmbedInstance | null>(null)
const { width: viewportWidth, height: viewportHeight } = useElementSize(viewport)

// 同じページに複数のビューアーがあってもARIAの参照先が重複しないIDを作る。
const id = useId()
const titleId = `pdf-slides-title-${id}`
const statusId = `pdf-slides-status-${id}`
// PDFの表示状態。loadingは文書取得、renderingは各ページのCanvas描画を表す。
const page = ref(normalizePage(props.startPage))
const pageCount = ref(0)
const zoom = ref(100)
const loading = ref(true)
const rendering = ref(false)
const progress = ref<number | null>(null)
const errorMessage = ref('')
const isFullscreen = ref(false)
const isClient = ref(false)
const pageAspectRatio = ref<number | null>(null)

// PDF.jsへ渡す前に、公開HTTPS URLであることを確認する。
const isValidSource = computed(() => {
  try {
    return new URL(props.src).protocol === 'https:'
  }
  catch {
    return false
  }
})
const canGoBack = computed(() => page.value > 1)
const canGoForward = computed(() => pageCount.value > 0 && page.value < pageCount.value)

// 通常表示は横幅を基準にし、全画面表示では縦横の両方に収まる幅を基準にする。
const fittedWidth = computed(() => {
  if (viewportWidth.value <= 0)
    return undefined

  if (!isFullscreen.value || viewportHeight.value <= 0 || !pageAspectRatio.value)
    return viewportWidth.value

  const widthLimitedByHeight = viewportHeight.value / pageAspectRatio.value
  return Math.min(viewportWidth.value, widthLimitedByHeight)
})

// 画面内に収まる基準幅へズーム率を掛け、PDF.jsへ渡す実描画幅を求める。
const renderedWidth = computed(() => {
  if (!fittedWidth.value)
    return undefined

  return Math.max(1, Math.floor(fittedWidth.value * zoom.value / 100))
})
// ページ切替中にCanvasが一度消えても高さが0にならないよう、直前の縦横比から高さを予約する。
const reservedPageHeight = computed(() => {
  if (!renderedWidth.value || !pageAspectRatio.value)
    return undefined

  return Math.round(renderedWidth.value * pageAspectRatio.value)
})
// 明示名がなければURL末尾のPDFファイル名をダウンロード名として使う。
const resolvedDownloadName = computed(() => {
  if (props.downloadName)
    return props.downloadName

  try {
    const filename = decodeURIComponent(new URL(props.src).pathname.split('/').pop() || '')
    return filename.toLowerCase().endsWith('.pdf') ? filename : 'document.pdf'
  }
  catch {
    return 'document.pdf'
  }
})
// 文書全体の取得進捗を、スクリーン上に表示できる日本語へ変換する。
const loadingLabel = computed(() => {
  if (progress.value === null)
    return 'PDFを読み込んでいます'

  return `PDFを読み込んでいます（${progress.value}%）`
})
// 現在ページをaria-liveでも通知できる文字列へ整形する。
const pageStatus = computed(() => pageCount.value > 0
  ? `${page.value} / ${pageCount.value}ページ`
  : 'ページ数を取得中')

// 別のPDFへ差し替えられたら、文書の取得状態を初期化する。
watch(() => props.src, resetDocument)

// Studioや親コンポーネントから初期ページが変更された場合にも追従する。
watch(() => props.startPage, (value) => {
  page.value = clampPage(normalizePage(value))
})

// ページ番号または描画幅が変わると、VuePdfEmbedが次ページの取得・Canvas描画を始める。
// ここでは描画開始を表す状態だけを立て、完了はonRendered()で受け取る。
watch([page, renderedWidth], ([newPage, newWidth], [oldPage, oldWidth]) => {
  if (pageCount.value > 0 && (newPage !== oldPage || newWidth !== oldWidth))
    rendering.value = true
})

// ブラウザでのみFullscreen APIの状態監視を開始する。
onMounted(() => {
  isClient.value = true
  document.addEventListener('fullscreenchange', updateFullscreenState)
})

// コンポーネント破棄時にグローバルイベントだけを解除する。
onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', updateFullscreenState)
})

// MDCでは数値Propsが文字列で渡る場合があるため、安全な正整数へ変換する。
function normalizePage(value: number | string): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.max(1, Math.trunc(parsed)) : 1
}

// 先頭より前、または最終ページより後へ移動しないようページ番号を補正する。
function clampPage(value: number): number {
  if (pageCount.value === 0)
    return Math.max(1, value)

  return Math.min(Math.max(1, value), pageCount.value)
}

// PDF URL変更時と初期化時に、文書単位の読み込み状態をリセットする。
function resetDocument() {
  page.value = normalizePage(props.startPage)
  pageCount.value = 0
  loading.value = true
  rendering.value = false
  progress.value = null
  errorMessage.value = isValidSource.value ? '' : 'HTTPS形式のPDF URLを指定してください。'
}

// pageの更新がVuePdfEmbedの:pageへ伝わり、ライブラリ内部の次ページ取得が開始される。
function goToPage(nextPage: number) {
  page.value = clampPage(nextPage)
}

// 25%刻みの変更を受け取り、許可範囲の50〜200%に収める。
function changeZoom(amount: number) {
  zoom.value = Math.min(200, Math.max(50, zoom.value + amount))
}

// PDF文書の取得完了時に総ページ数を保存し、最初のページ描画へ状態を進める。
function onLoaded(document: PdfDocument) {
  pageCount.value = document.numPages
  page.value = clampPage(page.value)
  loading.value = false
  rendering.value = true
  progress.value = 100
}

// PDF文書のネットワーク取得量をパーセントへ変換する。
function onProgress(value: PdfProgress) {
  if (!value.total) {
    progress.value = null
    return
  }

  progress.value = Math.min(100, Math.round(value.loaded / value.total * 100))
}

// 現在ページのCanvas描画完了を受け取り、ローディング表示と高さ予約を更新する。
async function onRendered() {
  await nextTick()

  const canvas = pageSurface.value?.querySelector('canvas')
  const bounds = canvas?.getBoundingClientRect()

  if (bounds && bounds.width > 0 && bounds.height > 0)
    pageAspectRatio.value = bounds.height / bounds.width

  rendering.value = false
}

// PDF文書そのものを取得できなかった場合の状態を確定する。
function onLoadFailed() {
  loading.value = false
  rendering.value = false
  errorMessage.value = 'PDFを読み込めませんでした。URL、CORS、公開設定を確認してください。'
}

// 文書取得後、特定ページのCanvas描画に失敗した場合を処理する。
function onRenderFailed() {
  rendering.value = false
  errorMessage.value = 'このページを描画できませんでした。元のPDFを開いて確認してください。'
}

// vue-pdf-embedが公開するdownload()を使い、取得済み文書を保存する。
async function downloadPdf() {
  if (!pdf.value)
    return

  try {
    await pdf.value.download(resolvedDownloadName.value)
  }
  catch {
    errorMessage.value = 'PDFをダウンロードできませんでした。元のPDFを開いて保存してください。'
  }
}

// figure要素をFullscreen APIへ渡し、全画面表示と解除を切り替える。
async function toggleFullscreen() {
  try {
    if (document.fullscreenElement)
      await document.exitFullscreen()
    else
      await figure.value?.requestFullscreen()
  }
  catch {
    errorMessage.value = 'この環境では全画面表示を開始できませんでした。'
  }
}

// Escキーなど外部操作による全画面解除もUIのアイコンへ反映する。
function updateFullscreenState() {
  isFullscreen.value = document.fullscreenElement === figure.value
}

// figure自身にフォーカスがある場合だけ、ページ移動キーを処理する。
function onKeydown(event: KeyboardEvent) {
  if (event.target !== event.currentTarget)
    return

  const actions: Partial<Record<string, () => void>> = {
    ArrowLeft: () => goToPage(page.value - 1),
    PageUp: () => goToPage(page.value - 1),
    ArrowRight: () => goToPage(page.value + 1),
    PageDown: () => goToPage(page.value + 1),
    Home: () => goToPage(1),
    End: () => goToPage(pageCount.value),
  }
  const action = actions[event.key]

  if (action) {
    event.preventDefault()
    action()
  }
}

// ビューアーへフォーカスを戻し、ローカルなキーボード操作を有効にする。
async function focusViewer() {
  await nextTick()
  figure.value?.focus()
}

// setup時点のPropsを使って初回読み込み状態を作る。
resetDocument()
</script>

<template>
  <figure ref="figure" class="pdf-slides" tabindex="0" role="group" :aria-labelledby="titleId"
    :aria-describedby="statusId" aria-keyshortcuts="ArrowLeft ArrowRight PageUp PageDown Home End" @keydown="onKeydown">
    <header class="pdf-slides__header">
      <p :id="titleId" class="pdf-slides__title">
        {{ title }}
      </p>

      <div class="pdf-slides__toolbar" aria-label="PDFスライドの操作">
        <div class="pdf-slides__controls pdf-slides__controls--pages" role="group" aria-label="ページ移動">
          <button type="button" class="pdf-slides__button" :disabled="!canGoBack" aria-label="前のページ"
            @click="goToPage(page - 1)">
            <Icon name="i-lucide-chevron-left" aria-hidden="true" />
          </button>
          <span class="pdf-slides__page" aria-hidden="true">{{ pageStatus }}</span>
          <button type="button" class="pdf-slides__button" :disabled="!canGoForward" aria-label="次のページ"
            @click="goToPage(page + 1)">
            <Icon name="i-lucide-chevron-right" aria-hidden="true" />
          </button>
        </div>

        <div class="pdf-slides__controls pdf-slides__controls--zoom" role="group" aria-label="表示倍率">
          <button type="button" class="pdf-slides__button" :disabled="zoom <= 50" aria-label="縮小"
            @click="changeZoom(-25)">
            <Icon name="i-lucide-minus" aria-hidden="true" />
          </button>
          <button type="button" class="pdf-slides__zoom" aria-label="表示倍率を100%に戻す" @click="zoom = 100">
            {{ zoom }}%
          </button>
          <button type="button" class="pdf-slides__button" :disabled="zoom >= 200" aria-label="拡大"
            @click="changeZoom(25)">
            <Icon name="i-lucide-plus" aria-hidden="true" />
          </button>
        </div>

        <div class="pdf-slides__controls pdf-slides__controls--file" role="group" aria-label="ファイル操作">
          <button type="button" class="pdf-slides__button" :disabled="loading || pageCount === 0"
            aria-label="PDFをダウンロード" @click="downloadPdf">
            <Icon name="i-lucide-download" aria-hidden="true" />
          </button>
          <NuxtLink class="pdf-slides__button !text-white:link !text-white:visited !text-neutral-900:hover" :href="src"
            target="_blank" rel="noopener noreferrer" aria-label="元のPDFを別タブで開く">
            <Icon name="i-lucide-external-link" aria-hidden="true" />
          </NuxtLink>
          <button type="button" class="pdf-slides__button" :aria-label="isFullscreen ? '全画面表示を終了' : '全画面で表示'"
            @click="toggleFullscreen">
            <Icon :name="isFullscreen ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2'" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>

    <div ref="viewport" class="pdf-slides__viewport" @dblclick="focusViewer">
      <ClientOnly>
        <div v-if="isValidSource" class="pdf-slides__page-stage" :style="{
          minHeight: reservedPageHeight ? `${reservedPageHeight}px` : undefined,
        }">
          <div ref="pageSurface" class="pdf-slides__page-surface"
            :style="{ width: renderedWidth ? `${renderedWidth}px` : '100%' }">
            <!-- :pageの変更を検知したVuePdfEmbedが、PDF.js経由で対象ページを取得・描画する。 -->
            <VuePdfEmbed ref="pdf" class="pdf-slides__document" :source="src" :page="page" :width="renderedWidth"
              annotation-layer text-layer @loaded="onLoaded" @progress="onProgress" @rendered="onRendered"
              @loading-failed="onLoadFailed" @rendering-failed="onRenderFailed" @internal-link-clicked="goToPage" />
          </div>
        </div>

        <template #fallback>
          <p class="pdf-slides__message">
            PDFビューアーを準備しています。
            <a :href="src" target="_blank" rel="noopener noreferrer">元のPDFを開く</a>
          </p>
        </template>
      </ClientOnly>

      <!-- 文書の取得中と、ページ単位のCanvas描画中を別の状態として表示する。 -->
      <p v-if="isClient && loading && !errorMessage" class="pdf-slides__status">
        {{ loadingLabel }}
      </p>
      <p v-else-if="isClient && rendering && !errorMessage" class="pdf-slides__status">
        {{ page }}ページを描画中...
      </p>
      <p v-if="errorMessage" class="pdf-slides__message pdf-slides__message--error" role="alert">
        {{ errorMessage }}
        <a :href="src" target="_blank" rel="noopener noreferrer">元のPDFを開く</a>
      </p>
    </div>

    <p :id="statusId" class="sr-only" aria-live="polite">
      {{ pageStatus }}、表示倍率{{ zoom }}%
    </p>

    <figcaption v-if="$slots.default" class="pdf-slides__caption">
      <slot />
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.pdf-slides {
  @apply w-full max-w-full m-auto my-8 overflow-hidden border-2 border-neutral-900 border-solid border-rounded-sm bg-neutral-100 text-neutral-900;

  min-width: 0;

  &:focus-visible {
    outline-offset: 4px;
  }

  &:fullscreen {
    @apply flex flex-col w-full h-full m-0 border-0 bg-neutral-900;

    .pdf-slides__viewport {
      @apply flex-1;

      min-height: 0;
    }
  }

  &__header {
    @apply flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-b-gray bg-green-100 text-neutral-800;
  }

  &__title {
    @apply min-w-0 m-0 p-0 border-0 text-base font-bold leading-snug;

    overflow-wrap: anywhere;

    &::before,
    &::after {
      display: none;
    }
  }

  &__toolbar,
  &__controls {
    @apply flex flex-wrap items-center gap-1;
  }

  &__toolbar {
    @apply gap-3;

    min-width: 0;
    font-family: var(--font-sans);
  }

  &__controls {
    min-width: 0;
  }

  &__button,
  &__zoom {
    @apply inline-flex h-9 min-w-9 items-center border-green-100/70 border-1 border-solid justify-center bg-secondary text-white no-underline;

    flex: none;
    appearance: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    transition: background-color 150ms ease, border-color 150ms ease;

    &:hover:not(:disabled) {
      @apply text-gray-800 bg-neutral-100;
    }

    &:disabled {
      @apply opacity-40;
      cursor: not-allowed;
    }

    &:visited {
      @apply text-neutral-800;
    }
  }

  &__button {
    @apply px-2;
  }

  &__zoom {
    @apply min-w-14 px-2 text-sm;
  }

  &__page {
    @apply min-w-22 px-2 text-center text-sm tabular-nums;
  }

  &__viewport {
    @apply relative w-full min-h-64 overflow-auto bg-neutral-700;

    max-width: 100%;
    overscroll-behavior: contain;
    touch-action: pan-x pan-y;
    -webkit-overflow-scrolling: touch;
  }

  &__page-stage {
    @apply relative w-full min-w-full;
  }

  &__page-surface {
    @apply relative mx-auto;
  }

  &__document {
    @apply block w-full bg-white shadow-lg;
  }

  &__status,
  &__message {
    @apply absolute inset-x-4 top-4 z-10 m-0 px-4 py-3 text-center text-sm bg-white shadow-main;
    font-family: var(--font-sans);
  }

  &__message {
    @apply text-neutral-800;

    &--error {
      @apply border border-red-300 bg-red-50 text-red-900;
    }

    a {
      @apply ms-2 text-linkPrimary underline;
    }
  }

  &__caption {
    @apply px-4 py-3 border-t-2 border-0 border-neutral-900 border-solid bg-white text-sm text-neutral-700;

    :deep(p:first-child) {
      margin-block-start: 0;
    }

    :deep(p:last-child) {
      margin-block-end: 0;
    }
  }

  @media (max-width: 768px) {
    &__header {
      @apply flex-col items-stretch gap-2 px-3;
    }

    &__toolbar {
      @apply grid w-full gap-2;

      grid-template-columns: minmax(0, 1fr) auto auto;
    }

    &__controls--pages {
      @apply justify-start;
    }

    &__controls--zoom,
    &__controls--file {
      @apply justify-end;
    }
  }

  @media (max-width: 640px) {
    &__toolbar {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__controls--pages {
      @apply justify-center;

      grid-column: 1 / -1;
    }

    &__controls--zoom {
      @apply justify-start;
    }

    &__controls--file {
      @apply justify-end;
    }

    &__button,
    &__zoom {
      min-height: 2.75rem;
      min-width: 2.75rem;
    }

    &__page {
      @apply min-w-18 px-1;
    }

    &__viewport {
      @apply min-h-40;
    }

    &__status,
    &__message {
      @apply inset-x-2 top-2 px-3 py-2;
    }

    &__caption {
      @apply px-3 py-2;
    }
  }

  @media (max-width: 390px) {
    &__toolbar {
      grid-template-columns: minmax(0, 1fr);
    }

    &__controls--pages,
    &__controls--zoom,
    &__controls--file {
      @apply justify-center;

      grid-column: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {

    &__button,
    &__zoom {
      transition: none;
    }
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

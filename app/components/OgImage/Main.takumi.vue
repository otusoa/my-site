<script setup>
defineProps({
  title: { type: String, default: '小林栄太のポートフォリオ' },
  description: { type: String, default: '研究とWebエンジニアリングについて紹介するポートフォリオサイトです。' },
  path: { type: String, default: '/' },
})

const url = useRequestURL()
</script>

<template>
  <div class="og-image" lang="ja">
    <div class="og-image__grid" aria-hidden="true">
    </div>

    <header class="og-image__header">
      <div class="og-image__identity mb-6">
        <img src="/eita.svg" alt="小林栄太のポートフォリオサイト" width="64" height="64" />
        <div>
          小林栄太のポートフォリオサイト
        </div>
      </div>
      <span class="og-image__path"> {{ url.origin }}{{ path }} </span>
    </header>

    <main class="og-image__content">
      <p class="og-image__label">エンジニアリング / 研究</p>
      <h1 class="og-image__title">{{ title }}</h1>
      <p class="og-image__description">{{ description }}</p>
    </main>

    <footer class="og-image__footer">
      <span class="og-image__handle">eita.vue</span>
    </footer>
  </div>
</template>

<style scoped>
.og-image {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 630px;
  padding: 54px 68px 50px;
  overflow: hidden;
  color: #20231f;
  background: #f8faf7;
  font-family: "BIZ UDPMincho", serif;
}

.og-image__grid {
  position: absolute;
  inset: 0;
  display: flex;
  pointer-events: none;
}

.og-image__line {
  position: absolute;
  display: flex;
  background: rgb(32 35 31 / 10%);
}

.og-image__line--vertical-1 {
  inset-block: 0;
  inset-inline-start: 68px;
  width: 1px;
}

.og-image__line--vertical-2 {
  inset-block: 0;
  inset-inline-end: 68px;
  width: 1px;
}

.og-image__line--horizontal-1 {
  inset-block-start: 104px;
  inset-inline: 0;
  height: 1px;
}

.og-image__line--horizontal-2 {
  inset-block-end: 98px;
  inset-inline: 0;
  height: 1px;
}

.og-image__header,
.og-image__footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "BIZ UDPMincho", sans-serif;
}

.og-image__header {
  min-height: 50px;
  color: #4f554d;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.og-image__identity {
  display: flex;
  align-items: center;
  gap: 15px;
}

.og-image__mark {
  display: flex;
  width: 13px;
  height: 13px;
  background: #87cc5c;
  transform: rotate(45deg);
}

.og-image__path {
  max-width: 360px;
  overflow: hidden;
  color: #737a70;
  font-family: monospace;
  font-size: 18px;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.og-image__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-block: 28px 24px;
}

.og-image__label {
  margin: 0 0 18px;
  color: #3f7621;
  font-family: "BIZ UDPMincho", sans-serif;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.og-image__title {
  display: block;
  max-width: 1000px;
  margin: 0;
  overflow: hidden;
  font-size: 60px;
  font-weight: 700;
  letter-spacing: 0.015em;
  line-clamp: 3;
  line-height: 1.28;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
}

.og-image__description {
  display: block;
  max-width: 940px;
  margin: 22px 0 0;
  overflow: hidden;
  color: #61675f;
  font-size: 25px;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-clamp: 2;
  line-height: 1.6;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
}

.og-image__footer {
  min-height: 48px;
  padding-block-start: 12px;
  color: #343833;
  font-size: 20px;
}

.og-image__handle {
  font-weight: 700;
  letter-spacing: 0.04em;
}

.og-image__rule {
  display: flex;
  flex: 1;
  height: 2px;
  margin-inline: 24px;
  background: #87cc5c;
}

.og-image__domain {
  color: #737a70;
  font-family: monospace;
  font-size: 18px;
}
</style>

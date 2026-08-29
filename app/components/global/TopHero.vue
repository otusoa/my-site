<template>
  <section class="top-hero">
    <div class="hero-background" aria-hidden="true">
      <div class="slant-shape" />
    </div>

    <div class="hero-content">
      <h1>小林栄太(eita.vue)</h1>
      <p>研究とWeb開発をしています。</p>
      <h2>エンジニアリング・研究</h2>
      <ul class="text-xl">
        <li>Web開発 / UI設計</li>
        <li>神道学(教派神道)・教義研究</li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.top-hero {
  position: relative;

  display: grid;
  width: 100%;
  min-height: clamp(28rem, 70svh, 46rem);
  padding: 4rem 1.5rem;
  place-items: center;

  overflow: hidden;
  isolation: isolate;
  @apply text-neutral-100;

  justify-items: start;
  align-items: start;
}

.hero-background {
  position: absolute;
  z-index: -1;
  inset: -8px;

  overflow: hidden;
  filter: saturate(0.4);
  @apply bg-secondary;
}

.slant-shape {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 50%;

  width: 80vw;
  height: 100%;

  background: var(--color-primary);
  clip-path: polygon(0 0, 100% 0, 0 100%);
  transform: translateX(-50%);
}

.hero-content {
  @apply m-auto text-white text-align-start p-8 bg-neutral-900/30 rounded-lg;
  line-height: 1.35;
  text-wrap: balance;
  position: relative;
  paint-order: stroke;

  h1 {
    @apply mb-4 text-5xl font-bold line-height-none;
  }

  h2 {
    @apply mt-6 mb-2 text-3xl font-bold line-height-none;
  }

  p {
    @apply text-xl;
    margin: 0;
  }
}
</style>

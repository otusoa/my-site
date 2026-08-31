<template>
  <section class="top-hero">
    <div class="hero-background" aria-hidden="true">
      <NuxtImg class="hero-image" src="/IMG_3416.JPG" alt="" format="webp" quality="82" />
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

<style lang="scss">
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
  inset: 0;
  filter: blur(5px);

  overflow: hidden;

  &::after {
    position: absolute;
    inset: 0;

    content: '';
  }
}

.hero-image {
  width: 100%;
  height: 100%;
  @apply my-0 mx-0;
  object-fit: cover;
  object-position: center 45%;
  transform: scale(1.01);
}

.hero-content {
  @apply m-auto text-white text-align-start py-8 px-12 max-md:px-6 shadow-main bg-neutral-900/30 rounded-lg;
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

<template>
  <section class="section features">
    <div class="container">
      <p class="eyebrow">{{ lang.eyebrow }}</p>
      <h2 class="section-title">
        {{ lang.titleLine1 }}
        <span class="gradient-text">{{ lang.titleLine2 }}</span>
      </h2>
      <p class="section-lead">{{ lang.lead }}</p>

      <div class="features-grid">
        <article
          v-for="(feature, index) in features"
          :key="index"
          class="card feature"
        >
          <div class="feature-icon" v-html="feature.icon"></div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-body">{{ feature.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import langSetup from "@/lang/setup";

const icons = {
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  ts: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>`,
  shake: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7-7-7"/><path d="M5 19V5"/></svg>`,
  chain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"/><path d="m17 6 6 6-6 6"/><path d="m7 18-6-6 6-6"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.91 11.12a8 8 0 1 1-9.83-7.74"/><path d="M14 3.27a8 8 0 0 1 5.73 5.73"/><path d="m9 12 2 2 4-4"/></svg>`,
};

export default {
  name: "Features",
  data() {
    const lang = langSetup("home", "features");
    return {
      lang,
      features: [
        { icon: icons.shield, title: lang.cards[0].title, body: lang.cards[0].body },
        { icon: icons.ts,     title: lang.cards[1].title, body: lang.cards[1].body },
        { icon: icons.shake,  title: lang.cards[2].title, body: lang.cards[2].body },
        { icon: icons.chain,  title: lang.cards[3].title, body: lang.cards[3].body },
        { icon: icons.globe,  title: lang.cards[4].title, body: lang.cards[4].body },
        { icon: icons.check,  title: lang.cards[5].title, body: lang.cards[5].body },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;

  &-icon {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: var(--g-hero-soft);
    color: #fff;
    border: 1px solid var(--border);

    :deep(svg) {
      width: 22px;
      height: 22px;
    }
  }

  &-title {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.01em;
  }

  &-body {
    margin: 0;
    color: var(--text-soft);
    font-size: 14.5px;
    line-height: 1.6;
  }
}
</style>

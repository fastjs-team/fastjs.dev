<template>
  <section class="section sponsor-cta">
    <div class="container sponsor-cta-inner">
      <p class="eyebrow">{{ lang.eyebrow }}</p>
      <h2 class="section-title">
        {{ lang.titleLine1 }}
        <span class="gradient-text">{{ lang.titleLine2 }}</span>
      </h2>
      <p class="section-lead">{{ lang.lead }}</p>

      <div class="sponsor-poster">
        <img
          src="https://raw.githubusercontent.com/xiaodong2008/sponsors/main/sponsors.wide.svg"
          alt="Fastjs sponsors"
        />
      </div>

      <div class="sponsor-actions">
        <a
          class="btn btn--primary"
          href="https://github.com/sponsors/xiaodong2008"
          target="_blank"
          rel="noopener"
        >
          {{ lang.cta1 }}
        </a>
        <router-link class="btn btn--outline" to="/sponsor">
          {{ lang.cta2 }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import langSetup from "@/lang/setup";

export default {
  name: "thanks",
  data() {
    return {
      lang: langSetup("home", "thanks"),
    };
  },
};
</script>

<style lang="less" scoped>
.sponsor-cta-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-lead {
  margin-bottom: 36px;
}

.sponsor-poster {
  width: 100%;
  max-width: 760px;
  padding: 28px;
  border-radius: var(--r-lg);
  background: var(--bg-elev-1);
  border: 1px solid var(--border);

  img {
    width: 100%;
    height: auto;
    filter: invert(100%) brightness(0.92);
    opacity: 0.9;
  }
}

.sponsor-actions {
  display: flex;
  gap: 14px;
  margin-top: 32px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

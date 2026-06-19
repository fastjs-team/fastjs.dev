<template>
  <section class="section sponsor">
    <div class="container sponsor-inner">
      <p class="eyebrow">{{ lang.eyebrow }}</p>
      <h1 class="section-title sponsor-title">
        {{ lang.titleLine1 }}
        <span class="gradient-text">{{ lang.titleLine2 }}</span>
      </h1>
      <p class="section-lead sponsor-lead">{{ lang.lead }}</p>

      <div class="sponsor-tabs" role="tablist">
        <button
          v-for="method in methods"
          :key="method.key"
          role="tab"
          :aria-selected="active === method.key"
          :class="['sponsor-tab', { 'is-active': active === method.key }]"
          @click="select(method.key)"
        >
          {{ method.name }}
        </button>
      </div>

      <div class="sponsor-card">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </section>
</template>

<script>
import langSetup from "@/lang/setup";

export default {
  name: "sponsor-index",
  data() {
    const config = langSetup("config");
    const methods = config.sponsor;
    const fromUrl = this.$route.href.split("/sponsor/")[1] || "";

    return {
      lang: langSetup("sponsor", "index"),
      methods,
      active: methods.find((m) => m.key === fromUrl)?.key || methods[0].key,
    };
  },
  watch: {
    $route(to) {
      const fromUrl = to.href.split("/sponsor/")[1] || "";
      const found = this.methods.find((m) => m.key === fromUrl);
      if (found) this.active = found.key;
    },
  },
  methods: {
    select(key) {
      this.active = key;
      this.$router.push({ path: "/sponsor/" + key });
    },
  },
};
</script>

<style lang="less" scoped>
.sponsor {
  padding-block: clamp(96px, 14vh, 160px);
}

.sponsor-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sponsor-title {
  font-size: clamp(36px, 6vw, 60px);
  line-height: 1.1;
  letter-spacing: -0.025em;
  font-weight: 800;
  max-width: 18ch;
  margin-bottom: 18px;
}

.sponsor-lead {
  max-width: 56ch;
  margin-bottom: 44px;
}

.sponsor-tabs {
  display: inline-flex;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px;
  gap: 4px;
  margin-bottom: 32px;
}

.sponsor-tab {
  border: 0;
  background: transparent;
  color: var(--text-soft);
  height: 36px;
  padding-inline: 18px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  border-radius: 999px;
  cursor: pointer;
  transition:
    color 180ms var(--ease-out),
    background 180ms var(--ease-out);

  &:hover {
    color: #fff;
  }

  &.is-active {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  }
}

.sponsor-card {
  width: min(100%, 520px);
  padding: 32px;
  border-radius: var(--r-lg);
  background: var(--bg-elev-1);
  border: 1px solid var(--border);
  text-align: left;
  transition: border-color 220ms var(--ease-out), background 220ms var(--ease-out);

  &:hover {
    border-color: var(--border-strong);
  }
}
</style>

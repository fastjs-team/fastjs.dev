<template>
  <section class="section modules">
    <div class="container">
      <p class="eyebrow">{{ lang.eyebrow }}</p>
      <h2 class="section-title">
        {{ lang.titleLine1 }}
        <span class="gradient-text">{{ lang.titleLine2 }}</span>
      </h2>
      <p class="section-lead">{{ lang.lead }}</p>

      <div class="modules-grid">
        <a
          v-for="(module, index) in modules"
          :key="module.key"
          :href="module.docs"
          target="_blank"
          rel="noopener"
          class="card module-card"
          :data-module="module.key"
        >
          <div class="module-head">
            <span class="module-name">{{ module.name }}</span>
            <span class="module-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </span>
          </div>
          <h3 class="module-tagline">{{ lang.cards[index].tagline }}</h3>
          <p class="module-body">{{ lang.cards[index].body }}</p>
          <ul class="module-api">
            <li v-for="line in module.api" :key="line">
              <code>{{ line }}</code>
            </li>
          </ul>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import langSetup from "@/lang/setup";

export default {
  name: "Modules",
  data() {
    return {
      lang: langSetup("home", "modules"),
      modules: [
        {
          key: "dom",
          name: "dom",
          docs: "https://docs.fastjs.dev/guide/dom/",
          api: ["dom.select", "dom.newEl", "FastjsDom", "FastjsDomList"],
        },
        {
          key: "date",
          name: "date",
          docs: "https://docs.fastjs.dev/guide/date/",
          api: ["date.now", "date.parse", "date.string", "date.create"],
        },
        {
          key: "request",
          name: "request",
          docs: "https://docs.fastjs.dev/guide/request/",
          api: ["request.get", "request.post", "request.create", "request.config"],
        },
        {
          key: "cookie",
          name: "cookie",
          docs: "https://docs.fastjs.dev/guide/cookie/",
          api: ["cookie.get", "cookie.set", "cookie.exists", "cookie.create"],
        },
        {
          key: "utils",
          name: "utils",
          docs: "https://docs.fastjs.dev/guide/utils/",
          api: ["rand", "uuid", "copy", "secureCall", "catchError"],
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.module-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: inherit;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(226, 63, 118, 0.10), rgba(147, 116, 252, 0.10));
    opacity: 0;
    transition: opacity 320ms var(--ease-out);
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  &[data-module="dom"]     { --accent: #e23f76; }
  &[data-module="date"]    { --accent: #f8c646; }
  &[data-module="request"] { --accent: #06aef9; }
  &[data-module="cookie"]  { --accent: #f1696e; }
  &[data-module="utils"]   { --accent: #9374fc; }
}

.module-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.module-name {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent);
  color: color-mix(in srgb, var(--accent) 92%, #fff 8%);
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 13px;
}

.module-arrow {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  color: var(--text-mute);
  border-radius: 8px;
  transition:
    transform 220ms var(--ease-out),
    color 220ms var(--ease-out),
    background 220ms var(--ease-out);
}

.module-card:hover .module-arrow {
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
  transform: translate(2px, -2px);
}

.module-tagline {
  font-size: 17px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.01em;
}

.module-body {
  margin: 0;
  color: var(--text-soft);
  font-size: 14px;
  line-height: 1.6;
}

.module-api {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  code {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-mute);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    padding: 3px 8px;
    border-radius: 6px;
    transition:
      color 200ms var(--ease-out),
      background 200ms var(--ease-out);
  }
}

.module-card:hover .module-api code {
  color: var(--text);
  background: rgba(255, 255, 255, 0.08);
}
</style>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <router-link to="/" class="brand" aria-label="Fastjs home">
          <img src="/icon.svg" alt="Fastjs logo" width="26" height="26" />
          <span class="brand-name">Fastjs</span>
        </router-link>
        <p class="footer-tag">{{ lang.tag }}</p>
      </div>

      <div class="footer-columns">
        <div
          v-for="column in lang.columns"
          :key="column.title"
          class="footer-col"
        >
          <h4>{{ column.title }}</h4>
          <ul>
            <li v-for="link in column.links" :key="link.text">
              <component
                :is="link.internal ? 'router-link' : 'a'"
                :to="link.internal ? link.href : undefined"
                :href="link.internal ? undefined : link.href"
                :target="link.internal ? undefined : '_blank'"
                :rel="link.internal ? undefined : 'noopener noreferrer'"
              >
                {{ link.text }}
              </component>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-meta">
      <div class="container footer-meta-inner">
        <span>© {{ year }} Fastjs Team · Released under MIT.</span>
        <span>
          {{ lang.builtBy }}
          <a href="https://github.com/xiaodong2008" target="_blank" rel="noopener">xiaodong2008</a>.
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
import langSetup from "@/lang/setup";

export default {
  name: "bottom",
  data() {
    return {
      lang: langSetup("home", "bottom"),
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="less" scoped>
.site-footer {
  margin-top: clamp(48px, 8vh, 96px);
  border-top: 1px solid var(--border);
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%);
  padding-top: 64px;
}

.footer-inner {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 2.2fr;
  gap: 48px;
  align-items: start;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

.footer-brand {
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.01em;
  }

  .footer-tag {
    margin: 16px 0 0;
    color: var(--text-soft);
    font-size: 13.5px;
    line-height: 1.6;
    max-width: 36ch;
  }
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 32px;
}

.footer-col {
  h4 {
    margin: 0 0 14px;
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  a {
    color: var(--text-soft);
    font-size: 14px;
    transition: color 160ms var(--ease-out);

    &:hover {
      color: #fff;
    }
  }
}

.footer-meta {
  margin-top: 64px;
  border-top: 1px solid var(--border);
  padding: 22px 0;
  color: var(--text-mute);
  font-size: 12.5px;

  &-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  a {
    color: var(--text);

    &:hover {
      color: #fff;
    }
  }
}
</style>

<template>
  <header :class="['topbar', { 'is-scrolled': scrolled, 'is-open': mobileOpen }]">
    <div class="topbar-inner">
      <router-link to="/" class="brand" aria-label="Fastjs home">
        <img src="/icon.svg" alt="Fastjs logo" width="28" height="28" />
        <span class="brand-name">Fastjs</span>
      </router-link>

      <nav class="topbar-nav topbar-nav--left" aria-label="Primary">
        <topbar-item
          v-for="item in localizedList.left"
          :key="item.name"
          :item="item"
        />
      </nav>

      <nav class="topbar-nav topbar-nav--right" aria-label="External">
        <topbar-item
          v-for="item in localizedList.right"
          :key="item.name"
          :item="item"
        />
        <a
          href="https://github.com/fastjs-team/core/"
          target="_blank"
          rel="noopener"
          class="icon-link"
          aria-label="GitHub repository"
        >
          <github-outlined />
        </a>
      </nav>

      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="mobileOpen"
        aria-label="Toggle navigation"
        @click="mobileOpen = !mobileOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="topbar-glow" aria-hidden="true"></div>
  </header>
</template>

<script>
import topbar from "./topbar.js";
import TopbarItem from "./topbarItem.vue";
import { GithubOutlined } from "@ant-design/icons-vue";
import langSetup from "@/lang/setup";

export default {
  name: "topbar",
  components: {
    GithubOutlined,
    TopbarItem,
  },
  data() {
    return {
      list: {
        left: topbar.left,
        right: topbar.right,
      },
      scrolled: false,
      mobileOpen: false,
    };
  },
  computed: {
    localizedList() {
      const lang = langSetup("topbar");
      const localized = { left: [], right: [] };
      for (const side of ["left", "right"]) {
        this.list[side].forEach((item) => {
          localized[side].push({ ...item, name: lang[item.name] || item.name });
        });
      }
      return localized;
    },
  },
  methods: {
    onScroll() {
      this.scrolled = window.scrollY > 6;
    },
    closeMobile() {
      this.mobileOpen = false;
    },
  },
  mounted() {
    this.onScroll();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.$watch("$route", this.closeMobile);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style lang="less" scoped>
.topbar {
  --bar-height: 64px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background: color-mix(in srgb, var(--bg) 70%, transparent);
  -webkit-backdrop-filter: saturate(180%) blur(18px);
  backdrop-filter: saturate(180%) blur(18px);
  transition:
    background 220ms var(--ease-out),
    border-color 220ms var(--ease-out),
    box-shadow 220ms var(--ease-out);

  &.is-scrolled {
    background: color-mix(in srgb, var(--bg) 90%, transparent);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
  }
}

.topbar-inner {
  height: var(--bar-height);
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding-inline: var(--gutter);
  display: flex;
  align-items: center;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.01em;

  img {
    width: 28px;
    height: 28px;
  }
}

.topbar-nav {
  display: flex;
  align-items: center;
  gap: 4px;

  &--left {
    margin-left: 12px;
  }

  &--right {
    margin-left: auto;
  }
}

.icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--text-soft);
  transition:
    color 160ms var(--ease-out),
    background 160ms var(--ease-out);

  :deep(.anticon) {
    font-size: 18px;
  }

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }
}

.nav-toggle {
  display: none;
  margin-left: auto;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--text);

  span {
    display: block;
    width: 18px;
    height: 1.5px;
    background: currentColor;
    border-radius: 2px;
    transition:
      transform 200ms var(--ease-out),
      opacity 160ms var(--ease-out);
  }
}

.topbar-glow {
  pointer-events: none;
  position: absolute;
  inset: 0 0 -1px 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.18) 50%,
    transparent
  );
  opacity: 0;
  transition: opacity 260ms var(--ease-out);
}

.topbar.is-scrolled .topbar-glow {
  opacity: 1;
}

@media (max-width: 760px) {
  .topbar-nav--left {
    display: none;
    position: absolute;
    top: var(--bar-height);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
    padding: 16px var(--gutter) 22px;
    background: color-mix(in srgb, var(--bg) 96%, transparent);
    border-bottom: 1px solid var(--border);
    margin-left: 0;
  }

  .nav-toggle {
    display: flex;
  }

  .topbar.is-open {
    .topbar-nav--left {
      display: flex;
    }
    .nav-toggle span:nth-child(1) {
      transform: translateY(5.5px) rotate(45deg);
    }
    .nav-toggle span:nth-child(2) {
      opacity: 0;
    }
    .nav-toggle span:nth-child(3) {
      transform: translateY(-5.5px) rotate(-45deg);
    }
  }
}
</style>

<style lang="less">
/* fallback styles for ant menu when used by language dropdown */
.ant-dropdown-menu {
  background: var(--bg-elev-2) !important;
  border: 1px solid var(--border) !important;
  border-radius: 12px !important;
  box-shadow: var(--shadow-1) !important;

  > li span {
    color: var(--text) !important;
  }
}
</style>

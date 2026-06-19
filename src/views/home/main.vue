<template>
  <section class="hero">
    <div class="container hero-inner">
      <p class="hero-badge">
        <span class="hero-pill">v1.0.0-beta.9</span>
        <span>A modern JavaScript toolkit</span>
      </p>

      <h1 class="hero-title">
        <span>{{ lang.titleLine1 }}</span>
        <span class="gradient-text">{{ lang.titleLine2 }}</span>
      </h1>

      <p class="hero-lead">{{ lang.lead }}</p>

      <div class="hero-cta">
        <a class="btn btn--primary" href="https://docs.fastjs.dev" target="_blank" rel="noopener">
          {{ lang.cta1 }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
        <a class="btn btn--outline" href="https://github.com/fastjs-team/core" target="_blank" rel="noopener">
          {{ lang.cta2 }}
        </a>
      </div>

      <div class="hero-install">
        <button class="install-cmd" type="button" aria-label="Copy install command" @click="onCopy">
          <span class="install-prompt">$</span>
          <span class="install-text">
            <span class="install-npm">npm</span>
            <span class="install-pkg">&nbsp;i jsfast</span>
          </span>
          <span class="install-copy" aria-hidden="true">
            <copy-outlined v-if="!copied" />
            <check-outlined v-else />
          </span>
        </button>
        <!-- <span class="install-tag">{{ lang.installTag }}</span> -->
      </div>
    </div>
  </section>
</template>

<script>
import langSetup from "@/lang/setup";
import { copy } from "jsfast";
import { message } from "ant-design-vue";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons-vue";

const INSTALL_CMD = "npm i jsfast";

export default {
  name: "Hero",
  components: { CopyOutlined, CheckOutlined },
  data() {
    return {
      lang: langSetup("home", "main"),
      copied: false,
    };
  },
  methods: {
    async onCopy() {
      await copy(INSTALL_CMD);
      this.copied = true;
      message.success(this.lang.installCopied);
      setTimeout(() => (this.copied = false), 1400);
    },
  },
};
</script>

<style lang="less" scoped>
.hero {
  padding-block: clamp(96px, 16vh, 180px) clamp(72px, 12vh, 128px);
  text-align: center;
  position: relative;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text-soft);
  font-size: 13px;
  margin: 0 0 26px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.hero-pill {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.hero-title {
  font-size: clamp(40px, 7.4vw, 88px);
  line-height: 1.04;
  letter-spacing: -0.035em;
  font-weight: 800;
  margin: 0;
  max-width: 18ch;

  >span {
    display: block;
  }
}

.hero-lead {
  margin: 24px auto 0;
  max-width: 58ch;
  color: var(--text-soft);
  font-size: clamp(15px, 1.5vw, 18px);
  line-height: 1.65;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 38px;
}

.hero-install {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 44px;
}

.install-cmd {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 14px;
  border-radius: 12px;
  transition:
    background 200ms var(--ease-out),
    border-color 200ms var(--ease-out),
    transform 180ms var(--ease-out);

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: var(--border-strong);
  }

  &:active {
    transform: translateY(1px);
  }

  .install-prompt {
    color: var(--text-mute);
  }

  .install-npm {
    color: #f1696e;
  }

  .install-pkg {
    color: var(--text);
  }

  .install-copy {
    display: inline-flex;
    color: var(--text-mute);
    padding-left: 8px;
    border-left: 1px solid var(--border);
  }

  &:hover .install-copy {
    color: #fff;
  }
}

.install-tag {
  font-size: 12px;
  color: var(--text-mute);
  letter-spacing: 0.04em;
}
</style>

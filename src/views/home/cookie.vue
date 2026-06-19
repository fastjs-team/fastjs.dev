<template>
  <section class="section demo demo--cookie">
    <div class="container demo-grid">
      <div class="demo-copy">
        <p class="eyebrow"><span class="chip chip--pink">cookie</span></p>
        <h2 class="section-title">{{ lang.title }}</h2>
        <p class="demo-lead">{{ lang.body }}</p>
        <ul class="demo-bullets">
          <li v-for="bullet in lang.bullets" :key="bullet">
            <span class="bullet" aria-hidden="true"></span>
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </div>

      <div class="demo-stage">
        <CodeBlock :filename="'cookie.ts'">{{ snippet }}</CodeBlock>
        <div class="demo-play">
          <div class="demo-play-title">{{ lang.previewLabel }}</div>
          <div class="cookie-row">
            <label for="cookie-input" class="cookie-label">demo-cookie</label>
            <div class="cookie-controls">
              <input
                id="cookie-input"
                v-model="value"
                type="text"
                class="cookie-input"
                :placeholder="lang.inputPlaceholder"
                @keydown.enter="save"
              />
              <button class="btn btn--primary btn--small" @click="save">
                {{ lang.btn }}
              </button>
            </div>
          </div>
          <div class="cookie-status">
            {{ lang.currentLabel }}
            <code v-if="stored">{{ stored }}</code>
            <span v-else class="cookie-empty">{{ lang.empty }}</span>
            <button
              v-if="stored"
              class="cookie-clear"
              type="button"
              @click="clear"
            >
              {{ lang.clearBtn }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CodeBlock from "@/components/code.vue";
import langSetup from "@/lang/setup";
import { cookie } from "jsfast";
import { message } from "ant-design-vue";

const KEY = "fastjs-demo-cookie";

export default {
  name: "CookieDemo",
  components: { CodeBlock },
  data() {
    return {
      lang: langSetup("home", "cookie"),
      value: "",
      stored: cookie.get(KEY) || "",
      snippet: `import { cookie } from "jsfast";

cookie.set("session", "abc", {
  maxAge: 3600,
  sameSite: "Lax",
  secure: true,
});

cookie.get("session");      // "abc"
cookie.exists("session");   // true
cookie.remove("session");   // gone

// Scoped instance — reuse path/domain across calls
const apiCookie = cookie.create("/api", ".example.com");
apiCookie.set("token", "...");`,
    };
  },
  methods: {
    save() {
      if (!this.value) return;
      cookie.set(KEY, this.value, { maxAge: 60 * 60 });
      this.stored = this.value;
      message.success(this.lang.saved);
    },
    clear() {
      cookie.remove(KEY);
      this.stored = "";
      message.info(this.lang.cleared);
    },
  },
};
</script>

<style lang="less" scoped>
.demo {
  &-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    gap: clamp(28px, 4vw, 64px);
    align-items: center;

    @media (max-width: 920px) {
      grid-template-columns: 1fr;
    }
  }

  &-copy {
    display: flex;
    flex-direction: column;
  }

  &-lead {
    color: var(--text-soft);
    font-size: clamp(15px, 1.5vw, 17px);
    line-height: 1.65;
    margin: 0 0 28px;
    max-width: 52ch;
  }

  &-bullets {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 14px;

    li {
      display: flex;
      gap: 12px;
      color: var(--text-soft);
      font-size: 14.5px;
    }
  }

  &-stage {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &-play {
    padding: 18px 20px;
    border-radius: var(--r-md);
    border: 1px solid var(--border);
    background: var(--bg-elev-1);
    display: grid;
    gap: 14px;
  }

  &-play-title {
    font-size: 12px;
    color: var(--text-mute);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
}

.cookie-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cookie-label {
  font-size: 12.5px;
  color: var(--text-mute);
  font-family: var(--font-mono);
}

.cookie-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.cookie-input {
  flex: 1 1 200px;
  height: 38px;
  padding-inline: 12px;
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 160ms var(--ease-out), background 160ms var(--ease-out);

  &::placeholder {
    color: var(--text-mute);
  }

  &:focus {
    border-color: var(--c-pink);
    background: #0c0c10;
  }
}

.cookie-status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-soft);

  code {
    font-family: var(--font-mono);
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 12.5px;
  }
}

.cookie-empty {
  color: var(--text-mute);
  font-style: italic;
}

.cookie-clear {
  margin-left: auto;
  background: transparent;
  border: 0;
  color: var(--c-coral);
  font: inherit;
  font-size: 12.5px;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color 160ms var(--ease-out);

  &:hover {
    text-decoration-color: var(--c-coral);
  }
}

.bullet {
  margin-top: 8px;
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--g-hero);
  box-shadow: 0 0 12px rgba(226, 63, 118, 0.5);
}

.chip {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--chip, #fff) 18%, transparent);
  border: 1px solid color-mix(in srgb, var(--chip, #fff) 38%, transparent);
  color: color-mix(in srgb, var(--chip, #fff) 92%, #fff 8%);

  &--pink { --chip: #e23f76; }
}
</style>

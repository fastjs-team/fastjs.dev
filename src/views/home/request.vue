<template>
  <section class="section demo demo--request">
    <div class="container demo-grid demo-grid--reverse">
      <div class="demo-stage">
        <CodeBlock :filename="'request.ts'">{{ snippet }}</CodeBlock>
        <div class="demo-play">
          <div class="demo-play-title">{{ lang.previewLabel }}</div>
          <div class="demo-output" :class="{ 'is-loading': loading }">
            <span v-if="loading">Loading…</span>
            <span v-else-if="!fact" class="demo-output-placeholder">{{ lang.outputPlaceholder }}</span>
            <span v-else>"{{ fact }}"</span>
          </div>
          <div class="demo-play-actions">
            <button class="btn btn--primary btn--small" @click="run" :disabled="loading">
              {{ lang.btn }}
            </button>
            <span class="demo-meta">GET <code>catfact.ninja/fact</code></span>
          </div>
        </div>
      </div>

      <div class="demo-copy">
        <p class="eyebrow"><span class="chip chip--blue">request</span></p>
        <h2 class="section-title">{{ lang.title }}</h2>
        <p class="demo-lead">{{ lang.body }}</p>
        <ul class="demo-bullets">
          <li v-for="bullet in lang.bullets" :key="bullet">
            <span class="bullet" aria-hidden="true"></span>
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import CodeBlock from "@/components/code.vue";
import langSetup from "@/lang/setup";
import { request } from "jsfast";

export default {
  name: "RequestDemo",
  components: { CodeBlock },
  data() {
    return {
      lang: langSetup("home", "request"),
      fact: "",
      loading: false,
      snippet: `import { request } from "jsfast";

interface Fact { fact: string; length: number }

request
  .get<Fact>("https://catfact.ninja/fact")
  .then((data, res) => {
    console.log(res.status, data.fact);
  })
  .catch((err) => console.error(err.error));`,
    };
  },
  methods: {
    run() {
      if (this.loading) return;
      this.loading = true;
      request
        .get("https://catfact.ninja/fact")
        .then((data) => {
          this.fact = data?.fact || JSON.stringify(data);
          this.loading = false;
        })
        .catch(() => {
          this.fact = this.lang.outputError;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.demo {
  &-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    gap: clamp(28px, 4vw, 64px);
    align-items: center;

    @media (max-width: 920px) {
      grid-template-columns: 1fr;
    }

    &--reverse {
      .demo-stage { order: 2; }
      .demo-copy  { order: 1; }

      @media (max-width: 920px) {
        .demo-stage { order: 2; }
        .demo-copy  { order: 1; }
      }
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
    gap: 12px;
  }

  &-play-title {
    font-size: 12px;
    color: var(--text-mute);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  &-output {
    font-family: var(--font-mono);
    font-size: 14px;
    color: #fff;
    background: var(--bg-code);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    line-height: 1.55;
    min-height: 56px;
    transition: opacity 200ms var(--ease-out);

    &.is-loading {
      color: var(--text-mute);
    }

    &-placeholder {
      color: var(--text-mute);
    }
  }

  &-play-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
  }

  &-meta {
    font-size: 12.5px;
    color: var(--text-mute);

    code {
      font-family: var(--font-mono);
      color: #fff;
      background: rgba(255, 255, 255, 0.06);
      padding: 2px 6px;
      border-radius: 6px;
    }
  }
}

.bullet {
  margin-top: 8px;
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--g-accent-blue);
  box-shadow: 0 0 12px rgba(6, 174, 249, 0.5);
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

  &--blue { --chip: #06aef9; }
}

.btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

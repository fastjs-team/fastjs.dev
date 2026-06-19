<template>
  <section class="section demo demo--date">
    <div class="container demo-grid">
      <div class="demo-copy">
        <p class="eyebrow"><span class="chip chip--amber">date</span></p>
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
        <CodeBlock :filename="'date.ts'">{{ snippet }}</CodeBlock>
        <div class="demo-play">
          <div class="demo-play-title">{{ lang.previewLabel }}</div>
          <div class="demo-output">{{ output }}</div>
          <div class="demo-play-actions">
            <button class="btn btn--outline btn--small" @click="cycleFormat">
              {{ lang.cycleBtn }}
            </button>
            <span class="demo-meta">{{ lang.formatLabel }} <code>{{ format }}</code></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CodeBlock from "@/components/code.vue";
import langSetup from "@/lang/setup";
import { date } from "jsfast";

const FORMATS = [
  "Y-M-D h:m:s",
  "D/M/Y h:m:s A",
  "<Now time: >Y-M-D h:m:s.S a",
];

export default {
  name: "DateDemo",
  components: { CodeBlock },
  data() {
    return {
      lang: langSetup("home", "date"),
      index: 0,
      output: "",
      timer: null,
      snippet: `import { date } from "jsfast";

// Format a timestamp or "now"
date.string("Y-M-D h:m:s");
date.string("<Now time: >Y-M-D h:m:s.S a");

// Two-way parse + reformat
const parsed = date.parse("2025-06-19 09:30", "Y-M-D h:m");
date.reformat("Y-M-D", "2025-06-19", "Y/M/D");

// Keep your own instance for clocks and timezones
const clock = date.create();
clock.setZone(8).toString("local");
clock.toActiveString(); // ticks forward in real time`,
    };
  },
  computed: {
    format() {
      return FORMATS[this.index];
    },
  },
  methods: {
    update() {
      this.output = date.string(this.format);
    },
    cycleFormat() {
      this.index = (this.index + 1) % FORMATS.length;
      this.update();
    },
  },
  mounted() {
    this.update();
    this.timer = setInterval(this.update, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
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
    font-size: 18px;
    color: #fff;
    background: var(--bg-code);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  background: var(--g-hero);
  box-shadow: 0 0 12px rgba(241, 105, 110, 0.45);
}

.chip {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0;
  padding: 4px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--chip, #fff) 18%, transparent);
  border: 1px solid color-mix(in srgb, var(--chip, #fff) 38%, transparent);
  color: color-mix(in srgb, var(--chip, #fff) 92%, #fff 8%);
  text-transform: none;

  &--amber { --chip: #f8c646; }
}
</style>

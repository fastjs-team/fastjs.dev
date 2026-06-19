<template>
  <div class="codeblock" :class="{ 'codeblock--compact': compact }">
    <div v-if="!compact" class="codeblock-bar">
      <span class="dot dot--red"></span>
      <span class="dot dot--amber"></span>
      <span class="dot dot--green"></span>
      <span class="codeblock-title">{{ filename }}</span>
      <button
        class="codeblock-copy"
        type="button"
        aria-label="Copy code"
        @click="onCopy"
      >
        <copy-outlined />
        <span>{{ copied ? "Copied" : "Copy" }}</span>
      </button>
    </div>
    <pre><code v-html="highlighted"></code></pre>
    <button
      v-if="compact"
      class="codeblock-copy codeblock-copy--floating"
      type="button"
      aria-label="Copy code"
      @click="onCopy"
    >
      <copy-outlined />
    </button>
  </div>
</template>

<script>
import hljs from "highlight.js";
import { message } from "ant-design-vue";
import { copy } from "jsfast";
import { CopyOutlined } from "@ant-design/icons-vue";

export default {
  name: "CodeBlock",
  components: { CopyOutlined },
  data() {
    const raw = (this.$slots.default?.()[0]?.children ?? "")
      .toString()
      .replace(/^\s+|\s+$/g, "");

    return {
      raw,
      highlighted: hljs.highlight(raw, { language: this.lang }).value,
      copied: false,
    };
  },
  props: {
    lang: { type: String, default: "javascript" },
    filename: { type: String, default: "snippet.ts" },
    compact: { type: Boolean, default: false },
  },
  methods: {
    async onCopy() {
      await copy(this.raw);
      this.copied = true;
      message.success("Code copied");
      setTimeout(() => {
        this.copied = false;
      }, 1400);
    },
  },
};
</script>

<style lang="less" scoped>
.codeblock {
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-1);

  &--compact {
    border-radius: var(--r-md);
  }
}

.codeblock-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #3a3a3a;

    &--red    { background: #ff5f57; }
    &--amber  { background: #ffbd2e; }
    &--green  { background: #28c840; }
  }

  .codeblock-title {
    margin-left: 10px;
    font-family: var(--font-mono);
    font-size: 12.5px;
    color: var(--text-mute);
  }

  .codeblock-copy {
    margin-left: auto;
  }
}

.codeblock-copy {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding-inline: 10px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-soft);
  font: inherit;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    color 160ms var(--ease-out),
    background 160ms var(--ease-out),
    border-color 160ms var(--ease-out);

  :deep(.anticon) {
    font-size: 13px;
  }

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    border-color: var(--border-strong);
  }

  &--floating {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 28px;
    width: 28px;
    padding: 0;
    justify-content: center;
    opacity: 0;
    transition:
      opacity 220ms var(--ease-out),
      color 160ms var(--ease-out);
  }
}

.codeblock:hover .codeblock-copy--floating {
  opacity: 1;
}

pre {
  margin: 0;
  padding: 22px 24px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 13.5px;
  line-height: 1.7;

  code {
    color: var(--text);
    background: transparent !important;
  }
}

/* Highlight.js theme tuned to the brand palette */
:deep(.hljs-keyword) { color: #f1696e; }
:deep(.hljs-string)  { color: #f8c646; }
:deep(.hljs-number)  { color: #06aef9; }
:deep(.hljs-comment) { color: var(--text-mute); font-style: italic; }
:deep(.hljs-built_in) { color: #9374fc; }
:deep(.hljs-title),
:deep(.hljs-title.function_) { color: #06aef9; }
:deep(.hljs-attr),
:deep(.hljs-property) { color: #f1696e; }
:deep(.hljs-literal) { color: #9374fc; }
:deep(.hljs-variable),
:deep(.hljs-name) { color: var(--text); }
:deep(.hljs-params) { color: var(--text-soft); }
:deep(.hljs-meta)   { color: #9374fc; }
</style>

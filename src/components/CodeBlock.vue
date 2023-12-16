<template>
  <div class="codeblock">
    <div class="numblock">
      <div class="num" v-for="key in code.length">
        <span class="lineNum">{{ key }}</span>
        <a-divider class="lineDivider" type="vertical"/>
      </div>
    </div>
    <div class="scroll">
      <div class="line" v-for="line in code">
        <div class="code" v-html="line">
        </div>
      </div>
    </div>
    <div class="copy" @click="copy">
      <copy-outlined class="icon"/>
    </div>
  </div>
</template>

<script>
import {copy} from "@/fastjs.esm-bundler.js";
import {CopyOutlined} from "@ant-design/icons-vue";
// highlight.js with white theme
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import {message} from "ant-design-vue";

export default {
  name: "CodeBlock",
  data() {
    // get slot content
    let code = this.$slots.default()[0].children
    let codeText = code;
    // set language
    hljs.configure({languages: [this.lang]});
    code = hljs.highlightAuto(code).value;
    // clear left right blank
    code = code.replace(/^\s+|\s+$/g, "");
    // change 2 blank to &nbsp;&nbsp;
    code = code.replaceAll("  ", "&nbsp;&nbsp;");
    // split line
    code = code.split("\n");
    return {
      code,
      codeText
    };
  },
  props: {
    lang: {
      type: String,
      default: "javascript"
    }
  },
  methods: {
    copy() {
      copy(this.codeText);
      message.success("Code copied");
    }
  },
  components: {
    CopyOutlined,
  },
}
</script>

<style lang="less" scoped>
// if dark mode
@media (prefers-color-scheme: dark) {
  .copy {
    color: #626262;
  }
}

.codeblock {
  position: relative;
  padding: 8px 26px;
  background-color: #fbfbfb;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  width: 100%;
  font-family: "JetBrains Mono";
  font-size: 12px;

  .scroll {
    overflow-y: auto;

    .code {
      white-space: nowrap;
      height: 22px;

      * {
        white-space: nowrap;
      }
    }
  }

  .num {
    white-space: nowrap;
    width: 100%;
    height: 22px;

    .lineNum {
      color: #808080;
      user-select: none;
    }

    .lineDivider {
      border-color: #808080;
      height: 14px;
    }
  }

  .copy {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.4s;
    background: #efefef;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    height: 28px;
    width: 28px;
    display: grid;


    .icon {
      display: block;
      margin: auto;
      font-size: 14px;
    }
  }

  &:hover > .copy {
    opacity: 1;
  }
}
</style>

<style lang="less" scoped>
@media screen and (max-width: 450px) {
  .num {
    display: none;
  }
}
</style>
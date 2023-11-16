<template>
  <div class="bind">
    <div class="flex">
      <div class="left">
        <div class="content">
          <h2>{{ lang.left.title }}</h2>
          <span>{{ lang.left.desc }}</span>
          <CodeBlock class="code">
            {{ code1 }}
          </CodeBlock>
        </div>
      </div>
      <div class="right">
        <div class="content">
          <span id="fastjsAjax_show"></span>
          <span class="blank">====================</span>
          <a-button class="btn" @click="sendRequest">{{ lang.right.button }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import langSetup from "@/lang/setup";
import {selecter, FastjsAjax} from "fastjs-next";
import CodeBlock from "@/components/CodeBlock.vue";
import {message} from "ant-design-vue";

export default {
  name: "bind",
  data() {
    return {
      lang: langSetup("pages/home", "ajax"),
      code1: `import { FastjsAjax } from "fastjs-next";
import { message } from "ant-design-vue";

const msg = message.loading("Waiting response...", 0);
new FastjsAjax("https://catfact.ninja/fact").get().then(res => {
  console.log(res.fact);
  msg();
})`
    }
  },
  methods: {
    sendRequest() {
      const msg = message.loading("Waiting response...", 0);
      new FastjsAjax("https://catfact.ninja/fact").get().then(res => {
        selecter("#fastjsAjax_show").html(res.fact);
        msg();
      })
    }
  },
  components: {
    CodeBlock
  },
}
</script>

<style lang="less" scoped>
.bind {
  width: 100vw;

  .flex {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding: 6vh 22vw 0;
    transition: padding 0.5s;

    > * {
      width: 560px;
    }

    .left {
      flex: 2;
      padding-right: 20px;

      .code {
        margin-top: 20px;
      }
    }

    .right {
      span {
        display: block;
      }

      flex: 1;
      padding-left: 20px;
    }

    > * {
      padding-bottom: 6vh;
    }
  }
}
</style>

<style lang="less" scoped>
@media screen and (max-width: 1450px) {
  .bind {
    .flex {
      padding: 0;
      display: block;

      > * {
        display: flex;
        justify-content: center;
        padding: 0 0 6vh !important;

        .content {
          width: 80%;
        }
      }
    }
  }
}
</style>
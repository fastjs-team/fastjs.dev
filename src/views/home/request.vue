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
          <span id="fastjsRequest_show"></span>
          <span class="blank">====================</span>
          <a-button class="btn" @click="sendRequest">{{
            lang.right.button
          }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import langSetup from "@/lang/setup";
import { dom, request } from "jsfast";
import CodeBlock from "@/components/code.vue";
import { message } from "ant-design-vue";

export default {
  name: "request",
  data() {
    return {
      lang: langSetup("home", "request"),
      code1: `import { request } from "jsfast";

request.get("https://catfact.ninja/fact").then(data => msg(data.fact));`,
    };
  },
  methods: {
    sendRequest() {
      const msg = message.loading("Waiting response...", 0);
      request.get("https://catfact.ninja/fact").then((data) => {
        dom.select("#fastjsRequest_show").html(data.fact);
        msg();
      });
    },
  },
  components: {
    CodeBlock,
  },
};
</script>

<style lang="less" scoped>
.bind {
  width: 100%;

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
        width: 100%;
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

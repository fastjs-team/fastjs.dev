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
          <span>Cookie: {{ cookie }}</span>
          <span class="blank">====================</span>
          <a-input id="fastjsCookie_input" style="margin-bottom: 5px;" />
          <a-button class="btn" @click="setCookie">{{
            lang.right.button
            }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import langSetup from "@/lang/setup";
import { dom, cookie } from "jsfast";
import CodeBlock from "@/components/code.vue";
import { message } from "ant-design-vue";

export default {
  name: "request",
  data() {
    return {
      lang: langSetup("home", "cookie"),
      cookie: cookie.get("cookie-demo"),
      code1: `import { cookie } from "jsfast";

cookie.set("hot-cookie", "Hello, FastJS");
console.log(cookie.get("hot-cookie")); // 'Hello, FastJS'
cookie.remove("hot-cookie"); // Eat cookie
`
    };
  },
  methods: {
    setCookie() {
      cookie.set("cookie-demo", dom.select("#fastjsCookie_input").val());
      message.success("Cookie set successfully!");
      message.info("Page will reload in 3 seconds...");
      setTimeout(() => {
        location.reload();
      }, 3000);
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

    >* {
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

    >* {
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

      >* {
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

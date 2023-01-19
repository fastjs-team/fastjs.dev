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
          <span id="fastjsDate_show"></span>
          <span class="blank">====================</span><br/>
          <a-button class="btn" type="primary" @click="nextFormat">{{ lang.right.button }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import langSetup from "@/lang/setup";
import {selecter, FastjsDate} from "fastjs-next";
import CodeBlock from "@/components/CodeBlock.vue";

const date = new FastjsDate("Y-M-D h:m:s");

export default {
  name: "bind",
  data() {
    return {
      format: 0,
      autoUpdateDate: setInterval(this.updateTime, 1000),
      formatList: ["Y-M-D h:m:s", "Y-M-D", "H:m:s A", "<Now time: >H:m:s A"],
      lang: langSetup("pages/home", "bind"),
      code1: `import { FastjsDate } from "fastjs-next";

console.log(new FastjsDate("Y-M-D h:m:s").toString());
console.log(new FastjsDate("Y-M-D").toString());
console.log(new FastjsDate("H:m:s A").toString());
console.log(new FastjsDate("<Now time: >H:m:s A").toString());`
    }
  },
  mounted() {
    this.updateTime();
  },
  methods: {
    nextFormat() {
      this.format++;
      if (this.format >= this.formatList.length) {
        this.format = 0;
      }
      date.format = this.formatList[this.format];
      this.updateTime();
    },
    updateTime() {
      selecter("#fastjsDate_show").html(date.toString());
    }
  },
  beforeUnmount() {
    clearInterval(this.autoUpdateDate);
  },
  components: {
    CodeBlock
  }
}
</script>

<style lang="less" scoped>
.bind {
  width: 100vw;

  .flex {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding: 6vh 28vw 0;
    transition: padding 0.5s;

    .left {
      flex: 2;
      padding-right: 20px;

      .code {
        margin-top: 20px;
      }
    }

    .right {
      #fastjsDate_show {
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
@media screen and (max-width: 1750px) {
  .bind {
    .flex {
      padding: 6vh 0;
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
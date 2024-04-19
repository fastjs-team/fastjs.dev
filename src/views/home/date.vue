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
          <span class="blank">====================</span>
          <a-button class="btn" @click="nextFormat">{{ lang.right.button }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import langSetup from "@/lang/setup";
import {dom, date} from "jsfast";
import CodeBlock from "@/components/code.vue";

// const date = new date("Y-M-D h:m:s");

export default {
  name: "bind",
  data() {
    return {
      format: 0,
      autoUpdateDate: setInterval(this.updateTime, 1000),
      formatList: ["Y-M-D h:m:s", "D/M/Y h:m:s A", "<Now time: >Y-M-D H:m:s.S a"],
      lang: langSetup("home", "bind"),
      code1: `import { date } from "jsfast";

console.log(date.string("Y-M-D h:m:s"));
console.log(date.string("D/M/Y h:m:s A"));
console.log(date.string("<Now time: >Y-M-D H:m:s.S a"));

// More functions
console.log(date.parse("Y-M-D h:m:s", "2022-10-21 19:20:46")); // { date, format, dateString, timestamp, utcDateString, utcTimestamp }
console.log(date.parseDate("Y-M-D h:m:s", new Date(...))); // { date, format, dateString, timestamp, utcDateString, utcTimestamp }
console.log(date.parseTimestamp("Y-M-D h:m:s", 1666351246)); // { date, format, dateString, timestamp, utcDateString, utcTimestamp }
console.log(date.reformat("2022-10-21 19:20:46", "Y-M-D h:m:s", "h:m:s Y-M-D")); // 19:20:46 2022-10-21
console.log(date.date("Y-M-D h:m:s", "2022-10-21 19:20:46")); // Date { ... }`
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
      dom.select("#fastjsDate_show").html(date.string(this.formatList[this.format]));
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
      padding: 6vh 0;
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
<template>
  <div class="bind">
    <div class="flex">
      <div class="left">
        <div class="content">
          <h2>{{ lang("left.title") }}</h2>
          <span>{{ lang("left.desc") }}</span>
          <CodeBlock class="code">
            {{ code1 }}
          </CodeBlock>
          <CodeBlock class="code">
            {{ code2 }}
          </CodeBlock>
        </div>
      </div>
      <div class="right">
        <div class="content">
          <span class="fastjsBind_showDate"></span>
          <span class="blank">====================</span><br />
          <a-button class="btn" type="primary" @click="addItem">{{ lang("right.button") }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import langSetup from "@/lang/setup";
import {selecter, FastjsDom} from "fastjs-next";
import CodeBlock from "@/components/CodeBlock.vue";
import {message} from "ant-design-vue";

export default {
  name: "bind",
  data() {
    let obj = {
      time: Date(),
    }
    this.$nextTick(() => {
    })
    setInterval(() => {
      obj = selecter(".fastjsBind_showDate").bind("innerHTML", "time", obj);
      obj.time = Date();
    }, 1000)

    return {
      lang: langSetup("pages/home", "bind"),
      code1: 'import { selecter } from "fastjs-next"\n' +
          '\n' +
          'let obj = {\n' +
          '  time: Date(),\n' +
          '}\n' +
          'setInterval(() => {\n' +
          '  obj = selecter(".fastjsBind_showDate").bind("innerHTML", "time", obj);\n' +
          '  obj.time = Date();\n' +
          ', 1000)',
      code2: 'new FastjsDom("span")\n' +
          '  .attr("class", "fastjsBind_showDate")\n' +
          '  .addFirst(selecter(".bind .right .content").getEl().el())'
    }
  },
  methods: {
    addItem() {
      // if more than 16
      if (selecter(".bind .right .content .fastjsBind_showDate")._list.length >= 16) {
        message.warn("Not that much, bro")
        return;
      }
      new FastjsDom("span").attr("class", "fastjsBind_showDate").addFirst(selecter(".bind .right .content").getEl()._el)
    }
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

<style lang="less">
.fastjsBind_showDate {
  display: block;
}
</style>
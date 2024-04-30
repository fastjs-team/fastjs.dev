<template>
  <div class="main-wrap">
    <div class="main">
      <span class="title">
        {{ lang.title }}
      </span>
      <div class="npm-download">
        <span class="mono">
          {{ lang.download }}
        </span>
        <shake class="code shake" on="click" @click="codeCopy">
          <span style="color: #c8c8c8"> shell </span>
          <a-divider
            type="vertical"
            style="background-color: #c8c8c8; height: 14px"
          />
          <span style="color: #aa6e6a">npm</span>
          <span style="color: #dfbc67">i</span>
          <span style="color: #84d681; padding-right: 6px">jsfast</span>
          <div class="right">
            <a-divider
              type="vertical"
              style="background-color: #c8c8c8; height: 14px"
            />
            <copy-outlined />
          </div>
        </shake>
      </div>
    </div>
  </div>
</template>

<script>
import shake from "@/components/shake.vue";
import { CopyOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import langSetup from "@/lang/setup";
import { copy } from "jsfast";

export default {
  name: "main",
  data() {
    return {
      lang: langSetup("home", "main"),
    };
  },
  methods: {
    codeCopy() {
      copy("npm i jsfast");
      message.success(this.lang.downloadCopy);
    },
  },
  components: {
    shake,
    CopyOutlined,
  },
};
</script>

<style lang="less">
.star {
  position: fixed;
  border-radius: 50%;
  transition: 1s;
  opacity: 0;
  pointer-events: none;
  z-index: 1;

  &.show {
    opacity: 1;
  }

  &.hide {
    opacity: 0;
  }

  &::after,
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "\2726";
    font-size: 14px;
  }
}
</style>

<style lang="less" scoped>
.main-wrap {
  height: 100vh;
  margin: 0;
  width: 100%;
  display: block;
  overflow-x: hidden;
  transition: 0.5s;
  position: relative;
  padding-top: 20vh;
}

// media 1400
@media screen and (max-width: 1400px) {
  .title {
    font-size: 3.3rem !important;
    padding: 0 30px;
  }
}

.main {
  width: 100%;
  height: auto;
  color: white;
  display: grid;
  // every line only one element
  grid-template-rows: repeat(1, 1fr);
  .shake {
    cursor: pointer;
  }

  > * {
    width: 100%;
    text-align: center;
    display: inline-block;
  }

  .title {
    margin-top: 10vh;
    font-weight: 700;
    font-size: 3.5rem;
    user-select: none;
    -webkit-user-select: none;
    cursor: default;
    line-height: 80px;

    background: linear-gradient(90deg, #b367df 0%, #84d681 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .npm-download {
    margin-top: 6vh;
    font-size: 0.8rem;

    span {
      display: block;
    }

    .code {
      margin: 1vh auto auto;
      border-radius: 8px;
      background: #2b2b2b;
      display: inline-block;
      padding: 5px 10px;
      line-height: 20px;
      text-align: left;

      span {
        display: inline-block;
        padding-left: 6px;
      }

      .right {
        display: inline-block;
        float: right;

        > * {
          color: #c8c8c8;
          padding: 0;
        }
      }
    }
  }
}
</style>

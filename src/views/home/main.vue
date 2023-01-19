<template>
  <div class="main-wrap">
    <div class="transform"></div>
    <div class="main">
      <span class="title">
        {{ lang.title }}
      </span>
      <div class="npm-download">
      <span>
        {{ lang.download }}
      </span>
        <shake class="code shake" on="click" @click="codeCopy">
        <span style="color: #c8c8c8">
          shell
        </span>
          <a-divider type="vertical" style="background-color: #c8c8c8; height: 14px"/>
          <span style="color: #aa6e6a">npm</span>
          <span style="color: #dfbc67">i</span>
          <span style="color: #84d681">fastjs-next</span>
          <div class="right">
            <a-divider type="vertical" style="background-color: #c8c8c8; height: 14px"/>
            <copy-outlined/>
          </div>
        </shake>
      </div>
    </div>
  </div>
</template>

<script>
import shake from "@/components/shake.vue";
import {CopyOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import langSetup from "@/lang/setup";
import {copy} from "fastjs-next";

export default {
  name: "main",
  data() {
    return {
      lang: langSetup("pages/home", "main")
    }
  },
  mounted() {
  },
  methods: {
    codeCopy() {
      copy("npm i fastjs-next");
      message.success(this.lang.downloadCopy);
    }
  },
  components: {
    shake,
    CopyOutlined
  }
}
</script>

<style lang="less" scoped>
.main-wrap {
  height: auto;
  margin: 0;
  width: 100vw;
  display: block;
  padding-bottom: 20vh;
  overflow-x: hidden;
  transition: 0.5s;
  position: relative;
}

.transform {
  width: 100vw;
  height: 100%;
  position: absolute;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(-50deg, #42d392, #647eff, #ce3e75, #23a6d5, #23d5ab);
  transition: 0.1s;
  animation: background_transform 30s linear infinite;
  background-size: 500% 500%;
}

// media 1400
@media screen and (max-width: 1400px) {
  .transform {
    background-size: cover;
  }
}

@keyframes background_transform {
  0% {
    background-position: 0 50%
  }
  50% {
    background-position: 100% 50%
  }
  to {
    background-position: 0 50%
  }
}

.main {
  width: 100%;
  height: auto;
  color: white;

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
  }

  .npm-download {
    margin-top: 6vh;
    font-size: .8rem;

    span {
      display: block;
    }

    .code {
      margin: 1vh auto auto;
      width: 240px;
      border-radius: 8px;
      background: #2b2b2b;
      display: block;
      padding: .3rem .7rem;
      height: 30px;
      // 内容靠左
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
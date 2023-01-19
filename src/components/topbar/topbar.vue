<template>
  <div id="topbar">
    <div class="left">
      <span class="title">Fastjs</span>
      <div class="item" v-for="item in list.left">
        <router-link :to="item.link" class="link" v-if="!item.newPage">
          {{ item.name }}
        </router-link>
        <a :href="item.link" target="_blank" class="link" v-else>{{ item.name }}</a>
        <div class="bar"></div>
      </div>
    </div>
    <div class="right">
      <div class="item" v-for="item in list.right">
        <router-link :to="item.link" class="link" v-if="!item.newPage">
          {{ item.name }}
        </router-link>
        <a :href="item.link" target="_blank" class="link" v-else>{{ item.name }}</a>
        <div class="bar"></div>
      </div>
      <a-space class="icon">
        <a href="https://github.com/fastjs-team/fastjs-next/" target="_blank" style="color: black">
          <github-outlined/>
        </a>
      </a-space>
    </div>
  </div>
</template>

<script>
import topbar from './topbar.js'
import {GithubOutlined} from '@ant-design/icons-vue'
import langSetup from '@/lang/setup'

const lang = langSetup("topbar")

console.log(topbar);
export default {
  name: "topbar",
  data() {
    const list = {
      left: topbar.left.reverse(),
      right: topbar.right.reverse()
    }
    list.left.forEach(item => {
      item.name = lang[item.name]
    })
    list.right.forEach(item => {
      item.name = lang[item.name]
    })
    return {
      list
    }
  },
  components: {
    GithubOutlined,
  }
}
</script>

<style lang="less" scoped>
#topbar {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  height: 50px;
  display: flex;
  transition: opacity 0.5s, background 0.8s, ease 0.4s;
  padding: 0 10vw;

  .left, .right {
    flex: 1;
    display: flex;
    align-items: center;

    > .title {
      font-size: 16px;
      color: black;
      display: inline-block;
      user-select: none;
      margin-right: 20px;
    }

    .item {
      height: 100%;
      margin-left: 0.4vw;

      .link {
        font-size: 14px;
        color: black;
        height: 100%;
        padding: 0 15px;
        line-height: 50px;
        display: inline-block;
      }

      .bar {
        width: 100%;
        height: 0;
        transition: 0.2s;
        background: linear-gradient(to right bottom, #42d392, #647eff);
        margin-top: 1px;
      }

      &:hover > .bar {
        height: 5px;
        margin-top: -4px;
      }
    }

    .icon {
      font-size: 20px;
      color: #767676;
      margin-left: 6px;

      .anticon {
        padding: 4px;
        cursor: pointer;
      }
    }
  }

  .right {
    justify-content: flex-end;
  }
}
</style>
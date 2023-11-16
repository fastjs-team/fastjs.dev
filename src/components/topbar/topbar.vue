<template>
  <div id="topbar-box">

    <div id="topbar">
      <div class="left">
        <span class="title">Fastjs</span>
        <div class="item" v-for="item in list.left">
          <router-link :to="item.link" class="link" v-if="!item.newPage">
            {{ item.name }}
          </router-link>
          <a :href="item.link" target="_blank" class="link" v-else>{{ item.name }}</a>
        </div>
      </div>
      <div class="right">
        <div class="item" v-for="item in list.right" :class="{ drop: item.sub !== undefined }">
          <a-dropdown v-if="item.sub !== undefined">
            <a class="ant-dropdown-link" @click.prevent>
              {{ item.name }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item v-for="sub in item.sub" :key="sub.name" @click="sub.do()">
                  <span>{{ sub.name }}</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <router-link :to="item.link" class="link" v-else-if="!item.newPage">
            {{ item.name }}
          </router-link>
          <a :href="item.link" target="_blank" class="link" v-else>{{ item.name }}</a>
        </div>
        <a-space class="icon">
          <a href="https://github.com/fastjs-team/fastjs-next/" target="_blank" style="color: black">
            <github-outlined style="color: white" />
          </a>
        </a-space>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import topbar from './topbar.js'
import { GithubOutlined, DownOutlined } from '@ant-design/icons-vue'
import langSetup from '@/lang/setup'

const lang = langSetup("topbar")

export default {
  name: "topbar",
  data() {
    const list = {
      left: topbar.left.reverse(),
      right: topbar.right.reverse()
    }
    console.log(list)
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
    DownOutlined
  }
}
</script>

<style lang="less" scoped>
#topbar-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 50px;
  background: black;

  #topbar {
    padding: 0 10vw;
    display: flex;
    position: relative;
    transition: opacity 0.5s, background 0.8s, ease 0.4s;

    .left,
    .right {
      display: flex;
      align-items: center;

      >.title {
        font-size: 16px;
        color: white;
        display: inline-block;
        user-select: none;
        margin-right: 20px;
      }

      .item {
        height: 100%;
        margin-left: 0.4vw;

        .link {
          font-size: 14px;
          color: white;
          height: 100%;
          padding: 0 15px;
          line-height: 50px;
          display: inline-block;
        }

        &.drop {
          .bar {
            display: none;
          }

          a {
            height: 100%;
            line-height: 50px;
          }
        }

        &:hover>.bar {
          height: 5px;
          margin-top: -4px;
        }
      }

      .icon {
        font-size: 20px;
        color: white;
        margin-left: 6px;

        .anticon {
          padding: 4px;
          cursor: pointer;
        }
      }
    }

    .right {
      margin-left: auto;
    }

    .line {
      background: #767676;
      width: calc(100% - 20vw);
      border-radius: 3px;
      height: 1px;
      position: absolute;
      margin-top: 50px;
    }
  }
}
</style>
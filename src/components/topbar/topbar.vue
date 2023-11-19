<template>
  <div id="topbar-box">
    <div id="topbar">
      <div id="topbar-content">
        <div class="left">
          <span class="title">Fastjs</span>
          <topbar-item v-for="item in localizedList.left" :key="item.name" :item="item"/>
        </div>
        <div class="right">
          <topbar-item
              v-for="item in localizedList.right"
              :key="item.name"
              :item="item"
              class="right-item"
          />
          <a-space class="icon">
            <a
                href="https://github.com/fastjs-team/fastjs-next/"
                target="_blank"
                style="color: black"
            >
              <github-outlined style="color: white"/>
            </a>
          </a-space>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from "./topbar.js";
import TopbarItem from "./topbarItem.vue";
import {GithubOutlined, CaretDownFilled} from "@ant-design/icons-vue";
import langSetup from "@/lang/setup";

export default {
  name: "topbar",
  components: {
    GithubOutlined,
    CaretDownFilled,
    TopbarItem,
  },
  data() {
    return {
      list: {
        left: topbar.left,
        right: topbar.right.reverse(),
      },
    };
  },
  computed: {
    localizedList() {
      const lang = langSetup("topbar");
      const localizedList = {
        left: [],
        right: [],
      };

      for (const side in this.list) {
        this.list[side].forEach((item) => {
          const localizedItem = {...item, name: lang[item.name]};
          localizedList[side].push(localizedItem);
        });
      }

      return localizedList;
    },
  },
};
</script>

<style lang="less">
#topbar-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 50px;

  #topbar {
    border-bottom: 1px solid #767676;
    margin: 0 10vw;
    padding: 0 20px;
    position: relative;
  }

  #topbar-content {;
    display: flex;
    transition: opacity 0.5s, background 0.8s, ease 0.4s;

    .left, .right {
      display: flex;
      align-items: center;
      width: 100%;

      > .title {
        font-size: 16px;
        color: white;
        display: inline-block;
        user-select: none;
        margin-right: 2vw;
      }

      .item {
        height: 100%;
        margin-left: 0.4vw;
        cursor: pointer;

        .link {
          font-size: 14px;
          color: white;
          height: 100%;
          padding: 0 1vw;
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

        &:hover > .bar {
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
      justify-content: right;
    }
  }

  .dropdown {
    display: inline-block;
  }
}

.ant-dropdown-menu {
  background: transparent !important;
  border: 1px solid #d4d4d4 !important;

  > li span {
    color: #d4d4d4 !important;
  }
}
</style>
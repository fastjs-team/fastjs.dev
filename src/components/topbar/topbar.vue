<template>
  <div id="topbar-box">
    <div id="topbar">
      <div id="topbar-content">
        <div class="container left">
          <router-link to="/">
            <img
              src="/icon.svg"
              class="icon"
              alt="logo"
              width="30"
              height="30"
            />
          </router-link>
          <topbar-item
            v-for="item in localizedList.left"
            :key="item.name"
            :item="item"
          />
        </div>
        <div class="container right">
          <topbar-item
            v-for="item in localizedList.right"
            :key="item.name"
            :item="item"
            class="right-item"
          />
          <a-space class="icon">
            <a
              href="https://github.com/fastjs-team/core/"
              target="_blank"
              style="color: black"
            >
              <github-outlined style="color: white" />
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
import { GithubOutlined, CaretDownFilled } from "@ant-design/icons-vue";
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
          const localizedItem = { ...item, name: lang[item.name] };
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
    margin: 0 10vw;
    padding: 0 20px;
    position: relative;
  }

  #topbar-content {
    display: flex;
    transition:
      opacity 0.5s,
      background 0.8s,
      ease 0.4s;

    .container {
      display: flex;
      align-items: center;

      .icon {
        cursor: pointer;
        font-size: 20px;
        color: white;
        margin-left: 16px;

        .anticon {
          padding: 4px;
          cursor: pointer;
        }
      }
    }

    .left > .item {
      margin-left: 20px;
    }

    .right {
      justify-content: right;
      margin-left: auto;

      > .right-item {
        margin-left: 20px;
      }
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

// width smaller than 768px
@media screen and (max-width: 768px) {
  .canHide {
    display: none;
  }
}
</style>

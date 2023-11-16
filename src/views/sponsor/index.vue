<template>
  <div id="sponsor">
    <div class="sponsor-box">
      <span class="title">{{ lang.title }}</span>
      <span class="subtitle">{{ lang.subtitle }}</span>
      <div class="sponsor-content">
        <a-segmented
          v-model:value="selected_method"
          :options="pay_methods"
          @change="methodChange"
        />
        <div class="outlink-box">
          <router-view v-slot="{ Component }">
            <transition
              name="fade"
              mode="out-in"
              @beforeLeave="beforeLeave"
              @enter="enter"
              @afterEnter="afterEnter"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import langSetup from "@/lang/setup";

// get config.sponsor
const config = langSetup("config");
console.log(config);
const sponsor = config.sponsor;

export default {
  name: "sponsor-index",
  data() {
    return {
      lang: langSetup("sponsor", "index"),
      selected_method:
        sponsor.find((s) => s.key === this.$route.href.split("/sponsor/")[1])?.name ||
        "Github Sponsor",
      pay_methods: sponsor.map((s) => s.name),
      boxPrevHeight: 0,
      boxPrevWidth: 0,
    };
  },
  methods: {
    methodChange(value) {
      this.selected_method = value;
      this.$router.push({
        path: "/sponsor/" + sponsor.find((s) => s.name === value).key,
      });
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
  },
};
</script>

<style lang="less" scoped>
#sponsor {
  height: 100vh;
  margin: 0;
  width: 100vw;
  display: block;
  overflow-x: hidden;
  transition: 0.5s;
  position: relative;
  padding-top: 20vh;
}

.sponsor-box {
  width: 100%;
  height: auto;
  color: white;

  > * {
    width: 100%;
    text-align: center;
    display: inline-block;
  }

  .title {
    margin-top: 10vh;
    font-weight: 700;
    font-size: 3rem;
    user-select: none;
    -webkit-user-select: none;
    cursor: default;
  }

  .subtitle {
    margin-top: 2vh;
    font-weight: 400;
    font-size: 0.8rem;
    user-select: none;
    -webkit-user-select: none;
    cursor: default;
  }

  .sponsor-content {
    margin-top: 5vh;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;

    > * {
      margin: 0 auto;
    }

    /deep/ .ant-segmented {
      background: transparent;
      color: white;
      border: 1px solid white;
      user-select: none;
      -webkit-user-select: none;

      label:hover {
        color: rgb(149, 149, 149);
      }
    }

    .outlink-box {
      border: 1px solid white;
      border-radius: 8px;
      margin-top: 5vh;
      padding: 20px;
      transition: 0.5s;
      width: 500px;

      > div {
        display: grid;
      }
    }
  }
}
</style>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, height 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

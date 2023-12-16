<template>
  <topbar/>
  <div class="background"></div>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script>
import Topbar from "@/components/topbar/topbar.vue";
import langSetup from '@/lang/setup'
import {dom, rand} from "@/fastjs.esm-bundler.js";

const lang = langSetup("config")

export default {
  name: "App",
  data() {
    // check lang
    const language = localStorage.getItem("lang") || "en"
    if (language === "en") {
      localStorage.setItem("lang", "en")
    }
    document.title = lang.title
    return {}
  },
  components: {
    Topbar,
  },
  mounted() {
    // add star
    function newStar() {
      dom
          .newEl("span", {
            class: "star",
            css: {
              left: rand(0, 100) + "vw",
              top: rand(0, 100) + "vh",
              transform: `scale(${rand(0, 150) / 100 + 0.5})`,
            },
          })
          .push(dom.select(".background")).el
          .then((star) => {
            star.addClass("show").then(() => {
              star.addClass("hide").then(() => {
                star.remove();
              }, 1000);
            }, rand(3000, 15000))
          }, 10)
          .then(newStar, rand(100, 2000))
    }
    newStar();
  },
}
</script>

<style lang="less">
body {
  background-color: #131111;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
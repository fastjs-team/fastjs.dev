<template>
  <topbar />
  <div class="background"></div>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import Topbar from "@/components/topbar/topbar.vue";
import langSetup from '@/lang/setup'
import { FastjsDom, rand, selector } from "fastjs-next";

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
  created() {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      this.$router.push(redirect)
    } else {
      this.$router.push("/")
    }
  },
  mounted() {
    // add star
    function newStar() {
      const star = new FastjsDom("span").set("className", "star");
      star.css({
        left: rand(0, 100) + "vw",
        top: rand(0, 100) + "vh",
        transform: `scale(${rand(0, 150) / 100 + 0.5})`,
      });
      star.appendTo(selector(".background").el());
      setTimeout(() => {
        star.el().classList.add("show")
        setTimeout(() => {
          star.el().classList.add("hide")
          setTimeout(() => {
            star.remove();
          }, 1000);
        }, rand(3000, 15000))
      }, 10);
      setTimeout(newStar, rand(100, 2000));
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
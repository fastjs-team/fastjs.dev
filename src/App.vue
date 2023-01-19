<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import langSetup from '@/lang/setup'

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
  }
}
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <topbar />

  <div class="site-bg" aria-hidden="true">
    <div class="orb orb--pink"></div>
    <div class="orb orb--blue"></div>
    <div class="orb orb--amber"></div>
    <div class="site-bg-grid"></div>
  </div>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <Bottom />
</template>

<script>
import Topbar from "@/components/topbar/topbar.vue";
import Bottom from "@/views/home/bottom.vue";
import langSetup from "@/lang/setup";

const lang = langSetup("config");

export default {
  name: "App",
  components: {
    Topbar,
    Bottom,
  },
  data() {
    document.title = lang.title;
    return {};
  },
};
</script>

<style lang="less">
/* Background lives at z-index 0; everything else lifts above. */
.site-bg {
  position: fixed;
  inset: 0;
  /* z-index: 0 puts site-bg in stacking step 6 of #app, i.e. ABOVE non-positioned
     in-flow content (step 3) like .site-footer / #home. Use a negative z-index so
     site-bg's solid var(--bg) background no longer masks the footer text. */
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  background: radial-gradient(
      1200px 700px at 50% -180px,
      rgba(147, 116, 252, 0.16),
      transparent 60%
    ),
    var(--bg);
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  will-change: transform;
  animation: orb-drift 22s ease-in-out infinite alternate;

  &--pink {
    width: 520px;
    height: 520px;
    top: -140px;
    left: -120px;
    background: radial-gradient(circle at 30% 30%, #e23f76 0%, transparent 65%);
    opacity: 0.5;
  }

  &--blue {
    width: 620px;
    height: 620px;
    top: 28vh;
    right: -200px;
    background: radial-gradient(circle at 60% 40%, #06aef9 0%, transparent 65%);
    opacity: 0.32;
    animation-duration: 28s;
    animation-delay: -8s;
  }

  &--amber {
    width: 440px;
    height: 440px;
    bottom: -160px;
    left: 30vw;
    background: radial-gradient(circle at 40% 60%, #f8c646 0%, transparent 65%);
    opacity: 0.26;
    animation-duration: 32s;
    animation-delay: -14s;
  }
}

.site-bg-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.04) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse at top, #000 0%, transparent 70%);
  mask-image: radial-gradient(ellipse at top, #000 0%, transparent 70%);
  opacity: 0.32;
}

@keyframes orb-drift {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(40px, -30px, 0) scale(1.05);
  }
  100% {
    transform: translate3d(-30px, 40px, 0) scale(0.97);
  }
}
</style>

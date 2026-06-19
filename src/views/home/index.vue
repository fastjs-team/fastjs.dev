<template>
  <div id="home">
    <Main />
    <Features />
    <Modules />
    <Date />
    <Request />
    <Cookie />
    <Thanks />
  </div>
</template>

<script>
import Main from "./main.vue";
import Features from "./features.vue";
import Modules from "./modules.vue";
import Date from "./date.vue";
import Request from "./request.vue";
import Cookie from "./cookie.vue";
import Thanks from "./thanks.vue";

export default {
  name: "home",
  components: {
    Main,
    Features,
    Modules,
    Date,
    Request,
    Cookie,
    Thanks,
  },
};
</script>

<template>
  <div id="home">
    <Main />
    <Date />
    <Request />
    <Cookie />
    <Thanks />
    <Bottom />
  </div>
</template>

<script>
import Main from "./main.vue";
import Date from "@/views/home/date.vue";
import Bottom from "@/views/home/bottom.vue";
import Request from "@/views/home/request.vue";
import Cookie from "@/views/home/cookie.vue";
import Thanks from "@/views/home/thanks.vue";

export default {
  name: "home",
  components: {
    Thanks,
    Request,
    Cookie,
    Bottom,
    Main,
    Date,
  },
};
</script>

<style lang="less" scoped>
#home {
  background-color: rgb(19, 17, 17);
}
</style>

<template>
  <div id="home">
    <topbar />
    <Main />
    <Date />
    <Ajax />
    <Bottom />
  </div>
</template>

<script>
import Topbar from "@/components/topbar/topbar.vue";
import Main from "./main.vue";
import Date from "@/views/home/date.vue";
import Bottom from "@/views/home/bottom.vue";
import Ajax from "@/views/home/ajax.vue";

export default {
  name: "home",
  components: {
    Ajax,
    Bottom,
    Topbar,
    Main,
    Date
  }
}
</script>

<style lang="less" scoped>
#home {
  background-color: rgb(19, 17, 17);
}
</style>
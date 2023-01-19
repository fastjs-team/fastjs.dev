<template>
  <div id="home">
    <topbar/>
    <Main/>
    <Date/>
    <Bottom/>
  </div>
</template>

<script>
import Topbar from "@/components/topbar/topbar.vue";
import Main from "./main.vue";
import Date from "@/views/home/date.vue";
import Bottom from "@/views/home/bottom.vue";

export default {
  name: "home",
  components: {
    Bottom,
    Topbar,
    Main,
    Date
  }
}
</script>

<style lang="less" scoped>

</style>
<template>
  <div id="home">
    <topbar/>
    <Main/>
    <Bind/>
    <Bottom/>
  </div>
</template>

<script>
import Topbar from "@/components/topbar/topbar.vue";
import Main from "./main.vue";
import Bind from "@/views/home/bind.vue";
import Bottom from "@/views/home/bottom.vue";
import {notification} from "ant-design-vue";

export default {
  name: "home",
  mounted() {
    // notification
    notification.open({
      message: 'New domain',
      description:
          'We are changing the domain name to fastjs.cc, this domain will be available in the future.',
      duration: 8,
    })
  },
  components: {
    Bottom,
    Topbar,
    Main,
    Bind
  }
}
</script>

<style lang="less" scoped>

</style>
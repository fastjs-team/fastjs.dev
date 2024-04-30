<template>
  <div id="home">
    <Main />
    <Date />
    <Request />
    <Thanks />
    <Bottom />
  </div>
</template>

<script>
import Main from "./main.vue";
import Date from "@/views/home/date.vue";
import Bottom from "@/views/home/bottom.vue";
import Request from "@/views/home/request.vue";
import Thanks from "@/views/home/thanks.vue";

export default {
  name: "home",
  components: {
    Thanks,
    Request,
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

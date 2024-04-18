<template>
  <div class="item" :class="{ drop: item.sub !== undefined, canHide: item.canHide }">
    <Language v-if="item.sub" class="link" :title="item.name" :items="item.sub" />
    <component v-else :is="item.newPage ? 'a' : 'router-link'" :href="item.link" :to="item.link"
      :target="item.newPage ? '_blank' : ''" class="link">
      {{ item.name }}
    </component>
  </div>
</template>

<script>
import Language from "./language.vue";

export default {
  name: "TopbarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    Language
  }
};
</script>

<style lang="less" scoped>
.item {
  height: 100%;
  cursor: pointer;

  >* {
    font-size: 14px;
    color: white;
    height: 100%;
    line-height: 50px;
    display: inline-block;
  }
}
</style>
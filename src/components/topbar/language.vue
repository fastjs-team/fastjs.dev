<template>
  <div class="dropdown">
    <span>
      {{ title }}
      <CaretDownFilled />
    </span>
    <div class="dropdown-menu">
      <a class="link" v-for="item in items" :key="item" @click="item.do()">
        {{ item.name }}
      </a>
    </div>
  </div>
</template>

<script>
import { CaretDownFilled } from "@ant-design/icons-vue";
import { dom } from "jsfast";

export default {
  name: 'language-dropdown',
  data() {
    return {
    };
  },
  mounted() {
    const menu = dom.select(".dropdown-menu");
    const maxHeight = menu.get("offsetHeight");
    dom.select('.dropdown')[0]
      .addEvent("mouseenter", () => {
        menu.setStyle("height", maxHeight + "px")
      })
      .addEvent("mouseleave", () => {
        menu.setStyle("height", "0")
      })
    menu.setStyle("height", "0")
  },
  props: {
    title: {
      type: String,
      default: 'Language'
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CaretDownFilled
  }
};
</script>

<style lang="less" scoped>
.dropdown {
  position: relative;
  display: inline-block;

  .dropdown-menu {
    position: absolute;
    overflow: hidden;
    transition: height 0.2s;
    border-left: 3px solid #d4d4d4;
    top: 50px;
    width: 100%;

    .link {
      display: block;
      height: 30px;
      line-height: 30px;
      margin: 0px 10px;
    }
  }
}
</style>
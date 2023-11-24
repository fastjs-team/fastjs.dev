<template>
  <div class="item" :class="{ drop: item.sub !== undefined }">
    <a-dropdown v-if="item.sub !== undefined" class="dropdown">
      <a class="ant-dropdown-link" style="font-size: 14px" @click.prevent>
        {{ item.name }}
        <CaretDownFilled />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="sub in item.sub" :key="sub.name" @click="sub.do()">
            <span>{{ sub.name }}</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <component
        v-else
        :is="item.newPage ? 'a' : 'router-link'"
        :href="item.link"
        :to="item.link"
        target="_blank"
        class="link"
    >
      {{ item.name }}
    </component>
  </div>
</template>

<script>
import { CaretDownFilled } from "@ant-design/icons-vue";

export default {
  name: "TopbarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    CaretDownFilled,
  }
};
</script>
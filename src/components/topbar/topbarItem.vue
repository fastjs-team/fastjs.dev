<template>
  <Language
    v-if="item.sub"
    class="topbar-link"
    :title="item.name"
    :items="item.sub"
  />
  <component
    v-else
    :is="item.newPage ? 'a' : 'router-link'"
    :href="item.link"
    :to="item.link"
    :target="item.newPage ? '_blank' : ''"
    :rel="item.newPage ? 'noopener noreferrer' : ''"
    class="topbar-link"
  >
    {{ item.name }}
  </component>
</template>

<script>
import Language from "./language.vue";

export default {
  name: "TopbarItem",
  props: {
    item: { type: Object, required: true },
  },
  components: { Language },
};
</script>

<style lang="less" scoped>
.topbar-link {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  color: var(--text-soft);
  font-weight: 500;
  font-size: 14px;
  transition:
    color 180ms var(--ease-out),
    background 180ms var(--ease-out);

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }

  &.router-link-active,
  &.router-link-exact-active {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }
}

@media (max-width: 760px) {
  .topbar-link {
    width: 100%;
    height: 44px;
  }
}
</style>

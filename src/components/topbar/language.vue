<template>
  <div class="dropdown" @mouseenter="open = true" @mouseleave="open = false">
    <button class="dropdown-trigger" :aria-expanded="open" type="button">
      <span>{{ title }}</span>
      <CaretDownFilled :rotate="open ? 180 : 0" />
    </button>
    <transition name="dropdown-fade">
      <div v-if="open" class="dropdown-menu" role="menu">
        <button
          v-for="item in items"
          :key="item.name"
          role="menuitem"
          type="button"
          class="dropdown-item"
          @click="onSelect(item)"
        >
          {{ item.name }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { CaretDownFilled } from "@ant-design/icons-vue";

export default {
  name: "language-dropdown",
  data() {
    return { open: false };
  },
  props: {
    title: { type: String, default: "Language" },
    items: { type: Array, default: () => [] },
  },
  components: { CaretDownFilled },
  methods: {
    onSelect(item) {
      this.open = false;
      item.do?.();
    },
  },
};
</script>

<style lang="less" scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  border: 0;
  background: transparent;
  color: var(--text-soft);
  font: inherit;
  font-weight: 500;
  font-size: 14px;
  transition:
    color 180ms var(--ease-out),
    background 180ms var(--ease-out);

  :deep(.anticon) {
    transition: transform 200ms var(--ease-out);
  }

  &:hover,
  &[aria-expanded="true"] {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 160px;
  padding: 6px;
  background: var(--bg-elev-2);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-1);
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 50;
}

.dropdown-item {
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  border: 0;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 14px;
  border-radius: 8px;
  transition: background 160ms var(--ease-out);

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 180ms var(--ease-out),
    transform 180ms var(--ease-out);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

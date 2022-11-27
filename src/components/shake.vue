<template>
  <div class="shake" ref="shake">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "shake",
  methods: {
    shake() {
      this.$refs.shake.classList.add("apply");
      setTimeout(() => {
        this.$refs.shake.classList.remove("apply");
      }, 820);
    }
  },
  mounted() {
    if (!this.on)
      return;
    this.$refs.shake.addEventListener(this.on, () => {
      this.shake();
    });
  },
  props: {
    on: {
      type: String,
      default: null
    }
  },
}
</script>

<style lang="less" scoped>
.shake {
  &.apply {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
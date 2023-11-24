<template>
  <div class="thanks">
    <div class="sponsors">
      <h2 class="title">All Sponsors</h2>
      <img src="https://raw.githubusercontent.com/dy-xiaodong2022/sponsors/main/sponsors.wide.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "thanks"
}
</script>

<style lang="less" scoped>
.thanks {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  padding: 6vh 22vw;
  transition: padding 0.5s;
}

.sponsors {
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;

  .title {
    text-align: center;
  }
}
</style>
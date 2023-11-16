<template>
  <div class="bottom">
    <div class="link">
      <a href="https://github.com/fastjs-team/fastjs-next" target="_blank" class="github">Github</a>
      <a href="https://github.com/fastjs-team/" target="_blank" class="docs">Team</a>
      <a href="https://docs.fastjs.cc/" target="_blank" class="docs">Docs</a>
      <a href="https://docs.fastjs.cc/contribute/sponsor.html" target="_blank" class="support">Support</a>
    </div>
    <div class="data">
      <a class="authorInfo">{{ lang.data.authorInfo }}</a>
    </div>
  </div>
</template>

<script>
import langSetup from '@/lang/setup'

export default {
  name: "bottom",
  data() {
    return {
      lang: langSetup("home", "bottom")
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  padding: 40px 10vw;
  border-top: 1px solid #e5e5e5;
  color: #999;

  div > * {
    margin-right: 20px;

    &:link, &:visited, & {
      color: unset;
    }

    &:hover {
      color: #dadada;
    }
  }

  .link {
    display: flex;
    flex-wrap: wrap;
    font-size: 17px;
    margin-bottom: 6px;
  }

  .data {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
  }
}
</style>
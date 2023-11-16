<template>
  <div class="sponsor-github">
    <a-space class="top-part">
      <div class="logo">
        <img alt="logo" :src="logo" />
      </div>
      <div class="line">{{ config.sponsor.find((e) => e.key === "github").name }}</div>
    </a-space>
    <div class="body-part">
      <span> Sponsor us on Github with Stripe, sponsor as monthly or one-time. </span>
      <span> Stripe supports all major credit and debit cards. </span>
      <a href="https://github.com/sponsors/dy-xiaodong2022" target="_blank">
        <a-button style="margin-top: 12px"> Sponsor </a-button>
      </a>
    </div>
  </div>
</template>

<script>
import langSetup from "@/lang/setup";
import logo from "@/assets/github-sponsor-logo.png";

export default {
  name: "sponsor-github",
  data() {
    return {
      lang: langSetup("sponsor", "github"),
      config: langSetup("config"),
      logo: logo,
    };
  },
};
</script>

<style lang="less" scoped>
.top-part {
  font-size: 18px;
  align-items: normal;

  .logo {
    width: 38px;
    height: 38px;
    // margin-right: 3px;
    border-radius: 50%;
    background-color: #fff;
    padding: 6px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .line {
    position: relative;
    width: auto;
    white-space: nowrap;
    margin-top: 8px;
    left: -20px;
    padding: 0 14px 0 20px;

    &::after {
      height: 2px;
      background-color: #fff;
      border-radius: 2px;
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      top: 100%;
    }
  }
  span {
    line-height: 36px;
  }
}

.body-part {
  font-size: 14px;
  margin-top: 12px;
  text-align: left;

  > * {
    display: block;
  }
}
</style>

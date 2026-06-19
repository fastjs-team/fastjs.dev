<template>
  <article class="sponsor-method">
    <header class="sponsor-method-head">
      <div class="logo">
        <img alt="Afdian" :src="logo" />
      </div>
      <div>
        <h2>{{ name }}</h2>
        <p class="muted">{{ lang.subtitle }}</p>
      </div>
    </header>

    <p class="sponsor-method-body">{{ lang.body }}</p>

    <a
      class="btn btn--primary"
      href="https://afdian.com/a/xiaodong2008"
      target="_blank"
      rel="noopener"
    >
      {{ lang.cta }}
    </a>
  </article>
</template>

<script>
import langSetup from "@/lang/setup";
import logo from "@/assets/afdian-sponsor-logo.png";

export default {
  name: "sponsor-afdian",
  data() {
    const config = langSetup("config");
    return {
      lang: langSetup("sponsor", "afdian"),
      name: config.sponsor.find((e) => e.key === "afdian").name,
      logo,
    };
  },
};
</script>

<style lang="less" scoped>
.sponsor-method {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sponsor-method-head {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 4px;

  .logo {
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #fff;
    display: grid;
    place-items: center;
    padding: 6px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.01em;
  }

  .muted {
    margin: 2px 0 0;
    color: var(--text-mute);
    font-size: 13px;
  }
}

.sponsor-method-body {
  color: var(--text-soft);
  font-size: 14.5px;
  line-height: 1.6;
  margin: 0;
}

.btn {
  align-self: flex-start;
  margin-top: 8px;
}
</style>

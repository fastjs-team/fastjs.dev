import vue from "@vitejs/plugin-vue";

export default {
  server: {
    host: true,
  },
  plugins: [vue()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        404: "./404.html",
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": __dirname + "/src",
    },
  },
};

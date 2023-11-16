import vue from '@vitejs/plugin-vue'
import mkcert from "vite-plugin-mkcert";

export default {
  server: {
    https: true
   },
  "plugins": [
    vue(),
    mkcert()
  ],
  "base": "./",
  "build": {
    "outDir": "./dist/"
  },
  "css": {
    "preprocessorOptions": {
      "less": {
        "javascriptEnabled": true
      }
    }
  },
  "resolve": {
    "alias": {
      "@": __dirname + "/src"
    }
  }
}
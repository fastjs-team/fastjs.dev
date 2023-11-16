import vue from '@vitejs/plugin-vue'
import {viteRequire} from 'vite-require'
import mkcert from "vite-plugin-mkcert";

export default {
  server: {
    https: true
   },
  "plugins": [
    vue(),
    mkcert(),
    viteRequire({
      fileRegex: /(.js|.ts|.vue)$/,
    })
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
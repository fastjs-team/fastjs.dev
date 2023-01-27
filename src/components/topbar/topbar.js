// check lang
import cookie from "js-cookie";
const lang = cookie.get("language");

let unshift;
switch (lang) {
  case "zh":
    unshift = "zh.";
    break;
}

export default {
  "left": [
    {
      "name": "home",
      "link": "/"
    }
  ],
  "right": [
    {
      "name": "docs",
      "link": `https://${unshift}docs.fastjs.cc/`,
      "newPage": true
    }
  ]
}
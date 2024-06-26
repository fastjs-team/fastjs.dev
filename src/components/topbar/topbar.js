import cookie from "js-cookie";
import config from "@/lang/config.json";

const lang = cookie.get("language");
let langList = config.langList;

let unshift = "";
switch (
  lang
  // case "zh":
  //   unshift = "zh.";
  //   break;
) {
}

export default {
  left: [
    {
      name: "home",
      link: "/",
      canHide: true,
    },
    {
      name: "sponsor",
      link: "/sponsor",
    },
    {
      name: "playground",
      link: "https://stackblitz.com/edit/fastjs-playground?file=src%2Fmain.ts",
      newPage: true,
    },
  ],
  right: [
    {
      name: "docs",
      link: `https://${unshift}docs.fastjs.dev/`,
      newPage: true,
    },
    {
      name: "lang",
      sub: langList.map((item) => {
        return {
          name: item,
          do: () => {
            cookie.set("language", item);
            location.reload();
          },
        };
      }),
    },
  ],
};

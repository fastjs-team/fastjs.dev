import cookie from "js-cookie";

import home from "./pages/home.json";
import sponsor from "./pages/sponsor.json";
import topbar from "./components/topbar.json";
import config from "./config.json";

export default function get(name, defaultValue) {
  let language = cookie.get("language");
  const langList = config.langList;
  if (!language || !langList.includes(language)) {
    language = "en";
    cookie.set("language", "en");
  }
  let index;
  let langFiles = {
    home,
    sponsor,
    topbar,
    config,
  };
  index = langFiles[name];
  if (!index) throw new Error("Language file not found");
  if (language !== "en") {
    const defaultLangIndex = index.en;
    index = index[language] || defaultLangIndex;
    // 递归检查：当前语言缺失的键 / 子树用默认语言回退
    const isPlainObject = (v) =>
      v !== null && typeof v === "object" && !Array.isArray(v);
    const check = (obj, def) => {
      if (!isPlainObject(obj) || !isPlainObject(def)) return;
      for (let key in def) {
        if (obj[key] === undefined || obj[key] === null) {
          // 当前语言缺少这一键，直接把默认语言对应的整棵子树挂上去
          obj[key] = def[key];
        } else if (isPlainObject(def[key]) && isPlainObject(obj[key])) {
          // 两边都是普通对象 → 继续向下递归回退
          check(obj[key], def[key]);
        }
        // 数组与基础类型不做深度合并，保留当前语言已有的值
      }
    };
    check(index, defaultLangIndex);
  } else index = index.en;
  if (defaultValue)
    defaultValue.split(".").forEach((item) => {
      index = index[item];
    });
  return index;
}

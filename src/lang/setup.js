import cookie from 'js-cookie'

import home from "./pages/home.json"
import sponsor from "./pages/sponsor.json"
import topbar from "./components/topbar.json"
import config from "./config.json"

export default function get(name, defaultValue) {
    let language = cookie.get("language")
    const langList = config.langList
    if (!language || !langList.includes(language)) {
        language = "en"
        cookie.set("language", "en")
    }
    let index
    let langFiles = {
        home,
        sponsor,
        topbar,
        config
    }
    index = langFiles[name]
    if (!index) throw new Error("Language file not found")
    if (language !== "en") {
        const defaultLangIndex = index.en
        index = index[language] || defaultLangIndex
        // 递归检查
        const check = (obj, def) => {
            // 比对默认语言和当前语言，如果当前语言没有翻译，就用默认语言
            for (let key in def) {
                if (typeof obj[key] === "object") {
                    check(obj[key])
                } else {
                    if (!obj[key]) {
                        obj[key] = def[key]
                    }
                }
            }
        }
        check(index, defaultLangIndex)
    } else index = index.en
    if (defaultValue)
        defaultValue.split(".").forEach((item) => {
            index = index[item]
        })
    return index
}
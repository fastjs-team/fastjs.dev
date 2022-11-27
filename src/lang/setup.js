import {message} from "ant-design-vue";

export default (path, relative) => {
    // setup lang
    const language = localStorage.getItem("lang") || "en"
    if (language === "en") {
        localStorage.setItem("lang", "en")
    }
    // get path.json
    let lang = require(`./${path}.json`)
    // setup unsupport
    let unsupport = () => {
        console.log(require(`./config.json`)["en"]);
        console.log(language);
        return void message.info(require(`./config.json`)[language]?.unsupport)
    }
    // return
    return target => {
        // add relative path
        if (relative) {
            target = `${relative}.${target}`
        }
        target = target.split(".");
        let result = lang[language];
        target.forEach((v) => {
            if (!result || !result[v]) {
                // console -> group
                console.group(`${language} lang unsupport`);
                // console -> group -> log
                console.log(`Get: ${v}`);
                console.log("Result", lang["en"][v]);
                // end group
                console.groupEnd();
                // use en
                result = lang["en"];
                // unsupport
                unsupport();
                // clear unsupport
                unsupport = () => void 0;
            }
            result = result[v];
        })
        return result;
    }
}
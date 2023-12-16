function browserCheck(module) {
    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) {
        throw error(`${module}/browserCheck`, "This module is only available in browser environments.");
    }
}
var style;
(function (style) {
    style["fastjs.bold"] = "\u001B[1m";
    style["fastjs.reverse"] = "\u001B[7m";
    style["fastjs.red"] = "\u001B[31m";
    style["fastjs.green"] = "\u001B[32m";
    style["fastjs.yellow"] = "\u001B[33m";
    style["fastjs.blue"] = "\u001B[34m";
    style["fastjs.magenta"] = "\u001B[35m";
    style["fastjs.cyan"] = "\u001B[36m";
    style["fastjs.white"] = "\u001B[37m";
    style["fastjs.gray"] = "\u001B[90m";
    style["fastjs.bgRed"] = "\u001B[41m";
    style["fastjs.bgGreen"] = "\u001B[42m";
    style["fastjs.bgYellow"] = "\u001B[43m";
    style["fastjs.bgBlue"] = "\u001B[44m";
    style["fastjs.bgMagenta"] = "\u001B[45m";
    style["fastjs.bgCyan"] = "\u001B[46m";
    style["fastjs.bgWhite"] = "\u001B[47m";
    style["fastjs.bgGray"] = "\u001B[100m";
    style["fastjs.wrong"] = "\u001B[41m\u001B[37m\u001B[1m";
    style["fastjs.right"] = "\u001B[42m\u001B[37m\u001B[1m";
    style["fastjs.warn"] = "\u001B[43m\u001B[90m\u001B[1m";
})(style || (style = {}));
function warn(module, message, args = [], styleArgs = []) {
    args = args.map((arg) => typeof arg === "string" ? "\n    > " + arg : arg);
    let styleKey = 0;
    let outputMessage = "";
    let outputObjects = [];
    let lastStyle = styleArgs.length ? getStyle(styleArgs[styleArgs.length - 1]) : "";
    args.unshift(`[Fastjs warn] ${module}: ${message}`);
    args.forEach((arg) => {
        if (typeof arg !== "string") {
            outputMessage += "%o";
            outputObjects.push(arg);
            return;
        }
        if (arg.includes("> *") && !arg.includes("> **")) {
            let style = styleArgs[styleKey];
            arg = arg.replace("*", "");
            arg = arg.replace("  >", getStyle(style) + "-->\u001b[0m");
            styleKey++;
        }
        if (arg.includes("***")) {
            let style = styleArgs[styleKey];
            arg = arg.replace("***", "");
            arg = arg.split("> ")[0] + "> " + getStyle(style) + arg.split("> ").slice(1).join("> ") + "\u001b[0m";
            styleKey++;
        }
        while (arg.includes(`**`)) {
            let style = styleArgs[styleKey];
            arg = arg.replace(`**`, getStyle(style));
            arg = arg.replace(`**`, "\u001b[0m");
            styleKey++;
        }
        outputMessage += arg;
    });
    console.warn(outputMessage, ...outputObjects);
    function getStyle(key) {
        if (!key)
            return lastStyle;
        if (Array.isArray(key)) {
            return key.map((e) => style[e]).join("");
        }
        return style[key] || "";
    }
}
function error(module, message, args = []) {
    let msg = `[Fastjs error] ${module}: ${message}`;
    if (args.length > 0) {
        msg += args.map((arg) => "\n    > " + arg).join("");
    }
    return new Error(msg);
}
var _dev = {
    browserCheck,
    warn,
    error
};

const moduleConfig = {
    timeout: 5000,
    hooks: {
        before: () => true,
        success: () => true,
        failed: () => true,
        callback: () => true,
    },
    handler: {
        parseData: (data, request) => {
            try {
                return JSON.parse(data);
            }
            catch (e) {
                if (!!(process.env.NODE_ENV !== 'production') && !moduleConfig.ignoreFormatWarning) {
                    _dev.warn("fastjs/request", "Failed to parse JSON, do you sure you send a request correctly? Set request.config.ignoreFormatWarning to true to ignore this warning.", [
                        `*Received data:`, {
                            data: data,
                            length: data.length,
                            // headers to object
                            headers: getHeaders(request.xhr),
                        },
                        `url: ${request.url}`,
                        `config:`, request.config,
                        "super:", request
                    ], ["fastjs.warn"]);
                }
                return data;
            }
        },
        responseCode: (code) => {
            return code >= 200 && code < 300;
        }
    },
    ignoreFormatWarning: false,
    returnFullResponse: false
};
function getHeaders(xhr) {
    const headers = {};
    xhr.getAllResponseHeaders()?.split("\n").forEach((e) => {
        e && (headers[e.split(": ")[0]] = e.split(": ")[1]);
    });
    return headers;
}
class FastjsRequest {
    waitId;
    construct;
    constructor(url, data, config = {}) {
        if (!!(process.env.NODE_ENV !== 'production') && !url) {
            _dev.warn("fastjs/request", "A correct url is **required**.", [
                `***url: ${url}`,
                "data:", data,
                "config:", config,
                "super:", this
            ], ["fastjs.wrong"]);
            throw _dev.error("fastjs/request", "A correct url is required.", [
                "constructor(url: string, data?: data, config: Partial<requestConfig> = {})",
                "FastjsRequest.constructor"
            ]);
        }
        this.url = url;
        this.data = data || {};
        if (!!(process.env.NODE_ENV !== 'production')) {
            if (config.datatype)
                _dev.warn("fastjs/request", "Datatype is **deprecated** and already **doesn't effect on anything**, it will be **removed** in the future, Try to use `request.config.hooks.callback` instead.", [
                    `url: ${this.url}`,
                    "data:", this.data,
                    "*config:", config,
                    "super:", this
                ], ["fastjs.warn", "fastjs.warn", "fastjs.wrong", "fastjs.warn"]);
        }
        this.config = {
            timeout: config.timeout || moduleConfig.timeout,
            datatype: config.datatype || "auto",
            headers: config.headers || {},
            shutdown: config.shutdown || false,
            wait: config.wait || 0,
            failed: config.failed || (() => 0),
            callback: config.callback || (() => 0),
            keepalive: config.keepalive || false,
            keepaliveWait: config.keepaliveWait || 0
        };
        this.response = null;
        this.xhr = null;
        this.waitId = 0;
        // construct
        this.construct = "FastjsRequest";
    }
    url;
    data;
    config;
    response;
    xhr;
    get(data = {}) {
        return this.send("GET", data, "FastjsRequest.get()");
    }
    post(data = {}) {
        return this.send("POST", data, "FastjsRequest.post()");
    }
    put(data = {}) {
        return this.send("PUT", data, "FastjsRequest.put()");
    }
    delete(data = {}) {
        return this.send("DELETE", data, "FastjsRequest.delete()");
    }
    patch(data = {}) {
        return this.send("PATCH", data, "FastjsRequest.patch()");
    }
    send(method, data = {}, referer = "FastjsRequest.send()") {
        return new Promise((resolve, reject) => {
            const hooks = {
                before: this.config.hooks?.before || moduleConfig.hooks.before || (() => true),
                success: this.config.hooks?.success || moduleConfig.hooks.success || (() => true),
                failed: this.config.hooks?.failed || moduleConfig.hooks.failed || (() => true),
                callback: this.config.hooks?.callback || moduleConfig.hooks.callback || (() => true)
            };
            let bodyData = null;
            let _bodyData = method === "GET" ? this.config.body : data || this.config.body;
            if (_bodyData) {
                if (typeof _bodyData === "string") {
                    this.config.headers["Content-Type"] = "text/plain";
                    bodyData = _bodyData;
                    if (!!(process.env.NODE_ENV !== 'production')) {
                        _dev.warn("fastjs/request", "Sending a string body data is not recommended.", [
                            `string url: ${this.url}`,
                            `data Data: ${data}`,
                            `Partial<config> Config: ${this.config}`,
                        ]);
                    }
                }
                else {
                    this.config.headers["Content-Type"] = "application/json";
                    bodyData = JSON.stringify(_bodyData);
                }
                if (!!(process.env.NODE_ENV !== 'production') && method === "GET") {
                    _dev.warn("fastjs/request", "Sending a body data with **GET** method should be **avoided**. (HTTP 1.1)", [
                        `url: ${this.url}`,
                        `data: ${data}`,
                        `*config: ${this.config}`,
                    ], ["fastjs.warn"]);
                }
            }
            let queryData;
            if (method === "GET") {
                queryData = (typeof data === "object" ? data : undefined) || this.config.query;
            }
            else {
                queryData = this.config.query;
            }
            const sendRequest = () => {
                if (this.xhr !== null && this.config.shutdown) {
                    return;
                }
                let xhr = new XMLHttpRequest();
                this.xhr = xhr;
                let url = this.url;
                if (queryData && Object.keys(queryData).length) {
                    for (const key in queryData) {
                        if (this.data.hasOwnProperty(key)) {
                            const value = this.data[key];
                            url += `${url.includes("?") ? "&" : "?"}${key}=${encodeURIComponent(value)}`;
                        }
                    }
                }
                xhr.open(method, url, true);
                // set header
                for (let key in this.config.headers) {
                    xhr.setRequestHeader(key, this.config.headers[key]);
                }
                xhr.timeout = this.config.timeout;
                const fail = (from) => {
                    const result = this.xhr?.status === 0 ?
                        false : moduleConfig.handler.parseData(this.xhr?.response, this);
                    // hook
                    if (!hooks.failed(this, moduleConfig))
                        return;
                    // run failed
                    this.config.failed(this);
                    // if keepalive
                    if (this.config.keepalive) {
                        setTimeout(sendRequest, this.config.keepaliveWait);
                    }
                    if (!!(process.env.NODE_ENV !== 'production')) {
                        let err;
                        switch (true) {
                            case this.xhr?.status === 0:
                                err = "Request failed";
                                break;
                            default:
                                err = `Request failed with status ${this.xhr?.status}`;
                        }
                        console.log(from);
                        _dev.warn("fastjs/request", err, [
                            "*status: **" + (this.xhr?.status || "Unable to send request") + "**",
                            from ? ("*" + from) : "",
                            referer ? `${referer} -> send()` : "",
                            "url: " + this.url,
                            "global config:", moduleConfig,
                            "super:", this,
                        ], ["fastjs.wrong"]);
                        const errOutput = _dev.error("fastjs/request", err, [
                            from || "",
                            referer ? `${referer} -> send()` : "",
                            "url: " + this.url,
                        ]);
                        reject(result || errOutput);
                        console.error(errOutput);
                    }
                    else {
                        reject("Request failed");
                    }
                };
                // xhr failed
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 0)
                            fail("xhr -> onreadystatechange()");
                        else
                            requestFinish();
                    }
                };
                xhr.onerror = () => fail;
                xhr.ontimeout = () => fail;
                // xhr load
                const requestFinish = () => {
                    if (xhr.status !== 200) {
                        return void fail("xhr -> onreadystatechange() -> load()");
                    }
                    const data = moduleConfig.handler.parseData(xhr.response, this);
                    if (!hooks.success(this, moduleConfig))
                        return;
                    if (!hooks.callback(this, data, moduleConfig))
                        return;
                    const response = {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        headers: getHeaders(xhr),
                        body: xhr.response,
                        data: data,
                        xhr: xhr,
                        request: this,
                        resend: () => {
                            // @ts-ignore
                            return this.send(method, data, referer);
                        }
                    };
                    this.config.callback(response);
                    // if keepalive
                    if (this.config.keepalive) {
                        setTimeout(sendRequest, this.config.keepaliveWait);
                    }
                    resolve(response);
                };
                if (!hooks.before(this, moduleConfig))
                    return;
                xhr.send(bodyData || null);
            };
            // if wait
            if (this.config.wait > 0) {
                if (this.waitId !== 0) {
                    clearTimeout(this.waitId);
                }
                // do debounce
                this.waitId = Number(setTimeout(() => {
                    sendRequest();
                    this.waitId = 0;
                }, this.config.wait));
            }
            else
                sendRequest();
        });
    }
}

const create$1 = (url, data, config) => {
    return new FastjsRequest(url, data, config);
};
const get = (url, data, config) => {
    return new FastjsRequest(url, data, config).get();
};
const post = (url, data, config) => {
    return new FastjsRequest(url, data, config).post();
};
const put = (url, data, config) => {
    return new FastjsRequest(url, data, config).put();
};
const del = (url, data, config) => {
    return new FastjsRequest(url, data, config).delete();
};
const patch = (url, data, config) => {
    return new FastjsRequest(url, data, config).patch();
};
var index$4 = {
    request: FastjsRequest,
    create: create$1,
    config: moduleConfig,
    get,
    post,
    put,
    delete: del,
    patch
};

class FastjsArray {
    construct;
    #hooks;
    constructor(array = [], config = {}) {
        /*
            config = {
                type: <string>::type / <array>::type,
                length: <number>::max length
            }
        */
        config = this._config = {
            type: config.type || "Any",
            length: config.length || null,
        };
        // init hooks
        this.#hooks = [];
        // construct
        this.construct = `<${config.type}>FastjsArray`;
        if (config.length && config.length < array.length) {
            if (!!(process.env.NODE_ENV !== 'production')) {
                console.error(_dev.error("fastjs/array/FastjsArray", `Max length of <${config.type}>FastjsArray is ` + config.length, ["constructor(array, config)", "FastjsArray"]));
            }
            array = array.slice(0, config.length);
        }
        if (config.type !== "Any") {
            array = array.filter((e) => {
                if (config.type?.includes(this._type(e))) {
                    return true;
                }
                if (!!(process.env.NODE_ENV !== 'production')) {
                    console.error(_dev.error("fastjs/array/FastjsArray", `Type of <${config.type}>FastjsArray is ` + this._type(e), ["constructor(array, config)", "FastjsArray"]));
                }
                return false;
            });
        }
        this._array = new Proxy(array, {
            set: (target, key, value) => {
                if (!this.#check(value))
                    return false;
                // @ts-ignore
                target[key] = value;
                // run hooks
                this.#hooks.forEach((e) => {
                    e(this);
                });
                return true;
            },
        });
        return new Proxy(this, {
            get: (target, key) => {
                // is number
                if (!isNaN(Number(key))) {
                    return target._array[Number(key)];
                }
                // FastjsArray.prototype --> Array.prototype --> Object.prototype --> null
                else if (target[key] === undefined) {
                    // try find from this._array
                    if (key in Array.prototype) {
                        // is func
                        if (typeof Array.prototype[key] === "function") {
                            return (...args) => {
                                return Array.prototype[key].apply(target._array, args);
                            };
                        }
                        return this._array[key];
                    }
                }
                else
                    return target[key];
            },
            set: (target, key, value) => {
                // find from array
                if (!isNaN(Number(key))) {
                    target._array[Number(key)] = value;
                }
                return true;
            }
        });
    }
    _type(arg) {
        let type = typeof arg;
        if (type === "object") {
            if (typeof Element !== "undefined" && arg instanceof Element) {
                type = "Element";
            }
            // if null
            else if (arg === null) {
                type = "Null";
            }
            else {
                type = arg.constructor.name;
            }
        }
        return type;
    }
    _config;
    // array = Proxy -> Array
    _array;
    first() {
        return this._array[0];
    }
    last() {
        return this._array[this._array.length - 1];
    }
    add(val, key = this._array.length) {
        this._array.splice(key, 0, val);
        return this;
    }
    remove(key) {
        this._array.splice(key, 1);
        return this;
    }
    each(callback) {
        this._array.forEach((e, key) => {
            callback(e, key);
        });
        return this;
    }
    toArray() {
        // throw proxy
        return [...this._array];
    }
    addHook(callback) {
        this.#hooks.push(callback);
        return this;
    }
    // private methods
    #check(item) {
        let cfg = this._config;
        // check length
        if (cfg.length && this._array.length >= cfg.length) {
            if (!!(process.env.NODE_ENV !== 'production')) {
                console.error(_dev.error("fastjs/array/FastjsArray", `Max length of <${cfg.type}>FastjsArray is ` + cfg.length, ["check(item)", "FastjsArray"]));
            }
            return false;
        }
        // check type
        const reject = () => {
            if (!!(process.env.NODE_ENV !== 'production')) {
                console.error(_dev.error("fastjs/array/FastjsArray", `TypeError: ${type}${item} cannot be an item of <${cfg.type}>FastjsArray`, ["reject()", "check(item)", "FastjsArray"]));
            }
            return false;
        };
        let type = this._type(item);
        if (cfg.type !== "Any") {
            // if cfg.type is array -> multi type
            if (Array.isArray(cfg.type)) {
                // if type is not in cfg.type ** ignore case
                if (!cfg.type.some((v) => v.toLowerCase() === type.toLowerCase())) {
                    return reject();
                }
            }
            // else
            else if (type.toLowerCase() !== cfg.type.toLowerCase()) {
                return reject();
            }
        }
        return true;
    }
}
var FastjsArray$1 = FastjsArray;

function create(array = [], config = {}) {
    return new FastjsArray$1(array, config);
}
var index$3 = {
    create
};

class FastjsDate {
    format;
    _date;
    _createAt;
    construct;
    constructor(format = "Y-M-D h:m:s", date = Date.now()) {
        this.format = format;
        if (typeof date === "string") {
            date = this.parseFormatString(format, date);
        }
        this._date = date;
        this._createAt = Date.now();
        this.construct = "FastjsDate";
    }
    padZero(number) {
        return number < 10 ? "0" + number : number.toString();
    }
    parseFormatString(formatString, dateString) {
        let isInIgnoreToken = false;
        let parsedDate = new Date();
        parsedDate.setMilliseconds(0);
        let is12Hour = "";
        let isAm = null;
        let isToken = false;
        let dateStringPointer = -1;
        const allTokens = this.getReplacement().map(replacement => replacement[0]);
        for (let i = 0; i < formatString.length; i++) {
            dateStringPointer++;
            const char = formatString[i];
            if (char === "<" || char === ">") {
                isInIgnoreToken = char === "<";
                isToken = false;
                continue;
            }
            if (isInIgnoreToken) {
                continue;
            }
            if (allTokens.includes(char)) {
                if (isToken) {
                    if (!!(process.env.NODE_ENV !== 'production')) {
                        _dev.warn("fastjs/date/FastjsDate", "Invalid format string, token cannot be adjacent", [
                            "***formatString: " + formatString,
                            "***dateString: " + dateString,
                            "private parseFormatString(formatString: string, dateString: string): number",
                            "super:", this
                        ], ["fastjs.wrong"]);
                        throw _dev.error("fastjs/date/FastjsDate", "Invalid format string, token cannot be adjacent", [
                            "private parseFormatString(formatString: string, dateString: string): number",
                            "FastjsDate.parseFormatString",
                        ]);
                    }
                    throw "fg3j";
                }
                switch (char) {
                    case "Y":
                        parsedDate.setFullYear(Number(dateString.slice(dateStringPointer, dateStringPointer + 4)));
                        dateStringPointer += 3;
                        break;
                    case "M":
                        parsedDate.setMonth(Number(dateString.slice(dateStringPointer, dateStringPointer + 2)) - 1);
                        dateStringPointer += 1;
                        break;
                    case "D":
                        parsedDate.setDate(Number(dateString.slice(dateStringPointer, dateStringPointer + 2)));
                        dateStringPointer += 1;
                        break;
                    case "H":
                        is12Hour = dateString.slice(dateStringPointer, dateStringPointer + 2);
                        dateStringPointer += 1;
                        break;
                    case "A":
                        isAm = dateString.slice(dateStringPointer, dateStringPointer + 2) === "AM";
                        dateStringPointer += 1;
                        break;
                    case "a":
                        isAm = dateString.slice(dateStringPointer, dateStringPointer + 2) === "am";
                        dateStringPointer += 1;
                        break;
                    case "h":
                        parsedDate.setHours(Number(dateString.slice(dateStringPointer, dateStringPointer + 2)));
                        dateStringPointer += 1;
                        break;
                    case "m":
                        parsedDate.setMinutes(Number(dateString.slice(dateStringPointer, dateStringPointer + 2)));
                        dateStringPointer += 1;
                        break;
                    case "s":
                        parsedDate.setSeconds(Number(dateString.slice(dateStringPointer, dateStringPointer + 2)));
                        dateStringPointer += 1;
                        break;
                    case "S":
                        parsedDate.setMilliseconds(Number(dateString.slice(dateStringPointer, dateStringPointer + 3)));
                        dateStringPointer += 2;
                        break;
                }
                isToken = true;
            }
            else {
                isToken = false;
            }
        }
        if (is12Hour) {
            if (isAm === null) {
                if (!!(process.env.NODE_ENV !== 'production')) {
                    _dev.warn("fastjs/date/FastjsDate", "Invalid format string, using 12 hours format but missing AM/PM token", [
                        "***formatString: " + formatString,
                        "***dateString: " + dateString,
                        "private parseFormatString(formatString: string, dateString: string): number",
                        "super:", this
                    ], ["fastjs.wrong"]);
                    throw _dev.error("fastjs/date/FastjsDate", "Invalid format string, using 12 hours format but missing AM/PM token", [
                        "private parseFormatString(formatString: string, dateString: string): number",
                        "FastjsDate.parseFormatString",
                    ]);
                }
                throw "2b5s";
            }
            if (isAm) {
                parsedDate.setHours(Number(is12Hour));
            }
            else {
                parsedDate.setHours(Number(is12Hour) + 12);
            }
        }
        return parsedDate.getTime();
    }
    extractIgnoreTokens(formatString) {
        let processedString = formatString;
        const ignoreTokens = formatString.match(/<.*?>/g)?.map(match => match.slice(1, -1)) || [];
        ignoreTokens.forEach((_, index) => {
            processedString = processedString.replace(/<.*?>/, `{{*${index}}}`);
        });
        return [processedString, ignoreTokens];
    }
    getReplacement(date = new Date()) {
        const replacement = [
            ["Y", date.getFullYear()],
            ["M", date.getMonth() + 1],
            ["D", date.getDate()],
            ["H", date.getHours() % 12],
            ["hh", date.getHours()],
            ["h", date.getHours()],
            ["mm", date.getMinutes()],
            ["m", date.getMinutes()],
            ["ss", date.getSeconds()],
            ["s", date.getSeconds()],
            ["S", date.getMilliseconds()],
            ["A", date.getHours() >= 12 ? "PM" : "AM"],
            ["a", date.getHours() >= 12 ? "pm" : "am"],
        ];
        return replacement.map(replacement => (replacement[0].length === 1 && typeof replacement[1] === "number") ? [replacement[0], this.padZero(replacement[1])] : replacement);
    }
    changeDate(date) {
        if (typeof date === "string") {
            date = this.parseFormatString(this.format, date);
        }
        this._date = date;
        return this;
    }
    refresh() {
        this._createAt = Date.now();
        return this;
    }
    toString(newFormat) {
        const timestamp = this.toNumber();
        const date = new Date(timestamp);
        const [formatString, ignoreTokens] = this.extractIgnoreTokens(newFormat || this.format);
        let result = formatString;
        for (const replace of this.getReplacement(date)) {
            const format = replace[0];
            const replacement = replace[1];
            result = result.replace(new RegExp(format, "g"), String(replacement));
        }
        ignoreTokens.forEach((token, index) => {
            result = result.replace(`{{*${index}}}`, `<${token}>`);
        });
        return result;
    }
    toNumber() {
        const timeLeft = Date.now() - this._createAt;
        return this._date + timeLeft;
    }
    toStringLocal(newFormat) {
        return new FastjsDate(newFormat || this.format, this._date).toString();
    }
    toNumberLocal() {
        return this._date;
    }
}
var FastjsDate$1 = FastjsDate;

const parse = (format, time) => {
    const fastjsDateObject = new FastjsDate$1(format, time);
    const dateString = fastjsDateObject.toString();
    const timestamp = fastjsDateObject.toNumber();
    return {
        timestamp,
        utcTimestamp: timestamp - (new Date().getTimezoneOffset() * 60 * 1000),
        format,
        dateString,
        utcDateString: new FastjsDate$1(format, timestamp - (new Date().getTimezoneOffset() * 60 * 1000)).toString(),
        date: new Date(timestamp)
    };
};
const parseTime = (format, time) => {
    return parse(format, time);
};
const parseDate = (format, date) => {
    return parse(format, date);
};
const string = (format, date = Date.now()) => {
    return parse(format, date).dateString;
};
const date = (format, date = Date.now()) => {
    return parse(format, date).date;
};
const reformat = (format, date, newFormat = "Y-M-D h:m:s") => {
    return new FastjsDate$1(format, date).toString(newFormat);
};
var index$2 = {
    parse,
    parseDate,
    parseTime,
    string,
    date,
    reformat
};

class FastjsDomList {
    #effect;
    construct;
    constructor(list = []) {
        if (!!(process.env.NODE_ENV !== 'production'))
            _dev.browserCheck("fastjs/dom/FastjsDomList");
        let domList = [];
        let el;
        for (el of list) {
            domList.push(new FastjsDom$1(el));
        }
        this._list = new Proxy(domList, {
            set: (target, key, value) => {
                target[Number(key)] = value;
                this.#effect();
                return true;
            }
        });
        this.length = 0;
        // effect
        this.#effect = () => {
            // mount domList: Array<Element> -> this
            this._list.forEach((e, key) => {
                this[key] = e;
            });
            // length
            this.length = this._list.length;
        };
        this.#effect();
        // construct
        this.construct = 'FastjsDomList';
        return this;
    }
    _list;
    length;
    // methods
    add(el) {
        this._list.push(el instanceof FastjsDom$1 ? el : new FastjsDom$1(el));
        return this;
    }
    bind(bind, key, object = {}, isAttr = false) {
        this._list.forEach((e) => {
            object = e.bind(bind, String(key), object, isAttr);
        });
        return object;
    }
    css(key, value, other) {
        this._list.forEach((e) => {
            if (typeof key === 'object')
                e.css(key);
            else
                e.css(key, value || "", other);
        });
        return this;
    }
    delete(key, deleteDom = false) {
        if (deleteDom)
            this._list[key].remove();
        this._list.splice(key, 1);
        return this;
    }
    each(callback) {
        this._list.forEach((e, index) => {
            callback(e, e.el(), index);
        });
        return this;
    }
    el(key = 0) {
        return this._list[key].el();
    }
    father() {
        return this._list[0].father();
    }
    get(key, index = 0) {
        // get()
        // get a value of element
        return this._list[index || 0].get(key);
    }
    getEl(key = 0) {
        // overflow
        if (key >= this._list.length)
            if (!!(process.env.NODE_ENV !== 'production'))
                _dev.warn('FastjsDomList', 'key is overflow', [
                    "*key: " + key,
                    "*length: " + this._list.length,
                    "getEl(key: number): FastjsDom",
                    "super", this
                ], ["fastjs.warn"]);
        return this._list[key || 0];
    }
    html(val) {
        if (val === undefined)
            return this._list[0].html();
        this._list.forEach((e) => {
            e.html(val);
        });
        return this;
    }
    next(el) {
        return selector(el, this.toArray().map((e) => e.el()));
    }
    on(event = "click", callback) {
        this._list.forEach((e) => {
            e.on(event, callback);
        });
        return this;
    }
    off(event = "click", callback) {
        this._list.forEach((e) => {
            e.off(event, callback);
        });
        return this;
    }
    remove(key, dontDelete = false) {
        if (key !== undefined) {
            // remove in dom
            this._list[key].remove();
            // delete this[key];
            if (!dontDelete)
                this._list.splice(key, 1);
            return this;
        }
        this._list.forEach((e) => {
            e.remove();
        });
        return null;
    }
    set(key, val, el) {
        if (el === undefined)
            // set for all elements
            this.each((e) => {
                e.set(key, val);
            });
        else
            // getEl(key) -> FastjsDom -> set val
            this.getEl(el).set(key, val);
        return this;
    }
    text(val) {
        if (val === undefined)
            return this._list[0].text();
        this._list.forEach((e) => {
            e.text(val);
        });
        return this;
    }
    toArray() {
        return this._list;
    }
    toElArray() {
        return this._list.map((e) => e.el());
    }
    val(val, key) {
        const set = (val, el) => void el.val(val);
        // get value
        if (typeof val !== 'string')
            return this._list[val || 0].val();
        if (key === undefined) {
            this._list.forEach(el => set(val, el));
        }
        else {
            set(val, this._list[key]);
        }
        return this;
    }
}
var FastjsDomList$1 = FastjsDomList;

var FastjsExpression;
(function (FastjsExpression) {
    FastjsExpression["Equal"] = "equal";
    FastjsExpression["NotEqual"] = "notEqual";
    FastjsExpression["TypeEqual"] = "typeEqual";
    FastjsExpression["TypeNotEqual"] = "typeNotEqual";
    FastjsExpression["ModuleEqual"] = "moduleEqual";
    FastjsExpression["ModuleNotEqual"] = "moduleNotEqual";
})(FastjsExpression || (FastjsExpression = {}));
class FastjsBaseModule {
    setCustomProp(name, value) {
        this[name] = value;
        return this;
    }
    setCustomProps(props) {
        for (const key in props) {
            this[key] = props[key];
        }
        return this;
    }
    getCustomProp(name) {
        return this[name];
    }
    setCustomEvent(name, func, setup = false) {
        this[name] = func;
        if (setup)
            func(this);
        return this;
    }
    callCustomEvent(name, ...args) {
        this[name](this, ...args);
        return this;
    }
    then(func, time = 0) {
        const callback = () => func(this);
        time === 0 ? callback() : setTimeout(callback, time);
        return this;
    }
    determine(value, expression) {
        let result;
        switch (expression) {
            case FastjsExpression.Equal:
                result = value === this;
                break;
            case FastjsExpression.NotEqual:
                result = value !== this;
                break;
            case FastjsExpression.TypeEqual:
                result = typeof value === typeof this;
                break;
            case FastjsExpression.TypeNotEqual:
                result = typeof value !== typeof this;
                break;
            case FastjsExpression.ModuleEqual:
                result = value === this.constructor;
                break;
            case FastjsExpression.ModuleNotEqual:
                result = value !== this.constructor;
                break;
            default:
                if (!!(process.env.NODE_ENV !== 'production')) {
                    _dev.warn("fastjs/base/FastjsBaseModule", "Invalid expression", [
                        "***expression: " + expression,
                        "value: " + value,
                        "determine<T extends keyof FastjsExpressionResult>(expression: T, value: FastjsExpressionResult[T]): FastjsExpressionResult[T]",
                        "FastjsBaseModule.determine",
                    ], ["fastjs.wrong"]);
                    throw _dev.error("fastjs/base/FastjsBaseModule", "Invalid expression", [
                        "determine<T extends keyof FastjsExpressionResult>(expression: T, value: FastjsExpressionResult[T]): FastjsExpressionResult[T]",
                        "FastjsBaseModule.determine",
                    ]);
                }
                throw "t33q";
        }
        return result;
    }
}

var PushTarget;
(function (PushTarget) {
    PushTarget["firstElementChild"] = "firstElementChild";
    PushTarget["lastElementChild"] = "lastElementChild";
    PushTarget["beforeElement"] = "beforeElement";
    PushTarget["afterElement"] = "afterElement";
    PushTarget["replaceElement"] = "replaceElement";
})(PushTarget || (PushTarget = {}));
var InsertTarget;
(function (InsertTarget) {
    InsertTarget["first"] = "first";
    InsertTarget["last"] = "last";
    InsertTarget["random"] = "random";
})(InsertTarget || (InsertTarget = {}));

class FastjsDom extends FastjsBaseModule {
    construct = "FastjsDom";
    _events = [];
    constructor(el, p) {
        super();
        if (!!(process.env.NODE_ENV !== 'production'))
            _dev.browserCheck("fastjs/dom/FastjsDom");
        if (!!(process.env.NODE_ENV !== 'production') && el instanceof FastjsDom) {
            _dev.warn("fastjs/dom/FastjsDom", "wtf are you doing? el is already a FastjsDom", [
                "*el:", el,
                "constructor(**el: FastjsDom | HTMLElement | Element | string**, properties?: FastjsDomProps)",
                "super:", this
            ], ["fastjs.wrong"]);
        }
        el = el instanceof FastjsDom ? el.el() : el;
        // if string
        if (typeof el === "string") {
            // create element
            this._el = document.createElement(el);
            if (p) {
                let key;
                for (key in p) {
                    const value = p[key];
                    if (value === undefined)
                        continue;
                    switch (key) {
                        case "html":
                            this.html(p[key]);
                            break;
                        case "text":
                            this.text(p[key]);
                            break;
                        case "css":
                            this.setStyle(p[key]);
                            break;
                        case "class":
                        {
                            if (typeof value === "string")
                                this.setClass(value.split(" "));
                            else if (Array.isArray(value))
                                this.setClass(value);
                        }
                            break;
                        case "attr":
                        {
                            let attrKey;
                            for (attrKey in p[key]) {
                                this.setAttr(attrKey, p[key]?.[attrKey]);
                            }
                        }
                            break;
                        case "value":
                            this.val(p[key]);
                            break;
                        default:
                            this.set(key, p[key]);
                            break;
                    }
                }
            }
        }
        else if (el instanceof HTMLElement) {
            this._el = el;
        }
        else if (!!(process.env.NODE_ENV !== 'production')) {
            _dev.warn("fastjs/dom/FastjsDom", `el is not **HTMLElement or string**, instead of **${typeof el}**`, [
                "*el: ", el,
                "properties: ", p,
                "constructor(**el: FastjsDom | HTMLElement | Element | string**, properties?: FastjsDomProps)",
                "super: ", this
            ], ["fastjs.right", "fastjs.wrong"]);
            throw _dev.error("fastjs/dom/FastjsDom", "el is not HTMLElement or string, instead of " + typeof el, [
                "constructor(el: FastjsDom | HTMLElement | Element | string, properties?: FastjsDomProps)",
                "FastjsDom.constructor",
            ]);
        }
        else
            throw "6e2s";
        // construct
        this.construct = "FastjsDom";
        return this;
    }
    _el;
    getAttr(keyOrCallback, callback) {
        const getAttrProxy = () => {
            const arr = [...this._el.attributes];
            const obj = {};
            arr.forEach((v) => {
                obj[v.name] = v.value;
            });
            return new Proxy(obj, {
                set: (target, key, value) => {
                    this.setAttr(key, value);
                    return Reflect.set(target, key, value);
                }
            });
        };
        if (typeof keyOrCallback === "string")
            if (callback)
                callback(this._el.getAttribute(keyOrCallback));
            else
                return this._el.getAttribute(keyOrCallback);
        else if (typeof keyOrCallback === "function")
            keyOrCallback(getAttrProxy());
        else
            return getAttrProxy();
        return this;
    }
    setAttr(keyOrMap, value) {
        if (typeof keyOrMap === "object") {
            for (let key in keyOrMap) {
                this.setAttr(key, keyOrMap[key]);
            }
        }
        else {
            const key = keyOrMap;
            if (value === null)
                this._el.removeAttribute(key);
            else
                this._el.setAttribute(key, value);
        }
        return this;
    }
    getStyle(keyOrCallback, callback) {
        const getStyleProxy = () => {
            const handler = {
                set: (target, key, value) => {
                    if (!Number.isNaN(Number(key)))
                        this.setStyle(key, value);
                    return Reflect.set(target, key, value);
                }
            };
            return new Proxy(this._el.style, handler);
        };
        if (typeof keyOrCallback === "string")
            if (callback)
                callback(this._el.style.getPropertyValue(keyOrCallback));
            else
                return this._el.style.getPropertyValue(keyOrCallback);
        else if (typeof keyOrCallback === "function")
            keyOrCallback(getStyleProxy());
        else
            return getStyleProxy();
        return this;
    }
    setStyle(keyOrMapOrString, value, other = false) {
        if (typeof keyOrMapOrString === "object") {
            let k;
            for (k in keyOrMapOrString) {
                this.setStyle(k, keyOrMapOrString[k]);
            }
        }
        else if (!value) {
            this._el.style.cssText = keyOrMapOrString;
        }
        else {
            const key = keyOrMapOrString;
            this.get("style").setProperty(key, value, other ? "important" : "");
        }
        return this;
    }
    el() {
        return this._el;
    }
    each(callback, deep = false) {
        const each = (el, index) => {
            callback(new FastjsDom(el), el, index);
            if (deep)
                for (let i = 0; i < el.children.length; i++) {
                    each(el.children[i], i);
                }
        };
        each(this._el, 0);
        return this;
    }
    focus() {
        this._el.focus();
        return this;
    }
    firstChild() {
        return this._el.firstElementChild ? new FastjsDom(this._el.firstElementChild) : null;
    }
    lastChild() {
        return this._el.lastElementChild ? new FastjsDom(this._el.lastElementChild) : null;
    }
    children() {
        return new FastjsDomList$1([...this._el.children]);
    }
    father() {
        return new FastjsDom(this.get("parentElement"));
    }
    get(key) {
        return this._el[key];
    }
    html(val) {
        // if null -> not change || String(val)
        return val === undefined ? this.get("innerHTML") : this.set("innerHTML", val);
    }
    last() {
        return this._el.lastElementChild ? new FastjsDom(this._el.lastElementChild) : null;
    }
    next(selector$1) {
        return selector(selector$1, this._el);
    }
    push(el = document.body, callbackOrTarget = PushTarget.lastElementChild, target = PushTarget.lastElementChild, clone = false) {
        const solve = (result) => {
            if (typeof callbackOrTarget !== "function")
                return result;
            callbackOrTarget(result);
            return this;
        };
        const _target = typeof callbackOrTarget === "function" ? target : callbackOrTarget;
        el = el instanceof FastjsDom || el instanceof FastjsDomList$1 ? el.el() : el;
        // const node = (typeof target === "boolean" ? target : clone) ? this._el.cloneNode(true) as HTMLElement : this._el;
        let node;
        if (typeof target === "boolean" ? target : clone) {
            node = this._el.cloneNode(true);
            // copy events
            this._events.forEach((v) => {
                node.addEventListener(v.type, v.trigger);
            });
        }
        else
            node = this._el;
        if (el.parentElement === null) {
            if (!!(process.env.NODE_ENV !== 'production')) {
                let callback = typeof callbackOrTarget === "function" ? callbackOrTarget : undefined;
                _dev.warn("fastjs/dom/push", "el.parentElement is null, did you pass the **document object** or is this element **exist in document**?", [
                    "*el:", el,
                    "target: Fastjs.PushTarget." + target,
                    "clone: " + clone,
                    "callback: " + callback,
                    "push<T extends PushTarget>(**el?: HTMLElement | FastjsDomList | FastjsDom**, target?: T, clone?: boolean): PushReturn<T>",
                ], ["fastjs.warn", "fastjs.warn", "fastjs.wrong"]);
                throw _dev.error("fastjs/dom/push", "el.parentElement can't be null", [
                    "push<T extends PushTarget>(el?: HTMLElement | FastjsDomList | FastjsDom, target?: T, clone?: boolean): PushReturn<T>",
                    "FastjsDom.push",
                ]);
            }
            throw "hg42";
        }
        // if replace
        if (_target === PushTarget.replaceElement) {
            const replaced = el.parentElement.replaceChild(node, el);
            const newEl = new FastjsDom(node);
            return solve({
                isReplace: true,
                newElement: newEl,
                oldElement: new FastjsDom(replaced),
                index: newEl.father()?.children().toElArray().indexOf(node),
                el: newEl,
                origin: this,
                father: newEl.father()
            });
        }
        else {
            let added;
            switch (_target) {
                case PushTarget.firstElementChild:
                    added = el.insertBefore(node, el.firstElementChild);
                    break;
                case PushTarget.lastElementChild:
                    added = el.appendChild(node);
                    break;
                case PushTarget.beforeElement:
                    added = el.parentElement.insertBefore(node, el);
                    break;
                case PushTarget.afterElement:
                    added = el.parentElement.insertBefore(node, el.nextSibling);
                    break;
            }
            const newEl = new FastjsDom(added);
            return solve({
                isReplace: false,
                index: newEl.father()?.children().toElArray().indexOf(added),
                el: newEl,
                origin: this,
                father: newEl.father()
            });
        }
    }
    insert(el = document.body, callbackOrTarget = InsertTarget.last, target = InsertTarget.last, clone = true) {
        const solve = (result) => {
            if (typeof callbackOrTarget !== "function")
                return result;
            callbackOrTarget(result);
            return this;
        };
        const _target = typeof callbackOrTarget === "function" ? target : callbackOrTarget;
        el = el instanceof HTMLElement ? el : el.el();
        const node = (typeof target === "boolean" ? target : clone) ? el.cloneNode(true) : el;
        let added;
        switch (_target) {
            case InsertTarget.first:
                added = this._el.insertBefore(node, this._el.firstElementChild);
                break;
            case InsertTarget.last:
                added = this._el.appendChild(node);
                break;
            case InsertTarget.random:
                added = this._el.insertBefore(node, this._el.children[Math.floor(Math.random() * this._el.children.length)]);
                break;
        }
        const newEl = new FastjsDom(added);
        return solve({
            index: this.children().toElArray().indexOf(added),
            added: newEl,
            origin: this
        });
    }
    addEvent(event = "click", callback) {
        let eventTrig = (event) => callback(this, event);
        this._events.push({
            type: event,
            callback: callback,
            trigger: eventTrig,
            remove: () => {
                this.removeEvent(callback);
            }
        });
        this._el.addEventListener(event, eventTrig);
        return this;
    }
    getEvent(typeOrCallback, callback) {
        if (typeof typeOrCallback === "string")
            if (callback)
                callback(this._events.find((v) => v.type === typeOrCallback)?.callback || null);
            else
                return this._events.find((v) => v.type === typeOrCallback)?.callback || null;
        else if (typeof typeOrCallback === "function")
            typeOrCallback(this._events);
        else
            return this._events;
        return this;
    }
    removeEvent(typeOrKeyOrCallback, key) {
        if (!!(process.env.NODE_ENV !== 'production')) {
            if (typeOrKeyOrCallback === undefined) {
                _dev.warn("fastjs/dom/removeEvent", "You are removing **all events**, make sure you want to do this.", [
                    "***No Any Argument",
                    "*removeEvent(): FastjsDom",
                    "super:", this
                ], ["fastjs.warn"]);
            }
            if (typeof typeOrKeyOrCallback === "string" && key === undefined) {
                _dev.warn("fastjs/dom/removeEvent", "You are removing **all events** with type " + typeOrKeyOrCallback + ", make sure you want to do this.", [
                    "*type: " + typeOrKeyOrCallback,
                    "*removeEvent(key: keyof HTMLElementEventMap): FastjsDom",
                    "super:", this
                ], ["fastjs.warn"]);
            }
        }
        if (typeof typeOrKeyOrCallback === "string")
            if (key !== undefined) {
                this._el.removeEventListener(typeOrKeyOrCallback, this._events.filter((v) => v.type === typeOrKeyOrCallback)[key].trigger);
                this._events.splice(key, 1);
            }
            else
                this._events.filter((v) => v.type === typeOrKeyOrCallback).forEach((v) => {
                    this._el.removeEventListener(v.type, v.trigger);
                    this._events.splice(this._events.indexOf(v), 1);
                });
        else if (typeof typeOrKeyOrCallback === "number") {
            this._el.removeEventListener(this._events[typeOrKeyOrCallback].type, this._events[typeOrKeyOrCallback].trigger);
            this._events.splice(typeOrKeyOrCallback, 1);
        }
        else if (typeof typeOrKeyOrCallback === "function") {
            this._events.filter((v) => v.callback === typeOrKeyOrCallback).forEach((v) => {
                this._el.removeEventListener(v.type, v.trigger);
                this._events.splice(this._events.indexOf(v), 1);
            });
        }
        else {
            this._events.forEach((v) => {
                v.remove();
            });
            this._events = [];
        }
        return this;
    }
    remove() {
        this._el.remove();
        return this;
    }
    set(key, val) {
        if (findPropInChain(this._el.constructor.prototype, key)?.writable ||
            findPropInChain(this._el.constructor.prototype, key)?.set) {
            this._el[key] = val;
        }
        else if (!!(process.env.NODE_ENV !== 'production'))
            _dev.warn("fastjs/dom/set", `key **${key}** is not writable`, [
                "*key: " + key,
                "set<T extends keyof HTMLElement>(**key: T**, val: HTMLElement[T]): FastjsDom",
                "super:", this
            ], ["fastjs.warn"]);
        return this;
        function findPropInChain(obj, prop) {
            while (obj !== null) {
                const desc = Object.getOwnPropertyDescriptor(obj, prop);
                if (desc)
                    return desc;
                obj = Object.getPrototypeOf(obj);
            }
            return null;
        }
    }
    text(val) {
        // if null -> not change || String(val)
        return val === undefined ? this.get("innerText") : this.set("innerText", val);
    }
    val(val) {
        const btn = this._el instanceof HTMLButtonElement;
        if (this._el instanceof HTMLInputElement || this._el instanceof HTMLTextAreaElement || this._el instanceof HTMLButtonElement) {
            // if val and is button || input || textarea
            if (val === undefined) {
                return btn ? this._el.innerText : this._el.value;
            }
            else {
                if (btn)
                    this._el.innerText = val;
                else
                    this._el.value = val;
            }
        }
        else if (!!(process.env.NODE_ENV !== 'production')) {
            _dev.warn("fastjs/dom/val", `This element is not a **input or textarea or button**, instanceof **${this._el.constructor.name}**`, [
                "*super._el: ", this._el,
                "val(): string",
                "val(val: string): FastjsDom",
                "super:", this
            ], ["fastjs.right", "fastjs.warn"]);
        }
        return this;
    }
    addClass(className) {
        if (typeof className === "string") {
            [...arguments].forEach((v) => {
                v.split(" ").forEach((v) => {
                    this.setClass(v, true);
                });
            });
        }
        else
            this.setClass(className);
        return this;
    }
    clearClass() {
        return this.removeClass(...this._el.classList);
    }
    removeClass(className) {
        const classList = Array.isArray(className) ? className : [...arguments];
        classList.forEach((v) => {
            this.setClass(v, false);
        });
        return this;
    }
    setClass(classNames, value = true) {
        if (typeof classNames === "string")
            this._el.classList[value ? "add" : "remove"](classNames);
        else if (Array.isArray(classNames))
            classNames.forEach((v) => {
                this._el.classList.add(v);
            });
        else if (typeof classNames === "object")
            Object.entries(classNames).forEach((v) => {
                this._el.classList[v[1] ? "add" : "remove"](v[0]);
            });
        else
            this._el.classList.remove(...this._el.classList);
        return this;
    }
    getClass(classNameOrCallback, callback) {
        const getClassProxy = () => {
            const handler = {
                set: (target, key, value) => {
                    if (!Number.isNaN(Number(key)))
                        this.setClass(value);
                    return Reflect.set(target, key, value);
                }
            };
            return new Proxy([...this._el.classList], handler);
        };
        if (typeof classNameOrCallback === "string")
            if (callback)
                callback(this._el.classList.contains(classNameOrCallback));
            else
                return this._el.classList.contains(classNameOrCallback);
        else if (typeof classNameOrCallback === "function")
            classNameOrCallback(getClassProxy());
        else
            return getClassProxy();
        return this;
    }
}
var FastjsDom$1 = FastjsDom;

function selector(selector = "body", parent = document) {
    if (!!(process.env.NODE_ENV !== 'production'))
        _dev.browserCheck("fastjs/dom/selector");
    const specialStatements = ["body", "head"];
    const result = [];
    Array.isArray(parent) ? parent.forEach((e) => {
        result.push(...queryResultToArray(e.querySelectorAll(selector)));
    }) : result.push(...queryResultToArray(parent.querySelectorAll(selector)));
    if (result.length === 0)
        return null;
    if (selector.includes(`#${result[0].id}`) || specialStatements.includes(selector))
        return new FastjsDom$1(result[0]);
    const list = [];
    result.forEach((e) => {
        list.push(e);
    });
    return new FastjsDomList$1(list);
    function queryResultToArray(queryResult) {
        const result = [];
        queryResult.forEach((e) => {
            result.push(e);
        });
        return result;
    }
}

var index = {
    select: selector,
    newEl: (el, properties) => new FastjsDom$1(el, properties),
    newElList: (list) => new FastjsDomList$1(list)
};

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FastjsDom: FastjsDom$1,
    FastjsDomList: FastjsDomList$1,
    default: index,
    selector: selector
});

async function copy(text) {
    const input = await createDomElement(text);
    const selection = selectText(input);
    copyToClipboard(selection);
    input.remove();
    async function createDomElement(text) {
        const { FastjsDom } = await Promise.resolve().then(function () { return index$1; });
        let input = new FastjsDom("span");
        input.html(replaceNewLinesAndSpaces(text)).push();
        return input._el;
        function replaceNewLinesAndSpaces(text) {
            return text.replace(/\n/g, "<br>").replace(/ /g, "&nbsp;");
        }
    }
    function selectText(element) {
        const range = document.createRange();
        range.setStart(element, 0);
        range.setEnd(element, element.childNodes.length);
        const selection = window.getSelection();
        if (!selection)
            return null;
        selection.removeAllRanges();
        selection.addRange(range);
        return selection;
    }
    function copyToClipboard(selection) {
        if (!selection) {
            if (!!(process.env.NODE_ENV !== 'production')) {
                _dev.warn("fastjs/utils/copy", "selection is null");
            }
            return;
        }
        document.execCommand("copy");
    }
}
function rand(min, max, decimal = 0) {
    return (Math.random() * (max - min) + min).toFixed(decimal);
}
var utils = {
    copy,
    rand
};

// all modules
if (!!(process.env.NODE_ENV !== 'production')) {
    console.info("You are running fastjs in development mode.\n" +
        "Make sure to use the production build (*.prod.js) when deploying for production.");
}

export { FastjsArray$1 as FastjsArray, FastjsDate$1 as FastjsDate, FastjsDom$1 as FastjsDom, FastjsDomList$1 as FastjsDomList, FastjsExpression, InsertTarget, PushTarget, index$3 as array, copy, index$2 as date, index as dom, rand, index$4 as request, utils };

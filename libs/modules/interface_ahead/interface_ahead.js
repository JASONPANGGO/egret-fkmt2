/**
 * 写在前面的接口函数
 * @file {interface_ahead.js}
 */

/**
 * 通过key获取64位资源
 * @param {string} key
 */
function getAssestByKey(key) {
    if (window.assetsPackage) {
        return window.assetsPackage[key];
    }
}

/**
 * 通过路径获取64位资源
 * @param {string} url
 */
function getAssestByUrl(url) {
    if (window.assetsPackage) {
        var arr = url.split("\/");
        url = arr[arr.length - 1];
        var key = url.replace(".", "_");
        if (url.indexOf("mp4") > -1) {
            url = "data:video/mp4;base64," + window.assetsPackage[key];
        }
        /* else if (url.indexOf("mp3") > -1) {
            url = "data:audio/mp3;base64," + window.assetsPackage[key];
        } */
        else {
            url = window.assetsPackage[key];
        }
    }
    return url;
}

/**
 * base64转二进制
 */
function basedecode(base64) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var lookup = new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
    }

    var bufferLength = base64.length * 0.75;
    var len = base64.length;
    var p = 0;
    var encoded1 = 0;
    var encoded2 = 0;
    var encoded3 = 0;
    var encoded4 = 0;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    var arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);
    for (var i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
}

/**
 * 获取查询字符串
 * @param {string} name 需要查询的字符串
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return window.unescape(r[2]);
    return null;
}
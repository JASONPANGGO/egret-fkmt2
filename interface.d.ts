// Type definitions for ./append/interface.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * 获取64位资源
 * @param {string} key
 * @param key 
 */
declare function getAssestByKey(key : string): void;

/**
 * 埋点
 * @param {number} id action.json 上配置的 action[id]
 * @description 本地调用: SDK内部函数
 * @file {action.json}
 * @param id 
 */
declare function sendAction(id : number): void;

/**
 * 游戏开始
 * @description 本地: 作window.load()回调, SDK: 内部回调
 */
declare function gameStart(): void;

/**
 * 获取查询字符串
 * @param {string} name 需要查询的字符串
 * @description SDK: 内部回调
 * @param name 
 */
declare function getQueryString(name : string): void;

/**
 * 游戏结束
 * @description SDK: 内部回调
 */
declare function gameClose(): void;

/**
 * 游戏资源加载完成，准备启动游戏
 * @description SDK: 上报需要
 */
declare function ready(): void;

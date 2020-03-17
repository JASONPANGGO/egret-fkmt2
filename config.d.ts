// Type definitions for ./append/config.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * 常量配置表 (业务层)
 * @file {config.js}
 * @description 业务层常量配置放这里，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 * @description {G_Const.ts} 框架层常量配置放 G_Const.ts，一般改动不大，只做拓展多。
 */
declare namespace gConst {

	/**
	 * 测试模式
	 */
	export var testModel: boolean;

	/**
	 * 打包提测模式，用于提测时需要规避的一些事情
	 */
	export var packModel: boolean;

	/**
	 * 第一次引导时间
	 */
	export var firstGuideTimer: number;

	/**
	 * 之后引导时间
	 */
	export var afterGuideTimer: number;

	/**
	 * 播放方块间隔
	 */
	export var blockInterval: number;

	/**
	 * 播放发光方块间隔
	 */
	export var lightInterval: number;

	/**
	 * 弹出下一关提示页面延迟时间
	 */
	export var nextTipsTimer: number;

	/**
	 * 拖拽操作，最小滑动距离
	 */
	export var dragDist: number;

	/**
	 * 
	 */
	export var logModel: boolean;

	/**
	 * 最大失败次数
	 */
	export var maxFailCnt: number;
}

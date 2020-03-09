/**
 * 常量配置表 (框架层)
 * @file {G_Const.ts}
 * @description 框架层常量配置放这里，一般改动不大，只做拓展多。
 * @description {config.js} 业务层常量配置放 config.js，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 */

namespace gConst {
	/**
	 * 指派事件类型
	 */
	export const eventType = {
		GUIDE_TOUCH_ONE: "guide_touch_one", //每引导按下一次
		GUIDE_STOP: "guide_stop", //引导结束
		IM_COMPLETE: "in_complete", //进场完成
		IN_LOOP_COMPLETE: "in_loop_complete", //多个进场循环完成
		OUT_COMPLETE: "out_complete", //出场完成
		OUT_LOOP_COMPLETE: "out_loop_complete", //多个出场循环完成
		CHOOSE_COMPLETE: "choose_complete", //切换状态完成
		CHOOSE_LOOP_COMPLETE: "choose_loop_complete", //多个切换状态循环完成

		//游戏场景
		SHOW_BLACK: "show_black", //显示黑色层
		HIDE_BLACK: "hide_black", //隐藏黑色层

		//Ui界面
		UI_CLOSE: "ui_close", //关闭Ui界面
	}

	/**
	 * 方位
	 */
	export const direction = {
		CENTER_CENTER: "center_center", //中心 ※
		LEFT_TOP: "left_top",			//左上 ↖
		CENTER_TOP: "center_top",		//中上 ↑
		RIGHT_TOP: "right_top",			//右上 ↗
		RIGHT_CENTER: "right_center",	//右中 →
		RIGHT_BOTTOM: "right_bottom",	//右下 ↘
		CENTER_BOTTOM: "center_bottom",	//中下 ↓
		LEFT_BOTTOM: "left_bottom",		//左下 ↙
		LEFT_CENTER: "left_center",		//左中 ←
	}

	/**
	 * 皮肤名
	 */
	export const skin = {
		SCENE: "game_scene", //游戏场景
		FIRST: "first_view", //顶层页面
		START: "start_view", //开始页面
		END: "end_view", //结束页
		GUIDE: "guide_com", //引导组件

		CHAT: "chat_view", //对话页面
		NEXT_TIPS: "next_tips_view", //下一关提示页面

		GRID: "grid_com", //格子
	}

	/**
	 * 类名
	 */
	export const className = {
		EMPTY: "UiFileEmpty", //UI文件（空，可作模板用）
		SCENE: "GameScene", //游戏场景
		FIRST: "UiFirstView", //顶层页面
		START: "UiStartView", //顶层页面
		END: "UiEndView", //结束页
	}

	/**
	 * 屏幕类型
	 */
	export const enum screen {
		WIDTH = 750, //宽度
		HEIGHT = 1334, //高度
	}

	/**
	 * 屏幕类型
	 */
	export const enum screenType {
		HORIZONTAL = 0, //横屏
		VERTICAL = 1, //竖屏
	}

	/**
	 * 设备类型
	 */
	export const enum mobileType {
		IPHONE_X = 1, //iPhoneX或以上
		IPHONE_8 = 2, //iPhone8或以下
		IPAD = 3, //iPad或其它
	}

	/**
	 * 设备类型对应整体缩放倍数
	 */
	export const mobileByScale = {
		//竖屏
		[gConst.screenType.VERTICAL]: {
			[gConst.mobileType.IPHONE_X]: 1, //iPhoneX或以上
			[gConst.mobileType.IPHONE_8]: 1, //iPhone8或以下
			[gConst.mobileType.IPAD]: 0.7, //iPad或其它
		},
		//横屏
		[gConst.screenType.HORIZONTAL]: {
			[gConst.mobileType.IPHONE_X]: 0.9, //iPhoneX或以上
			[gConst.mobileType.IPHONE_8]: 0.9, //iPhone8或以下
			[gConst.mobileType.IPAD]: 0.7, //iPad或其它
		}
	}

	/**
	 * 点击动画类型
	 */
	export const enum clkAimType {
		HIDE = 0, //隐藏
		SCALE = 1, //缩放
	}

	/**
	 * 结束页类型
	 */
	export const enum endType {
		FAIL = 0, //失败
		VICTORY = 1, //胜利
		INIT = 2, //初始化
	}

	/**
	 * 滑动方向
	 */
	export const enum moveDir {
		TOP = 0, //上
		RIGHT = 1, //右
		BOTTOM = 2, //下
		LEFT = 3 //左
	}

	/**
	 * 方块滑动路线
	 */
	export const blockData = {
		[gConst.moveDir.LEFT]: {
			idxs: [1, 2],
			face: { x: 290, y: 419 },
			brick: 0,
			//正确路线
			[gConst.moveDir.BOTTOM]: {
				idxs: [3],
				face: { x: 290, y: 525 },
				[gConst.moveDir.LEFT]: {
					idxs: [4],
					face: { x: 187, y: 526 },
					[gConst.moveDir.TOP]: {
						idxs: [5, 6, 7, 8],
						face: { x: 168, y: 66 },
						[gConst.moveDir.LEFT]: {
							idxs: [9],
							face: { x: 68, y: 66 },
							[gConst.moveDir.BOTTOM]: {
								idxs: [10, 11],
								face: { x: 65, y: 282 },
								right: true
							}
						}
					}
				}
			},
			//错误路线
			[gConst.moveDir.LEFT]: {
				idxs: [12],
				face: { x: 179, y: 419 },
				//错误分支1
				[gConst.moveDir.BOTTOM]: {
					idxs: [13],
					face: { x: 179, y: 526 },
					[gConst.moveDir.RIGHT]: {
						idxs: [14],
						face: { x: 286, y: 526 },
						right: false
					}
				},
				//错误分支2
				[gConst.moveDir.TOP]: {
					idxs: [6, 7, 8],
					face: { x: 168, y: 66 },
					[gConst.moveDir.LEFT]: {
						idxs: [9],
						face: { x: 68, y: 66 },
						[gConst.moveDir.BOTTOM]: {
							idxs: [10, 11],
							face: { x: 65, y: 282 },
							right: true
						}
					}
				}
			}
		}
	};


	//播放方块间隔
	gConst.blockInterval = 80;

	// 播放发光方块间隔
	gConst.lightInterval = 50;

	// 弹出下一关提示页面延迟时间
	gConst.nextTipsTimer = 300;

	//拖拽操作，最小滑动距离
	gConst.dragDist = 40;
}
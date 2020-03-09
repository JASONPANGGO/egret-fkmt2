/**
 * 游戏管理器
 * @description 主场景界面、游戏场景相关配置
 */
class GameMgr {
	public static showRect: egret.Rectangle;
	public static stage: egret.Stage;

	public static screenType: gConst.screenType = null; //横竖屏类型
	public static mobileType: gConst.mobileType = null; //设备类型

	public static bg: eui.Image;

	public static awardCnt: number = 0;

	public static isDrag: boolean = false;

	public static lan: string = "us";


	public static scale: number;

	public static replay: boolean = false;
	public static gameview: GameScene;
	public static isReset: boolean = false; //是否是重玩
}
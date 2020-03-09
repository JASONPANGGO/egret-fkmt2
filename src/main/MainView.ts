/**
 * 主场景界面
 */
class MainView extends eui.Component {
	private curw: number;
	public constructor() {
		super();
		GameMgr.gameview = new GameScene()
		this.addChild(GameMgr.gameview)

		this.resizeView(null)


		GameMgr.stage.addEventListener(egret.Event.RESIZE, this.resizeView, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}

	private update(e): void {
		if (this.curw != window.innerWidth) {
			this.resizeView(null);
		}
	}

	public resizeView(e: egret.Event = null): void {
		var isRotate: boolean = GameMgr.screenType === null; //是否转屏，或是第一次打开界面
		var _r: number; //当前窗口宽高比
		if (GameMgr.stage.stageWidth < GameMgr.stage.stageHeight) {
			//竖屏
			if (GameMgr.screenType === gConst.screenType.HORIZONTAL) {
				isRotate = true;
			}
			GameMgr.screenType = gConst.screenType.VERTICAL;
			GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
			_r = GameMgr.stage.stageWidth / GameMgr.stage.stageHeight;
		} else {
			//横屏
			if (GameMgr.screenType === gConst.screenType.VERTICAL) {
				isRotate = true;
			}
			GameMgr.screenType = 0;
			GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
			_r = GameMgr.stage.stageHeight / GameMgr.stage.stageWidth;
		}
		GameMgr.mobileType = _r < 0.51 ? gConst.mobileType.IPHONE_X : _r < 0.65 ? gConst.mobileType.IPHONE_8 : gConst.mobileType.IPAD;

		this.curw = window.innerWidth;
		var _w: number;
		var _h: number;
		if (window.innerWidth > window.innerHeight) {
			_h = gConst.screen.WIDTH;
			_w = gConst.screen.WIDTH / window.innerHeight * window.innerWidth;
		} else {
			_w = gConst.screen.WIDTH;
			_h = gConst.screen.WIDTH / window.innerWidth * window.innerHeight;
		}
		if (GameMgr.gameview) {
			GameMgr.gameview.width = Math.ceil(_w);
			GameMgr.gameview.height = Math.ceil(_h);
			GameMgr.gameview.resizeView();
		}
		GameMgr.scale = 1;
		if (isRotate) {
			this.rotateView();
		}
	}

	/**
	 * 屏幕横竖屏转换时才调用
	 */
	public rotateView() {
		if (GameMgr.gameview) {
			GameMgr.gameview.rotateView();
		}
	}

}
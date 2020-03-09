namespace ui {
	/**
	 * UI基础文件
	 */
	export abstract class UiFileBase extends eui.Component {
		public abstract skinName: string;
		public classId: number; //不需要重写，自动设置
		public className: string; //不需要重写，自动设置
		/**
		 * 初始化
		 * @param {any[]} args show()传参会通过init()传过去
		 */
		protected abstract init(...args: any[]);
		protected abstract load(); //首次打开界面时调用
		protected abstract update(); //每次打开界面都会调用
		protected abstract removeEvent(); //移除事件
		protected abstract addEvent(); //注册事件
		protected abstract resizeView(); //窗口大小改变时调用(每次打开界面会调用一次)
		protected abstract rotateView(); //屏幕横竖屏转换时调用(每次打开界面会调用一次)

		public isLoadRes: boolean = null; //是否已loadRes()资源
		public isFirstOpen: boolean = true; //是否第一次打开界面
		public screenType: gConst.screenType = null; //横竖屏类型
		public mobileType: gConst.mobileType = null; //设备类型

		public constructor() {
			super();
			this.classId = gUiMgr.autoId.id;
			// this.className = (this as any).__proto__.__class__.split(".")[1];
			this.isFirstOpen = true;
		}

		/**
		 * 打开界面
		 * @param {any[]} args show()传参会通过init()传过去
		 */
		public open(...args: any[]) {
			if (this.className == gConst.className.FIRST) {
				GameMgr.gameview.addChild(this);
			} else {
				let UiFirst: ui.UiFirstView = gUiMgr.get(ui.UiFirstView) as ui.UiFirstView;
				if (UiFirst && UiFirst.parent) {
					//保证 UiFirstView 在最顶层
					GameMgr.gameview.addChildAt(this, GameMgr.gameview.getChildIndex(UiFirst));
				} else {
					GameMgr.gameview.addChild(this);
				}
			}
			this.init(...args);
			if (this.isFirstOpen) {
				this._initResizeView();
			}
			if (!this.isLoadRes) {
				this.isLoadRes = true;
				this.load();
			}
			this._resizeView();
			GameMgr.stage.removeEventListener(egret.Event.RESIZE, this._resizeView, this);
			GameMgr.stage.addEventListener(egret.Event.RESIZE, this._resizeView, this);
			this.update();
			this.removeEvent();
			this.addEvent();
			if (this.isFirstOpen) {
				this.isFirstOpen = false;
			}
		}

		/**
		 * 关闭界面
		 */
		public close() {
			gComMgr.rmObj(this);
			this.dispatchEventWith(gConst.eventType.UI_CLOSE);
		}

		/**
		 * 销毁界面
		 */
		public destroy() {
			let uiFile: ui.UiFileBase = gUiMgr.getByClassName(this.className);
			if (uiFile) {
				uiFile = gComMgr.rmObj(uiFile);
				gUiMgr.destroy(this.className);
				this.isLoadRes = null;
			}
		}

		/**
		 * 点击下载(SDK接口)
		 */
		public clickInstall(event: egret.TouchEvent): void {
			if (window["install"]) {
				window["install"]();
			}
		}

		/**
		 * 游戏结束(SDK接口)
		 */
		public gameEnd(): void {
			if (window["gameEnd"]) {
				window["gameEnd"]();
			}
		}

		/**
		 * 初始化窗口大小
		 */
		private _initResizeView(): boolean {
			var _w: number; //当前窗口宽度
			var _h: number; //当前窗口高度
			var _r: number; //当前窗口宽高比
			var isRotate: boolean = this.isFirstOpen; //是否第一次打开界面，或存在转屏
			if (window.innerWidth < window.innerHeight) {
				//竖屏
				if (this.screenType === gConst.screenType.HORIZONTAL) {
					isRotate = true;
				}
				this.screenType = gConst.screenType.VERTICAL;
				_w = gConst.screen.WIDTH;
				_h = gConst.screen.WIDTH / window.innerWidth * window.innerHeight;

				_r = window.innerWidth / window.innerHeight;
			} else {
				//横屏
				if (this.screenType === gConst.screenType.VERTICAL) {
					isRotate = true;
				}
				this.screenType = gConst.screenType.HORIZONTAL;
				_h = gConst.screen.WIDTH;
				_w = gConst.screen.WIDTH / window.innerHeight * window.innerWidth;

				_r = window.innerHeight / window.innerWidth;
			}
			this.width = Math.ceil(_w);
			this.height = Math.ceil(_h);
			this.mobileType = _r < 0.51 ? gConst.mobileType.IPHONE_X : _r < 0.65 ? gConst.mobileType.IPHONE_8 : gConst.mobileType.IPAD;
			return isRotate;
		}

		/**
		 * 窗口大小改变时调用
		 */
		private _resizeView(event?: egret.Event) {
			var isRotate: boolean = this._initResizeView(); //是否第一次打开界面，或存在转屏
			this.resizeView();
			if (isRotate) {
				this.rotateView();
			}
		}
	}
}
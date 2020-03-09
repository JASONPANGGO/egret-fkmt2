module ui {
	/**
	 * 结束界面
	 */
	export abstract class UiEndView extends ui.UiFile {
		public skinName: string = gConst.skin.END; //皮肤名

		public con_body: eui.Group;
		public body: eui.Image;

		public constructor() {
			super();
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args show()传参会通过init()传过去
		 */
		protected init(...args: any[]) {
			// console.log("init", ...args);
		}

		/** 
		 * 首次打开界面时调用
		*/
		protected load() {
			// console.log("load");
		}

		/** 
		 * 每次打开界面都会调用
		*/
		protected update() {
			// console.log("update");
			this.gameEnd();
			this.start();
		}

		/** 
		 * 注册事件
		*/
		protected addEvent() {
			// console.log("addEvent");
		}

		/** 
		 * 移除事件
		*/
		protected removeEvent() {
			// console.log("removeEvent");
		}

		/**
		 * 窗口大小改变时调用
		 */
		protected resizeView(): void {
			// console.log("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

			this.con_body.scaleX = this.con_body.scaleY = 1;
			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						this.con_body.scaleX = this.con_body.scaleY = 0.8;
						break;
				}
			} else {
				//横屏
				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						this.con_body.scaleX = this.con_body.scaleY = 0.8;
						break;
				}
			}
		}

		/**
		 * 屏幕横竖屏转换时调用
		 */
		protected rotateView(): void {
			// console.log("rotateView", this.screenType);
			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				this.con_body.horizontalCenter = 0;
			} else {
				//横屏
				this.con_body.horizontalCenter = NaN;
				this.con_body.x = this.width * 0.5 / this.con_body.scaleX / 2;
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		/**
		 * 开始
		 */
		private start() {
			gTween.loopFloat(this.body, -20, 1000, 0);
		}
		/* =========== 业务代码-end =========== */
	}
}
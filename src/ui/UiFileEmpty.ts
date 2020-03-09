namespace ui {
	/**
	 * UI文件（空，可作模板用）
	 */
	export class UiFileEmpty extends ui.UiFile {
		public skinName: string; //皮肤名
		public className: string; //不需要重写，自动设置

		public constructor() {
			super();
			this.className = gConst.className.EMPTY;
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
			} else {
				//横屏
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */

		/* =========== 业务代码-end =========== */
	}
}
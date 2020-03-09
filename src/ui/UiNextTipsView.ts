module ui {
	/**
	 * 下一关提示页面
	 */
	export abstract class UiNextTipsView extends ui.UiFile {
		public skinName: string = gConst.skin.NEXT_TIPS; //皮肤名

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
			this.createMask();
		}

		/** 
		 * 每次打开界面都会调用
		*/
		protected update() {
			// console.log("update");
			this.playMask();
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

			if (this.lightMask) {
				this.lightMask.setLightPos(this.width / 2, this.height / 2);
				this.lightMask.setMaskSize(this.width, this.height);
			}

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
		/**
		 * 创建挖空遮罩
		 */
		private lightMask: com.LightMask; //挖空遮罩组件
		private createMask(): void {
			this.lightMask = new com.LightMask();
			this.lightMask.setLightSize(100);
			this.lightMask.setLightPos(this.width / 2, this.height / 2);
			this.lightMask.setMaskSize(this.width, this.height);
			this.addChild(this.lightMask);
			this.lightMask.visible = false;
			this.lightMask.cirleLight.scaleX = this.lightMask.cirleLight.scaleY = 10;
		}

		/**
		 * 播放遮罩
		 */
		private playMask() {
			this.lightMask.visible = true;
			gTween.toScale(this.lightMask.cirleLight, 0, 500, 10, void 0, { duration: 50 }, {
				callback: () => {
					// GameMgr.gameview.start();
					gTween.toScale(this.lightMask.cirleLight, 10, 500, 0, void 0, void 0, {
						callback: this.close,
						thisObj: this
					});
				},
				thisObj: this
			});
		}
		/* =========== 业务代码-end =========== */
	}
}
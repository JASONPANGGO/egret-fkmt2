module ui {
	/**
	 * 开场界面
	 */
	export abstract class UiStartView extends ui.UiFile {
		public skinName: string = gConst.skin.START; //皮肤名

		public con: eui.Group;
		public con_desc: eui.Group;
		public bg: eui.Image;
		public con_btn: eui.Group;
		public con_icon_0: eui.Group;
		public con_btn_0: eui.Group;
		public icon_0: eui.Image;
		public name_0: eui.Image;
		public con_icon_1: eui.Group;
		public con_btn_1: eui.Group;
		public icon_1: eui.Image;
		public name_1: eui.Image;
		public desc_0: eui.Image;
		public desc_1: eui.Group;
		public line: eui.Image;

		public con_guide: eui.Group;

		public constructor() {
			super();
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args show()传参会通过init()传过去
		 */
		protected init() {
			// console.log("init", ...args);
		}

		/** 
		 * 首次打开界面时调用
		*/
		protected load() {
			// console.log("load");
			this.con_btn_0.name = "0";
			this.con_btn_1.name = "1";
		}

		/** 
		 * 每次打开界面都会调用
		*/
		protected update() {
			// console.log("update");
			this.startAim();
		}

		/** 
		 * 注册事件
		*/
		protected addEvent() {
			// console.log("addEvent");
			this.con_btn_0.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
			this.con_btn_1.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
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
			if (this.guideCom) {
				this.guideCom.resizeView(this.width, this.height);
			}
			// console.log("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						this.con.scaleX = this.con.scaleY = 1;
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						this.con.scaleX = this.con.scaleY = 1;
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						this.con.scaleX = this.con.scaleY = 0.8;
						break;
				}
			} else {
				//横屏
				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						this.desc_0.scaleX = this.desc_0.scaleY = 1;
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						this.desc_0.scaleX = this.desc_0.scaleY = 1;
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						this.desc_0.scaleX = this.desc_0.scaleY = 0.8;
						break;
				}
				this.con.scaleX = this.con.scaleY = 1;
			}
		}

		/**
		 * 屏幕横竖屏转换时调用
		 */
		protected rotateView(): void {
			// console.log("rotateView", this.screenType);
			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				this.con_btn.bottom = 30;
				this.con.height = 254;
				this.con_btn.width = 252;
				this.desc_0.visible = false;
				this.desc_1.visible = true;
			} else {
				//横屏
				this.con_btn.bottom = 46;
				this.con.height = 200;
				this.con_btn.width = 224;
				this.desc_0.visible = true;
				this.desc_1.visible = false;
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		public guideCom: com.GuideCom;
		/**
		 * 显示引导
		 */
		private showGuide() {
			if (!this.guideCom) {
				this.guideCom = new com.GuideCom();
			}
			// if (!GameMgr.isReset) {
			this.guideCom.setData(gConst.firstGuideTimer, { target_1: this.con_btn_0, target_2: this.con_btn_1, moveTime: 500 }, this, { waitT: 0 });
			// } else {
			// 	this.guideCom.setData(gConst.firstGuideTimer, { target_1: this.con_btn_1 }, this);
			// }
			this.guideCom.start();
		}

		/**
		 * 隐藏引导
		 */
		private hideGuide() {
			if (!this.guideCom) {
				return;
			}
			this.guideCom.stop();
		}

		/**
		 * 开始动画
		 */
		private startAim() {
			gTween.toTopShow(this.con_desc, 800, 0, 1, egret.Ease.bounceOut, void 0, {
				callback: this.start,
				thisObj: this
			});
		}

		/**
		 * 界面开始
		 */
		private start() {
			//开始按钮做呼吸效果
			gTween.loopScale(this.con_btn_0, 0.9, 1000, 1);
			gTween.loopScale(this.con_btn_1, 0.9, 1000, 1);
			this.showGuide();
		}

		/**
		 * 点击按钮
		 */
		private clickBtn(event: egret.TouchEvent) {
			// sendAction(1);
			this.hideGuide();
			let target: eui.Image = event.target;
			target.scaleX = target.scaleY = 1;
			gComMgr.clickAim(target, gConst.clkAimType.SCALE);
			// GameMgr.gameview.playArticleLoop(null, Number(target.name));
			gTween.toBottomHide(this.con_desc, 300, 0, 1, void 0, void 0, {
				callback: this.close,
				thisObj: this
			});
		}
		/* =========== 业务代码-end =========== */
	}
}
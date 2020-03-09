module ui {
	/**
	 * 对话界面
	 */
	export abstract class UiChatView extends ui.UiFile {
		public skinName: string = gConst.skin.CHAT; //皮肤名

		public con: eui.Group;
		public con_desc: eui.Group;
		public con_black: eui.Group;
		public black: eui.Image;
		public con_desc_0: eui.Group;
		public desc_0: eui.Image;
		public con_desc_1: eui.Group;
		public desc_1: eui.Image;
		public con_bg: eui.Group;
		public bg: eui.Image;
		public con_icon: eui.Group;
		public con_btn: eui.Group;
		public icon_0: eui.Image;
		public icon_1: eui.Image;

		private chatType: gConst.endType;

		public constructor() {
			super();
		}

		/* =========== 框架结构代码-start =========== */

		/**
		 * 初始化
		 * @param {any[]} args show()传参会通过init()传过去
		 */
		protected init(chatType: gConst.endType) {
			// console.log("init", ...args);
			this.chatType = chatType;
		}

		/** 
		 * 首次打开界面时调用
		*/
		protected load() {
			// console.log("load");
			this.con_btn.touchChildren = false;
		}

		/** 
		 * 每次打开界面都会调用
		*/
		protected update() {
			// console.log("update");
			this.start();
		}

		/** 
		 * 注册事件
		*/
		protected addEvent() {
			// console.log("addEvent");
			this.con_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragArticle, this);
		}

		/** 
		 * 移除事件
		*/
		protected removeEvent() {
			// console.log("removeEvent");
			this.con_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragArticle, this);
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
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						break;
				}
				this.con_desc_1.width = this.width - 110;
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
				this.con_desc_0.width = this.width - 110;
			}
		}

		/**
		 * 屏幕横竖屏转换时调用
		 */
		protected rotateView(): void {
			// console.log("rotateView", this.screenType);
			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				this.con_desc_0.visible = false;
				this.con_desc_1.visible = true;
				this.con_black.bottom = 0;
			} else {
				//横屏
				this.con_desc_0.visible = true;
				this.con_desc_1.visible = false;
				this.con_black.bottom = -40;
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
			this.guideCom.setData(gConst.firstGuideTimer, { target_1: this.con_btn }, this, {
				diffX: this.con_btn.x - 50,
				diffY: this.con_btn.y - 150,
				diffS: 1,
				pressT: 800,
				liftT: 1000,
				offX: 30,
				offY: 30,
				offR: -30,
				isBack: true
			});
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

		private dragX: number; //拖拽物品时的x
		private dragY: number; //拖拽物品时的y
		private dragId: number; //拖拽物品时的touchId
		private isDraged: boolean; //是否拖拽以后
		/**
		 * 拖拽物品
		 */
		private dragArticle(event: egret.TouchEvent) {
			if (this.dragId != void 0) {
				return;
			}
			this.hideGuide();
			this.dragId = event.touchPointID;

			this.dragX = event.stageX;
			this.dragY = event.stageY;
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
		}

		/**X
		 * 拖拽物品移动鼠标
		 */
		private mouseMove(event: egret.TouchEvent) {
			if (event.touchPointID != this.dragId) {
				return;
			}
			var _x: number = event.stageX;
			var _y: number = event.stageY;
			var diffX: number = _x - this.dragX;
			var diffY: number = _y - this.dragY;

			// if (diffX > 1 || diffY > 1) {
			if (!this.isDraged) {
				this.isDraged = true;
				this.isReachDrag = true;
				this.endAim();
			}
			// } else {
			// this.isReachDrag = false;
			// gTween.toMove(this.con_btn, 0, 0, { x: 300 });
			// }

			var newX: number = this.con_btn.x + diffX;
			var newY: number = this.con_btn.y + diffY;

			this.con_btn.x = newX;
			this.con_btn.y = newY;
			this.dragX = _x;
			this.dragY = _y;
		}

		private isReachDrag: boolean;
		/**
		 * 拖拽滑块抬起鼠标
		 */
		private mouseUp(event: egret.TouchEvent) {
			this.dragId = null;
			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
			if (this.isReachDrag) {
				this.con_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragArticle, this);
				gTween.fadeOut(this.con_btn, 500, 1, void 0, void 0, {
					callback: this.close,
					thisObj: this
				});
			} else {
				gTween.toMove(this.con_btn, 0, 0, { x: 300 });
			}
		}

		/**
		 * 开始动画
		 */
		private startAim() {
			gTween.toTopShow(this.black, 300, 1);
			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				gTween.fadeIn(this.con_desc_1, 500, 1);
			} else {
				//横屏
				gTween.fadeIn(this.con_desc_0, 500, 1);
			}
			gTween.toMove(this.con_icon, 0, 0, { x: 500 }, this.con_icon.width, this.con_icon.height);
			this.showGuide();
		}

		/**
		 * 结束动画
		 */
		private endAim() {
			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				gTween.toBottomHide(this.desc_1, 500, 1);
			} else {
				//横屏
				gTween.toBottomHide(this.desc_0, 500, 1);
			}
			gTween.toMove(this.bg, this.bg.width, this.bg.height, { x: 500 }, 0, 0);
			gTween.toBottomHide(this.black, 500, 1);
		}

		/**
		 * 界面开始
		 */
		private start() {
			if (this.chatType == gConst.endType.FAIL) {
				this.con_bg.scaleX = this.con_bg.scaleY = 1;
				this.icon_0.visible = true;
				this.icon_1.visible = false;
			} else {
				this.con_bg.scaleX = this.con_bg.scaleY = 0.9;
				this.icon_0.visible = false;
				this.icon_1.visible = true;
			}
			this.startAim();
		}
		/* =========== 业务代码-end =========== */
	}
}
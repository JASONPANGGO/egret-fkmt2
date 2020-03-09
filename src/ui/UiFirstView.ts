namespace ui {
	/**
	 * 顶层页面
	 */
	export abstract class UiFirstView extends ui.UiFile {
		public skinName: string = gConst.skin.FIRST; //皮肤名

		public con_logo: eui.Group;
		public logo: eui.Image;
		public con_btn: eui.Group;
		public btn_dl: eui.Image;

		private logoDir: { horDir: string, verDir: string }; //logo横竖屏方位
		private btnDir: { horDir: string, verDir: string }; //btn横竖屏方位
		private isYoyoBtn: boolean; //是否做按钮呼吸动画

		public logoLoc: data.FirstData; //logo横竖屏位置 (根据方位解析，或自行设置)
		public btnLoc: data.FirstData; //btn横竖屏位置 (根据方位解析，或自行设置)

		public constructor() {
			super();
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args show()传参会通过init()传过去
		 */
		protected init(logoDir: { horDir: string, verDir: string }, btnDir: { horDir: string, verDir: string }, isYoyoBtn: boolean = false) {
			// console.log("init", ...args);
			if (logoDir != void 0) { this.logoDir = logoDir; } //logo横竖屏方位
			if (btnDir != void 0) { this.btnDir = btnDir; } //btn横竖屏方位
			this.yoyoBtn(isYoyoBtn);
		}

		/** 
		 * 首次打开界面时调用
		*/
		protected load() {
			// console.log("load");
			this.initItem(this.logo);
			this.initItem(this.btn_dl);
			this.logoLoc = new data.FirstData();
			this.btnLoc = new data.FirstData();
			this.updateLogoLoc();
			this.updateBtnLoc();
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
			this.btn_dl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
		}

		/** 
		 * 移除事件
		*/
		protected removeEvent() {
			// console.log("removeEvent");
			this.btn_dl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
		}

		/**
		 * 窗口大小改变时调用
		 */
		protected resizeView(): void {
			// console.log("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

			this.con_logo.scaleX = this.con_logo.scaleY =
				this.con_btn.scaleX = this.con_btn.scaleY = gConst.mobileByScale[this.screenType][this.mobileType];

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				if (this.logoLoc.verRatio != void 0) {
					this.__updateLogoVerRatio();
				}
				this.con_logo.x = this.logoLoc.vertical.x;
				this.con_logo.y = this.logoLoc.vertical.y;

				if (this.btnLoc.verRatio != void 0) {
					this.__updateBtnVerRatio();
				}
				this.con_btn.x = this.btnLoc.vertical.x;
				this.con_btn.y = this.btnLoc.vertical.y;

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
				if (this.logoLoc.horRatio != void 0) {
					this.__updateLogoHorRatio();
				}
				this.con_logo.x = this.logoLoc.horizontal.x;
				this.con_logo.y = this.logoLoc.horizontal.y;

				if (this.btnLoc.horRatio != void 0) {
					this.__updateBtnHorRatio();
				}
				this.con_btn.x = this.btnLoc.horizontal.x;
				this.con_btn.y = this.btnLoc.horizontal.y;

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
		 * 更新logo横屏位置(占比适配)
		 */
		private __updateLogoHorRatio() {
			let leftX: Function = () => {
				this.logoLoc.horizontal.x = Math.floor(this.width * this.logoLoc.horRatio / 100 / 2);
			}

			let centerX: Function = () => {
				this.logoLoc.horizontal.x = this.width / 2;
			}

			let rightX: Function = () => {
				this.logoLoc.horizontal.x = Math.floor(this.width * (100 - this.logoLoc.horRatio) / 100 + this.width * this.logoLoc.horRatio / 100 / 2);
			}

			let topY: Function = () => {
				this.logoLoc.horizontal.y = this.logoLoc.topSpace + this.con_logo.anchorOffsetY * this.con_logo.scaleX;
			}

			let bottomY: Function = () => {
				if (this.btnDir.horDir == this.logoDir.horDir) {
					this.logoLoc.horizontal.y = this.height - (this.logoLoc.bottomSpace + this.con_btn.height * this.con_btn.scaleX + this.logoLoc.horSpace + this.con_logo.anchorOffsetY * this.con_logo.scaleX);
				} else {
					this.logoLoc.horizontal.y = this.height - (this.logoLoc.bottomSpace + this.con_logo.anchorOffsetY * this.con_logo.scaleX);
				}
			}

			switch (this.logoDir.horDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX();
					topY();
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX();
					bottomY();
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX();
					topY();
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX();
					bottomY();
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX();
					topY();
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX();
					bottomY();
					break;
			}
		}

		/**
		 * 更新logo横屏位置(非占比适配)
		 */
		private __updateLogoHor() {
			let leftX: Function = () => {
				this.logoLoc.horizontal.x = this.logoLoc.leftSpace + Math.max(this.con_logo.anchorOffsetX * this.con_logo.scaleX, this.con_btn.anchorOffsetX * this.con_btn.scaleX);
			}

			let centerX: Function = () => {
				this.logoLoc.horizontal.x = this.width / 2;
			}

			let rightX: Function = () => {
				this.logoLoc.horizontal.x = this.width - (Math.max(this.con_logo.anchorOffsetX * this.con_logo.scaleX, this.con_btn.anchorOffsetX * this.con_btn.scaleX) + this.logoLoc.leftSpace);
			}

			let topY: Function = () => {
				this.logoLoc.horizontal.y = this.logoLoc.topSpace + this.con_logo.anchorOffsetY * this.con_logo.scaleX;
			}

			let bottomY: Function = () => {
				if (this.btnDir.horDir == this.logoDir.horDir) {
					this.logoLoc.horizontal.y = this.height - (this.logoLoc.bottomSpace + this.con_btn.height * this.con_btn.scaleX + this.logoLoc.horSpace + this.con_logo.anchorOffsetY * this.con_logo.scaleX);
				} else {
					this.logoLoc.horizontal.y = this.height - (this.logoLoc.bottomSpace + this.con_logo.anchorOffsetY * this.con_logo.scaleX);
				}
			}

			switch (this.logoDir.horDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX();
					topY();
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX();
					bottomY();
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX();
					topY();
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX();
					bottomY();
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX();
					topY();
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX();
					bottomY();
					break;
			}
		}

		/**
		 * 更新logo横屏位置
		 */
		private _updateLogoHor() {
			if (this.logoLoc.verRatio != void 0) {
				this.__updateLogoHorRatio();
			} else {
				this.__updateLogoHor();
			}
		}

		/**
		 * 更新logo竖屏位置(占比适配)
		 */
		private __updateLogoVerRatio() {
			let leftX: Function = () => {
				this.logoLoc.vertical.x = this.logoLoc.leftSpace + Math.max(this.con_logo.anchorOffsetX * this.con_logo.scaleX, this.con_btn.anchorOffsetX * this.con_btn.scaleX);
			}

			let centerX: Function = () => {
				this.logoLoc.vertical.x = this.width / 2;
			}

			let topY: Function = () => {
				let disY: number = Math.floor(this.height * this.logoLoc.verRatio / 100 / 2);
				if (this.btnDir.verDir == this.logoDir.verDir) {
					this.logoLoc.vertical.y = disY - (this.logoLoc.verSpace / 2 + this.con_logo.anchorOffsetY * this.con_logo.scaleX);
				} else {
					this.logoLoc.vertical.y = disY;
				}
			}

			let bottomY: Function = () => {
				let disY: number = Math.floor(this.height * (100 - this.logoLoc.verRatio) / 100 + this.height * this.logoLoc.verRatio / 100 / 2);
				if (this.btnDir.verDir == this.logoDir.verDir) {
					this.logoLoc.vertical.y = disY - (this.logoLoc.verSpace / 2 + this.con_logo.anchorOffsetY * this.con_logo.scaleX);
				} else {
					this.logoLoc.vertical.y = disY;
				}
			}

			switch (this.logoDir.verDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX();
					topY();
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX();
					bottomY();
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX();
					topY();
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX();
					bottomY();
					break;
			}
		}

		/**
		 * 更新logo竖屏位置(非占比适配)
		 */
		private __updateLogoVer() {
			let leftX: Function = () => {
				this.logoLoc.vertical.x = this.logoLoc.leftSpace + Math.max(this.con_logo.anchorOffsetX * this.con_logo.scaleX, this.con_btn.anchorOffsetX * this.con_btn.scaleX);
			}

			let centerX: Function = () => {
				this.logoLoc.vertical.x = this.width / 2;
			}

			let topY: Function = () => {
				this.logoLoc.vertical.y = this.logoLoc.topSpace + this.con_logo.anchorOffsetY * this.con_logo.scaleX;
			}

			let bottomY: Function = () => {
				if (this.btnDir.verDir == this.logoDir.verDir) {
					this.logoLoc.vertical.y = this.height - (this.logoLoc.bottomSpace + this.con_btn.height * this.con_btn.scaleX + this.logoLoc.verSpace + this.con_logo.anchorOffsetY * this.con_logo.scaleX);
				} else {
					this.logoLoc.vertical.y = this.height - (this.logoLoc.bottomSpace + this.con_logo.anchorOffsetY * this.con_logo.scaleX);
				}
			}

			switch (this.logoDir.verDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX();
					topY();
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX();
					bottomY();
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX();
					topY();
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX();
					bottomY();
					break;
			}
		}

		/**
		 * 更新logo竖屏位置
		 */
		private _updateLogoVer() {
			if (this.logoLoc.verRatio != void 0) {
				this.__updateLogoVerRatio();
			} else {
				this.__updateLogoVer();
			}
		}

		/**
		 * 更新logo横竖屏位置
		 */
		public updateLogoLoc(logoLoc?: data.FirstData) {
			if (!this.logoLoc) {
				this.logoLoc = new data.FirstData();
			}
			if (logoLoc) {
				if (logoLoc.horizontal.x != void 0) { this.logoLoc.horizontal.x = logoLoc.horizontal.x; } //横屏x轴位置
				if (logoLoc.horizontal.y != void 0) { this.logoLoc.horizontal.y = logoLoc.horizontal.y; } //横屏y轴位置
				if (logoLoc.vertical.x != void 0) { this.logoLoc.vertical.x = logoLoc.vertical.x; } //竖屏x轴位置
				if (logoLoc.vertical.y != void 0) { this.logoLoc.vertical.y = logoLoc.vertical.y; } //竖屏y轴位置
			} else {
				if (!this.logoDir) {
					return;
				}
				this._updateLogoHor();
				this._updateLogoVer();
			}
		}

		/**
		 * 更新btn横屏位置(占比适配)
		 */
		private __updateBtnHorRatio() {
			let leftX: Function = () => {
				this.btnLoc.horizontal.x = Math.floor(this.width * this.btnLoc.horRatio / 100 / 2);
			}

			let centerX: Function = () => {
				this.btnLoc.horizontal.x = this.width / 2;
			}

			let rightX: Function = () => {
				this.btnLoc.horizontal.x = Math.floor(this.width * (100 - this.btnLoc.horRatio) / 100 + this.width * this.btnLoc.horRatio / 100 / 2);
			}

			let topY: Function = () => {
				if (this.logoDir.horDir == this.btnDir.horDir) {
					this.btnLoc.horizontal.y = this.logoLoc.topSpace + this.con_logo.height * this.con_logo.scaleX + this.btnLoc.horSpace + this.con_btn.anchorOffsetY * this.con_btn.scaleX;
				} else {
					this.btnLoc.horizontal.y = this.btnLoc.topSpace + this.con_btn.anchorOffsetY * this.con_btn.scaleX;
				}
			}

			let bottomY: Function = () => {
				this.btnLoc.horizontal.y = this.height - (this.btnLoc.bottomSpace + this.con_btn.anchorOffsetY * this.con_btn.scaleX);
			}

			switch (this.btnDir.horDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX();
					topY();
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX();
					bottomY();
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX();
					topY();
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX();
					bottomY();
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX();
					topY();
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX();
					bottomY();
					break;
			}
		}

		/**
		 * 更新btn横屏位置(非占比适配)
		 */
		private __updateBtnHor() {
			let leftX: Function = () => {
				this.btnLoc.horizontal.x = this.btnLoc.leftSpace + Math.max(this.con_logo.anchorOffsetX * this.con_logo.scaleX, this.con_btn.anchorOffsetX * this.con_btn.scaleX);
			}

			let centerX: Function = () => {
				this.btnLoc.horizontal.x = this.width / 2;
			}

			let rightX: Function = () => {
				this.btnLoc.horizontal.x = this.width - (Math.max(this.con_btn.anchorOffsetX * this.con_btn.scaleX, this.con_btn.anchorOffsetX * this.con_btn.scaleX) + this.btnLoc.leftSpace);
			}

			let topY: Function = () => {
				if (this.logoDir.horDir == this.btnDir.horDir) {
					this.btnLoc.horizontal.y = this.logoLoc.topSpace + this.con_logo.height * this.con_logo.scaleX + this.btnLoc.horSpace + this.con_btn.anchorOffsetY * this.con_btn.scaleX;
				} else {
					this.btnLoc.horizontal.y = this.btnLoc.topSpace + this.con_btn.anchorOffsetY * this.con_btn.scaleX;
				}
			}

			let bottomY: Function = () => {
				this.btnLoc.horizontal.y = this.height - (this.btnLoc.bottomSpace + this.con_btn.anchorOffsetY * this.con_btn.scaleX);
			}

			switch (this.btnDir.horDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX();
					topY();
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX();
					bottomY();
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX();
					topY();
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX();
					bottomY();
					break;

				//右上 ↗
				case gConst.direction.RIGHT_TOP:
					rightX();
					topY();
					break;

				//右下 ↘
				case gConst.direction.RIGHT_BOTTOM:
					rightX();
					bottomY();
					break;
			}
		}

		/**
		 * 更新btn横屏位置
		 */
		private _updateBtnHor() {
			if (this.btnLoc.verRatio != void 0) {
				this.__updateBtnHorRatio();
			} else {
				this.__updateBtnHor();
			}
		}

		/**
		 * 更新btn竖屏位置(占比适配)
		 */
		private __updateBtnVerRatio() {
			let leftX: Function = () => {
				this.btnLoc.vertical.x = this.btnLoc.leftSpace + Math.max(this.con_logo.anchorOffsetX * this.con_logo.scaleX, this.con_btn.anchorOffsetX * this.con_btn.scaleX);
			}

			let centerX: Function = () => {
				this.btnLoc.vertical.x = this.width / 2;
			}

			let topY: Function = () => {
				let disY: number = Math.floor(this.height * this.btnLoc.verRatio / 100 / 2);
				if (this.logoDir.verDir == this.btnDir.verDir) {
					this.btnLoc.vertical.y = disY + (this.btnLoc.verSpace / 2 + this.con_btn.anchorOffsetY * this.con_btn.scaleX);
				} else {
					this.btnLoc.vertical.y = disY;
				}
			}

			let bottomY: Function = () => {
				let disY: number = Math.floor(this.height * (100 - this.btnLoc.verRatio) / 100 + this.height * this.btnLoc.verRatio / 100 / 2);
				if (this.logoDir.verDir == this.btnDir.verDir) {
					this.btnLoc.vertical.y = disY + (this.btnLoc.verSpace / 2 + this.con_btn.anchorOffsetY * this.con_btn.scaleX);
				} else {
					this.btnLoc.vertical.y = disY;
				}
			}

			switch (this.btnDir.verDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX();
					topY();
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX();
					bottomY();
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX();
					topY();
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX();
					bottomY();
					break;
			}
		}

		/**
		 * 更新btn竖屏位置(非占比适配)
		 */
		private __updateBtnVer() {
			let leftX: Function = () => {
				this.btnLoc.vertical.x = this.btnLoc.leftSpace + Math.max(this.con_logo.anchorOffsetX * this.con_logo.scaleX, this.con_btn.anchorOffsetX * this.con_btn.scaleX);
			}

			let centerX: Function = () => {
				this.btnLoc.vertical.x = this.width / 2;
			}

			let topY: Function = () => {
				if (this.logoDir.verDir == this.btnDir.verDir) {
					this.btnLoc.vertical.y = this.logoLoc.topSpace + this.con_logo.height * this.con_logo.scaleX + this.btnLoc.verSpace + this.con_btn.anchorOffsetY * this.con_btn.scaleX;
				} else {
					this.btnLoc.vertical.y = this.btnLoc.topSpace + this.con_btn.anchorOffsetY * this.con_btn.scaleX;
				}
			}

			let bottomY: Function = () => {
				this.btnLoc.vertical.y = this.height - (this.btnLoc.bottomSpace + this.con_btn.anchorOffsetY * this.con_btn.scaleX);
			}

			switch (this.btnDir.verDir) {
				//左上 ↖
				case gConst.direction.LEFT_TOP:
					leftX();
					topY();
					break;

				//左下 ↙
				case gConst.direction.LEFT_BOTTOM:
					leftX();
					bottomY();
					break;

				//中上 ↑
				case gConst.direction.CENTER_TOP:
					centerX();
					topY();
					break;

				//中下 ↓
				case gConst.direction.CENTER_BOTTOM:
					centerX();
					bottomY();
					break;
			}
		}

		/**
		 * 更新btn竖屏位置
		 */
		private _updateBtnVer() {
			if (this.btnLoc.verRatio != void 0) {
				this.__updateBtnVerRatio();
			} else {
				this.__updateBtnVer();
			}
		}

		/**
		 * 更新btn横竖屏位置
		 */
		public updateBtnLoc(btnLoc?: data.FirstData) {
			if (!this.btnLoc) {
				this.btnLoc = new data.FirstData();
			}
			if (btnLoc) {
				if (btnLoc.horizontal.x != void 0) { this.btnLoc.horizontal.x = btnLoc.horizontal.x; } //横屏x轴位置
				if (btnLoc.horizontal.y != void 0) { this.btnLoc.horizontal.y = btnLoc.horizontal.y; } //横屏y轴位置
				if (btnLoc.vertical.x != void 0) { this.btnLoc.vertical.x = btnLoc.vertical.x; } //竖屏x轴位置
				if (btnLoc.vertical.y != void 0) { this.btnLoc.vertical.y = btnLoc.vertical.y; } //竖屏y轴位置
			} else {
				if (!this.btnDir) {
					return;
				}
				this._updateBtnHor();
				this._updateBtnVer();
			}
		}

		/**
		 * 初始化元素
		 * @param {egret.DisplayObject} item 初始化的元素
		 * @description 这里一般用来初始化logo、下载按钮
		 */
		private initItem(item: eui.Image) {
			//获取资源，设置宽高
			let pic: egret.Texture = RES.getRes(item.source as string);
			if (pic) {
				item.width = item.parent.width = pic.textureWidth;
				item.height = item.parent.height = pic.textureHeight;
			}
			//获取中心点
			let halfW: number = item.width / 2;
			let halfH: number = item.height / 2;
			//设置锚点、位置
			item.anchorOffsetX = item.parent.anchorOffsetX = halfW;
			item.anchorOffsetY = item.parent.anchorOffsetY = halfH;
			item.x = halfW;
			item.y = halfH;
		}

		/**
		 * 按钮呼吸动画
		 */
		public yoyoBtn(isYoyoBtn: boolean = true) {
			if (isYoyoBtn) {
				gTween.loopScale(this.btn_dl, 1.2, 500, 1);
			} else if (this.isYoyoBtn) {
				gTween.rmTweens(this.btn_dl);
				this.btn_dl.scaleX = this.btn_dl.scaleY = 1;
			}
			this.isYoyoBtn = isYoyoBtn;
		}
		/* =========== 业务代码-end =========== */
	}
}
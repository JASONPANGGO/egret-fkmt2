var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    /**
     * 顶层页面
     */
    var UiFirstView = (function (_super) {
        __extends(UiFirstView, _super);
        function UiFirstView() {
            var _this = _super.call(this) || this;
            _this.skinName = gConst.skin.FIRST; //皮肤名
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args show()传参会通过init()传过去
         */
        UiFirstView.prototype.init = function (logoDir, btnDir, isYoyoBtn) {
            if (isYoyoBtn === void 0) { isYoyoBtn = false; }
            // console.log("init", ...args);
            if (logoDir != void 0) {
                this.logoDir = logoDir;
            } //logo横竖屏方位
            if (btnDir != void 0) {
                this.btnDir = btnDir;
            } //btn横竖屏方位
            this.yoyoBtn(isYoyoBtn);
        };
        /**
         * 首次打开界面时调用
        */
        UiFirstView.prototype.load = function () {
            // console.log("load");
            this.initItem(this.logo);
            this.initItem(this.btn_dl);
            this.logoLoc = new data.FirstData();
            this.btnLoc = new data.FirstData();
            this.updateLogoLoc();
            this.updateBtnLoc();
        };
        /**
         * 每次打开界面都会调用
        */
        UiFirstView.prototype.update = function () {
            // console.log("update");
        };
        /**
         * 注册事件
        */
        UiFirstView.prototype.addEvent = function () {
            // console.log("addEvent");
            this.btn_dl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
        };
        /**
         * 移除事件
        */
        UiFirstView.prototype.removeEvent = function () {
            // console.log("removeEvent");
            this.btn_dl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
        };
        /**
         * 窗口大小改变时调用
         */
        UiFirstView.prototype.resizeView = function () {
            // console.log("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            this.con_logo.scaleX = this.con_logo.scaleY =
                this.con_btn.scaleX = this.con_btn.scaleY = gConst.mobileByScale[this.screenType][this.mobileType];
            if (this.screenType == 1 /* VERTICAL */) {
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
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
            else {
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
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
        };
        /**
         * 屏幕横竖屏转换时调用
         */
        UiFirstView.prototype.rotateView = function () {
            // console.log("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        /**
         * 更新logo横屏位置(占比适配)
         */
        UiFirstView.prototype.__updateLogoHorRatio = function () {
            var _this = this;
            var leftX = function () {
                _this.logoLoc.horizontal.x = Math.floor(_this.width * _this.logoLoc.horRatio / 100 / 2);
            };
            var centerX = function () {
                _this.logoLoc.horizontal.x = _this.width / 2;
            };
            var rightX = function () {
                _this.logoLoc.horizontal.x = Math.floor(_this.width * (100 - _this.logoLoc.horRatio) / 100 + _this.width * _this.logoLoc.horRatio / 100 / 2);
            };
            var topY = function () {
                _this.logoLoc.horizontal.y = _this.logoLoc.topSpace + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX;
            };
            var bottomY = function () {
                if (_this.btnDir.horDir == _this.logoDir.horDir) {
                    _this.logoLoc.horizontal.y = _this.height - (_this.logoLoc.bottomSpace + _this.con_btn.height * _this.con_btn.scaleX + _this.logoLoc.horSpace + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX);
                }
                else {
                    _this.logoLoc.horizontal.y = _this.height - (_this.logoLoc.bottomSpace + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX);
                }
            };
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
        };
        /**
         * 更新logo横屏位置(非占比适配)
         */
        UiFirstView.prototype.__updateLogoHor = function () {
            var _this = this;
            var leftX = function () {
                _this.logoLoc.horizontal.x = _this.logoLoc.leftSpace + Math.max(_this.con_logo.anchorOffsetX * _this.con_logo.scaleX, _this.con_btn.anchorOffsetX * _this.con_btn.scaleX);
            };
            var centerX = function () {
                _this.logoLoc.horizontal.x = _this.width / 2;
            };
            var rightX = function () {
                _this.logoLoc.horizontal.x = _this.width - (Math.max(_this.con_logo.anchorOffsetX * _this.con_logo.scaleX, _this.con_btn.anchorOffsetX * _this.con_btn.scaleX) + _this.logoLoc.leftSpace);
            };
            var topY = function () {
                _this.logoLoc.horizontal.y = _this.logoLoc.topSpace + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX;
            };
            var bottomY = function () {
                if (_this.btnDir.horDir == _this.logoDir.horDir) {
                    _this.logoLoc.horizontal.y = _this.height - (_this.logoLoc.bottomSpace + _this.con_btn.height * _this.con_btn.scaleX + _this.logoLoc.horSpace + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX);
                }
                else {
                    _this.logoLoc.horizontal.y = _this.height - (_this.logoLoc.bottomSpace + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX);
                }
            };
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
        };
        /**
         * 更新logo横屏位置
         */
        UiFirstView.prototype._updateLogoHor = function () {
            if (this.logoLoc.verRatio != void 0) {
                this.__updateLogoHorRatio();
            }
            else {
                this.__updateLogoHor();
            }
        };
        /**
         * 更新logo竖屏位置(占比适配)
         */
        UiFirstView.prototype.__updateLogoVerRatio = function () {
            var _this = this;
            var leftX = function () {
                _this.logoLoc.vertical.x = _this.logoLoc.leftSpace + Math.max(_this.con_logo.anchorOffsetX * _this.con_logo.scaleX, _this.con_btn.anchorOffsetX * _this.con_btn.scaleX);
            };
            var centerX = function () {
                _this.logoLoc.vertical.x = _this.width / 2;
            };
            var topY = function () {
                var disY = Math.floor(_this.height * _this.logoLoc.verRatio / 100 / 2);
                if (_this.btnDir.verDir == _this.logoDir.verDir) {
                    _this.logoLoc.vertical.y = disY - (_this.logoLoc.verSpace / 2 + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX);
                }
                else {
                    _this.logoLoc.vertical.y = disY;
                }
            };
            var bottomY = function () {
                var disY = Math.floor(_this.height * (100 - _this.logoLoc.verRatio) / 100 + _this.height * _this.logoLoc.verRatio / 100 / 2);
                if (_this.btnDir.verDir == _this.logoDir.verDir) {
                    _this.logoLoc.vertical.y = disY - (_this.logoLoc.verSpace / 2 + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX);
                }
                else {
                    _this.logoLoc.vertical.y = disY;
                }
            };
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
        };
        /**
         * 更新logo竖屏位置(非占比适配)
         */
        UiFirstView.prototype.__updateLogoVer = function () {
            var _this = this;
            var leftX = function () {
                _this.logoLoc.vertical.x = _this.logoLoc.leftSpace + Math.max(_this.con_logo.anchorOffsetX * _this.con_logo.scaleX, _this.con_btn.anchorOffsetX * _this.con_btn.scaleX);
            };
            var centerX = function () {
                _this.logoLoc.vertical.x = _this.width / 2;
            };
            var topY = function () {
                _this.logoLoc.vertical.y = _this.logoLoc.topSpace + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX;
            };
            var bottomY = function () {
                if (_this.btnDir.verDir == _this.logoDir.verDir) {
                    _this.logoLoc.vertical.y = _this.height - (_this.logoLoc.bottomSpace + _this.con_btn.height * _this.con_btn.scaleX + _this.logoLoc.verSpace + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX);
                }
                else {
                    _this.logoLoc.vertical.y = _this.height - (_this.logoLoc.bottomSpace + _this.con_logo.anchorOffsetY * _this.con_logo.scaleX);
                }
            };
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
        };
        /**
         * 更新logo竖屏位置
         */
        UiFirstView.prototype._updateLogoVer = function () {
            if (this.logoLoc.verRatio != void 0) {
                this.__updateLogoVerRatio();
            }
            else {
                this.__updateLogoVer();
            }
        };
        /**
         * 更新logo横竖屏位置
         */
        UiFirstView.prototype.updateLogoLoc = function (logoLoc) {
            if (!this.logoLoc) {
                this.logoLoc = new data.FirstData();
            }
            if (logoLoc) {
                if (logoLoc.horizontal.x != void 0) {
                    this.logoLoc.horizontal.x = logoLoc.horizontal.x;
                } //横屏x轴位置
                if (logoLoc.horizontal.y != void 0) {
                    this.logoLoc.horizontal.y = logoLoc.horizontal.y;
                } //横屏y轴位置
                if (logoLoc.vertical.x != void 0) {
                    this.logoLoc.vertical.x = logoLoc.vertical.x;
                } //竖屏x轴位置
                if (logoLoc.vertical.y != void 0) {
                    this.logoLoc.vertical.y = logoLoc.vertical.y;
                } //竖屏y轴位置
            }
            else {
                if (!this.logoDir) {
                    return;
                }
                this._updateLogoHor();
                this._updateLogoVer();
            }
        };
        /**
         * 更新btn横屏位置(占比适配)
         */
        UiFirstView.prototype.__updateBtnHorRatio = function () {
            var _this = this;
            var leftX = function () {
                _this.btnLoc.horizontal.x = Math.floor(_this.width * _this.btnLoc.horRatio / 100 / 2);
            };
            var centerX = function () {
                _this.btnLoc.horizontal.x = _this.width / 2;
            };
            var rightX = function () {
                _this.btnLoc.horizontal.x = Math.floor(_this.width * (100 - _this.btnLoc.horRatio) / 100 + _this.width * _this.btnLoc.horRatio / 100 / 2);
            };
            var topY = function () {
                if (_this.logoDir.horDir == _this.btnDir.horDir) {
                    _this.btnLoc.horizontal.y = _this.logoLoc.topSpace + _this.con_logo.height * _this.con_logo.scaleX + _this.btnLoc.horSpace + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX;
                }
                else {
                    _this.btnLoc.horizontal.y = _this.btnLoc.topSpace + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX;
                }
            };
            var bottomY = function () {
                _this.btnLoc.horizontal.y = _this.height - (_this.btnLoc.bottomSpace + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX);
            };
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
        };
        /**
         * 更新btn横屏位置(非占比适配)
         */
        UiFirstView.prototype.__updateBtnHor = function () {
            var _this = this;
            var leftX = function () {
                _this.btnLoc.horizontal.x = _this.btnLoc.leftSpace + Math.max(_this.con_logo.anchorOffsetX * _this.con_logo.scaleX, _this.con_btn.anchorOffsetX * _this.con_btn.scaleX);
            };
            var centerX = function () {
                _this.btnLoc.horizontal.x = _this.width / 2;
            };
            var rightX = function () {
                _this.btnLoc.horizontal.x = _this.width - (Math.max(_this.con_btn.anchorOffsetX * _this.con_btn.scaleX, _this.con_btn.anchorOffsetX * _this.con_btn.scaleX) + _this.btnLoc.leftSpace);
            };
            var topY = function () {
                if (_this.logoDir.horDir == _this.btnDir.horDir) {
                    _this.btnLoc.horizontal.y = _this.logoLoc.topSpace + _this.con_logo.height * _this.con_logo.scaleX + _this.btnLoc.horSpace + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX;
                }
                else {
                    _this.btnLoc.horizontal.y = _this.btnLoc.topSpace + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX;
                }
            };
            var bottomY = function () {
                _this.btnLoc.horizontal.y = _this.height - (_this.btnLoc.bottomSpace + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX);
            };
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
        };
        /**
         * 更新btn横屏位置
         */
        UiFirstView.prototype._updateBtnHor = function () {
            if (this.btnLoc.verRatio != void 0) {
                this.__updateBtnHorRatio();
            }
            else {
                this.__updateBtnHor();
            }
        };
        /**
         * 更新btn竖屏位置(占比适配)
         */
        UiFirstView.prototype.__updateBtnVerRatio = function () {
            var _this = this;
            var leftX = function () {
                _this.btnLoc.vertical.x = _this.btnLoc.leftSpace + Math.max(_this.con_logo.anchorOffsetX * _this.con_logo.scaleX, _this.con_btn.anchorOffsetX * _this.con_btn.scaleX);
            };
            var centerX = function () {
                _this.btnLoc.vertical.x = _this.width / 2;
            };
            var topY = function () {
                var disY = Math.floor(_this.height * _this.btnLoc.verRatio / 100 / 2);
                if (_this.logoDir.verDir == _this.btnDir.verDir) {
                    _this.btnLoc.vertical.y = disY + (_this.btnLoc.verSpace / 2 + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX);
                }
                else {
                    _this.btnLoc.vertical.y = disY;
                }
            };
            var bottomY = function () {
                var disY = Math.floor(_this.height * (100 - _this.btnLoc.verRatio) / 100 + _this.height * _this.btnLoc.verRatio / 100 / 2);
                if (_this.logoDir.verDir == _this.btnDir.verDir) {
                    _this.btnLoc.vertical.y = disY + (_this.btnLoc.verSpace / 2 + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX);
                }
                else {
                    _this.btnLoc.vertical.y = disY;
                }
            };
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
        };
        /**
         * 更新btn竖屏位置(非占比适配)
         */
        UiFirstView.prototype.__updateBtnVer = function () {
            var _this = this;
            var leftX = function () {
                _this.btnLoc.vertical.x = _this.btnLoc.leftSpace + Math.max(_this.con_logo.anchorOffsetX * _this.con_logo.scaleX, _this.con_btn.anchorOffsetX * _this.con_btn.scaleX);
            };
            var centerX = function () {
                _this.btnLoc.vertical.x = _this.width / 2;
            };
            var topY = function () {
                if (_this.logoDir.verDir == _this.btnDir.verDir) {
                    _this.btnLoc.vertical.y = _this.logoLoc.topSpace + _this.con_logo.height * _this.con_logo.scaleX + _this.btnLoc.verSpace + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX;
                }
                else {
                    _this.btnLoc.vertical.y = _this.btnLoc.topSpace + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX;
                }
            };
            var bottomY = function () {
                _this.btnLoc.vertical.y = _this.height - (_this.btnLoc.bottomSpace + _this.con_btn.anchorOffsetY * _this.con_btn.scaleX);
            };
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
        };
        /**
         * 更新btn竖屏位置
         */
        UiFirstView.prototype._updateBtnVer = function () {
            if (this.btnLoc.verRatio != void 0) {
                this.__updateBtnVerRatio();
            }
            else {
                this.__updateBtnVer();
            }
        };
        /**
         * 更新btn横竖屏位置
         */
        UiFirstView.prototype.updateBtnLoc = function (btnLoc) {
            if (!this.btnLoc) {
                this.btnLoc = new data.FirstData();
            }
            if (btnLoc) {
                if (btnLoc.horizontal.x != void 0) {
                    this.btnLoc.horizontal.x = btnLoc.horizontal.x;
                } //横屏x轴位置
                if (btnLoc.horizontal.y != void 0) {
                    this.btnLoc.horizontal.y = btnLoc.horizontal.y;
                } //横屏y轴位置
                if (btnLoc.vertical.x != void 0) {
                    this.btnLoc.vertical.x = btnLoc.vertical.x;
                } //竖屏x轴位置
                if (btnLoc.vertical.y != void 0) {
                    this.btnLoc.vertical.y = btnLoc.vertical.y;
                } //竖屏y轴位置
            }
            else {
                if (!this.btnDir) {
                    return;
                }
                this._updateBtnHor();
                this._updateBtnVer();
            }
        };
        /**
         * 初始化元素
         * @param {egret.DisplayObject} item 初始化的元素
         * @description 这里一般用来初始化logo、下载按钮
         */
        UiFirstView.prototype.initItem = function (item) {
            //获取资源，设置宽高
            var pic = RES.getRes(item.source);
            if (pic) {
                item.width = item.parent.width = pic.textureWidth;
                item.height = item.parent.height = pic.textureHeight;
            }
            //获取中心点
            var halfW = item.width / 2;
            var halfH = item.height / 2;
            //设置锚点、位置
            item.anchorOffsetX = item.parent.anchorOffsetX = halfW;
            item.anchorOffsetY = item.parent.anchorOffsetY = halfH;
            item.x = halfW;
            item.y = halfH;
        };
        /**
         * 按钮呼吸动画
         */
        UiFirstView.prototype.yoyoBtn = function (isYoyoBtn) {
            if (isYoyoBtn === void 0) { isYoyoBtn = true; }
            if (isYoyoBtn) {
                gTween.loopScale(this.btn_dl, 1.2, 500, 1);
            }
            else if (this.isYoyoBtn) {
                gTween.rmTweens(this.btn_dl);
                this.btn_dl.scaleX = this.btn_dl.scaleY = 1;
            }
            this.isYoyoBtn = isYoyoBtn;
        };
        return UiFirstView;
    }(ui.UiFile));
    ui.UiFirstView = UiFirstView;
    __reflect(UiFirstView.prototype, "ui.UiFirstView");
})(ui || (ui = {}));
//# sourceMappingURL=UiFirstView.js.map
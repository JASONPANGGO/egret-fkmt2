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
     * 开场界面
     */
    var UiStartView = (function (_super) {
        __extends(UiStartView, _super);
        function UiStartView() {
            var _this = _super.call(this) || this;
            _this.skinName = gConst.skin.START; //皮肤名
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args show()传参会通过init()传过去
         */
        UiStartView.prototype.init = function () {
            // console.log("init", ...args);
        };
        /**
         * 首次打开界面时调用
        */
        UiStartView.prototype.load = function () {
            // console.log("load");
            this.con_btn_0.name = "0";
            this.con_btn_1.name = "1";
        };
        /**
         * 每次打开界面都会调用
        */
        UiStartView.prototype.update = function () {
            // console.log("update");
            this.startAim();
        };
        /**
         * 注册事件
        */
        UiStartView.prototype.addEvent = function () {
            // console.log("addEvent");
            this.con_btn_0.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
            this.con_btn_1.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        };
        /**
         * 移除事件
        */
        UiStartView.prototype.removeEvent = function () {
            // console.log("removeEvent");
        };
        /**
         * 窗口大小改变时调用
         */
        UiStartView.prototype.resizeView = function () {
            if (this.guideCom) {
                this.guideCom.resizeView(this.width, this.height);
            }
            // console.log("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        this.con.scaleX = this.con.scaleY = 1;
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        this.con.scaleX = this.con.scaleY = 1;
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        this.con.scaleX = this.con.scaleY = 0.8;
                        break;
                }
            }
            else {
                //横屏
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        this.desc_0.scaleX = this.desc_0.scaleY = 1;
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        this.desc_0.scaleX = this.desc_0.scaleY = 1;
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        this.desc_0.scaleX = this.desc_0.scaleY = 0.8;
                        break;
                }
                this.con.scaleX = this.con.scaleY = 1;
            }
        };
        /**
         * 屏幕横竖屏转换时调用
         */
        UiStartView.prototype.rotateView = function () {
            // console.log("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.con_btn.bottom = 30;
                this.con.height = 254;
                this.con_btn.width = 252;
                this.desc_0.visible = false;
                this.desc_1.visible = true;
            }
            else {
                //横屏
                this.con_btn.bottom = 46;
                this.con.height = 200;
                this.con_btn.width = 224;
                this.desc_0.visible = true;
                this.desc_1.visible = false;
            }
        };
        /**
         * 显示引导
         */
        UiStartView.prototype.showGuide = function () {
            if (!this.guideCom) {
                this.guideCom = new com.GuideCom();
            }
            // if (!GameMgr.isReset) {
            this.guideCom.setData(gConst.firstGuideTimer, { target_1: this.con_btn_0, target_2: this.con_btn_1, moveTime: 500 }, this, { waitT: 0 });
            // } else {
            // 	this.guideCom.setData(gConst.firstGuideTimer, { target_1: this.con_btn_1 }, this);
            // }
            this.guideCom.start();
        };
        /**
         * 隐藏引导
         */
        UiStartView.prototype.hideGuide = function () {
            if (!this.guideCom) {
                return;
            }
            this.guideCom.stop();
        };
        /**
         * 开始动画
         */
        UiStartView.prototype.startAim = function () {
            gTween.toTopShow(this.con_desc, 800, 0, 1, egret.Ease.bounceOut, void 0, {
                callback: this.start,
                thisObj: this
            });
        };
        /**
         * 界面开始
         */
        UiStartView.prototype.start = function () {
            //开始按钮做呼吸效果
            gTween.loopScale(this.con_btn_0, 0.9, 1000, 1);
            gTween.loopScale(this.con_btn_1, 0.9, 1000, 1);
            this.showGuide();
        };
        /**
         * 点击按钮
         */
        UiStartView.prototype.clickBtn = function (event) {
            // sendAction(1);
            this.hideGuide();
            var target = event.target;
            target.scaleX = target.scaleY = 1;
            gComMgr.clickAim(target, 1 /* SCALE */);
            // GameMgr.gameview.playArticleLoop(null, Number(target.name));
            gTween.toBottomHide(this.con_desc, 300, 0, 1, void 0, void 0, {
                callback: this.close,
                thisObj: this
            });
        };
        return UiStartView;
    }(ui.UiFile));
    ui.UiStartView = UiStartView;
    __reflect(UiStartView.prototype, "ui.UiStartView");
})(ui || (ui = {}));
//# sourceMappingURL=UiStartView.js.map
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
     * 下一关提示页面
     */
    var UiNextTipsView = (function (_super) {
        __extends(UiNextTipsView, _super);
        function UiNextTipsView() {
            var _this = _super.call(this) || this;
            _this.skinName = gConst.skin.NEXT_TIPS; //皮肤名
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args show()传参会通过init()传过去
         */
        UiNextTipsView.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.log("init", ...args);
        };
        /**
         * 首次打开界面时调用
        */
        UiNextTipsView.prototype.load = function () {
            // console.log("load");
            this.createMask();
        };
        /**
         * 每次打开界面都会调用
        */
        UiNextTipsView.prototype.update = function () {
            // console.log("update");
            this.playMask();
        };
        /**
         * 注册事件
        */
        UiNextTipsView.prototype.addEvent = function () {
            // console.log("addEvent");
        };
        /**
         * 移除事件
        */
        UiNextTipsView.prototype.removeEvent = function () {
            // console.log("removeEvent");
        };
        /**
         * 窗口大小改变时调用
         */
        UiNextTipsView.prototype.resizeView = function () {
            // console.log("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            if (this.lightMask) {
                this.lightMask.setLightPos(this.width / 2, this.height / 2);
                this.lightMask.setMaskSize(this.width, this.height);
            }
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
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
        UiNextTipsView.prototype.rotateView = function () {
            // console.log("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        UiNextTipsView.prototype.createMask = function () {
            this.lightMask = new com.LightMask();
            this.lightMask.setLightSize(100);
            this.lightMask.setLightPos(this.width / 2, this.height / 2);
            this.lightMask.setMaskSize(this.width, this.height);
            this.addChild(this.lightMask);
            this.lightMask.visible = false;
            this.lightMask.cirleLight.scaleX = this.lightMask.cirleLight.scaleY = 10;
        };
        /**
         * 播放遮罩
         */
        UiNextTipsView.prototype.playMask = function () {
            var _this = this;
            this.lightMask.visible = true;
            gTween.toScale(this.lightMask.cirleLight, 0, 500, 10, void 0, { duration: 50 }, {
                callback: function () {
                    // GameMgr.gameview.start();
                    gTween.toScale(_this.lightMask.cirleLight, 10, 500, 0, void 0, void 0, {
                        callback: _this.close,
                        thisObj: _this
                    });
                },
                thisObj: this
            });
        };
        return UiNextTipsView;
    }(ui.UiFile));
    ui.UiNextTipsView = UiNextTipsView;
    __reflect(UiNextTipsView.prototype, "ui.UiNextTipsView");
})(ui || (ui = {}));
//# sourceMappingURL=UiNextTipsView.js.map
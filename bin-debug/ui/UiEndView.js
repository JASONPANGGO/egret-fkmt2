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
     * 结束界面
     */
    var UiEndView = (function (_super) {
        __extends(UiEndView, _super);
        function UiEndView() {
            var _this = _super.call(this) || this;
            _this.skinName = gConst.skin.END; //皮肤名
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args show()传参会通过init()传过去
         */
        UiEndView.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.log("init", ...args);
        };
        /**
         * 首次打开界面时调用
        */
        UiEndView.prototype.load = function () {
            // console.log("load");
        };
        /**
         * 每次打开界面都会调用
        */
        UiEndView.prototype.update = function () {
            // console.log("update");
            this.gameEnd();
            this.start();
        };
        /**
         * 注册事件
        */
        UiEndView.prototype.addEvent = function () {
            // console.log("addEvent");
        };
        /**
         * 移除事件
        */
        UiEndView.prototype.removeEvent = function () {
            // console.log("removeEvent");
        };
        /**
         * 窗口大小改变时调用
         */
        UiEndView.prototype.resizeView = function () {
            // console.log("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            this.con_body.scaleX = this.con_body.scaleY = 1;
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
                        this.con_body.scaleX = this.con_body.scaleY = 0.8;
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
                        this.con_body.scaleX = this.con_body.scaleY = 0.8;
                        break;
                }
            }
        };
        /**
         * 屏幕横竖屏转换时调用
         */
        UiEndView.prototype.rotateView = function () {
            // console.log("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.con_body.horizontalCenter = 0;
            }
            else {
                //横屏
                this.con_body.horizontalCenter = NaN;
                this.con_body.x = this.width * 0.5 / this.con_body.scaleX / 2;
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        /**
         * 开始
         */
        UiEndView.prototype.start = function () {
            gTween.loopFloat(this.body, -20, 1000, 0);
        };
        return UiEndView;
    }(ui.UiFile));
    ui.UiEndView = UiEndView;
    __reflect(UiEndView.prototype, "ui.UiEndView");
})(ui || (ui = {}));
//# sourceMappingURL=UiEndView.js.map
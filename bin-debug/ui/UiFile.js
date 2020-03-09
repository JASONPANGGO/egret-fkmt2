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
     * UI文件
     */
    var UiFile = (function (_super) {
        __extends(UiFile, _super);
        function UiFile() {
            return _super.call(this) || this;
        }
        /**
         * 初始化
         * @param {any[]} args show()传参会通过init()传过去
         */
        UiFile.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.log("init", ...args);
        };
        /**
         * 首次打开界面时调用
        */
        UiFile.prototype.load = function () {
            // console.log("load");
        };
        /**
         * 每次打开界面都会调用
        */
        UiFile.prototype.update = function () {
            // console.log("update");
        };
        /**
         * 注册事件
        */
        UiFile.prototype.addEvent = function () {
            // console.log("addEvent");
        };
        /**
         * 移除事件
        */
        UiFile.prototype.removeEvent = function () {
            // console.log("removeEvent");
        };
        /**
         * 打开界面
         * @param {any[]} args show()传参会通过init()传过去
         */
        UiFile.prototype.open = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _super.prototype.open.apply(this, args);
        };
        /**
         * 关闭界面
         */
        UiFile.prototype.close = function () {
            _super.prototype.close.call(this);
        };
        /**
         * 窗口大小改变时调用
         */
        UiFile.prototype.resizeView = function () {
            // console.log("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
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
        UiFile.prototype.rotateView = function () {
            // console.log("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        return UiFile;
    }(ui.UiFileBase));
    ui.UiFile = UiFile;
    __reflect(UiFile.prototype, "ui.UiFile");
})(ui || (ui = {}));
//# sourceMappingURL=UiFile.js.map
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
     * 对话界面
     */
    var UiChatView = (function (_super) {
        __extends(UiChatView, _super);
        function UiChatView() {
            var _this = _super.call(this) || this;
            _this.skinName = gConst.skin.CHAT; //皮肤名
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args show()传参会通过init()传过去
         */
        UiChatView.prototype.init = function (chatType) {
            // console.log("init", ...args);
            this.chatType = chatType;
        };
        /**
         * 首次打开界面时调用
        */
        UiChatView.prototype.load = function () {
            // console.log("load");
            this.con_btn.touchChildren = false;
        };
        /**
         * 每次打开界面都会调用
        */
        UiChatView.prototype.update = function () {
            // console.log("update");
            this.start();
        };
        /**
         * 注册事件
        */
        UiChatView.prototype.addEvent = function () {
            // console.log("addEvent");
            this.con_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragArticle, this);
        };
        /**
         * 移除事件
        */
        UiChatView.prototype.removeEvent = function () {
            // console.log("removeEvent");
            this.con_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragArticle, this);
        };
        /**
         * 窗口大小改变时调用
         */
        UiChatView.prototype.resizeView = function () {
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
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
                this.con_desc_1.width = this.width - 110;
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
                this.con_desc_0.width = this.width - 110;
            }
        };
        /**
         * 屏幕横竖屏转换时调用
         */
        UiChatView.prototype.rotateView = function () {
            // console.log("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.con_desc_0.visible = false;
                this.con_desc_1.visible = true;
                this.con_black.bottom = 0;
            }
            else {
                //横屏
                this.con_desc_0.visible = true;
                this.con_desc_1.visible = false;
                this.con_black.bottom = -40;
            }
        };
        /**
         * 显示引导
         */
        UiChatView.prototype.showGuide = function () {
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
        };
        /**
         * 隐藏引导
         */
        UiChatView.prototype.hideGuide = function () {
            if (!this.guideCom) {
                return;
            }
            this.guideCom.stop();
        };
        /**
         * 拖拽物品
         */
        UiChatView.prototype.dragArticle = function (event) {
            if (this.dragId != void 0) {
                return;
            }
            this.hideGuide();
            this.dragId = event.touchPointID;
            this.dragX = event.stageX;
            this.dragY = event.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        };
        /**X
         * 拖拽物品移动鼠标
         */
        UiChatView.prototype.mouseMove = function (event) {
            if (event.touchPointID != this.dragId) {
                return;
            }
            var _x = event.stageX;
            var _y = event.stageY;
            var diffX = _x - this.dragX;
            var diffY = _y - this.dragY;
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
            var newX = this.con_btn.x + diffX;
            var newY = this.con_btn.y + diffY;
            this.con_btn.x = newX;
            this.con_btn.y = newY;
            this.dragX = _x;
            this.dragY = _y;
        };
        /**
         * 拖拽滑块抬起鼠标
         */
        UiChatView.prototype.mouseUp = function (event) {
            this.dragId = null;
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            if (this.isReachDrag) {
                this.con_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragArticle, this);
                gTween.fadeOut(this.con_btn, 500, 1, void 0, void 0, {
                    callback: this.close,
                    thisObj: this
                });
            }
            else {
                gTween.toMove(this.con_btn, 0, 0, { x: 300 });
            }
        };
        /**
         * 开始动画
         */
        UiChatView.prototype.startAim = function () {
            gTween.toTopShow(this.black, 300, 1);
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                gTween.fadeIn(this.con_desc_1, 500, 1);
            }
            else {
                //横屏
                gTween.fadeIn(this.con_desc_0, 500, 1);
            }
            gTween.toMove(this.con_icon, 0, 0, { x: 500 }, this.con_icon.width, this.con_icon.height);
            this.showGuide();
        };
        /**
         * 结束动画
         */
        UiChatView.prototype.endAim = function () {
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                gTween.toBottomHide(this.desc_1, 500, 1);
            }
            else {
                //横屏
                gTween.toBottomHide(this.desc_0, 500, 1);
            }
            gTween.toMove(this.bg, this.bg.width, this.bg.height, { x: 500 }, 0, 0);
            gTween.toBottomHide(this.black, 500, 1);
        };
        /**
         * 界面开始
         */
        UiChatView.prototype.start = function () {
            if (this.chatType == 0 /* FAIL */) {
                this.con_bg.scaleX = this.con_bg.scaleY = 1;
                this.icon_0.visible = true;
                this.icon_1.visible = false;
            }
            else {
                this.con_bg.scaleX = this.con_bg.scaleY = 0.9;
                this.icon_0.visible = false;
                this.icon_1.visible = true;
            }
            this.startAim();
        };
        return UiChatView;
    }(ui.UiFile));
    ui.UiChatView = UiChatView;
    __reflect(UiChatView.prototype, "ui.UiChatView");
})(ui || (ui = {}));
//# sourceMappingURL=UiChatView.js.map
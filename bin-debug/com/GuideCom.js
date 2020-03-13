var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    /**
     * 引导组件
     */
    var GuideCom = (function (_super) {
        __extends(GuideCom, _super);
        function GuideCom() {
            var _this = _super.call(this) || this;
            _this.isGuide = false; //是否存在引导
            _this.skinName = gConst.skin.GUIDE;
            _this.init();
            return _this;
        }
        /**
         * 初始化操作，只在构造时执行一次
         */
        GuideCom.prototype.init = function () {
            this.touchEnabled = this.touchChildren = false;
        };
        /**
         * 设置数据
         * @param {number} delayTimer 延迟显示时间
         * @param {egret.DisplayObject} targetArg.target_1 指引目标对象1
         * @param {egret.DisplayObject} targetArg.target_2 指引目标对象2
         * @param {number} moveTime 目标1移动到目标2时间
         * @param {boolean} isReturn 是否做返回运动
         * @param {egret.DisplayObjectContainer} parentObj 父级显示容器
         * @param {number} prop.diffX = 0 x轴差值
         * @param {number} prop.diffY = 20 y轴差值
         * @param {number} prop.diffS = 0.9 缩放差值
         * @param {number} prop.pressT = 300 手指按下时间
         * @param {number} prop.liftT = 800 手指抬起时间
         * @param {number} prop.waitT = 500 手指等待下次按下时间
         * @param {number} prop.direction = "center_center" 手指处于目标方位
         * @param {number} prop.offX = 0 x轴偏移值(特殊处理用)
         * @param {number} prop.offY = 0 y轴偏移值(特殊处理用)
         * @param {number} prop.offR = 0 角度r偏移值(特殊处理用)
         * @param {boolean} prop.isBack 是否相反方向指引
         */
        GuideCom.prototype.setData = function (delayTimer, targetArg, parentObj, prop) {
            if (prop === void 0) { prop = {}; }
            this.delayTimer = delayTimer; //延迟显示时间
            this.target_1 = targetArg.target_1; //指引目标对象1
            this.target_2 = targetArg.target_2; //指引目标对象2
            this.moveTime = targetArg.moveTime; //目标1移动到目标2时间
            this.isReturn = targetArg.isReturn; //是否做返回运动
            this.parentObj = parentObj; //父级显示容器
            this.diffX = prop.diffX != void 0 ? prop.diffX : 0; //x轴差值
            this.diffY = prop.diffY != void 0 ? prop.diffY : 20; //y轴差值
            this.diffS = prop.diffS != void 0 ? prop.diffS : 0.9; //缩放差值
            this.pressT = prop.pressT != void 0 ? prop.pressT : 300; //手指按下时间
            this.liftT = prop.liftT != void 0 ? prop.liftT : 800; //手指抬起时间
            this.waitT = prop.waitT != void 0 ? prop.waitT : 500; //手指等待下次按下时间
            this.direction = prop.direction != void 0 ? prop.direction : gConst.direction.CENTER_CENTER; //手指处于目标方位
            this.offX = prop.offX != void 0 ? prop.offX : 0; //x轴偏移值(特殊处理用)
            this.offY = prop.offY != void 0 ? prop.offY : 0; //y轴偏移值(特殊处理用)
            this.offR = prop.offR != void 0 ? prop.offR : 0; //角度r偏移值(特殊处理用)
            this.isBack = prop.isBack != void 0 ? prop.isBack : false; //是否相反方向指引
        };
        /**
         * 更新数据
         * @param {number} config.delayTimer 延迟显示时间
         * @param {egret.DisplayObject} config.targetArg.target_1 指引目标对象1
         * @param {egret.DisplayObject} config.targetArg.target_2 指引目标对象2
         * @param {number} moveTime 目标1移动到目标2时间
         * @param {boolean} isReturn 是否做返回运动
         * @param {egret.DisplayObjectContainer} config.parentObj 父级显示容器
         * @param {number} config.diffX x轴差值
         * @param {number} config.diffY y轴差值
         * @param {number} config.diffS 缩放差值
         * @param {number} pressT 手指按下时间
         * @param {number} liftT 手指抬起时间
         * @param {number} waitT 手指等待下次按下时间
         * @param {number} direction 手指处于目标方位
         * @param {number} offX x轴偏移值(特殊处理用)
         * @param {number} offY y轴偏移值(特殊处理用)
         * @param {number} offR 角度r偏移值(特殊处理用)
         * @param {boolean} isBack 是否相反方向指引
         */
        GuideCom.prototype.updateData = function (config) {
            if (config.delayTimer != void 0) {
                this.delayTimer = config.delayTimer;
            } //延迟显示时间
            if (config.targetArg.target_1 != void 0) {
                this.target_1 = config.targetArg.target_1;
            } //指引目标对象1
            if (config.targetArg.target_2 != void 0) {
                this.target_2 = config.targetArg.target_2;
            } //指引目标对象2
            if (config.targetArg.moveTime != void 0) {
                this.moveTime = config.targetArg.moveTime;
            } //目标1移动到目标2时间
            if (config.targetArg.isReturn != void 0) {
                this.isReturn = config.targetArg.isReturn;
            } //是否做返回运动
            if (config.parentObj != void 0) {
                this.parentObj = config.parentObj;
            } //父级显示容器
            if (config.prop != void 0) {
                if (config.prop.diffX != void 0) {
                    this.diffX = config.prop.diffX;
                } //x轴差值
                if (config.prop.diffY != void 0) {
                    this.diffY = config.prop.diffY;
                } //y轴差值
                if (config.prop.diffS != void 0) {
                    this.diffS = config.prop.diffS;
                } //缩放差值
                if (config.prop.pressT != void 0) {
                    this.pressT = config.prop.pressT;
                } //手指按下时间
                if (config.prop.liftT != void 0) {
                    this.liftT = config.prop.liftT;
                } //手指抬起时间
                if (config.prop.waitT != void 0) {
                    this.waitT = config.prop.waitT;
                } //手指等待下次按下时间
                if (config.prop.direction != void 0) {
                    this.direction = config.prop.direction;
                } //手指处于目标方位
                if (config.prop.offX != void 0) {
                    this.offX = config.prop.offX;
                } //x轴偏移值(特殊处理用)
                if (config.prop.offY != void 0) {
                    this.offY = config.prop.offY;
                } //y轴偏移值(特殊处理用)
                if (config.prop.offR != void 0) {
                    this.offR = config.prop.offR;
                } //角度r偏移值(特殊处理用)
                if (config.prop.isBack != void 0) {
                    this.isBack = config.prop.isBack;
                } //是否相反方向指引
            }
        };
        /**
         * 开始
         */
        GuideCom.prototype.start = function () {
            egret.clearTimeout(this.guideDelay);
            this.guideDelay = egret.setTimeout(this.playGuide, this, this.delayTimer);
        };
        /**
         * 结束
         */
        GuideCom.prototype.stop = function () {
            var _this = this;
            egret.clearTimeout(this.guideDelay);
            if (!this.isGuide) {
                return;
            }
            if (!this || !this.parent) {
                return;
            }
            this.isGuide = false;
            gTween.tween(this.hand, void 0, {
                props: { alpha: 0 },
                duration: 200,
                call: {
                    callback: function () {
                        gTween.rmTweens(_this.hand);
                        gComMgr.rmObj(_this);
                        _this.hand.alpha = 1;
                        _this.dispatchEventWith(gConst.eventType.GUIDE_STOP);
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 重置 (立马结束，重新开始)
         */
        GuideCom.prototype.reset = function () {
            this.once(gConst.eventType.GUIDE_STOP, this.start, this);
            this.stop();
        };
        /**
         * 显示引导
         */
        GuideCom.prototype.showGuide = function () {
            this.hand.alpha = 1;
            this.parentObj.addChild(this);
            this.updateGuideLoc();
        };
        /**
         * 更新引导位置
         */
        GuideCom.prototype.updateGuideLoc = function (target) {
            if (target === void 0) { target = this.target_1; }
            if (!this || !this.parent) {
                return;
            }
            var _x = target.x - target.anchorOffsetX * target.scaleX; //x原点
            var _y = target.y - target.anchorOffsetY * target.scaleX; //y原点
            var _w = target.width * target.scaleX; //宽度
            var _h = target.height * target.scaleX; //高度
            switch (this.direction) {
                //左上 ↖
                case gConst.direction.LEFT_TOP:
                    //左上就在原点
                    this.rotation = 135;
                    break;
                //中上 ↑
                case gConst.direction.CENTER_TOP:
                    _x += _w / 2;
                    this.rotation = 180;
                    break;
                //右上 ↗
                case gConst.direction.RIGHT_TOP:
                    _x += _w;
                    this.rotation = -135;
                    break;
                //右中 →
                case gConst.direction.RIGHT_CENTER:
                    _x += _w;
                    _y += _h / 2;
                    this.rotation = -90;
                    break;
                //右下 ↘
                case gConst.direction.RIGHT_BOTTOM:
                    _x += _w;
                    _y += _h;
                    this.rotation = -45;
                    break;
                //中下 ↓
                case gConst.direction.CENTER_BOTTOM:
                    _x += _w / 2;
                    _y += _h;
                    this.rotation = 0;
                    break;
                //左下 ↙
                case gConst.direction.LEFT_BOTTOM:
                    _y += _h;
                    this.rotation = 45;
                    break;
                //左中 ←
                case gConst.direction.LEFT_CENTER:
                    _y += _h / 2;
                    this.rotation = 90;
                    break;
                //默认 中心
                default:
                    _x += _w / 2;
                    _y += _h / 2;
                    this.rotation = 0;
                    break;
            }
            _x += (this.offX * target.scaleX);
            _y += (this.offY * target.scaleX);
            this.rotation += this.offR;
            var gPot = target.parent.localToGlobal(_x, _y);
            var lPot = this.globalToLocal(gPot.x, gPot.y, gPot);
            this.initHandX = this.hand.x = lPot.x;
            this.initHandY = this.hand.y = lPot.y;
        };
        /**
         * 播放引导
         */
        GuideCom.prototype.playGuide = function () {
            var _this = this;
            this.showGuide();
            this.isGuide = true;
            gTween.rmTweens(this.hand);
            this.hand.alpha = 0;
            this.hand.scaleX = this.hand.scaleY = 1;
            if (!this.target_2) {
                if (!this.isBack) {
                    this.hand.x = this.initHandX + this.diffX;
                    this.hand.y = this.initHandY + this.diffY;
                    egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(function () {
                        egret.Tween.get(_this.hand, { loop: true, }).to({
                            scaleX: _this.diffS,
                            scaleY: _this.diffS,
                            x: _this.initHandX,
                            y: _this.initHandY
                        }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                            scaleX: 1,
                            scaleY: 1,
                            x: _this.initHandX + _this.diffX,
                            y: _this.initHandY + _this.diffY
                        }, _this.liftT).wait(_this.waitT);
                    }, this);
                }
                else {
                    this.hand.x = this.initHandX;
                    this.hand.y = this.initHandY;
                    egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(function () {
                        egret.Tween.get(_this.hand, { loop: true, }).to({
                            scaleX: 1,
                            scaleY: 1,
                            x: _this.initHandX + _this.diffX,
                            y: _this.initHandY + _this.diffY
                        }, _this.liftT).wait(_this.waitT).to({
                            scaleX: _this.diffS,
                            scaleY: _this.diffS,
                            x: _this.initHandX,
                            y: _this.initHandY
                        }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]);
                    }, this);
                }
            }
            else {
                var initHandX_1_1 = this.initHandX;
                var initHandY_1_1 = this.initHandY;
                this.updateGuideLoc(this.target_2);
                var initHandX_2_1 = this.initHandX;
                var initHandY_2_1 = this.initHandY;
                this.hand.x = initHandX_1_1 + this.diffX;
                this.hand.y = initHandY_1_1 + this.diffY;
                if (this.moveTime == void 0) {
                    this.moveTime = 100;
                }
                var returnProps_1;
                if (this.isReturn) {
                    returnProps_1 = {
                        x: initHandX_1_1 + this.diffX,
                        y: initHandY_1_1 + this.diffY
                    };
                }
                else {
                    returnProps_1 = {
                        alpha: 0
                    };
                }
                egret.Tween.get(this.hand).to({ alpha: 1 }, 300).call(function () {
                    egret.Tween.get(_this.hand, { loop: true }).to({
                        scaleX: _this.diffS,
                        scaleY: _this.diffS,
                        x: initHandX_1_1,
                        y: initHandY_1_1,
                        alpha: 1
                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                        scaleX: 1,
                        scaleY: 1,
                        x: initHandX_1_1 + _this.diffX,
                        y: initHandY_1_1 + _this.diffY
                    }, _this.liftT).to({
                        x: initHandX_2_1 + _this.diffX,
                        y: initHandY_2_1 + _this.diffY
                    }, _this.moveTime).to({
                        scaleX: _this.diffS,
                        scaleY: _this.diffS,
                        x: initHandX_2_1,
                        y: initHandY_2_1
                    }, _this.pressT).call(_this.dispatchEventWith, _this, [gConst.eventType.GUIDE_TOUCH_ONE]).to({
                        scaleX: 1,
                        scaleY: 1,
                        x: initHandX_2_1 + _this.diffX,
                        y: initHandY_2_1 + _this.diffY
                    }, _this.liftT).wait(_this.waitT).to(returnProps_1, _this.moveTime);
                }, this);
            }
        };
        /**
         * 窗口大小改变时调用
         * @param {number} _w 当前窗口宽度
         * @param {number} _h 当前窗口高度
         */
        GuideCom.prototype.resizeView = function (_w, _h) {
            // this.width = _w;
            // this.height = _h;
            if (this.isGuide) {
                // this.playGuide();
                this.stop();
                this.showGuide();
                egret.clearTimeout(this.guideDelay);
                this.guideDelay = egret.setTimeout(this.playGuide, this, 100);
            }
        };
        return GuideCom;
    }(eui.Component));
    com.GuideCom = GuideCom;
    __reflect(GuideCom.prototype, "com.GuideCom");
})(com || (com = {}));
//# sourceMappingURL=GuideCom.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 组件管理器
     */
    var ComMgr = (function () {
        function ComMgr() {
        }
        /**
         * 点击效果
         * @param {egret.DisplayObject} obj 做效果对象
         * @param {gConst.clkAimType} aimType 效果类型 0:隐藏 1:缩放
         */
        ComMgr.prototype.clickAim = function (obj, aimType) {
            if (aimType === void 0) { aimType = 1 /* SCALE */; }
            gTween.rmTweens(obj);
            switch (aimType) {
                //隐藏
                case 0 /* HIDE */:
                    var initA_1 = obj.alpha; //初始透明度
                    gTween.tween(obj, void 0, {
                        props: { alpha: 0 },
                        duration: 200,
                        call: {
                            callback: function () {
                                gTween.rmTweens(obj);
                                obj.visible = false;
                                obj.alpha = initA_1;
                            },
                            thisObj: this
                        }
                    });
                    break;
                //缩放
                case 1 /* SCALE */:
                    gTween.loopScale(obj, 0.8, 200, obj.scaleX);
                    break;
            }
        };
        /**
         * 移除对象
         * @param {egret.DisplayObject} obj 移除的对象
         */
        ComMgr.prototype.rmObj = function (obj) {
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
            return null;
        };
        return ComMgr;
    }());
    util.ComMgr = ComMgr;
    __reflect(ComMgr.prototype, "util.ComMgr");
})(util || (util = {}));
//# sourceMappingURL=ComMgr.js.map
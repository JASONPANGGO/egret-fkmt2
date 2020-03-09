var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 数学计算管理器
     */
    var MathMgr = (function () {
        function MathMgr() {
        }
        /**
         * 随机返回一个浮点数
         * @param {number} max 最大值
         * @param {number} min 最小值
         * @returns {number} 返回一个随机浮点数（含小不含大）
         */
        MathMgr.prototype.getRandom = function (max, min) {
            if (min === void 0) { min = 0; }
            return Math.random() * (max - min) + min;
        };
        /**
         * 随机返回一个整数
         * @param {number} max 最大值
         * @param {number} min 最小值
         * @returns {number} 返回一个随机整数（含小不含大）
         */
        MathMgr.prototype.getRandomInteger = function (max, min) {
            if (min === void 0) { min = 0; }
            return Math.floor(this.getRandom(max, min));
        };
        /**
         * N（正数 或 零）次方(n >= 0)
         * @param {number} val 根
         * @param {number} n N次方
         */
        MathMgr.prototype.getSquarePositive = function (val, n) {
            if (n === void 0) { n = 2; }
            if (n < 0) {
                console.warn("此接口一般不开放，如需要开负数次方，推荐使用：getSquare()");
                return;
            }
            var newVal = val;
            //val 的 (n + 1) 次方除以 val
            for (var i = 0; i < n; i++) {
                newVal *= val;
            }
            newVal /= val;
            return newVal;
        };
        /**
         * N次方
         * @param {number} val 根
         * @param {number} n N次方
         */
        MathMgr.prototype.getSquare = function (val, n) {
            if (n === void 0) { n = 2; }
            var newVal = val;
            // if (n >= 0) {
            //     newVal = this.getSquarePositive(val, n);
            // } else {
            //     newVal = this.getSquarePositive(1 / val, -n);
            // }
            newVal = Math.pow(val, n);
            return newVal;
        };
        /**
         * 求两点间距离
         */
        MathMgr.prototype.getDistance = function (x1, y1, x2, y2) {
            var dist;
            // dist = Math.sqrt(this.getSquarePositive(x1 - x2) + this.getSquarePositive(y1 - y2));
            dist = egret.Point.distance({ x: x1, y: y1 }, { x: x2, y: y2 });
            dist = Math.floor(dist);
            return dist;
        };
        return MathMgr;
    }());
    util.MathMgr = MathMgr;
    __reflect(MathMgr.prototype, "util.MathMgr");
})(util || (util = {}));
//# sourceMappingURL=Math.js.map
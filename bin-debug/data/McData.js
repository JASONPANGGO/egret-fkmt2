var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     * 动画数据
     */
    var McData = (function () {
        /**
         * 构造动画数据
         * @param {string} fName 动作名称
         * @param {number} frameCnt 总帧数
         * @param {string} frameName 帧名字格式，framName{1}_png
         * @param {boolean} backplay 播放完成后，反向播放回来
         */
        function McData(fName, frameCnt, frameName, backplay) {
            if (backplay === void 0) { backplay = false; }
            this.fName = "1"; //动作名称
            /** 播放方向 1.正向 -1.反向 */
            this.direct = 1;
            this.fName = fName;
            this.frameCnt = frameCnt;
            this.frameName = frameName;
            this.backplay = backplay;
        }
        return McData;
    }());
    data.McData = McData;
    __reflect(McData.prototype, "data.McData");
})(data || (data = {}));
//# sourceMappingURL=McData.js.map
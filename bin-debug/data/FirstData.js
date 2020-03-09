var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     * 顶层页面数据
     */
    var FirstData = (function () {
        function FirstData() {
            this.horizontal = { x: 0, y: 0 }; //横屏位置
            this.vertical = { x: 0, y: 0 }; //竖屏位置
            this.leftSpace = 20; //左间距
            this.topSpace = 100; //上间距
            this.bottomSpace = 60; //下间距
            this.horRatio = 50; //横屏占比(%) (有赋值时使用占比适配)
            this.verRatio = 32; //竖屏占比(%) (有赋值时使用占比适配)
            this.horSpace = 20; //logo与btn横屏间距
            this.verSpace = -30; //logo与btn竖屏间距
        }
        return FirstData;
    }());
    data.FirstData = FirstData;
    __reflect(FirstData.prototype, "data.FirstData");
})(data || (data = {}));
//# sourceMappingURL=FirstData.js.map
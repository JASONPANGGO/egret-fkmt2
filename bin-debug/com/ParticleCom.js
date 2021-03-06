var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    /**
     * 粒子对象
     */
    var ParticleCom = (function () {
        /**
         * 构造一个粒子对象
         */
        function ParticleCom() {
        }
        /**
         * 创建粒子
         */
        ParticleCom.prototype.create = function () {
            if (!this.system) {
                var texture = RES.getRes(this.resName + "_png");
                var config = RES.getRes(this.resName + "_json");
                this.system = new particle.GravityParticleSystem(texture, config);
                this.system.touchEnabled = false;
                this.setPos();
            }
            this.parent.addChild(this.system);
        };
        /**
         * 设置数据
         * @param {egret.DisplayObjectContainer} parent 父级对象容器
         * @param {string} resName 资源名称
         */
        ParticleCom.prototype.setData = function (parent, resName) {
            this.parent = parent;
            this.resName = resName;
            this.create();
        };
        /**
         * 开始播放粒子
         * @param {number} duration 粒子出现总时间
         */
        ParticleCom.prototype.start = function (duration) {
            this.system.start();
        };
        /**
         * 停止创建粒子
         * @param {boolean} clear 是否清除掉现有粒子
         */
        ParticleCom.prototype.stop = function (clear) {
            this.system.stop(clear);
        };
        /**
         * 更换粒子纹理
         * @param {string} resName 资源名称
         */
        ParticleCom.prototype.change = function (resName) {
            this.resName = resName;
            var texture = RES.getRes(this.resName + "_png");
            this.system.changeTexture(texture);
        };
        /**
         * 设置粒子位置
         */
        ParticleCom.prototype.setPos = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.system.x = x;
            this.system.y = y;
        };
        /**
         * 更新粒子发射位置x
         */
        ParticleCom.prototype.updateEmitterX = function (x) {
            this.system.emitterX = x;
        };
        /**
         * 更新粒子发射位置y
         */
        ParticleCom.prototype.updateEmitterY = function (y) {
            this.system.emitterY = y;
        };
        return ParticleCom;
    }());
    com.ParticleCom = ParticleCom;
    __reflect(ParticleCom.prototype, "com.ParticleCom");
})(com || (com = {}));
//# sourceMappingURL=ParticleCom.js.map
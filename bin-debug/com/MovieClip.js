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
     * 动画组件
     */
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        /**
         * 构造动画对象
         */
        function MovieClip() {
            var _this = _super.call(this) || this;
            _this.interval = 40; //播放间隔
            /** 播放次数 -1为循环播放 */
            _this.playTime = -1;
            _this.isplay = false; //是否继续播放
            _this.isReverse = false;
            _this.bm = new eui.Image();
            _this.addChild(_this.bm);
            _this.bm.pixelHitTest = true;
            return _this;
        }
        /**
         * 设置动画数据
         * @param {data.McData[]} ob 动画数据列表，可传多组动画
         * @param {number} anchorOffsetX 动画图片锚点X轴
         * @param {number} anchorOffsetY 动画图片锚点Y轴
         */
        MovieClip.prototype.setData = function (ob, anchorOffsetX, anchorOffsetY) {
            if (anchorOffsetX === void 0) { anchorOffsetX = 0; }
            if (anchorOffsetY === void 0) { anchorOffsetY = 0; }
            this.list = ob;
            this.bm.anchorOffsetX = anchorOffsetX;
            this.bm.anchorOffsetY = anchorOffsetY;
        };
        /**
         * 开启精准碰撞
         * @param {boolean} pixelHitTest 是否开启精准碰撞
         */
        MovieClip.prototype.pixelHitTest = function (pixelHitTest) {
            this.bm.pixelHitTest = pixelHitTest;
        };
        /**
         * 停留在指定动作的某一帧
         * @param {string} fName 动作名称
         * @param {number} frameIndex 指定帧, 默认 1
         */
        MovieClip.prototype.gotoAndStop = function (fName, frameIndex) {
            if (frameIndex === void 0) { frameIndex = 1; }
            if (this.isplay) {
                this.isplay = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            }
            this.currentFrameName = fName;
            this.currentData = this.getMcDataByAction(fName);
            this.frameIndex = frameIndex;
            if (this.currentData) {
                var picName = this.currentData.frameName.replace("{1}", this.frameIndex.toString());
                this.bm.source = picName;
            }
        };
        /**
         * 销毁
         */
        MovieClip.prototype.dispose = function () {
            this.stop();
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.removeChildren();
            this.list = null;
        };
        /**
         * 反向播放
         * @param {string} fName 动作名称
         * @param {number} playTime = -1 播放次数
         */
        MovieClip.prototype.gotoAndReverse = function (fName, playTime) {
            if (playTime === void 0) { playTime = -1; }
            this.isReverse = true;
            this.currentFrameName = fName;
            this.playTime = playTime;
            this.currentData = this.getMcDataByAction(fName);
            if (this.currentData) {
                this.nextUpdateTime = egret.getTimer() + this.interval;
                this.currentData.direct = -1;
                this.frameIndex = this.currentData.frameCnt;
                var picName = this.currentData.frameName.replace("{1}", this.frameIndex.toString());
                // console.log("this.frameIndex:" + this.frameIndex);
                this.bm.source = picName;
                if (!this.isplay) {
                    this.isplay = true;
                    this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
                }
            }
        };
        /**
         * 正向播放
         * @param {string} fName 动作名称
         * @param {number} playTime = -1 播放次数
         */
        MovieClip.prototype.gotoAndPlay = function (fName, playTime) {
            if (playTime === void 0) { playTime = -1; }
            this.isReverse = false;
            this.currentFrameName = fName;
            this.playTime = playTime;
            this.currentData = this.getMcDataByAction(fName);
            if (this.currentData) {
                this.nextUpdateTime = egret.getTimer() + this.interval;
                this.currentData.direct = 1;
                this.frameIndex = 1;
                var picName = this.currentData.frameName.replace("{1}", this.frameIndex.toString());
                // console.log("this.frameIndex:" + this.frameIndex);
                this.bm.source = picName;
                if (!this.isplay) {
                    this.isplay = true;
                    this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
                }
            }
        };
        /**
         * 按播放间隔刷新视频
         * @example 每帧监听
         * @param {egret.Event} event 动画对象自身事件源
         */
        MovieClip.prototype.update = function (event) {
            if (egret.getTimer() >= this.nextUpdateTime) {
                this.updateFrame();
            }
        };
        /**
         * 刷新视频
         */
        MovieClip.prototype.updateFrame = function () {
            this.nextUpdateTime = egret.getTimer() + this.interval;
            if (this.isReverse && this.frameIndex < 1) {
                this.stop();
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
            var picName = this.currentData.frameName.replace("{1}", this.frameIndex.toString());
            // console.log("this.frameIndex:" + this.frameIndex);
            this.bm.source = picName;
            this.frameIndex += this.currentData.direct;
            if (this.frameIndex > this.currentData.frameCnt) {
                //正向播放到最后
                if (this.currentData.direct == 1 && this.currentData.backplay) {
                    //改为反向播放
                    this.frameIndex -= 2;
                    this.currentData.direct = -1;
                }
                else {
                    //无来回方向播放时，播放完成，停留在第一帧
                    this.frameIndex = 1;
                }
                if (this.playTime == -1) {
                }
                else if (!this.currentData.backplay || (this.currentData.backplay && this.isReverse)) {
                    //正常播放的时候 播放到最后 次数减少一次
                    //次数播放
                    this.playTime--;
                    if (this.playTime == 0) {
                        this.stop();
                        this.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }
            }
            else if (this.frameIndex < 1) {
                //方向播放到最初
                if (this.currentData.direct == -1 && this.currentData.backplay) {
                    //改为正向播放
                    this.frameIndex += 2;
                    this.currentData.direct = 1;
                }
                if (this.currentData.backplay && !this.isReverse) {
                    //正常播放的时候 播放到最后 次数减少一次
                    //次数播放
                    this.playTime--;
                    if (this.playTime == 0) {
                        this.stop();
                        this.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }
            }
        };
        /**
         * 暂停播放
         */
        MovieClip.prototype.stop = function () {
            if (this.isplay) {
                this.isplay = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            }
        };
        /**
         * 通过动作名称获取动画数据
         * @param {string} fName 动作名称
         */
        MovieClip.prototype.getMcDataByAction = function (fName) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].fName == fName) {
                    return this.list[i];
                }
            }
            return null;
        };
        return MovieClip;
    }(eui.Component));
    com.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "com.MovieClip");
})(com || (com = {}));
//# sourceMappingURL=MovieClip.js.map
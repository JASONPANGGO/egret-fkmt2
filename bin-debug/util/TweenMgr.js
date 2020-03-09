var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 缓动动画管理器
     */
    var TweenMgr = (function () {
        function TweenMgr() {
        }
        /**
         * 改变缩放
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetS 目标缩放值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toScale = function (target, targetS, duration, orgS, ease, wait, call) {
            if (wait === void 0) { wait = { duration: 0 }; }
            if (orgS != void 0) {
                target.scaleX = target.scaleY = orgS;
            }
            this.tween(target, void 0, {
                props: {
                    scaleX: targetS,
                    scaleY: targetS
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 平移
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetX 目标x轴
         * @param {number} targetY 目标y轴
         * @param {number} duration 持续时间
         * @param {number} orgX 原来的x轴
         * @param {number} orgY 原来的y轴
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toMove = function (target, targetX, targetY, duration, orgX, orgY, ease, wait, call) {
            if (wait === void 0) { wait = { duration: 0 }; }
            if (orgX != void 0) {
                target.x = orgX;
            }
            if (orgY != void 0) {
                target.y = orgY;
            }
            if (ease) {
                if (ease.y == void 0) {
                    ease.y = ease.x;
                }
            }
            else {
                ease = { x: void 0, y: void 0 };
            }
            var callX, callY;
            if (duration) {
                if (duration.y == void 0) {
                    duration.y = duration.x;
                }
                else {
                    if (duration.x > duration.y) {
                        callX = call;
                    }
                    else {
                        callY = call;
                    }
                }
            }
            egret.Tween.get(target).to({ x: targetX }, duration.x, ease.x);
            var to = egret.Tween.get(target).to({ y: targetY }, duration.y, ease.y).wait(wait.duration, wait.passive);
            if (call) {
                to.call(call.callback, call.thisObj, call.params);
            }
            // this.tween(target, void 0, {
            //     props: {
            //         x: targetX
            //     },
            //     ease: ease.x,
            //     wait: wait,
            //     duration: duration.x,
            //     call: callX
            // }, {
            //         props: {
            //             y: targetY
            //         },
            //         ease: ease.y,
            //         wait: wait,
            //         duration: duration.y,
            //         call: callX
            //     }
            // );
        };
        /**
         * X轴上移动
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetX 目标x轴
         * @param {number} duration 持续时间
         * @param {number} orgX 原来的x轴
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toMoveX = function (target, targetX, duration, orgX, ease, wait, call) {
            if (wait === void 0) { wait = { duration: 0 }; }
            if (orgX != void 0) {
                target.x = orgX;
            }
            this.tween(target, void 0, {
                props: {
                    x: targetX
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * Y轴上移动
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetY 目标y轴
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toMoveY = function (target, targetY, duration, orgY, ease, wait, call) {
            if (wait === void 0) { wait = { duration: 0 }; }
            if (orgY != void 0) {
                target.y = orgY;
            }
            this.tween(target, void 0, {
                props: {
                    y: targetY
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 向下显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toBottomShow = function (target, duration, orgY, orgA, ease, wait, call) {
            if (orgY === void 0) { orgY = target.y; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            target.y -= target.height;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    y: orgY,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 向上隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toTopHide = function (target, duration, orgY, orgA, ease, wait, call) {
            if (orgY === void 0) { orgY = target.y; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            this.tween(target, void 0, {
                props: {
                    y: orgY - target.height,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        target.visible = false;
                        target.y = orgY;
                        target.alpha = orgA;
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 向上显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法 ps: egret.Ease.backOut (仿物理性回弹效果)
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toTopShow = function (target, duration, orgY, orgA, ease, wait, call) {
            if (orgY === void 0) { orgY = target.y; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            target.y += target.height;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    y: orgY,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 向上显示(物理性回弹效果)
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} diffY 目标y轴差值
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} easeOut = egret.Ease.sineOut 缓动算法(缓出)
         * @param {egret.Ease} easeIn = egret.Ease.sineIn 缓动算法(回弹)
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toTopShowPhy = function (target, diffY, duration, orgY, orgA, easeOut, easeIn, wait, call) {
            if (orgY === void 0) { orgY = target.y; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (easeOut === void 0) { easeOut = egret.Ease.sineOut; }
            if (easeIn === void 0) { easeIn = egret.Ease.sineIn; }
            if (wait === void 0) { wait = { duration: 0 }; }
            target.y += target.height;
            target.alpha = 0;
            target.visible = true;
            egret.Tween.get(target)
                .to({ y: orgY - diffY, alpha: orgA }, Math.floor(duration / 2), easeOut)
                .to({ y: orgY }, Math.floor(duration / 4), easeIn)
                .to({ y: orgY - Math.floor(diffY / 6) }, Math.floor(duration / 8), easeOut)
                .to({ y: orgY }, Math.floor(duration / 8), easeIn)
                .wait(wait.duration, wait.passive).call(call.callback, call.thisObj, call.params);
        };
        /**
         * 向下隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toBottomHide = function (target, duration, orgY, orgA, ease, wait, call) {
            if (orgY === void 0) { orgY = target.y; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            this.tween(target, void 0, {
                props: {
                    y: orgY + target.height,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        target.visible = false;
                        target.y = orgY;
                        target.alpha = orgA;
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 向右显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgX 原来的x轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toRightShow = function (target, duration, orgX, orgA, ease, wait, call) {
            if (orgX === void 0) { orgX = target.x; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            target.x -= target.width;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    x: orgX,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 向左隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgX 原来的x轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toLeftHide = function (target, duration, orgX, orgA, ease, wait, call) {
            if (orgX === void 0) { orgX = target.x; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            this.tween(target, void 0, {
                props: {
                    x: orgX - target.width,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        target.visible = false;
                        target.x = orgX;
                        target.alpha = orgA;
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 向左显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgX 原来的x轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toLeftShow = function (target, duration, orgX, orgA, ease, wait, call) {
            if (orgX === void 0) { orgX = target.x; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            target.x += target.width;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    x: orgX,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 向右隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgX 原来的x轴
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toRightHide = function (target, duration, orgX, orgA, ease, wait, call) {
            if (orgX === void 0) { orgX = target.x; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            this.tween(target, void 0, {
                props: {
                    x: orgX + target.width,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        target.visible = false;
                        target.x = orgX;
                        target.alpha = orgA;
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 放大显示 (冒现效果)
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法 ps: egret.Ease.bounceOut (果冻效果)
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toBigShow = function (target, duration, orgS, orgA, ease, wait, call) {
            if (orgS === void 0) { orgS = target.scaleX; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            target.scaleX = target.scaleY = 0;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    scaleX: orgS,
                    scaleY: orgS,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 缩小隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toSmallHide = function (target, duration, orgS, orgA, ease, wait, call) {
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            if (orgS != void 0) {
                target.scaleX = target.scaleY = orgS;
            }
            this.tween(target, void 0, {
                props: {
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        target.visible = false;
                        target.scaleX = target.scaleY = orgS;
                        target.alpha = orgA;
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 缩小显示 (盖章效果)
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} diffS 缩放差值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toSmallShow = function (target, diffS, duration, orgS, orgA, ease, wait, call) {
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            if (orgS != void 0) {
                target.scaleX = target.scaleY = orgS;
            }
            target.scaleX = target.scaleY *= diffS;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    scaleX: orgS,
                    scaleY: orgS,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 放大隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} diffS 缩放差值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toBigHide = function (target, diffS, duration, orgS, orgA, ease, wait, call) {
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            if (orgS != void 0) {
                target.scaleX = target.scaleY = orgS;
            }
            this.tween(target, void 0, {
                props: {
                    scaleX: target.scaleX * diffS,
                    scaleY: target.scaleX * diffS,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        target.visible = false;
                        target.scaleX = target.scaleY = orgS;
                        target.alpha = orgA;
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 递增宽度显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgW 原来的宽度
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toWidthAddShow = function (target, duration, orgW, orgA, ease, wait, call) {
            if (orgW === void 0) { orgW = target.width; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            target.width = 0;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    width: orgW,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 递减宽度隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgW 原来的宽度
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toWidthCutHide = function (target, duration, orgW, orgA, ease, wait, call) {
            if (orgW === void 0) { orgW = target.width; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            this.tween(target, void 0, {
                props: {
                    width: 0,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        target.visible = false;
                        target.width = orgW;
                        target.alpha = orgA;
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 递增高度显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgH 原来的高度
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toHeightAddShow = function (target, duration, orgH, orgA, ease, wait, call) {
            if (orgH === void 0) { orgH = target.height; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            target.height = 0;
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    height: orgH,
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 递减高度隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgH 原来的高度
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toHeightCutHide = function (target, duration, orgH, orgA, ease, wait, call) {
            if (orgH === void 0) { orgH = target.height; }
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            this.tween(target, void 0, {
                props: {
                    height: 0,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        target.visible = false;
                        target.height = orgH;
                        target.alpha = orgA;
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 递增、递减宽度
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} diffW 宽度差值
         * @param {number} orgW 原来的宽度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.toWidthChange = function (target, duration, diffW, orgW, ease, wait, call) {
            if (wait === void 0) { wait = { duration: 0 }; }
            if (orgW != void 0) {
                target.width = orgW;
            }
            orgW = target.width; //原来的宽度
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    width: orgW + diffW
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        if (target.width <= 0) {
                            target.width = 0;
                            target.visible = false;
                        }
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 淡入显示
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.fadeIn = function (target, duration, orgA, ease, wait, call) {
            if (orgA === void 0) { orgA = target.alpha; }
            if (wait === void 0) { wait = { duration: 0 }; }
            target.alpha = 0;
            target.visible = true;
            this.tween(target, void 0, {
                props: {
                    alpha: orgA
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: call
            });
        };
        /**
         * 淡出隐藏
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} duration 持续时间
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         *
         * @param {Object} call 执行回调函数
         * @param {Function} call.callback 回调方法
         * @param {any} call.thisObj 回调方法this作用域
         * @param {any[]} call.params 回调方法参数
         */
        TweenMgr.prototype.fadeOut = function (target, duration, orgA, ease, wait, call) {
            if (orgA === void 0) { orgA = target.alpha; }
            this.tween(target, void 0, {
                props: {
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: function () {
                        target.visible = false;
                        target.alpha = orgA;
                        if (call) {
                            (_a = call.callback).call.apply(_a, [call.thisObj].concat(call.params));
                        }
                        var _a;
                    },
                    thisObj: this
                }
            });
        };
        /**
         * 持续漂浮，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetY 目标y轴
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {egret.Ease} ease 缓动算法
         */
        TweenMgr.prototype.loopFloat = function (target, targetY, duration, orgY, ease) {
            if (targetY === void 0) { targetY = -30; }
            if (duration === void 0) { duration = 500; }
            if (orgY != void 0) {
                target.y = orgY;
            }
            orgY = target.y; //原来的y轴
            this.tween(target, { loop: true }, {
                props: { y: orgY + targetY },
                duration: duration
            }, {
                props: { y: orgY },
                duration: duration
            });
        };
        /**
         * 持续缩放，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetS 目标缩放值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {egret.Ease} ease 缓动算法
         */
        TweenMgr.prototype.loopScale = function (target, targetS, duration, orgS, ease) {
            if (targetS === void 0) { targetS = 1.2; }
            if (duration === void 0) { duration = 500; }
            if (orgS != void 0) {
                target.scaleX = orgS;
            }
            orgS = target.scaleX; //原来的缩放值
            this.tween(target, { loop: true }, {
                props: { scaleX: orgS * targetS, scaleY: orgS * targetS },
                duration: duration
            }, {
                props: { scaleX: orgS, scaleY: orgS },
                duration: duration
            });
        };
        /**
         * 持续改变透明度，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetA 目标透明度
         * @param {number} duration 持续时间
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         */
        TweenMgr.prototype.loopAlpha = function (target, targetA, duration, orgA, ease) {
            if (targetA === void 0) { targetA = 1.2; }
            if (duration === void 0) { duration = 500; }
            if (orgA != void 0) {
                target.alpha = orgA;
            }
            orgA = target.alpha; //原来的透明度
            this.tween(target, { loop: true }, {
                props: { alpha: orgA * targetA },
                duration: duration
            }, {
                props: { alpha: orgA },
                duration: duration
            });
        };
        /**
         * 持续旋转，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} direction 旋转方向 1:顺时针 -1:逆时针
         * @param {number} duration 持续时间
         * @param {number} orgR 原来的角度
         * @param {egret.Ease} ease 缓动算法
         */
        TweenMgr.prototype.loopRotate = function (target, direction, duration, orgR, ease) {
            if (direction === void 0) { direction = 1; }
            if (duration === void 0) { duration = 3600; }
            if (orgR != void 0) {
                target.rotation = orgR;
            }
            orgR = target.rotation; //原来的角度
            this.tween(target, { loop: true }, {
                props: { rotation: orgR + direction * 360 },
                duration: duration
            });
        };
        /**
         * 摇摆动画
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} diffR 目标角度差值
         * @param {number} duration 持续时间
         * @param {number} orgR 原来的角度
         * @param {egret.Ease} ease 缓动算法
         *
         * @param {Object} wait 等待指定毫秒后执行下一个动画
         * @param {number} wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} wait.passive 等待期间属性是否会更新
         */
        TweenMgr.prototype.swing = function (target, diffR, duration, orgR, ease, wait) {
            if (duration === void 0) { duration = 1000; }
            if (wait === void 0) { wait = { duration: 0 }; }
            if (orgR != void 0) {
                target.rotation = orgR;
            }
            else {
                orgR = target.rotation;
            }
            this.tween(target, { loop: true }, {
                props: { rotation: orgR + diffR },
                duration: duration / 2
            }, {
                props: { rotation: orgR - 2 * diffR },
                duration: duration
            }, {
                props: { rotation: orgR },
                duration: duration / 2,
                wait: wait
            });
        };
        /**
         * 激活一个对象，对其添加 Tween 动画
         * @param {Object} target 要激活 Tween 的对象
         * @param {Object} props 参数，支持loop(循环播放) onChange(变化函数) onChangeObj(变化函数作用域)
         * @param {any} props.pluginData 暂未实现
         * @param {boolean} props.override 是否移除对象之前添加的tween，默认值false。
         *
         * @param {Object[]} toArg 将指定对象的属性修改为指定值参数列表
         * @param {Object} toArg.props 对象的属性集合
         * @param {number} toArg.duration 持续时间
         * @param {egret.Ease} toArg.ease 缓动算法
         *
         * @param {Object} toArg.wait 等待指定毫秒后执行下一个动画
         * @param {number} toArg.wait.duration 要等待的时间，以毫秒为单位
         * @param {boolean} toArg.wait.passive 等待期间属性是否会更新
         *
         * @param {Object} toArg.call 执行回调函数
         * @param {Function} toArg.call.callback 回调方法
         * @param {any} toArg.call.thisObj 回调方法this作用域
         * @param {any[]} toArg.call.params 回调方法参数
         */
        TweenMgr.prototype.tween = function (target, props) {
            var _this = this;
            if (props === void 0) { props = {}; }
            var toArg = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                toArg[_i - 2] = arguments[_i];
            }
            this.rmTweens(target);
            var tween = egret.Tween.get(target, props, props.pluginData, props.override); //缓动对象
            if (!toArg) {
                this.rmTweens(target);
                return tween;
            }
            else {
                var toIdx_1 = 0;
                var tranTo_1 = function () {
                    var _to = toArg[toIdx_1];
                    if (_to.wait) {
                        tween.to(_to.props, _to.duration, _to.ease).wait(_to.wait.duration, _to.wait.passive).call(function () {
                            if (_to.call) {
                                (_a = _to.call.callback).call.apply(_a, [_to.call.thisObj].concat(_to.call.params));
                            }
                            toIdx_1++;
                            if (toIdx_1 >= toArg.length) {
                                // if (!props || !props.loop) {
                                // this.rmTweens(target);
                                // }
                                return tween;
                            }
                            else {
                                tranTo_1();
                            }
                            var _a;
                        }, _this);
                    }
                    else {
                        tween.to(_to.props, _to.duration, _to.ease).call(function () {
                            if (_to.call) {
                                (_a = _to.call.callback).call.apply(_a, [_to.call.thisObj].concat(_to.call.params));
                            }
                            toIdx_1++;
                            if (toIdx_1 >= toArg.length) {
                                // if (!props || !props.loop) {
                                // this.rmTweens(target);
                                // }
                                return tween;
                            }
                            else {
                                tranTo_1();
                            }
                            var _a;
                        }, _this);
                    }
                };
                tranTo_1();
            }
        };
        /**
         * 移除缓动动画
         * @param {egret.DisplayObject} obj 移除的对象
         */
        TweenMgr.prototype.rmTweens = function (obj) {
            if (obj) {
                egret.Tween.removeTweens(obj);
            }
        };
        return TweenMgr;
    }());
    util.TweenMgr = TweenMgr;
    __reflect(TweenMgr.prototype, "util.TweenMgr");
})(util || (util = {}));
//# sourceMappingURL=TweenMgr.js.map
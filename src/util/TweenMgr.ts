namespace util {
    /**
     * 缓动动画管理器
     */
    export class TweenMgr {

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
        public toScale(target: egret.DisplayObject, targetS: number, duration?: number, orgS?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toMove(target: egret.DisplayObject, targetX: number, targetY: number, duration?: { x: number, y?: number }, orgX?: number, orgY?: number, ease?: { x: Function, y?: Function },
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
            } else {
                ease = { x: void 0, y: void 0 };
            }
            var callX: { callback: Function; thisObj?: any; params?: any[]; }, callY: { callback: Function; thisObj?: any; params?: any[]; };
            if (duration) {
                if (duration.y == void 0) {
                    duration.y = duration.x;
                } else {
                    if (duration.x > duration.y) {
                        callX = call;
                    } else {
                        callY = call;
                    }
                }
            }
            egret.Tween.get(target).to({ x: targetX }, duration.x, ease.x);
            let to: egret.Tween = egret.Tween.get(target).to({ y: targetY }, duration.y, ease.y).wait(wait.duration, wait.passive);
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
        }

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
        public toMoveX(target: egret.DisplayObject, targetX: number, duration?: number, orgX?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toMoveY(target: egret.DisplayObject, targetY: number, duration?: number, orgY?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toBottomShow(target: egret.DisplayObject, duration?: number, orgY: number = target.y, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toTopHide(target: egret.DisplayObject, duration?: number, orgY: number = target.y, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    y: orgY - target.height,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.y = orgY;
                        target.alpha = orgA;
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

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
        public toTopShow(target: egret.DisplayObject, duration?: number, orgY: number = target.y, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toTopShowPhy(target: egret.DisplayObject, diffY: number, duration?: number, orgY: number = target.y, orgA: number = target.alpha, easeOut: Function = egret.Ease.sineOut, easeIn: Function = egret.Ease.sineIn,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            target.y += target.height;
            target.alpha = 0;
            target.visible = true;
            egret.Tween.get(target)
                .to({ y: orgY - diffY, alpha: orgA }, Math.floor(duration / 2), easeOut)
                .to({ y: orgY }, Math.floor(duration / 4), easeIn)
                .to({ y: orgY - Math.floor(diffY / 6) }, Math.floor(duration / 8), easeOut)
                .to({ y: orgY }, Math.floor(duration / 8), easeIn)
                .wait(wait.duration, wait.passive).call(call.callback, call.thisObj, call.params);
        }

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
        public toBottomHide(target: egret.DisplayObject, duration?: number, orgY: number = target.y, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    y: orgY + target.height,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.y = orgY;
                        target.alpha = orgA;
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

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
        public toRightShow(target: egret.DisplayObject, duration?: number, orgX: number = target.x, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toLeftHide(target: egret.DisplayObject, duration?: number, orgX: number = target.x, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    x: orgX - target.width,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.x = orgX;
                        target.alpha = orgA;
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

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
        public toLeftShow(target: egret.DisplayObject, duration?: number, orgX: number = target.x, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toRightHide(target: egret.DisplayObject, duration?: number, orgX: number = target.x, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    x: orgX + target.width,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.x = orgX;
                        target.alpha = orgA;
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

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
        public toBigShow(target: egret.DisplayObject, duration?: number, orgS: number = target.scaleX, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toSmallHide(target: egret.DisplayObject, duration?: number, orgS?: number, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
                    callback: () => {
                        target.visible = false;
                        target.scaleX = target.scaleY = orgS;
                        target.alpha = orgA;
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

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
        public toSmallShow(target: egret.DisplayObject, diffS: number, duration?: number, orgS?: number, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toBigHide(target: egret.DisplayObject, diffS: number, duration?: number, orgS?: number, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
                    callback: () => {
                        target.visible = false;
                        target.scaleX = target.scaleY = orgS;
                        target.alpha = orgA;
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

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
        public toWidthAddShow(target: egret.DisplayObject, duration?: number, orgW: number = target.width, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toWidthCutHide(target: egret.DisplayObject, duration?: number, orgW: number = target.width, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    width: 0,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.width = orgW;
                        target.alpha = orgA;
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

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
        public toHeightAddShow(target: egret.DisplayObject, duration?: number, orgH: number = target.height, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public toHeightCutHide(target: egret.DisplayObject, duration?: number, orgH: number = target.height, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    height: 0,
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.height = orgH;
                        target.alpha = orgA;
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

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
        public toWidthChange(target: egret.DisplayObject, duration?: number, diffW?: number, orgW?: number, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
                    callback: () => {
                        if (target.width <= 0) {
                            target.width = 0;
                            target.visible = false;
                        }
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

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
        public fadeIn(target: egret.DisplayObject, duration?: number, orgA: number = target.alpha, ease?: Function,
            wait: {
                duration: number;
                passive?: boolean;
            } = { duration: 0 }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
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
        }

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
        public fadeOut(target: egret.DisplayObject, duration?: number, orgA: number = target.alpha, ease?: Function,
            wait?: {
                duration: number;
                passive?: boolean;
            }, call?: {
                callback: Function;
                thisObj?: any;
                params?: any[];
            }
        ) {
            this.tween(target, void 0, {
                props: {
                    alpha: 0
                },
                ease: ease,
                wait: wait,
                duration: duration,
                call: {
                    callback: () => {
                        target.visible = false;
                        target.alpha = orgA;
                        if (call) {
                            call.callback.call(call.thisObj, ...call.params);
                        }
                    },
                    thisObj: this
                }
            });
        }

        /**
         * 持续漂浮，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetY 目标y轴
         * @param {number} duration 持续时间
         * @param {number} orgY 原来的y轴
         * @param {egret.Ease} ease 缓动算法
         */
        public loopFloat(target: egret.DisplayObject, targetY: number = -30, duration: number = 500, orgY?: number, ease?: Function) {
            if (orgY != void 0) {
                target.y = orgY;
            }
            orgY = target.y; //原来的y轴
            this.tween(target, { loop: true },
                {
                    props: { y: orgY + targetY },
                    duration: duration
                }, {
                    props: { y: orgY },
                    duration: duration
                }
            );
        }

        /**
         * 持续缩放，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetS 目标缩放值
         * @param {number} duration 持续时间
         * @param {number} orgS 原来的缩放值
         * @param {egret.Ease} ease 缓动算法
         */
        public loopScale(target: egret.DisplayObject, targetS: number = 1.2, duration: number = 500, orgS?: number, ease?: Function) {
            if (orgS != void 0) {
                target.scaleX = orgS;
            }
            orgS = target.scaleX; //原来的缩放值
            this.tween(target, { loop: true },
                {
                    props: { scaleX: orgS * targetS, scaleY: orgS * targetS },
                    duration: duration
                }, {
                    props: { scaleX: orgS, scaleY: orgS },
                    duration: duration
                }
            );
        }

        /**
         * 持续改变透明度，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} targetA 目标透明度
         * @param {number} duration 持续时间
         * @param {number} orgA 原来的透明度
         * @param {egret.Ease} ease 缓动算法
         */
        public loopAlpha(target: egret.DisplayObject, targetA: number = 1.2, duration: number = 500, orgA?: number, ease?: Function) {
            if (orgA != void 0) {
                target.alpha = orgA;
            }
            orgA = target.alpha; //原来的透明度
            this.tween(target, { loop: true },
                {
                    props: { alpha: orgA * targetA },
                    duration: duration
                }, {
                    props: { alpha: orgA },
                    duration: duration
                }
            );
        }

        /**
         * 持续旋转，呼吸效果
         * @param {Object} target 要激活 Tween 的对象
         * @param {number} direction 旋转方向 1:顺时针 -1:逆时针
         * @param {number} duration 持续时间
         * @param {number} orgR 原来的角度
         * @param {egret.Ease} ease 缓动算法
         */
        public loopRotate(target: egret.DisplayObject, direction: 1 | -1 = 1, duration: number = 3600, orgR?: number, ease?: Function) {
            if (orgR != void 0) {
                target.rotation = orgR;
            }
            orgR = target.rotation; //原来的角度
            this.tween(target, { loop: true },
                {
                    props: { rotation: orgR + direction * 360 },
                    duration: duration
                }
            );
        }

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
        public swing(target: egret.DisplayObject, diffR: number, duration: number = 1000, orgR?: number, ease?: Function, wait: {
            duration: number;
            passive?: boolean;
        } = { duration: 0 }) {
            if (orgR != void 0) {
                target.rotation = orgR;
            } else {
                orgR = target.rotation;
            }
            this.tween(target, { loop: true },
                {
                    props: { rotation: orgR + diffR },
                    duration: duration / 2
                }, {
                    props: { rotation: orgR - 2 * diffR },
                    duration: duration
                }, {
                    props: { rotation: orgR },
                    duration: duration / 2,
                    wait: wait
                }
            );
        }

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
        public tween(
            target: any,
            props: {
                loop?: boolean; //循环播放
                onChange?: Function; //变化函数
                onChangeObj?: any; //变化函数作用域
                pluginData?: any; //暂未实现
                override?: boolean; //是否移除对象之前添加的tween，默认值false。
            } = {}, ...toArg: {
                props?: Object;
                duration?: number;
                ease?: Function;
                wait?: {
                    duration: number;
                    passive?: boolean;
                };
                call?: {
                    callback: Function;
                    thisObj?: any;
                    params?: any[];
                };

            }[]
        ): egret.Tween {
            this.rmTweens(target);
            let tween: egret.Tween = egret.Tween.get(target, props, props.pluginData, props.override); //缓动对象

            if (!toArg) {
                this.rmTweens(target);
                return tween;
            } else {
                let toIdx: number = 0;
                let tranTo: Function = () => {
                    let _to: {
                        props?: Object;
                        duration?: number;
                        ease?: Function;
                        wait?: {
                            duration: number;
                            passive?: boolean;
                        };
                        call?: {
                            callback: Function;
                            thisObj?: any;
                            params?: any[];
                        };

                    } = toArg[toIdx];

                    if (_to.wait) {
                        tween.to(_to.props, _to.duration, _to.ease).wait(_to.wait.duration, _to.wait.passive).call(() => {
                            if (_to.call) {
                                _to.call.callback.call(_to.call.thisObj, ..._to.call.params);
                            }
                            toIdx++;
                            if (toIdx >= toArg.length) {
                                // if (!props || !props.loop) {
                                // this.rmTweens(target);
                                // }
                                return tween;
                            } else {
                                tranTo();
                            }
                        }, this);
                    } else {
                        tween.to(_to.props, _to.duration, _to.ease).call(() => {
                            if (_to.call) {
                                _to.call.callback.call(_to.call.thisObj, ..._to.call.params);
                            }
                            toIdx++;
                            if (toIdx >= toArg.length) {
                                // if (!props || !props.loop) {
                                // this.rmTweens(target);
                                // }
                                return tween;
                            } else {
                                tranTo();
                            }
                        }, this);
                    }
                }

                tranTo();
            }
        }

		/**
		 * 移除缓动动画
		 * @param {egret.DisplayObject} obj 移除的对象
		 */
        public rmTweens(obj: egret.DisplayObject) {
            if (obj) {
                egret.Tween.removeTweens(obj);
            }
        }
    }
}
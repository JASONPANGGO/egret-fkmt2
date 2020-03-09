namespace util {
    /**
     * 组件管理器
     */
    export class ComMgr {

		/**
		 * 点击效果
		 * @param {egret.DisplayObject} obj 做效果对象
		 * @param {gConst.clkAimType} aimType 效果类型 0:隐藏 1:缩放
		 */
        public clickAim(obj: egret.DisplayObject, aimType: gConst.clkAimType = gConst.clkAimType.SCALE) {
            gTween.rmTweens(obj);
            switch (aimType) {
                //隐藏
                case gConst.clkAimType.HIDE:
                    let initA: number = obj.alpha; //初始透明度
                    gTween.tween(obj, void 0, {
                        props: { alpha: 0 },
                        duration: 200,
                        call: {
                            callback: () => {
                                gTween.rmTweens(obj);
                                obj.visible = false;
                                obj.alpha = initA;
                            },
                            thisObj: this
                        }
                    });
                    break;
                //缩放
                case gConst.clkAimType.SCALE:
                    gTween.loopScale(obj, 0.8, 200, obj.scaleX);
                    break;
            }
        }

		/**
		 * 移除对象
		 * @param {egret.DisplayObject} obj 移除的对象
		 */
        public rmObj(obj: egret.DisplayObject): null {
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
            return null;
        }
    }
}
namespace util {
    /**
     * 数学计算管理器
     */
    export class MathMgr {

        /**
         * 随机返回一个浮点数
         * @param {number} max 最大值
         * @param {number} min 最小值
         * @returns {number} 返回一个随机浮点数（含小不含大）
         */
        public getRandom(max: number, min: number = 0): number {
            return Math.random() * (max - min) + min;
        }

        /**
         * 随机返回一个整数
         * @param {number} max 最大值
         * @param {number} min 最小值
         * @returns {number} 返回一个随机整数（含小不含大）
         */
        public getRandomInteger(max: number, min: number = 0): number {
            return Math.floor(this.getRandom(max, min));
        }

        /**
         * N（正数 或 零）次方(n >= 0)
         * @param {number} val 根
         * @param {number} n N次方
         */
        private getSquarePositive(val: number, n: number = 2) {
            if (n < 0) {
                console.warn("此接口一般不开放，如需要开负数次方，推荐使用：getSquare()");
                return;
            }
            let newVal: number = val;
            //val 的 (n + 1) 次方除以 val
            for (let i: number = 0; i < n; i++) {
                newVal *= val;
            }
            newVal /= val;
            return newVal;
        }

        /**
         * N次方
         * @param {number} val 根
         * @param {number} n N次方
         */
        public getSquare(val: number, n: number = 2): number {
            let newVal: number = val;
            // if (n >= 0) {
            //     newVal = this.getSquarePositive(val, n);
            // } else {
            //     newVal = this.getSquarePositive(1 / val, -n);
            // }
            newVal = Math.pow(val, n);
            return newVal;
        }

        /**
         * 求两点间距离
         */
        public getDistance(x1: number, y1: number, x2: number, y2: number): number {
            let dist: number;
            // dist = Math.sqrt(this.getSquarePositive(x1 - x2) + this.getSquarePositive(y1 - y2));
            dist = egret.Point.distance({ x: x1, y: y1 } as egret.Point, { x: x2, y: y2 } as egret.Point);
            dist = Math.floor(dist);
            return dist;
        }
    }
}
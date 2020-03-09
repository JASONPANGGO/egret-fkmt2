namespace com {
	/**
	 * 动画组件
	 */
	export class MovieClip extends eui.Component {
		private list: data.McData[]; //动画数据列表，可传多组动画
		public interval: number = 40; //播放间隔
		private nextUpdateTime: number; //下一次刷新动画的时间，取决于 interval 播放间隔
		public bm: eui.Image; //动画图片
		private currentFrameName: string; //当前动作名称
		/** 播放次数 -1为循环播放 */
		private playTime: number = -1;
		private currentData: data.McData; //当前动画数据
		private frameIndex: number; //当前帧，做帧图片纹理区分（1、2、3...）
		public isplay: boolean = false; //是否继续播放

		/**
		 * 构造动画对象
		 */
		public constructor() {
			super();
			this.bm = new eui.Image();
			this.addChild(this.bm);
			this.bm.pixelHitTest = true;
		}

		/**
		 * 设置动画数据
		 * @param {data.McData[]} ob 动画数据列表，可传多组动画
		 * @param {number} anchorOffsetX 动画图片锚点X轴
		 * @param {number} anchorOffsetY 动画图片锚点Y轴
		 */
		public setData(ob: data.McData[], anchorOffsetX: number = 0, anchorOffsetY: number = 0): void {
			this.list = ob;
			this.bm.anchorOffsetX = anchorOffsetX;
			this.bm.anchorOffsetY = anchorOffsetY;
		}

		/**
		 * 开启精准碰撞
		 * @param {boolean} pixelHitTest 是否开启精准碰撞
		 */
		public pixelHitTest(pixelHitTest: boolean): void {
			this.bm.pixelHitTest = pixelHitTest;
		}

		/**
		 * 停留在指定动作的某一帧
		 * @param {string} fName 动作名称
		 * @param {number} frameIndex 指定帧, 默认 1
		 */
		public gotoAndStop(fName: string, frameIndex: number = 1): void {
			if (this.isplay) {
				this.isplay = false;
				this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			}

			this.currentFrameName = fName;
			this.currentData = this.getMcDataByAction(fName);
			this.frameIndex = frameIndex;
			if (this.currentData) {
				let picName: string = this.currentData.frameName.replace("{1}", this.frameIndex.toString());
				this.bm.source = picName;
			}
		}

		/**
		 * 销毁
		 */
		public dispose(): void {
			this.stop();
			if (this.parent) {
				this.parent.removeChild(this);
			}
			this.removeChildren();
			this.list = null;
		}

		private isReverse: boolean = false;
		/**
		 * 反向播放
		 * @param {string} fName 动作名称
		 * @param {number} playTime = -1 播放次数
		 */
		public gotoAndReverse(fName: string, playTime: number = -1): void {
			this.isReverse = true;
			this.currentFrameName = fName;
			this.playTime = playTime;
			this.currentData = this.getMcDataByAction(fName);
			if (this.currentData) {
				this.nextUpdateTime = egret.getTimer() + this.interval;
				this.currentData.direct = -1;
				this.frameIndex = this.currentData.frameCnt;
				let picName: string = this.currentData.frameName.replace("{1}", this.frameIndex.toString());
				// console.log("this.frameIndex:" + this.frameIndex);
				this.bm.source = picName;
				if (!this.isplay) {
					this.isplay = true;
					this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
				}
			}
		}

		/**
		 * 正向播放
		 * @param {string} fName 动作名称
		 * @param {number} playTime = -1 播放次数
		 */
		public gotoAndPlay(fName: string, playTime: number = -1): void {
			this.isReverse = false;
			this.currentFrameName = fName;
			this.playTime = playTime;
			this.currentData = this.getMcDataByAction(fName);
			if (this.currentData) {
				this.nextUpdateTime = egret.getTimer() + this.interval;
				this.currentData.direct = 1;
				this.frameIndex = 1;
				let picName: string = this.currentData.frameName.replace("{1}", this.frameIndex.toString());
				// console.log("this.frameIndex:" + this.frameIndex);
				this.bm.source = picName;
				if (!this.isplay) {
					this.isplay = true;
					this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
				}
			}
		}

		/**
		 * 按播放间隔刷新视频
		 * @example 每帧监听
		 * @param {egret.Event} event 动画对象自身事件源
		 */
		private update(event: egret.Event): void {
			if (egret.getTimer() >= this.nextUpdateTime) {
				this.updateFrame();
			}
		}

		/**
		 * 刷新视频
		 */
		private updateFrame(): void {
			this.nextUpdateTime = egret.getTimer() + this.interval;

			if (this.isReverse && this.frameIndex < 1) {
				this.stop();
				this.dispatchEventWith(egret.Event.COMPLETE);
			}

			let picName: string = this.currentData.frameName.replace("{1}", this.frameIndex.toString());
			// console.log("this.frameIndex:" + this.frameIndex);
			this.bm.source = picName;
			this.frameIndex += this.currentData.direct;

			if (this.frameIndex > this.currentData.frameCnt) {
				//正向播放到最后
				if (this.currentData.direct == 1 && this.currentData.backplay) {
					//改为反向播放
					this.frameIndex -= 2;
					this.currentData.direct = -1;
				} else {
					//无来回方向播放时，播放完成，停留在第一帧
					this.frameIndex = 1;
				}

				if (this.playTime == -1) {
					//循环播放
				} else if (!this.currentData.backplay || (this.currentData.backplay && this.isReverse)) {
					//正常播放的时候 播放到最后 次数减少一次
					//次数播放
					this.playTime--;
					if (this.playTime == 0) {
						this.stop();
						this.dispatchEventWith(egret.Event.COMPLETE);
					}
				}
			} else if (this.frameIndex < 1) {
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
		}

		/**
		 * 暂停播放
		 */
		public stop(): void {
			if (this.isplay) {
				this.isplay = false;
				this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			}
		}

		/**
		 * 通过动作名称获取动画数据
		 * @param {string} fName 动作名称
		 */
		private getMcDataByAction(fName: string): data.McData {
			for (var i: number = 0; i < this.list.length; i++) {
				if (this.list[i].fName == fName) {
					return this.list[i];
				}
			}
			return null;
		}
	}
}
namespace com {
	/**
	 * 粒子对象
	 */
	export class ParticleCom {
		private parent: egret.DisplayObjectContainer; //父级对象容器
		private resName: string; //资源名称
		private system: particle.GravityParticleSystem;

		/**
		 * 构造一个粒子对象
		 */
		public constructor() {
		}

		/**
		 * 创建粒子
		 */
		private create() {
			if (!this.system) {
				var texture: egret.Texture = RES.getRes(this.resName + "_png");
				var config: Object = RES.getRes(this.resName + "_json");
				this.system = new particle.GravityParticleSystem(texture, config);
				this.system.touchEnabled = false;
				this.setPos();
			}
			this.parent.addChild(this.system);
		}

		/**
		 * 设置数据
		 * @param {egret.DisplayObjectContainer} parent 父级对象容器
		 * @param {string} resName 资源名称
		 */
		public setData(parent: egret.DisplayObjectContainer, resName: string) {
			this.parent = parent;
			this.resName = resName;
			this.create();
		}

		/**
		 * 开始播放粒子
         * @param {number} duration 粒子出现总时间
		 */
		public start(duration?: number) {
			this.system.start();
		}

        /**
         * 停止创建粒子
         * @param {boolean} clear 是否清除掉现有粒子
         */
		public stop(clear?: boolean) {
			this.system.stop(clear);
		}

        /**
         * 更换粒子纹理
		 * @param {string} resName 资源名称
         */
		public change(resName: string) {
			this.resName = resName;
			var texture: egret.Texture = RES.getRes(this.resName + "_png");
			this.system.changeTexture(texture);
		}

		/**
		 * 设置粒子位置
		 */
		public setPos(x: number = 0, y: number = 0) {
			this.system.x = x;
			this.system.y = y;
		}

		/**
		 * 更新粒子发射位置x
		 */
		public updateEmitterX(x: number) {
			this.system.emitterX = x;
		}

		/**
		 * 更新粒子发射位置y
		 */
		public updateEmitterY(y: number) {
			this.system.emitterY = y;
		}
	}
}
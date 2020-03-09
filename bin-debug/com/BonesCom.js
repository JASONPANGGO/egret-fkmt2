// namespace com {
// 	/**
// 	 * 骨骼对象
// 	 */
// 	export class BonesCom {
// 		private parent: egret.DisplayObjectContainer; //父级对象容器
// 		private resName: string; //资源名称
// 		private exitAim: { aimType?: number, wait?: number, time?: number }; //退场动画配置
// 		private armatureName: string; //骨架数据名称
// 		private dragonBonesName: string; //指定的龙骨数据名称
// 		public factory: dragonBones.EgretFactory;
// 		public armatureDisplay: dragonBones.EgretArmatureDisplay; //骨架的显示容器
// 		/**
// 		 * 构造一个骨骼对象
// 		 */
// 		public constructor() {
// 		}
// 		/**
// 		 * 设置数据
// 		 * @param {egret.DisplayObjectContainer} parent 父级对象容器
// 		 * @param {string} resName 资源名称
// 		 * @param {Object} exitAim 退场动画配置
// 		 * @param {string} armatureName = "armatureName" 骨架数据名称
// 		 * @param {string} dragonBonesName 为数据提供一个名称，以便可以通过这个名称获取数据，如果未设置，则使用数据中的名称。
// 		 */
// 		public setData(parent: egret.DisplayObjectContainer, resName: string, exitAim?: { aimType?: number, wait?: number, time?: number }, armatureName: string = "armatureName", dragonBonesName?: string) {
// 			this.parent = parent;
// 			this.resName = resName;
// 			if (exitAim) {
// 				this.exitAim = {};
// 				this.exitAim.aimType = exitAim.aimType != void 0 ? exitAim.aimType : 0; //动画类型 0:原地消失 1:放大消失 2:缩小消失
// 				this.exitAim.wait = exitAim.wait != void 0 ? exitAim.wait : 0; //等待多长时间播放动画
// 				this.exitAim.time = exitAim.time != void 0 ? exitAim.time : 300; //动画所用时间
// 			}
// 			this.armatureName = armatureName;
// 			this.dragonBonesName = dragonBonesName;
// 		}
// 		private isComRemve: boolean; //播放完成是否移除
// 		/**
// 		 * 播放骨骼动画
// 		 * @param {string} animationName = "newAnimation" 动画数据名称，如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放上一个正在播放的动画。
// 		 * @param {number} playTimes 播放次数。= 1 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次]
// 		 * @param {boolean} isComRemve 播放完成是否自动移除
// 		 */
// 		public play(animationName: string = "newAnimation", playTimes: number = 1, isComRemve: boolean = true) {
// 			this.isComRemve = isComRemve;
// 			if (!this.armatureDisplay) {
// 				this.create();
// 				if (!this.armatureDisplay) {
// 					return;
// 				}
// 			}
// 			if (!this.parent) {
// 				return;
// 			}
// 			this.armatureDisplay.scaleX = this.armatureDisplay.scaleY = 1;
// 			this.armatureDisplay.alpha = 1;
// 			this.parent.addChild(this.armatureDisplay);
// 			this.armatureDisplay.x = this.parent.width / 2;
// 			this.armatureDisplay.y = this.parent.height / 2;
// 			this.armatureDisplay.addEvent(dragonBones.EgretEvent.COMPLETE, this.playComplete, this);
// 			this.armatureDisplay.animation.play(animationName, playTimes);
// 		}
// 		/**
// 		 * 播放完成
// 		 */
// 		public playComplete() {
// 			this.armatureDisplay.removeEvent(dragonBones.EgretEvent.COMPLETE, this.playComplete, this);
// 			if (this.exitAim) {
// 				this.playOutAim();
// 			} else {
// 				this.armatureDisplay.dispatchEventWith(egret.Event.COMPLETE);
// 				this.remove();
// 			}
// 		}
// 		/**
// 		 * 播放退场动画
// 		 */
// 		private playOutAim() {
// 			let _props: Object;
// 			switch (this.exitAim.aimType) {
// 				//原地消失
// 				case 0:
// 					_props = { alpha: 0 };
// 					break;
// 				//放大消失
// 				case 1:
// 					_props = { scaleX: 5, scaleY: 5, alpha: 0 };
// 					break;
// 				//缩小消失
// 				case 2:
// 					_props = { scaleX: 0, scaleY: 0, alpha: 0 };
// 					break;
// 			}
// 			egret.setTimeout(() => {
// 				gTween.tween(this.armatureDisplay, void 0, {
// 					props: _props,
// 					duration: this.exitAim.time,
// 					call: {
// 						callback: () => {
// 							this.armatureDisplay.dispatchEventWith(egret.Event.COMPLETE);
// 							if (this.isComRemve) {
// 								this.remove();
// 							}
// 						},
// 						thisObj: this
// 					}
// 				});
// 			}, this, this.exitAim.wait);
// 		}
// 		/**
// 		 * 移除骨骼的显示容器
// 		 */
// 		private remove() {
// 			gComMgr.rmObj(this.armatureDisplay);
// 		}
// 		/**
// 		 * 创建骨架的显示容器
// 		 */
// 		private create() {
// 			if (!this.resName) {
// 				return;
// 			}
// 			var rawData = RES.getRes(this.resName + "_ske_json");
// 			var textureAtlas = RES.getRes(this.resName + "_tex_json");
// 			var texture = RES.getRes(this.resName + "_tex_png");
// 			// this.factory = dragonBones.EgretFactory.factory;
// 			this.factory = new dragonBones.EgretFactory();
// 			this.factory.autoSearch = true;
// 			//engine v5.0
// 			this.factory.addDragonBonesData(this.factory.parseDragonBonesData(rawData));
// 			this.factory.addTextureAtlasData(this.factory.parseTextureAtlasData(textureAtlas, texture));
// 			// factory.parseDragonBonesData(rawData);
// 			// factory.parseTextureAtlasData(textureAtlas, texture);
// 			this.armatureDisplay = this.factory.buildArmatureDisplay(this.armatureName);
// 		}
// 		/**
// 		 * 切换显示资源
// 		 * @param {string} resName 资源名称
// 		 * @param {string} dragonBonesName 指定的龙骨数据名称。
// 		 * @param {string} armatureName 指定的骨架名称。
// 		 * @param {string} slotName 指定的插槽名称。
// 		 * @param {string} displayName 指定的显示对象名称。
// 		 * @param {string} olgSlotName 指定替换的旧插槽名称。
// 		 * @param {number} displayIndex 要替换的显示对象的索引，如果未设置，则替换当前正在显示的显示对象。
// 		 */
// 		public replaceDisplay(resName: string, dragonBonesName: string, armatureName: string, slotName: string, displayName: string, olgSlotName: string, displayIndex?: number) {
// 			this.factory.parseDragonBonesData(RES.getRes(resName + "_ske_json"));
// 			this.factory.parseTextureAtlasData(RES.getRes(resName + "_tex_json"), RES.getRes(resName + "_tex_png"));
// 			var slot: dragonBones.Slot = this.armatureDisplay.armature.getSlot(olgSlotName);
// 			this.factory.replaceSlotDisplay(dragonBonesName, armatureName, slotName, displayName, slot, displayIndex);
// 		}
// 	}
// } 
//# sourceMappingURL=BonesCom.js.map
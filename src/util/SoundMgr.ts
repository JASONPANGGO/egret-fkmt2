namespace util {
    /**
     * 音频管理器
     */
	export class SoundMgr {
		// public dingSound:egret.Sound;
		public bgSound: egret.SoundChannel;
		public bssoundurl: string = "bm_bgm_mp3";
		public isActive: boolean = true;

		//声音控制器初始化
		public init(): void {

		}

		public changeBg(name: string): void {
			if (window["changeBgMusic"]) {
				window["changeBgMusic"]("resource/assets/preload/sound/" + name + ".mp3");
			}

			this.bssoundurl = name;
			if (this.bgSound) {
				this.bgSound.stop();
				this.bgSound = null;
			}

			var sound: egret.Sound = RES.getRes(this.bssoundurl);
			this.bgSound = sound.play(0, 0);
		}
		//声音不能自动播放 需要再环境里播放 叮的一声 触发吧
		public ding(): void {
			// try{
			//     this.dingSound.play(0,1).volume = 0;
			// 	console.log("ding!!!");
			// }catch(e){
			//     console.log("no ding!!!");
			// }

		}

		//以防万一 让点击可以能触发
		private tap_sound(e): void {
			try {

			} catch (e) {
			}
		}

		private effKey: egret.SoundChannel;

		/**
		 * 播放音效
		 * @param {string} url resource/assets/preload/sound/end.mp3
		 */
		public playEff(name: string): void {
			if (window["webIsActivate"]) {
				if (window["playSoundEff"]) {
					window["playSoundEff"]("resource/assets/sound/" + name + ".mp3");
				}
			}
		}

		public stopEff(): void {
			if (this.effKey) {
				this.effKey.stop();
			}
		}

		public isplaying: boolean = false;
		public ch: egret.SoundChannel;
		public delayInd: number;
		public playLoop(name: string): void {
			egret.clearTimeout(this.delayInd);
			this.delayInd = egret.setTimeout(this.playLoop2, this, 3000, name);

		}

		public playLoop2(name: string): void {
			if (!this.isplaying) {
				this.isplaying = true;
				var sound: egret.Sound = RES.getRes(name + "_mp3");
				this.ch = sound.play(0, 0);
				this.ch.volume = 0.3;
			}
		}

		public stopLoop(): void {
			egret.clearTimeout(this.delayInd);
			if (this.ch) {
				this.ch.stop();
				this.ch = null;
			}
			this.isplaying = false;
		}

		//注册舞台事件
		public regEvent(): void {
			GameMgr.stage.addEventListener(egret.Event.ACTIVATE, this.on_active, this);
			GameMgr.stage.addEventListener(egret.Event.DEACTIVATE, this.on_de_active, this);
			GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_sound, this);
		}

		public on_active(e): void {
		}

		public on_de_active(e): void {
		}

		//暂停所有声音
		public stopAllStop() {
			if (window["stopAllStop"]) {
				window["stopAllStop"]();
			}
		}

		//暂停所有声音
		public recoveryAllSound() {
			if (window["recoveryAllSound"]) {
				window["recoveryAllSound"]();
			}
		}

		//销毁
		public destory() {
			if (window["destorySound"]) {
				window["destorySound"]();
			}
		}
	}
}
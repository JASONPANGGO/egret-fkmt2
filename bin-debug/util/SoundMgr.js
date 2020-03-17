var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 音频管理器
     */
    var SoundMgr = (function () {
        function SoundMgr() {
            this.bssoundurl = "bm_bgm_mp3";
            this.isActive = true;
            this.isplaying = false;
        }
        //声音控制器初始化
        SoundMgr.prototype.init = function () {
        };
        SoundMgr.prototype.changeBg = function (name) {
            if (window["changeBgMusic"]) {
                window["changeBgMusic"]("resource/assets/preload/sound/" + name + ".mp3");
            }
            this.bssoundurl = name;
            if (this.bgSound) {
                this.bgSound.stop();
                this.bgSound = null;
            }
            var sound = RES.getRes(this.bssoundurl);
            this.bgSound = sound.play(0, 0);
        };
        //声音不能自动播放 需要再环境里播放 叮的一声 触发吧
        SoundMgr.prototype.ding = function () {
            // try{
            //     this.dingSound.play(0,1).volume = 0;
            // 	console.log("ding!!!");
            // }catch(e){
            //     console.log("no ding!!!");
            // }
        };
        //以防万一 让点击可以能触发
        SoundMgr.prototype.tap_sound = function (e) {
            try {
            }
            catch (e) {
            }
        };
        /**
         * 播放音效
         * @param {string} url resource/assets/preload/sound/end.mp3
         */
        SoundMgr.prototype.playEff = function (name) {
            if (window["webIsActivate"]) {
                if (window["playSoundEff"]) {
                    window["playSoundEff"]("resource/assets/sound/" + name + ".mp3");
                }
            }
        };
        SoundMgr.prototype.stopEff = function () {
            if (this.effKey) {
                this.effKey.stop();
            }
        };
        SoundMgr.prototype.playLoop = function (name) {
            egret.clearTimeout(this.delayInd);
            this.delayInd = egret.setTimeout(this.playLoop2, this, 3000, name);
        };
        SoundMgr.prototype.playLoop2 = function (name) {
            if (!this.isplaying) {
                this.isplaying = true;
                var sound = RES.getRes(name + "_mp3");
                this.ch = sound.play(0, 0);
                this.ch.volume = 0.3;
            }
        };
        SoundMgr.prototype.stopLoop = function () {
            egret.clearTimeout(this.delayInd);
            if (this.ch) {
                this.ch.stop();
                this.ch = null;
            }
            this.isplaying = false;
        };
        //注册舞台事件
        SoundMgr.prototype.regEvent = function () {
            GameMgr.stage.addEventListener(egret.Event.ACTIVATE, this.on_active, this);
            GameMgr.stage.addEventListener(egret.Event.DEACTIVATE, this.on_de_active, this);
            GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_sound, this);
        };
        SoundMgr.prototype.on_active = function (e) {
        };
        SoundMgr.prototype.on_de_active = function (e) {
        };
        //暂停所有声音
        SoundMgr.prototype.stopAllStop = function () {
            if (window["stopAllStop"]) {
                window["stopAllStop"]();
            }
        };
        //暂停所有声音
        SoundMgr.prototype.recoveryAllSound = function () {
            if (window["recoveryAllSound"]) {
                window["recoveryAllSound"]();
            }
        };
        //销毁
        SoundMgr.prototype.destory = function () {
            if (window["destorySound"]) {
                window["destorySound"]();
            }
        };
        return SoundMgr;
    }());
    util.SoundMgr = SoundMgr;
    __reflect(SoundMgr.prototype, "util.SoundMgr");
})(util || (util = {}));
//# sourceMappingURL=SoundMgr.js.map
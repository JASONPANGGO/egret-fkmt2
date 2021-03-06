
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/expand/const/const.js",
	"libs/modules/print/print.js",
	"libs/modules/interface_ahead/interface_ahead.js",
	"libs/modules/webaudio/webaudio.js",
	"libs/modules/interface/interface.js",
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/particle/particle.js",
	"bin-debug/ui/UiFileBase.js",
	"bin-debug/util/AutoId.js",
	"bin-debug/util/UiMgr.js",
	"bin-debug/ui/UiFile.js",
	"bin-debug/util/ComMgr.js",
	"bin-debug/util/Math.js",
	"bin-debug/util/ScreenMovies.js",
	"bin-debug/util/ShakeTool.js",
	"bin-debug/util/SoundMgr.js",
	"bin-debug/util/TweenMgr.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/main/GameMgr.js",
	"bin-debug/main/GameScene.js",
	"bin-debug/main/MainView.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/com/BonesCom.js",
	"bin-debug/ui/UiEndView.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/com/GuideCom.js",
	"bin-debug/ui/UiFileEmpty.js",
	"bin-debug/ui/UiFirstView.js",
	"bin-debug/ui/UiNextTipsView.js",
	"bin-debug/ui/UiStartView.js",
	"bin-debug/com/LightMask.js",
	"bin-debug/com/MovieClip.js",
	"bin-debug/com/ParticleCom.js",
	"bin-debug/data/FirstData.js",
	"bin-debug/data/McData.js",
	"bin-debug/gConst/G_Const.js",
	"bin-debug/global/globalMgr.js",
	"bin-debug/ui/UiChatView.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "fixedWidth",
		contentWidth: 750,
		contentHeight: 750,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:18,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 主场景界面
 */
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        GameMgr.gameview = new GameScene();
        _this.addChild(GameMgr.gameview);
        _this.resizeView(null);
        GameMgr.stage.addEventListener(egret.Event.RESIZE, _this.resizeView, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    MainView.prototype.update = function (e) {
        if (this.curw != window.innerWidth) {
            this.resizeView(null);
        }
    };
    MainView.prototype.resizeView = function (e) {
        if (e === void 0) { e = null; }
        var isRotate = GameMgr.screenType === null; //是否转屏，或是第一次打开界面
        var _r; //当前窗口宽高比
        if (GameMgr.stage.stageWidth < GameMgr.stage.stageHeight) {
            //竖屏
            if (GameMgr.screenType === 0 /* HORIZONTAL */) {
                isRotate = true;
            }
            GameMgr.screenType = 1 /* VERTICAL */;
            GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            _r = GameMgr.stage.stageWidth / GameMgr.stage.stageHeight;
        }
        else {
            //横屏
            if (GameMgr.screenType === 1 /* VERTICAL */) {
                isRotate = true;
            }
            GameMgr.screenType = 0;
            GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            _r = GameMgr.stage.stageHeight / GameMgr.stage.stageWidth;
        }
        GameMgr.mobileType = _r < 0.51 ? 1 /* IPHONE_X */ : _r < 0.65 ? 2 /* IPHONE_8 */ : 3 /* IPAD */;
        this.curw = window.innerWidth;
        var _w;
        var _h;
        if (window.innerWidth > window.innerHeight) {
            _h = 750 /* WIDTH */;
            _w = 750 /* WIDTH */ / window.innerHeight * window.innerWidth;
        }
        else {
            _w = 750 /* WIDTH */;
            _h = 750 /* WIDTH */ / window.innerWidth * window.innerHeight;
        }
        if (GameMgr.gameview) {
            GameMgr.gameview.width = Math.ceil(_w);
            GameMgr.gameview.height = Math.ceil(_h);
            GameMgr.gameview.resizeView();
        }
        GameMgr.scale = 1;
        if (isRotate) {
            this.rotateView();
        }
    };
    /**
     * 屏幕横竖屏转换时才调用
     */
    MainView.prototype.rotateView = function () {
        if (GameMgr.gameview) {
            GameMgr.gameview.rotateView();
        }
    };
    return MainView;
}(eui.Component));
__reflect(MainView.prototype, "MainView");
//# sourceMappingURL=MainView.js.map
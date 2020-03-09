var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.isOver = false;
        GameMgr.gameview = _this;
        _this.skinName = "gamescene";
        _this.init();
        return _this;
    }
    GameScene.prototype.init = function () {
        this.start();
    };
    /**
     * 窗口大小改变时调用
     */
    GameScene.prototype.resizeView = function () {
        // this.con_body.
        if (GameMgr.screenType == 1 /* VERTICAL */) {
            //竖屏
            switch (GameMgr.mobileType) {
                //iPhoneX或以上
                case 1 /* IPHONE_X */:
                    break;
                //iPhone8或以下
                case 2 /* IPHONE_8 */:
                    break;
                //iPad或其它
                case 3 /* IPAD */:
                    break;
            }
        }
        else {
            //横屏
            switch (GameMgr.mobileType) {
                //iPhoneX或以上
                case 1 /* IPHONE_X */:
                    break;
                //iPhone8或以下
                case 2 /* IPHONE_8 */:
                    break;
                //iPad或其它
                case 3 /* IPAD */:
                    break;
            }
        }
    };
    /**
     * 屏幕横竖屏转换时调用
     */
    GameScene.prototype.rotateView = function () {
        // console.log("rotateView", this.screenType);
        if (GameMgr.screenType == 1 /* VERTICAL */) {
        }
        else {
        }
    };
    GameScene.prototype.start = function () {
        this.blockData = gConst.blockData;
        this.con_body.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragBlock, this);
        this.con_body.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragBlock, this);
    };
    GameScene.prototype.dragBlock = function (event) {
        if (event.type === egret.TouchEvent.TOUCH_BEGIN) {
            if (this.isDrag) {
                return;
            }
            this.isDrag = true;
            this.startPoint = new egret.Point(event.stageX, event.stageY);
            this.con_body.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.dragBlock, this);
        }
        else if (event.type === egret.TouchEvent.TOUCH_MOVE) {
            this.endPoint = new egret.Point(event.stageX, event.stageY);
            var disX = this.endPoint.x - this.startPoint.x;
            var disY = this.endPoint.y - this.startPoint.y;
            // 滑动太短
            if (egret.Point.distance(this.startPoint, this.endPoint) <= gConst.dragDist) {
                return;
            }
            var direction = Math.abs(disX) > Math.abs(disY) ? (disX > 0 ? 1 /* RIGHT */ : 3 /* LEFT */) : (disY > 0 ? 2 /* BOTTOM */ : 0 /* TOP */);
            this.doMove(direction);
            this.con_body.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.dragBlock, this);
            this.isDrag = false;
        }
    };
    GameScene.prototype.doMove = function (direction) {
        if (this.isOver) {
            return;
        }
        var data = this.blockData[direction];
        if (!data) {
            return;
        }
        var time = gConst.blockInterval * (data.idxs ? data.idxs.length : 1);
        this.showBlock(data);
        this.moveFace(data.face, time);
    };
    GameScene.prototype.showBlock = function (data) {
    };
    GameScene.prototype.moveFace = function (face, time) {
        gTween.toMove(this.con_face, face.x, face.y, { x: time }, void 0, void 0, { x: egret.Ease.sineOut });
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map
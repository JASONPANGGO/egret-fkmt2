var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏管理器
 * @description 主场景界面、游戏场景相关配置
 */
var GameMgr = (function () {
    function GameMgr() {
    }
    return GameMgr;
}());
GameMgr.screenType = null; //横竖屏类型
GameMgr.mobileType = null; //设备类型
GameMgr.awardCnt = 0;
GameMgr.isDrag = false;
GameMgr.lan = "us";
GameMgr.replay = false;
GameMgr.isReset = false; //是否是重玩
__reflect(GameMgr.prototype, "GameMgr");
//# sourceMappingURL=GameMgr.js.map
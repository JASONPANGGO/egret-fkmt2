/**
 * 常量配置表 (业务层)
 * @file {const.js}
 * @description 业务层常量配置放这里，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 * @description {G_Const.ts} 框架层常量配置放 G_Const.ts，一般改动不大，只做拓展多。
 */
var gConst;
(function (gConst) {
    /** 打印日志模式 */
    gConst.logModel = true;

    /** 打包提测模式，用于提测时需要规避的一些事情 */
    gConst.packModel = true;

    /** 调试模式 */
    gConst.debugModel = false;

    /** 全局可点模式，用于Ending时全局点击可上报安装 window.install() */
    gConst.globalClick = false;

    /** 去除特效模式，默认为:false,  true: 去除特效，用于特殊平台需要去掉Ending按钮动画效果之类 */
    gConst.notEffectModel = false;

    /** 默认背景音乐资源名 */
    gConst.bgmName = "bm_bgm";

    /** 玩家多久未操作，结束游戏 */
    gConst.endToNoOperationTimer = 10000;

    /** 关闭开场界面倒计时 */
    gConst.closeStartTimer = 5000;

    // //第一次引导时间
    gConst.firstGuideTimer = 300;

    //之后引导时间
    gConst.afterGuideTimer = 1000;

    //播放方块间隔
    gConst.blockInterval = 80;

    // 播放发光方块间隔
    gConst.lightInterval = 50;

    // 弹出下一关提示页面延迟时间
    gConst.nextTipsTimer = 300;

    //拖拽操作，最小滑动距离
    gConst.dragDist = 40;

})(gConst || (gConst = {}));
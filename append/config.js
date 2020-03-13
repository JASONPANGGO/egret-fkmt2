/**
 * 常量配置表 (业务层)
 * @file {config.js}
 * @description 业务层常量配置放这里，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 * @description {G_Const.ts} 框架层常量配置放 G_Const.ts，一般改动不大，只做拓展多。
 */
var gConst;
(function (gConst) {
    //测试模式
    gConst.testModel = false;

    //打包提测模式，用于提测时需要规避的一些事情
    gConst.packModel = false;

    //第一次引导时间
    gConst.firstGuideTimer = 300;

    //之后引导时间
    gConst.afterGuideTimer = 1000;

    //播放方块间隔
    gConst.blockInterval = 80;

    //播放发光方块间隔
    gConst.lightInterval = 50;

    //弹出下一关提示页面延迟时间
    gConst.nextTipsTimer = 300;

    //拖拽操作，最小滑动距离
    gConst.dragDist = 40;

    //最大失败次数
    gConst.maxFailCnt = 2;

})(gConst || (gConst = {}));
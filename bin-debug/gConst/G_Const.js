/**
 * 常量配置表 (框架层)
 * @file {G_Const.ts}
 * @description 框架层常量配置放这里，一般改动不大，只做拓展多。
 * @description {config.js} 业务层常量配置放 config.js，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 */
var gConst;
(function (gConst) {
    /**
     * 指派事件类型
     */
    gConst.eventType = {
        GUIDE_TOUCH_ONE: "guide_touch_one",
        GUIDE_STOP: "guide_stop",
        IM_COMPLETE: "in_complete",
        IN_LOOP_COMPLETE: "in_loop_complete",
        OUT_COMPLETE: "out_complete",
        OUT_LOOP_COMPLETE: "out_loop_complete",
        CHOOSE_COMPLETE: "choose_complete",
        CHOOSE_LOOP_COMPLETE: "choose_loop_complete",
        //游戏场景
        SHOW_BLACK: "show_black",
        HIDE_BLACK: "hide_black",
        //Ui界面
        UI_CLOSE: "ui_close",
    };
    /**
     * 方位
     */
    gConst.direction = {
        CENTER_CENTER: "center_center",
        LEFT_TOP: "left_top",
        CENTER_TOP: "center_top",
        RIGHT_TOP: "right_top",
        RIGHT_CENTER: "right_center",
        RIGHT_BOTTOM: "right_bottom",
        CENTER_BOTTOM: "center_bottom",
        LEFT_BOTTOM: "left_bottom",
        LEFT_CENTER: "left_center",
    };
    /**
     * 皮肤名
     */
    gConst.skin = {
        SCENE: "game_scene",
        FIRST: "first_view",
        START: "start_view",
        END: "end_view",
        GUIDE: "guide_com",
        CHAT: "chat_view",
        NEXT_TIPS: "next_tips_view",
        GRID: "grid_com",
    };
    /**
     * 类名
     */
    gConst.className = {
        EMPTY: "UiFileEmpty",
        SCENE: "GameScene",
        FIRST: "UiFirstView",
        START: "UiStartView",
        END: "UiEndView",
    };
    /**
     * 设备类型对应整体缩放倍数
     */
    gConst.mobileByScale = (_a = {},
        //竖屏
        _a[1 /* VERTICAL */] = (_b = {},
            _b[1 /* IPHONE_X */] = 1,
            _b[2 /* IPHONE_8 */] = 1,
            _b[3 /* IPAD */] = 0.7,
            _b),
        //横屏
        _a[0 /* HORIZONTAL */] = (_c = {},
            _c[1 /* IPHONE_X */] = 0.9,
            _c[2 /* IPHONE_8 */] = 0.9,
            _c[3 /* IPAD */] = 0.7,
            _c),
        _a);
    /**
     * 方块滑动路线
     */
    gConst.blockData = (_d = {},
        _d[3 /* LEFT */] = (_e = {
                idxs: [1, 2],
                face: { x: 244, y: 364 },
                brick: 0
            },
            //正确路线
            _e[2 /* BOTTOM */] = (_f = {
                    idxs: [3],
                    face: { x: 244, y: 484 }
                },
                _f[3 /* LEFT */] = (_g = {
                        idxs: [4],
                        face: { x: 124, y: 484 }
                    },
                    _g[0 /* TOP */] = (_h = {
                            idxs: [5, 6, 7, 8],
                            face: { x: 124, y: 4 }
                        },
                        _h[3 /* LEFT */] = (_j = {
                                idxs: [9],
                                face: { x: 4, y: 4 }
                            },
                            _j[2 /* BOTTOM */] = {
                                idxs: [10, 11],
                                face: { x: 4, y: 244 },
                                right: true
                            },
                            _j),
                        _h),
                    _g),
                _f),
            //错误路线
            _e[3 /* LEFT */] = (_k = {
                    idxs: [12],
                    face: { x: 124, y: 364 }
                },
                //错误分支1
                _k[2 /* BOTTOM */] = (_l = {
                        idxs: [13],
                        face: { x: 124, y: 484 }
                    },
                    _l[1 /* RIGHT */] = {
                        idxs: [14],
                        face: { x: 244, y: 484 },
                        right: false
                    },
                    _l),
                //错误分支2
                _k[0 /* TOP */] = (_m = {
                        idxs: [6, 7, 8],
                        face: { x: 124, y: 4 }
                    },
                    _m[3 /* LEFT */] = (_o = {
                            idxs: [9],
                            face: { x: 4, y: 4 }
                        },
                        _o[2 /* BOTTOM */] = {
                            idxs: [10, 11],
                            face: { x: 4, y: 244 },
                            right: false
                        },
                        _o),
                    _m),
                _k),
            _e),
        _d);
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
})(gConst || (gConst = {}));
//# sourceMappingURL=G_Const.js.map
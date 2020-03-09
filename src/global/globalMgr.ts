/**
 * @file {globalMgr.ts}
 * 全局管理器
 */

let gUiMgr: util.UiMgr = new util.UiMgr(); //Ui管理器
let gComMgr: util.ComMgr = new util.ComMgr(); //组件管理器
let gSoundMgr: util.SoundMgr = new util.SoundMgr(); //音频管理器
let gTween: util.TweenMgr = new util.TweenMgr(); //缓动动画管理器
let gMath: util.MathMgr = new util.MathMgr(); //数学计算管理器
let gShake: util.ShakeTool = new util.ShakeTool(); //震动工具
let gScreenMovies: util.ScreenMovies = new util.ScreenMovies(); //场景切换特效工具
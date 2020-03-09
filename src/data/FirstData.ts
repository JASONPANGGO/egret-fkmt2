namespace data {
	/**
	 * 顶层页面数据
	 */
	export class FirstData {
		public horizontal: { x: number, y: number } = { x: 0, y: 0 }; //横屏位置
		public vertical: { x: number, y: number } = { x: 0, y: 0 }; //竖屏位置

		public readonly leftSpace: number = 20; //左间距
		public readonly topSpace: number = 100; //上间距
		public readonly bottomSpace: number = 60; //下间距

		public readonly horRatio: number = 50; //横屏占比(%) (有赋值时使用占比适配)
		public readonly verRatio: number = 32; //竖屏占比(%) (有赋值时使用占比适配)
		public readonly horSpace: number = 20; //logo与btn横屏间距
		public readonly verSpace: number = -30; //logo与btn竖屏间距

		public constructor() {

		}
	}
}
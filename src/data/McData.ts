module data {
	/**
	 * 动画数据
	 */
	export class McData {
		public fName: string = "1"; //动作名称
		public frameCnt: number; //总帧数
		public frameName: string; //帧名字格式，framName{1}_png
		public backplay: boolean; //播放完成后，反向播放回来
		/** 播放方向 1.正向 -1.反向 */
		public direct: number = 1;

		/**
		 * 构造动画数据
		 * @param {string} fName 动作名称
		 * @param {number} frameCnt 总帧数
		 * @param {string} frameName 帧名字格式，framName{1}_png
		 * @param {boolean} backplay 播放完成后，反向播放回来
		 */
		public constructor(fName: string, frameCnt: number, frameName: string, backplay: boolean = false) {
			this.fName = fName;
			this.frameCnt = frameCnt;
			this.frameName = frameName;
			this.backplay = backplay;
		}
	}
}
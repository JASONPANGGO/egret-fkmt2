class GameScene extends eui.Component {

	public con_body: eui.Group;
	public brick_0: eui.Image;
	public con_graph: eui.Group;
	public graph_0: eui.Image;
	public con_face: eui.Group;


	constructor() {
		super()

		GameMgr.gameview = this
		this.skinName = "gamescene"
		this.init()
	}

	private init() {
		this.start()
	}

    /**
	 * 窗口大小改变时调用
	 */
	public resizeView(): void {

		// this.con_body.

		if (GameMgr.screenType == gConst.screenType.VERTICAL) {
			//竖屏


			switch (GameMgr.mobileType) {
				//iPhoneX或以上
				case gConst.mobileType.IPHONE_X:
					break;
				//iPhone8或以下
				case gConst.mobileType.IPHONE_8:
					break;
				//iPad或其它
				case gConst.mobileType.IPAD:
					break;
			}
		} else {
			//横屏


			switch (GameMgr.mobileType) {
				//iPhoneX或以上
				case gConst.mobileType.IPHONE_X:
					break;
				//iPhone8或以下
				case gConst.mobileType.IPHONE_8:
					break;
				//iPad或其它
				case gConst.mobileType.IPAD:
					break;
			}
		}
	}

	/**
	 * 屏幕横竖屏转换时调用
	 */
	public rotateView() {
		// console.log("rotateView", this.screenType);
		if (GameMgr.screenType == gConst.screenType.VERTICAL) {
			//竖屏

		} else {
			//横屏

		}
	}


	// 业务代码开始

	private startPoint: egret.Point;
	private endPoint: egret.Point;
	private isDrag: boolean; //是否正在拖拽
	private blockData: { idx: number, face: { x: number, y: number }, right?: boolean } | Object
	private start() {

		this.blockData = gConst.blockData
		this.con_body.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragBlock, this)
		this.con_body.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragBlock, this)

	}

	private dragBlock(event: egret.TouchEvent) {

		if (event.type === egret.TouchEvent.TOUCH_BEGIN) {
			if (this.isDrag) {
				return
			}
			this.isDrag = true
			this.startPoint = new egret.Point(event.stageX, event.stageY)
			this.con_body.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.dragBlock, this)
		} else if (event.type === egret.TouchEvent.TOUCH_MOVE) {
			this.endPoint = new egret.Point(event.stageX, event.stageY)
			const disX: number = this.endPoint.x - this.startPoint.x
			const disY: number = this.endPoint.y - this.startPoint.y

			// 滑动太短
			if (egret.Point.distance(this.startPoint, this.endPoint) <= gConst.dragDist) {
				return;
			}

			const direction: gConst.moveDir = Math.abs(disX) > Math.abs(disY) ? (disX > 0 ? gConst.moveDir.RIGHT : gConst.moveDir.LEFT) : (disY > 0 ? gConst.moveDir.BOTTOM : gConst.moveDir.TOP)
			this.doMove(direction)
			this.con_body.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.dragBlock, this)
			this.isDrag = false

		}

	}

	private isOver: boolean = false

	private doMove(direction: gConst.moveDir): void {
		if (this.isOver) {
			return
		}
		const data = this.blockData[direction]
		if (!data) {
			return
		}
		const time = gConst.blockInterval * (data.idxs ? data.idxs.length : 1)
		this.showBlock(data)
		this.moveFace(data.face, time)
	}

	private showBlock(data: { idxs: [number], face: { x: number, y: number }, right?: boolean }) {

	}

	private moveFace(face: { x: number, y: number }, time: number) {
		gTween.toMove(this.con_face, face.x, face.y, { x: time }, void 0, void 0, { x: egret.Ease.sineOut })
	}

	// 业务代码结束
}



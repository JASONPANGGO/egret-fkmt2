class GameScene extends eui.Component {

	public con_body: eui.Group;
	public brick_0: eui.Image;
	public con_graph: eui.Group;
	public con_face: eui.Group;

	// 黄色砖块
	public graph_1: eui.Image;
	public graph_2: eui.Image;
	public graph_3: eui.Image;
	public graph_4: eui.Image;
	public graph_5: eui.Image;
	public graph_6: eui.Image;
	public graph_7: eui.Image;
	public graph_8: eui.Image;
	public graph_9: eui.Image;
	public gtaph_10: eui.Image;
	public graph_11: eui.Image;
	public graph_12: eui.Image;
	public graph_13: eui.Image;
	public graph_14: eui.Image;

	// 砖块爆炸MC
	public mc_brick_0: com.MovieClip;





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
			if (Math.abs(disX - disY) <= gConst.dragDist) {
				return;
			}

			// 0:上, 1:右, 2:下, 3:左
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

		let data: { idxs: [number], face: { x: number, y: number }, right?: boolean, brick?: number }
		if (this.blockData[direction]) {
			data = this.blockData[direction]
			this.blockData = data
		}
		if (!data) {
			return
		}
		const time = gConst.blockInterval * (data.idxs ? data.idxs.length : 1)
		this.brickBreak(data.brick, time)
		this.showBlock(data.idxs)
		this.moveFace(data.face, time)
	}

	private brickBreak(brickId: number, time: number) {
		if (brickId == void 0 || time == void 0) { // 也就是undefined
			return
		} else {
			// 延迟time，因为要撞到了才碎
			egret.setTimeout(() => {
				let brick: eui.Image = this['brick_' + brickId]
				if (brick) {
					this.brick_0.visible = false
				}

				let mc_brick: com.MovieClip = this['mc_brick_' + brickId]
				if (mc_brick == void 0) return
				mc_brick.visible = true
				mc_brick.setData([new data.McData('1', 19, "brick_break_{1}_png")])
				console.log(mc_brick)
				mc_brick.once(egret.Event.COMPLETE, () => {
					mc_brick.visible = false
				}, this)
				mc_brick.gotoAndPlay('1', 1)
			}, this, time)
		}
	}

	private showBlock(idxs: [number]) {
		if (this.isOver) return;
		for (let i: number = 0; i < idxs.length; i++) {
			egret.setTimeout(() => {
				this['graph_' + idxs[i]].visible = true
			}, this, i * gConst.blockInterval);
		}
	}

	private moveFace(face: { x: number, y: number }, time: number) {
		// gTween.toMove(this.con_face, face.x, face.y, { x: time }, void 0, void 0, { x: egret.Ease.sineOut });
		egret.Tween.get(this.con_face).to({
			x: face.x,
			y: face.y
		}, time, egret.Ease.sineOut)

	}

	// 业务代码结束
}



class GameScene extends eui.Component {

	public con_body: eui.Group;
	public brick_0: eui.Image;
	public con_graph: eui.Group;
	public con_face: eui.Group;
	public bg: eui.Rect;
	public hand_target: eui.Image;


	// 试玩
	public download: eui.Image;

	// 表情
	public p_face1: eui.Image;
	public p_face2: eui.Image;

	// 上方提示
	public ui_tishi: eui.Group;
	public tishi_face1: eui.Image;
	public tishi_face2: eui.Image;
	public tishi_face3: eui.Image;
	public tishi_word1: eui.Image;
	public tishi_word2: eui.Image;
	public tishi_word3: eui.Image;

	// 指引手
	public guide_hand: com.GuideCom;


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

	// 发光
	public p_light: eui.Image;


	constructor() {
		super()

		GameMgr.gameview = this
		this.skinName = "gamescene"
		this.init()
	}

	private init() {
		gTween.loopScale(this.download, 0.8, 400, 1)
		this.start()
		this.showGuide()
		this.snowFall()
	}


    /**
	 * 窗口大小改变时调用
	 */
	public resizeView(): void {

		this.con_body.scaleX = this.con_body.scaleY = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

		if (GameMgr.screenType == gConst.screenType.VERTICAL) {
			//竖屏
			this.ui_tishi.horizontalCenter = "0"
			this.con_body.x = NaN
			this.con_body.horizontalCenter = '0'

			this.download.x = NaN
			this.download.horizontalCenter = "0"

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
			this.ui_tishi.horizontalCenter = NaN
			this.ui_tishi.x = 0.25 * this.width

			this.download.horizontalCenter = NaN
			this.download.x = 0.25 * this.width

			this.con_body.horizontalCenter = NaN
			this.con_body.x = 0.75 * this.width
			this.verticalCenter = "0"

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
			this.con_body.horizontalCenter = 0;
			this.con_body.verticalCenter = 0;
			// this.tips.height = 200;
		} else {
			//横屏
			this.con_body.verticalCenter = -10;
			// this.tips.height = 286;
		}
	}


	// 业务代码开始

	private startPoint: egret.Point;
	private endPoint: egret.Point;
	private isDrag: boolean; //是否正在拖拽
	private blockData: { idx: number, face: { x: number, y: number }, right?: boolean } | Object

	private start() {
		this.tishi_face1.visible = true
		this.tishi_face2.visible = false
		this.tishi_face3.visible = false
		this.tishi_word1.visible = true
		this.tishi_word2.visible = false
		this.tishi_word3.visible = false
		this.p_face1.visible = true
		this.p_face2.visible = false

		this.p_light.visible = false
		this.blockData = gConst.blockData

		this.con_face.x = 538
		this.con_face.y = 428
		for (let i = 1; i < 15; i++) {
			this['graph_' + i].visible = false
		}
		this.brick_0.visible = true
		this.con_body.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragBlock, this)
		this.con_body.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragBlock, this)

		this.faceShake()
		this.blink()
	}

	private faceShake() {
		gTween.swing(this.tishi_face1, 10, 200, 0, void 0, {
			duration: 600
		})
	}

	/**
	 * 眨眼
	 */
	private blink() {
		this.con_face.anchorOffsetX = this.con_face.width / 2
		gTween.tween(this.con_face, { loop: true },
			{
				props: { scaleX: -1 }, wait: { duration: 500 }
			}, {
				props: { scaleX: 1 }, wait: { duration: 1500 }
			}
		);
	}

	private showGuide() {
		this.guide_hand = new com.GuideCom()
		console.log(gConst.firstGuideTimer)
		this.guide_hand.setData(gConst.firstGuideTimer, { target_1: this.con_face, target_2: this.hand_target, moveTime: 500 }, this.con_body, {
			diffY: 0,
			diffS: 0,
			pressT: 0,
			liftT: 0
		})
		this.guide_hand.start()

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
			if (this.guide_hand) {
				this.guide_hand.stop()
			}
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
		this.checkRight(data.right, time)
	}

	private circleMask: egret.Shape
	private checkRight(right: boolean, time: number) {
		if (right == void 0) return;
		else {
			if (right) {

				this.tishi_face1.visible = false
				this.tishi_face2.visible = false
				this.tishi_face3.visible = true
				this.tishi_word1.visible = false
				this.tishi_word2.visible = false
				this.tishi_word3.visible = true

				this.p_light.visible = true
				this.p_face2.visible = true
				this.p_face1.visible = false
				gTween.loopAlpha(this.p_light, 0.7, 300)
				let caidaiPar = new com.ParticleCom()
				caidaiPar.setData(this, 'caidai')
				caidaiPar.start()
				caidaiPar.updateEmitterX(this.width / 2)
			} else {
				this.tishi_face1.visible = false
				this.tishi_face2.visible = true
				this.tishi_face3.visible = false
				this.tishi_word1.visible = false
				this.tishi_word2.visible = true
				this.tishi_word3.visible = false
				const maskScale = 4
				this.circleMask = new egret.Shape()
				this.circleMask.graphics.clear();
				this.circleMask.graphics.beginFill(0xffffff)
				this.circleMask.graphics.drawCircle(GameMgr.gameview.width / 2, GameMgr.gameview.height / 2, this.width / 2)
				this.circleMask.graphics.endFill()
				GameMgr.gameview.addChild(this.circleMask)
				this.circleMask.x = GameMgr.gameview.width / 2
				this.circleMask.y = GameMgr.gameview.height / 2
				GameMgr.gameview.mask = this.circleMask
				GameMgr.gameview.mask.anchorOffsetX = GameMgr.gameview.width / 2
				GameMgr.gameview.mask.anchorOffsetY = GameMgr.gameview.height / 2
				this.circleMask.scaleX = this.circleMask.scaleY = maskScale

				egret.setTimeout(() => {

					gTween.toScale(this.circleMask, 0, 300, 1, egret.Ease.sineOut, void 0, {
						callback: () => {
							// egret.setTimeout(() => {
							this.start()
							gTween.toScale(this.circleMask, maskScale, 300, 0, void 0, void 0, {
								callback: () => {
									GameMgr.gameview.mask = null;
									this.circleMask.graphics.clear();
									this.circleMask.visible = false
									this.circleMask = gComMgr.rmObj(this.circleMask);
								}
							})
							// }, this, 0)
						}
					})

				}, this, time)

			}
		}
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

				mc_brick.once(egret.Event.COMPLETE, () => {
					mc_brick.visible = false
				}, this)
				mc_brick.gotoAndPlay('1', 1)

				let st = new util.ShakeTool()
				st.shakeObj(this, 300, 15, 30, 30)

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
		gTween.toMove(this.con_face, face.x, face.y, { x: time }, void 0, void 0, { x: egret.Ease.sineOut });
		// egret.Tween.get(this.con_face).to({
		// 	x: face.x,
		// 	y: face.y
		// }, time, egret.Ease.sineOut)

	}

	private snowFall() {
		let snowPar = new com.ParticleCom()
		snowPar.setData(this, 'xuehua')
		snowPar.start()
	}


	// 业务代码结束
}



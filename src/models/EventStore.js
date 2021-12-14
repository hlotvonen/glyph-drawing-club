import { action, makeAutoObservable, observable, reaction } from "mobx"
import store from "../models/CanvasStore"
import { clamp } from "../utils/utils"

class EventStore {
	constructor() {
		makeAutoObservable(this)

		reaction(
			() => this.currentMousePos,
			currentMousePos => {
				if (JSON.stringify(currentMousePos) != JSON.stringify(this.prevMousePos) || this.mouseEntering) {
					this.oldMousePos = this.prevMousePos
					store.selected_y = currentMousePos.y
					store.selected_x = currentMousePos.x
					this.isPosDifferent = true
					this.mouseEntering = false
				} else {
					this.isPosDifferent = false
				}
				this.prevMousePos = currentMousePos
			}
		)
		reaction(
			() => this.mouseDown,
			mouseDown => {
				store.lastDrawn = { x: this.currentMousePos.x, y: this.currentMousePos.y }
				store.waitingPixel = { x: this.currentMousePos.x, y: this.currentMousePos.y }
			}
		)
	}
		@observable
		currentMousePos = { x: 0, y: 0 }
		@observable
		oldMousePos = { x: 0, y: 0 }
		@observable
		prevMousePos = { x: 0, y: 0 }
		@observable
		mouseDownPos = { x: 0, y: 0 }
		@observable
		mouseUpPos = { x: 0, y: 0 }
		@observable
		isPosDifferent = false
		@observable
		mouseDown = false
		@observable
		mouseEntering = false

		clampX(x) {
			return Math.floor(clamp(x / store.cellWidth, 0, store.canvasWidth - 1))
		}
		clampY(y) {
			return Math.floor(clamp(y / store.cellHeight, 0, store.canvasHeight - 1))
		}

		@action
		handleMouseMove(x, y) {
			if(!store.paintMode) {
				return
			}
			this.currentMousePos = {
				x: this.clampX(x),
				y: this.clampY(y)
			}
			if (this.isPosDifferent && this.mouseDown) {
				store.pencil(this.currentMousePos.x, this.currentMousePos.y, this.oldMousePos.x, this.oldMousePos.y)
			}
		}
		@action
		handleMouseDown(x, y) {
			if(!store.paintMode) {
				this.currentMousePos = {
					x: this.clampX(x),
					y: this.clampY(y)
				}
			} else {
				this.mouseDownPos = {
					x: this.clampX(x),
					y: this.clampY(y)
				}
				store.insertXY(this.mouseDownPos.x, this.mouseDownPos.y)
				this.mouseDown = true
			}
		}
		@action
		handleMouseUp(x, y) {
			if(!store.paintMode) {
				return
			}
			this.mouseUpPos = {
				x: this.clampX(x),
				y: this.clampY(y)
			}
			store.insertXY(this.mouseUpPos.x, this.mouseUpPos.y)
			this.mouseDown = false
		}
		@action
		handleMouseEnter(e, x, y) {
			if(!store.paintMode) {
				return
			}
			this.currentMousePos = {
				x: this.clampX(x),
				y: this.clampY(y)
			}
			this.prevMousePos = {
				x: this.clampX(x),
				y: this.clampY(y)
			}
			this.mouseEntering = true
			if (e.buttons == 1) {
				this.mouseDown && store.insertXY(this.currentMousePos.x, this.currentMousePos.y)
				this.mouseDown = true
			}
		}
		@action
		handleMouseLeave(x, y) {
			this.mouseDown && store.insertXY(this.currentMousePos.x, this.currentMousePos.y)
			this.mouseDown = false
		}

}

export default new EventStore()

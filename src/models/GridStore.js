import { observable } from "mobx"
import store from "./CanvasStore.js"

class GridStore {
	posOffsetX = store.cellWidth
	posOffsetY = store.cellHeight

	@observable
	settings = {
		posX: 0,
		posY: 0,
		zoom: 1,
	}

	moveUp = () => {
		this.settings.posY += this.posOffsetY
	}
	moveRight = () => {
		this.settings.posX -= this.posOffsetX
	}
	moveDown = () => {
		this.settings.posY -= this.posOffsetY
	}
	moveLeft = () => {
		this.settings.posX += this.posOffsetX
	}

	center = () => {
		this.settings.posX = 0
		this.settings.posY = 0
		this.settings.zoom = 1
	}
	zoomIn = () => {
		this.settings.zoom = this.settings.zoom * 1.05
	}
	zoomOut = () => {
		this.settings.zoom = this.settings.zoom * 0.95
	}
}
export default new GridStore()

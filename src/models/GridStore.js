import { observable } from "mobx"

class GridStore {
	posOffset = 50

	@observable
	settings = {
		posX: 0,
		posY: 0,
		zoom: 1,
	}

	moveUp = () => {
		this.settings.posY -= this.posOffset
	}
	moveRight = () => {
		this.settings.posX += this.posOffset
	}
	moveDown = () => {
		this.settings.posY += this.posOffset
	}
	moveLeft = () => {
		this.settings.posX -= this.posOffset
	}

	center = () => {
		this.settings.posX = 0
		this.settings.posY = 0
		this.settings.zoom = 1
	}
	zoomIn = () => {
		this.settings.zoom = this.settings.zoom * 1.1
	}
	zoomOut = () => {
		this.settings.zoom = this.settings.zoom * 0.9
	}
}
export default new GridStore()

import { observable, action, makeObservable } from "mobx"
import store from "./CanvasStore.js"

class GridStore {

	constructor() {
		makeObservable(this)
	}

	posOffsetX = store.cellWidth
	posOffsetY = store.cellHeight

	@observable
	settings = {
		posX: 0,
		posY: 0,
		zoom: 1,
	}
	@action
	moveUp = () => {
		this.settings.posY += this.posOffsetY
	}
	@action
	moveRight = () => {
		this.settings.posX -= this.posOffsetX
	}
	@action
	moveDown = () => {
		this.settings.posY -= this.posOffsetY
	}
	@action
	moveLeft = () => {
		this.settings.posX += this.posOffsetX
	}
	@action
	center = () => {
		this.settings.posX = 0
		this.settings.posY = 0
		this.settings.zoom = 1
	}
	@action
	zoomIn = () => {
		this.settings.zoom = this.settings.zoom * 1.05
	}
	@action
	zoomOut = () => {
		this.settings.zoom = this.settings.zoom * 0.95
	}
}
export default new GridStore()

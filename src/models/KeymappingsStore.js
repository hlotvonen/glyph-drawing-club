import { action, observable, computed, mobx, toJS } from "mobx"
import store from "./CanvasStore"

const EMPTY_GLYPH = ["M0 0", "1", "1", "0"]
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
//const KEYS = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F9', 'F10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']

class KeymappingsStore {
	@observable
	toggleMapping = false
	@observable
	selectedSetIndex = 0
	@observable
	sets = []

	constructor() {
		this.addSet()
	}

	@action
	handleChangeMapping = () => {
		this.toggleMapping = !this.toggleMapping
		document.getElementById("toggleMapping").checked = this.toggleMapping
	}

	@action
	selectSet = index => {
		if (index >= 0 && index < this.sets.length) {
			this.selectedSetIndex = index
		}
	}

	@action
	addSet = () => {
		const set = {}
		for (const keyName of KEYS) {
			set[keyName] = EMPTY_GLYPH
		}
		this.sets.push(set)
		this.selectedSetIndex = this.sets.length - 1
	}

	@action
	prevSet = () => {
		if (this.selectedSetIndex > 0) {
			this.selectedSetIndex = this.selectedSetIndex - 1
		}
	}

	@action
	nextSet = () => {
		if (this.selectedSetIndex < this.sets.length) {
			this.selectedSetIndex = this.selectedSetIndex + 1
		}
	}

	@action
	setMapping = (keyName, glyph) => {
		const selectedSet = this.sets[this.selectedSetIndex]
		selectedSet[keyName] = glyph
	}

	@action
	getMapping = keyName => {
		const selectedSet = this.sets[this.selectedSetIndex]
		store.canvas[store.selected_y][store.selected_x] = [
			...this.sets[this.selectedSetIndex][keyName],
			store.glyphOffsetX,
			store.glyphFontSizeModifier,
			store.rotationAmount,
			store.flipGlyph,
			store.glyphInvertedColor,
		]
	}
}

export default new KeymappingsStore()

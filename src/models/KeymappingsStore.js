import { action, observable, autorun, makeObservable } from "mobx"
import store from "./CanvasStore"
import colorstore from "./ColorStore"
import localforage from "localforage"

const EMPTY_GLYPH = ["M0 0", "1", "1", "0"]
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

let keymappingsStorage

class KeymappingsStore {
	constructor() {

		makeObservable(this)

		localforage.getItem("keymappingsStorage")
			.then((value) => {
				//load from localforage if it's not the first time
				keymappingsStorage = JSON.parse(value)
				this.sets = keymappingsStorage.sets
			})
			.catch((err) => {
				// This code runs if there were any errors
				this.addSet()
				console.log(err);
			});


		//set localstorage, autorun will update it every time something changes
		autorun(() => {
			const keymappingsLocalstorage = {
				name: "keymappings",
				timestamp: Math.floor(Date.now() / 1000),
				sets: this.sets
			}
			localforage.setItem("keymappingsStorage", JSON.stringify(keymappingsLocalstorage))
		})
	}
	@observable
	toggleMapping = false
	@observable
	selectedSetIndex = 0
	@observable
	sets = []

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
	deleteSet = () => {

		if (this.sets.length <= 1) {
			return
		}

		this.sets.splice(this.selectedSetIndex, 1)
		if (this.selectedSetIndex === 0) {
			if (this.selectedSetIndex.length <= 2) {
				this.selectedSetIndex += 1
			}
		} else {
			this.selectedSetIndex -= 1
		}
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
		store.canvas[store.selected_y][store.selected_x][store.selectedLayer] = [
			...this.sets[this.selectedSetIndex][keyName],
			store.glyphOffsetX,
			store.glyphFontSizeModifier,
			store.rotationAmount,
			store.flipGlyph,
			store.glyphInvertedShape,
			store.glyphOffsetY,
			colorstore.colorIndex
		]
	}
}

export default new KeymappingsStore()

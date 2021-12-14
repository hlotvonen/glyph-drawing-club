import localforage from "localforage"
import { action, autorun, makeAutoObservable, runInAction } from "mobx"
import store from "./CanvasStore"
import colorstore from "./ColorStore"

const EMPTY_GLYPH = ["M0 0", "1", "1", "0"]
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

let keymappingsStorage

class KeymappingsStore {
	constructor() {

		makeAutoObservable(this)

		localforage.getItem("keymappingsStorage")
			.then((value) => {
				//load from localforage if it's not the first time
				runInAction(() => {
					keymappingsStorage = JSON.parse(value)
					this.sets = keymappingsStorage.sets
				})
			})
			.catch((err) => {
				// This code runs if there were any errors
				this.addSet()
				console.log(err)
			})


		//set localstorage, autorun will update it every time something changes
		autorun(() => {
			const keymappingsLocalstorage = {
				name: "keymappings",
				timestamp: Math.floor(Date.now() / 1000),
				sets: this.sets
			}
			localforage.setItem("keymappingsStorage", JSON.stringify(keymappingsLocalstorage))
		}, {delay:300, fireImmediately: true})
	}
	toggleMapping = false
	selectedSetIndex = 0
	sets = []

	@action
	handleChangeMapping = () => {
		this.toggleMapping = !this.toggleMapping
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
			this.selectedSetIndex -= 1
		}
	}

	@action
	nextSet = () => {
		if (this.selectedSetIndex < this.sets.length) {
			this.selectedSetIndex += 1
		}
	}

	@action
	setMapping = (keyName, glyph) => {
		const selectedSet = this.sets[this.selectedSetIndex]
		selectedSet[keyName] = glyph
	}

	@action
	getMapping = keyName => {
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
		store.currentGlyph[4].replace(store.getBgColor())
	}
}

export default new KeymappingsStore()

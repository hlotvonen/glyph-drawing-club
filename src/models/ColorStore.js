import chroma from "chroma-js"
import hexRgb from "hex-rgb"
import localforage from "localforage"
import { action, autorun, makeAutoObservable, observable, runInAction, toJS } from "mobx"
import { shuffle } from "../utils/arrayShuffle"
import { chromaColor } from "../utils/chromaColors"
import palettePresets from "../utils/palettePresets.json"
import { randomRGB } from "../utils/randomRGB"
	
class ColorStore {
	constructor() {

		makeAutoObservable(this)

		localforage.getItem("colorStorage")
			.then((value) => {
				if(!value) {
					throw "Nothing in colorstorage"
				}
				//load from localforage if it's not the first time
				runInAction(() => {
					this.init(JSON.parse(value))
				})
			})
			.catch((err) => {
				// This code runs if there were any errors
				this.addPalette(palettePresets[this.selectedPresetPalette])
				console.log(err)
			})

		//set localforage, autorun will update it every time something changes
		autorun(() => {
			if (this.palettes.length) {
				let colorLocalstorage = {
					name: "Color Palettes",
					timestamp: Math.floor(Date.now() / 1000),
					palettes: this.palettes,
					quickPalette: this.quickPalette
				}
				localforage.setItem("colorStorage", JSON.stringify(colorLocalstorage))
			}
		}, {delay:300, fireImmediately: true})

	}

	@observable
	colorIndex = 0
	@observable
	bgColorIndex = 255
	@observable
	cohesionIntensity = 0
	@observable
	cohesionOverlayColor = [255, 128, 32]
	@observable
	changingCohesionColor = false
	@observable
	coloringModeFg = false
	@observable
	coloringModeBg = false
	@observable
	selectedPaletteIndex = 0
	@observable
	palettes = []
	@observable
	selectedPresetPalette = 0
	@observable
	paletteName = ""
	@observable
	paletteAuthor = ""
	@observable
	quickPalette = new Set([0,255])
	@observable
	showQuickPaletteColors = false

	@action
	init = (storage) => {
		this.palettes = storage.palettes
		this.quickPalette = new Set(storage.quickPalette)
		this.paletteName = this.palettes[this.selectedPaletteIndex].name
		this.paletteAuthor = this.palettes[this.selectedPaletteIndex].author
	}
	
	@action
 	colorSelect = (i, e) => {
 		if (!this.changingCohesionColor) {
 			this.palettes[this.selectedPaletteIndex].colors[this.colorIndex][i] = Number(e)
 			if (e < 0) {
 				this.palettes[this.selectedPaletteIndex].colors[this.colorIndex][i] = 0
 			}
 			if (e > 255) {
 				this.palettes[this.selectedPaletteIndex].colors[this.colorIndex][i] = 255
 			}
 		} else {
 			this.cohesionOverlayColor[i] = Number(e)
 			if (e < 0) {
 				this.cohesionOverlayColor[i] = 0
 			}
 			if (e > 255) {
 				this.cohesionOverlayColor[i] = 255
 			}
 		}
 	}
	@action
 	setFgColorIndex = (e, index) => {
 		this.colorIndex = Number(index)
 		e.preventDefault()
 	}
	@action
 	setBgColorIndex = (e, index) => {
 		this.bgColorIndex = Number(index)
 		e.preventDefault()
 	}
	@action
	changeIntensity = e => {
		this.cohesionIntensity = e
	}
	@action
	handleChangeCohesionColor = () => {
		this.changingCohesionColor = !this.changingCohesionColor
	}
	@action
	handlePresetSelectChange = e => {
		this.selectedPresetPalette = Number(e)
	}

	@action
	selectPalette = index => {
		if (index >= 0 && index < this.palettes.length) {
			this.selectedPaletteIndex = index
			this.paletteName = this.palettes[this.selectedPaletteIndex].name
			this.paletteAuthor = this.palettes[this.selectedPaletteIndex].author
		}
	}

	@action
	addPalettePreset = (index) => {
		const palette = palettePresets[index]
		this.addPalette(palette)
	}
	@action
	addPalette = (palette) => {
		this.palettes.push(palette)
		this.selectedPaletteIndex = this.palettes.length - 1
		this.paletteName = palette.name
		this.paletteAuthor = palette.author
	}
	
	@action
	deletePalette = () => {
		//return early if only 1 palette
		if (this.palettes.length <= 1) {
			return
		}
		//delete palette at selected index, unless last palette is selected, then go back one palette and delete the next one
		if (this.selectedPaletteIndex == this.palettes.length - 1) {
			this.selectedPaletteIndex -= 1
			this.palettes.splice(this.selectedPaletteIndex + 1, 1)
		} else {
			this.palettes.splice(this.selectedPaletteIndex, 1)
		}
	}

	@action
	prevSet = () => {
		if (this.selectedPaletteIndex > 0) {
			this.selectedPaletteIndex -= 1
		}
	}

	@action
	nextSet = () => {
		if (this.selectedPaletteIndex < this.palettes.length) {
			this.selectedPaletteIndex += 1
		}
	}
	@action
	swapColors = () => {
		let currentPalette = this.palettes[this.selectedPaletteIndex].colors;
		[currentPalette[this.bgColorIndex], currentPalette[this.colorIndex]] = [currentPalette[this.colorIndex], currentPalette[this.bgColorIndex]]
	}

	@action
	swapFgBg = () => {
		const tempFg = this.colorIndex
		this.colorIndex = this.bgColorIndex
		this.bgColorIndex = tempFg
	}

	@action
	shuffleColors() {
		const currentColors = toJS(this.palettes[this.selectedPaletteIndex].colors)
		this.palettes[this.selectedPaletteIndex].colors = shuffle(currentColors)
	}

	@action
	randomColors() {
		for (let i = 0; i < this.palettes[this.selectedPaletteIndex].colors.length; i++) {
			this.palettes[this.selectedPaletteIndex].colors[i] = randomRGB()
		}
	}

	@action
	duplicatePalette = () => {
		const currentPalette = toJS(this.palettes[this.selectedPaletteIndex])
		this.addPalette(currentPalette)
	}

	@action
	chromatest = () => {
		const colors = chroma.scale(toJS(this.palettes[this.selectedPaletteIndex].colors)).colors(256)
		var newColors = []
		var maxVal = 32
		var delta = Math.floor( colors.length / maxVal )

		for (let i = 0; i < colors.length; i += delta) {
			this.palettes[this.selectedPaletteIndex].colors[i] = randomRGB()
			this.palettes[this.selectedPaletteIndex].colors[i+delta-1] = randomRGB()
			const scale = chroma.scale([toJS(this.palettes[this.selectedPaletteIndex].colors[i]), toJS(this.palettes[this.selectedPaletteIndex].colors[i+delta-1])]).mode("lab").colors(delta)
			for (let j = 0; j < scale.length; j++) {
				newColors.push(chroma(scale[j]).rgb())
			 }			
		}
		this.palettes[this.selectedPaletteIndex].colors = newColors		
	}

	@action
	magicPalette = () => {
		let newColors = []
		const EMPTY_PALETTE = palettePresets[1].colors

		for (let i = 0; i < 128;) {
			let randomNum

			if (i + 16 >= 128) {
				randomNum = 128 - newColors.length
			} else {
				randomNum = Math.round(Math.random() * (16 - 5) + 5)
			}

			const colors = chroma.scale([chroma.random(), chroma.random(), chroma.random(), chroma.random()]).mode("lab").colors(randomNum)
			for (let j = 0; j < colors.length; j++) {
				newColors.push(chroma(colors[j]).rgb())
			}
			i += randomNum
		}
		this.palettes[this.selectedPaletteIndex].colors = [...newColors, ...EMPTY_PALETTE.slice(newColors.length)]
	}

	@action
	magicRange = () => {
		const scaleLength = Math.abs(this.colorIndex - this.bgColorIndex)+1
		const paddingValues = [-0.1, 0, 0.1, 0.2, 0.3, 0.7, 0.8, 0.9, 1]
		const randomPadding = paddingValues[Math.floor(Math.random() * paddingValues.length)]
		const modes = ["lab", "lrgb", "hsl", "lch"]
		const randomMode = modes[Math.floor(Math.random() * modes.length)]
		const randomGamma = Math.random() * (2 - 0.5) + 0.5

		let rgbColors = []
		const hexColors = chromaColor("", true, randomMode, randomGamma, false, randomPadding, false, scaleLength)
		for (let j = 0; j < hexColors.length; j++) {
			rgbColors.push(chroma(hexColors[j]).rgb())
		}
		const currentPalette = this.palettes[this.selectedPaletteIndex].colors

		let startingindex
		if (this.colorIndex < this.bgColorIndex) {
			startingindex = this.colorIndex
		} else {
			startingindex = this.bgColorIndex
		}

		currentPalette.splice(startingindex, rgbColors.length, ...rgbColors)
	}


	@action
	handleChangePaletteName = evt => {
		this.paletteName= evt.target.value
	}

	@action
	handleChangePaletteAuthor = evt => {
		this.paletteAuthor = evt.target.value
	}

	@action
	fetchLospecPalette = (url) => {

		//Return early if the url doesnt match lospec palette list
		const inputUrl = new URL("/palette-list", url)
		if (inputUrl.href != "https://lospec.com/palette-list") {
			alert("Couldn't find a palette from \n" + url + ".\n\nMake sure the url is in following format: \nhttps://lospec.com/palette-list/palette-name")
			return
		}

		fetch(url + ".json")
			.then(res => res.json())
			.then((result) => {
				const palette = result
				const EMPTY_PALETTE = palettePresets[1].colors
				const fetchedColors = palette.colors.map(color => {
					color = hexRgb(color, { format: "array" }).slice(0, -1)
					return color
				})
				palette.colors = [...fetchedColors, ...EMPTY_PALETTE.slice(fetchedColors.length)]
				
				this.palettes.push(palette)
				this.selectedPaletteIndex = this.palettes.length - 1
				this.paletteName = palette.name
				this.paletteAuthor = palette.author

			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log(error)
			}
			)
	}


}

export default new ColorStore()

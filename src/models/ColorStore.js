import { action, observable, autorun, makeObservable} from "mobx"
import localforage from "localforage"
import palettePresets from '../utils/palettePresets.json'
import hexRgb from 'hex-rgb';

let colorStorage

class ColorStore {
	constructor() {

		makeObservable(this)

		localforage.getItem("colorStorage")
			.then((value) => {
				//load from localforage if it's not the first time
				colorStorage = JSON.parse(value)
				this.palettes = colorStorage.palettes
				this.init()
			})
			.catch((err) => {
				// This code runs if there were any errors
				this.addPalette(palettePresets[this.selectedPresetPalette])
				console.log(err);
			});

		//set localforage, autorun will update it every time something changes
		autorun(() => {
			let colorLocalstorage = {
				name: "Color Palettes",
				timestamp: Math.floor(Date.now() / 1000),
				palettes: this.palettes
			}
			localforage.setItem("colorStorage", JSON.stringify(colorLocalstorage))
		})

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
	showUsedColors = false
	@observable
	selectedPaletteIndex = 0
	@observable
	palettes = []
	@observable
	selectedPresetPalette = 0
	@observable
	paletteName = ''
	@observable
	paletteAuthor = ''

	@action
	init = () => {
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
	addPalettePreset = () => {
		const palette = palettePresets[this.selectedPresetPalette]
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
		const inputUrl = new URL('/palette-list', url);
		if (inputUrl.href != 'https://lospec.com/palette-list') {
			alert("Couldn't find a palette from \n" + url + ".\n\nMake sure the url is in following format: \nhttps://lospec.com/palette-list/palette-name")
			return
		}

		fetch(url + ".json")
		.then(res => res.json())
			.then((result) => {
				const palette = result
				const EMPTY_PALETTE = palettePresets[1].colors
				const fetchedColors = palette.colors.map(color => {
					color = hexRgb(color, { format: 'array' }).slice(0, -1)
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

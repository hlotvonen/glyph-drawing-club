import { action, observable, autorun, makeObservable} from "mobx"
import localforage from "localforage"
import colorPresets from '../utils/colorPresets.json'; 

let colorStorage

class ColorStore {
	constructor() {

		makeObservable(this)

		localforage.getItem("colorStorage")
			.then((value) => {
				//load from localforage if it's not the first time
				colorStorage = JSON.parse(value)
				this.palettes = colorStorage.palettes
			})
			.catch((err) => {
				// This code runs if there were any errors
				this.addPalette()
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
	selectedPresetPalette = ""

	@action
 	colorSelect = (i, e) => {
 		if (!this.changingCohesionColor) {
 			this.palettes[this.selectedPaletteIndex][this.colorIndex][i] = Number(e)
			if (e < 0) {
				this.palettes[this.selectedPaletteIndex][this.colorIndex][i] = 0
			}
			if (e > 255) {
				this.palettes[this.selectedPaletteIndex][this.colorIndex][i] = 255
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
 	setFgColorIndex = index => {
		this.colorIndex = index
	}
	@action
 	setBgColorIndex = (e, index) => {
		this.bgColorIndex = index
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
		this.palettes[this.selectedPaletteIndex] = colorPresets[Number(e)].palette
	}

	@action
	selectPalette = index => {
		if (index >= 0 && index < this.palettes.length) {
			this.selectedPaletteIndex = index
		}
	}
	@action
	addPalette = () => {
		this.palettes.push(colorPresets[0].palette)
		this.selectedPaletteIndex = this.palettes.length - 1
		this.fetchLospecPalette()
	}
	
	@action
	deletePalette = () => {
		if (this.selectedPaletteIndex > 0) {
			this.palettes.splice(this.selectedPaletteIndex, 1)
			this.selectedPaletteIndex -= 1 
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
		if (this.selectedPaletteIndex < this.palette.length) {
			this.selectedPaletteIndex += 1
		}
	}

}

export default new ColorStore()

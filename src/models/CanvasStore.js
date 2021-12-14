import localforage from "localforage"
import { action, autorun, computed, configure, makeAutoObservable, observable, reaction, runInAction, toJS } from "mobx"
import { getOS } from "../utils/detectOs"
import { getBoundingRectangle } from "../utils/geometry"
import { bresenham } from "../utils/utils"
import colorstore from "./ColorStore"

configure({ enforceActions: "observed" })

/*spy(event => {
    if (event.type === "reaction") {
        console.log(`${event.name} `)
    }
})*/

/*
0: glyphPath, 
1: svgWidth,
2: svgHeight, 
3: svgBaseline, 
4: glyphOffsetX, 
5: glyphFontSizeModifier, 
6: rotationAmount, 
7: flipGlyph, 
8: glyphInvertedShape, 
9: glyphOffsetY
10: color
*/

export const EMPTY_CELL = []
EMPTY_CELL[0] = new Array("M0 0", 1, 1, 0, 0, 0, 0, 1, false, 0, 0) //LAYER 1
EMPTY_CELL[1] = new Array("M0 0", 1, 1, 0, 0, 0, 0, 1, false, 0, 0) //LAYER 2
EMPTY_CELL[2] = new Array("M0 0", 1, 1, 0, 0, 0, 0, 1, false, 0, 0) //LAYER 3
EMPTY_CELL[3] = new Array("M0 0", 1, 1, 0, 0, 0, 0, 1, false, 0, 0) //LAYER 4
EMPTY_CELL[4] = new Array("255") //BG LAYER
const getEmptyCell = () => observable([...EMPTY_CELL])
const getEmptyLayer = () => observable(EMPTY_CELL[0])

const MAX_HISTORY_SIZE = 64

class CanvasStore {
	constructor() {

		makeAutoObservable(this)

		localforage.getItem("canvasStorage")
			.then((value) => {
				if(!value) {
					throw "Nothing in canvasStorage"
				}
				//load from localforage if it's not the first time
				runInAction(() => {
					this.setCurrentState(JSON.parse(value))
					this.initHistory()
				})
			})
			.catch((err) => {
				// This code runs if there were any errors
				this.createEmptyCanvas()
				console.log(err)
			})


		autorun(() => {
			if (this.canvas) {
				//save canvas (and history) to localstorage every second
				const currentState = JSON.stringify(this.getCurrentState)
				localforage.setItem("canvasStorage", currentState)
			}
		}, { delay: 1000, fireImmediately: true })
		
		reaction(
			() => JSON.stringify(this.getCurrentState),
			currentState => {
				//watch state, add to undoHistory if something changes
				this.addToUndoHistory(currentState)
				this.initHistory()
			}, {delay: 100, fireImmediately: true}
		)
	}

	//CANVAS
	@observable
	canvas

	//SETTINGS
	@observable
	canvasWidth = 20
	@observable
	canvasHeight = 15
	@observable
	cellWidth = 20
	@observable
	cellHeight = 20
	@observable
	defaultFontSize = 20

	@observable
	hideGrid = false
	@observable
	typingMode = false
	@observable
	paintMode = false
	@observable
	togglePreview = false


	@observable
	toggleQuickChooseColor = false

	//HISTORY
	@observable
	history = []
	@observable
	redoHistory = []

	preserveRedoHistory = false

	//SHORTCUTS
	@observable
	disableShortcuts = false

	//EXPORT
	@observable
	exportSizeMultiplier = 5

	//SAVE / LOAD
	@observable
	fileName = "Untitled"

	//CURSOR
	@observable
	selected_x = 0
	@observable
	selected_y = 0

	//LAYERS
	@observable
	selectedLayer = 0
	@observable
	hiddenLayers = [false, false, false, false]

	//SELECTION AREA
	@observable
	selectionArea = { start: null, end: null }

	//GLYPH
	@observable
	glyphPath = "M0 0"
	@observable
	svgHeight = 0
	@observable
	svgWidth = 0
	@observable
	svgBaseline = 0
	@observable
	rotationAmount = 90
	@observable
	flipGlyph = -1
	@observable
	glyphInvertedShape = false

	//OFFSET
	@observable
	offsetAmount = 100
	@observable
	glyphOffsetX = 0
	@observable
	glyphOffsetY = 0
	@observable
	glyphFontSizeModifier = 0
	@observable
	toggleOffset = false

	//MOUSE & KEYBOARD MODIFIER EVENTS
	@observable
	mouseDown = false
	@observable
	altDown = false
	@observable
	ctrlDown = false
	@observable
	metaDown = false
	@observable
	shiftDown = false

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	INITIALIZATION

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	//create object that will be saved to localforage
	@computed
	get getCurrentState() {
		return ({
			name: "gdc-file",
			timestamp: Math.floor(Date.now() / 1000),
			canvasWidth: this.canvasWidth,
			canvasHeight: this.canvasHeight,
			cellWidth: this.cellWidth,
			cellHeight: this.cellHeight,
			defaultFontSize: this.defaultFontSize,
			canvas: this.canvas,
		})
	}
	@action
	setCurrentState = state => {
		this.canvasWidth = state.canvasWidth
		this.canvasHeight = state.canvasHeight
		this.canvas = state.canvas
		this.cellWidth = state.cellWidth
		this.cellHeight = state.cellHeight
		this.defaultFontSize = state.defaultFontSize
		this.canvas = state.canvas
	}
	getEmptyCanvas = () => {
		return Array.from({ length: this.canvasHeight }, this.getEmptyRow)
	}
	getEmptyRow = () => {
		return Array.from({ length: this.canvasWidth }, () => getEmptyCell())
	}
	@action
	createEmptyCanvas = () => {
		this.canvas = this.getEmptyCanvas()
	}
	@computed
	get currentLayer() {
		return this.canvas[this.selected_y][this.selected_x][this.selectedLayer]
	}
	@computed
	get currentGlyph() {
		return this.canvas[this.selected_y][this.selected_x]
	}
	
	currentLayerXY = ( x, y ) => {
		return this.canvas[y][x][this.selectedLayer]
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	CANVAS SIZE SETTINGS

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	//Change canvas width
	@action
	addCol = () => {
		this.canvasWidth += 1
		for (const row of this.canvas) {
			row.push(getEmptyCell())
		}
	}
	@action
	deleteCol = () => {
		if (this.canvasWidth > 1) {
			this.canvasWidth -= 1
			for (const row of this.canvas) {
				row.pop()
			}
			if (this.selected_x == this.canvasWidth) {
				this.selected_x -= 1
			}
		}
	}
	@action
	addRow = () => {
		this.canvasHeight += 1
		this.canvas.push(this.getEmptyRow())
	}
	@action
	deleteRow = () => {
		if (this.canvasHeight > 1) {
			this.canvasHeight -= 1
			this.canvas.pop()
			if (this.selected_y == this.canvasHeight) {
				this.selected_y -= 1
			}
		}
	}
	@action
	deleteRowAtSelection = () => {
		this.canvas.splice(this.selected_y, 1)
		this.canvasHeight -= 1
		if (this.canvasHeight >= this.selected_y) {
			this.selected_y -= 1
		}
		if (this.selected_y <= 0) {
			this.selected_y += 1
		}
	}
	@action
	deleteColAtSelection = () => {
		for (var i = 0; i < this.canvasHeight; i++) {
			var col = this.canvas[i]
			col.splice(this.selected_x, 1)
		}
		this.canvasWidth -= 1
		if (this.canvasWidth >= this.selected_x) {
			this.selected_x -= 1
		}
		if (this.selected_x <= 0) {
			this.selected_x += 1
		}
	}
	@action
	addRowAtSelection = () => {
		this.canvasHeight += 1
		this.canvas.splice(this.selected_y, 0, this.getEmptyRow())
	}
	@action
	addColAtSelection = () => {
		this.canvasWidth += 1
		for (var i = 0; i < this.canvasHeight; i++) {
			var col = this.canvas[i]
			col.splice(this.selected_x, 0, getEmptyCell())
		}
	}
	@action
	emptyCanvas = () => {
		this.selected_y = 0
		this.selected_x = 0
		this.canvasWidth = 20
		this.canvasHeight = 15
		this.cellWidth = 20
		this.cellHeight = 20
		this.defaultFontSize = 20
		this.canvas = this.getEmptyCanvas()
		this.flipGlyph = 1
		this.rotationAmount = 0
		this.emptySelection()
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	HISTORY

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	@action
	initHistory = () => {
		if (this.preserveRedoHistory) {
			this.preserveRedoHistory = false
		} else {
			this.redoHistory = []
		}
	}

	@computed
	get isUndoAvailable() {
		return this.history.length > 2
	}
	
	@action
	undo = () => {
		if (!this.isUndoAvailable) {
			return
		}
		this.preserveRedoHistory = true

		const currentState = this.history.pop()
		this.addToRedoHistory(currentState)

		const previousState = this.history.pop()
		this.setCurrentState(JSON.parse(previousState))
	}

	@computed
	get isRedoAvailable() {
		return this.redoHistory.length >= 1
	}
	
	@action
	addToUndoHistory(state) {
		this.history.push(state)
		if (this.history.length > MAX_HISTORY_SIZE) {
			this.history.shift()
		}
	}
	
	@action
	addToRedoHistory(state) {
		this.redoHistory.push(state)
		if (this.redoHistory.length > MAX_HISTORY_SIZE) {
			this.redoHistory.shift()
		}
	}
	@action
	redo = () => {
		if (!this.isRedoAvailable) {
			return
		}
		this.preserveRedoHistory = true

		const redoState = this.redoHistory.pop()
		this.setCurrentState(JSON.parse(redoState))
	}

	@action
	handleUndoRedo = () => {
		if (getOS() == "OSX") {
			if (this.metaDown && !this.shiftDown) {
				this.undo()
			} else if (this.metaDown && this.shiftDown) {
				this.redo()
			} else {
				return
			}
		} else {
			if (this.ctrlDown && !this.shiftDown) {
				this.undo()
			} else if (this.ctrlDown && this.shiftDown) {
				this.redo()
			} else {
				return
			}
		}
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	CELL SETTINGS

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	@action
	increaseCellHeight = () => {
		this.cellHeight += 1
	}
	@action
	decreaseCellHeight = () => {
		if (this.cellHeight > 1) {
			this.cellHeight -= 1
		}
	}
	@action
	increaseCellWidth = () => {
		this.cellWidth += 1
	}
	@action
	decreaseCellWidth = () => {
		if (this.cellWidth > 1) {
			this.cellWidth -= 1
		}
	}
	@action
	increaseFontSize = () => {
		this.defaultFontSize += 1
	}
	@action
	decreaseFontSize = () => {
		if (this.defaultFontSize > 1) {
			this.defaultFontSize -= 1
		}
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	MODES AND OPTIONS

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	@action
	handleChangeHideGrid = () => {
		this.hideGrid = !this.hideGrid
	}
	@action
	handleChangeTypingMode = () => {
		this.typingMode = !this.typingMode
		this.glyphClear()
	}
	@action
	handleChangePaintMode = () => {
		this.paintMode = !this.paintMode
	}
	@action
	toggleWriting = () => {
		this.disableShortcuts = !this.disableShortcuts
	}
	@action
	showPreview = () => {
		//P
		if (!this.togglePreview) {
			this.togglePreview = true
		} else {
			return
		}
	}
	@action
	hidePreview = () => {
		this.togglePreview = false
	}
	@action
	showQuickChooseColor = () => {
		if (!this.toggleQuickChooseColor) {
			this.toggleQuickChooseColor = true
		} else {
			return
		}
	}
	@action
	hideQuickChooseColor = () => {
		this.toggleQuickChooseColor = false
	}
	@action
	layerSelect = layer => {
		this.selectedLayer = layer
	}
	@action
	selectLayer = (direction) => {
		if (direction === "right") {
			if (this.selectedLayer < 3) {
				this.selectedLayer = this.selectedLayer + 1
			} else (
				this.selectedLayer = 0
			)
		} else if (direction == "left") {
			if (this.selectedLayer > 0) {
				this.selectedLayer = this.selectedLayer - 1
			} else (
				this.selectedLayer = 3
			)
		}
	}
	@action
	hideLayer = layer => {
		this.hiddenLayers[layer] = !this.hiddenLayers[layer]
	}
	@action
	switchLayersUp = event => {
		// Shift + R
		if (!this.selectionArea.start) {
			[
				this.currentGlyph[Number(event.target.value)],
				this.currentGlyph[Number(event.target.value) + 1],
			] = [
				this.currentGlyph[Number(event.target.value) + 1],
				this.currentGlyph[Number(event.target.value)],
			]
		} else {
			const [[start_y, start_x], [end_y, end_x]] = this.getSelectedArea()
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					[
						this.canvas[y_i][x_i][Number(event.target.value)],
						this.canvas[y_i][x_i][Number(event.target.value) + 1],
					] = [
						this.canvas[y_i][x_i][Number(event.target.value) + 1],
						this.canvas[y_i][x_i][Number(event.target.value)],
					]
				}
			}
		}
	}
	@action
	switchLayersDown = event => {
		if (!this.selectionArea.start) {
			[
				this.currentGlyph[Number(event.target.value)],
				this.currentGlyph[Number(event.target.value) - 1],
			] = [
				this.currentGlyph[Number(event.target.value) - 1],
				this.currentGlyph[Number(event.target.value)],
			]
		} else {
			const [[start_y, start_x], [end_y, end_x]] = this.getSelectedArea()
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					[
						this.canvas[y_i][x_i][Number(event.target.value)],
						this.canvas[y_i][x_i][Number(event.target.value) - 1],
					] = [
						this.canvas[y_i][x_i][Number(event.target.value) - 1],
						this.canvas[y_i][x_i][Number(event.target.value)],
					]
				}
			}
		}
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	SAVE, LOAD, EXPORT

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	@action
	updateExportSizeMultiplier = evt => {
		this.exportSizeMultiplier = evt.target.value
	}
	@action
	updateFileName = evt => {
		this.fileName = evt.target.value
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	GLYPH OFFSET

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	@action
	increaseGlyphOffsetX = () => {

		//o + arrow keys
		if (!this.selectionArea.start) {
			this.currentLayer[4] += this.offsetAmount
			this.glyphOffsetX = Number(this.currentLayer[4])
		} else {
			const boundingRectangle = this.getSelectedArea()
			const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
	
			this.mapRangeSelectedLayer(boundingRectangle, glyph => {
				glyph[4] += this.offsetAmount
			})
		}
	}
	@action
	decreaseGlyphOffsetX = () => {
		if (!this.selectionArea.start) {
			this.currentLayer[4] -= this.offsetAmount
			this.glyphOffsetX = Number(this.currentLayer[4])
		} else {
			const boundingRectangle = this.getSelectedArea()
			const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
	
			this.mapRangeSelectedLayer(boundingRectangle, glyph => {
				glyph[4] -= this.offsetAmount
			})
		}
	}
	@action
	increaseGlyphOffsetY = () => {
		if (!this.selectionArea.start) {
			this.currentLayer[9] += this.offsetAmount
			this.glyphOffsetY = Number(this.currentLayer[9])
		} else {
			const boundingRectangle = this.getSelectedArea()
			const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
	
			this.mapRangeSelectedLayer(boundingRectangle, glyph => {
				glyph[9] += this.offsetAmount
			})
		}
	}
	@action
	decreaseGlyphOffsetY = () => {
		if (!this.selectionArea.start) {
			this.currentLayer[9] -= this.offsetAmount
			this.glyphOffsetY = Number(this.currentLayer[9])
		} else {
			const boundingRectangle = this.getSelectedArea()
			const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
	
			this.mapRangeSelectedLayer(boundingRectangle, glyph => {
				glyph[9] -= this.offsetAmount
			})
		}
	}
	@action
	handleChangeOffsetAmount = evt => {
		this.offsetAmount = Number(evt.target.value)
	}
	@action
	handleOffsetOn = () => {
		if (!this.toggleOffset) {
			this.toggleOffset = true
		} else {
			return
		}
	}
	@action
	handleOffsetOff = () => {
		this.toggleOffset = false
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	LAYER & CELL MODIFICATIONS

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	@action
	rotateGlyphRight = () => {
		if (this.ctrlDown) {
			//Rotate Cell if ctrl down
			for (let z_i = 0; z_i <= 3; z_i++) {
				if (this.currentGlyph[z_i][6] <= -270) {
					this.currentGlyph[z_i][6] = 0
				} else {
					this.currentGlyph[z_i][6] -= 90
				}
			}
		} else {
			//Rotate Layer if just "r" is pressed
			if (this.rotationAmount <= -270) {
				this.currentLayer[6] = 0
				this.rotationAmount = 0
			} else {
				this.currentLayer[6] -= 90
				this.rotationAmount -= 90
			}
		}
		//this.rotationAmount = this.currentLayer[6]
	}
	@action
	handleChangeFlip = () => {
		if (this.ctrlDown) {
			for (let z_i = 0; z_i <= 3; z_i++) {
				this.currentGlyph[z_i][7] *= -1
			}
		} else {
			this.currentLayer[7] *= -1
		}
		this.flipGlyph = this.currentLayer[7]
	}
	@action
	handleChangeInvertColor = () => {
		if (this.ctrlDown) {
			for (let z_i = 0; z_i <= 3; z_i++) {
				this.currentGlyph[z_i][8] = !this.currentGlyph[z_i][8]
			}
		} else {
			this.currentLayer[8] = !this.currentLayer[8]
		}
		this.glyphInvertedShape = this.currentLayer[8]
	}
	@action
	increaseGlyphFontSizeModifier = () => {
		this.currentLayer[5] += 1
		this.glyphFontSizeModifier = this.currentLayer[5]
	}
	@action
	decreaseGlyphFontSizeModifier = () => {
		this.currentLayer[5] -= 1
		this.glyphFontSizeModifier = this.currentLayer[5]
	}
	@action
	increaseByOneCellGlyphFontSizeModifier = () => {
		this.currentLayer[5] += this.defaultFontSize
		this.glyphFontSizeModifier = this.currentLayer[5]
	}
	@action
	decreaseByOneCellGlyphFontSizeModifier = () => {
		this.currentLayer[5] -= this.defaultFontSize
		this.glyphFontSizeModifier = this.currentLayer[5]
	}

	//GlyphClear - reset selection to default
	@action
	glyphClear = () => {
		this.glyphFontSizeModifier = 0
		this.glyphInvertedShape = false
		this.rotationAmount = 0
		this.glyphOffsetX = 0
		this.glyphOffsetY = 0
		this.flipGlyph = 1

		if (!this.selectionArea.start) {
			this.currentLayer[4] = 0 //offset x
			this.currentLayer[5] = 0 //font size modifier
			this.currentLayer[6] = 0 //rotation
			this.currentLayer[7] = 1 //flip
			this.currentLayer[8] = false //invert color
			this.currentLayer[9] = 0 //offset y
		} else {
			const boundingRectangle = this.getSelectedArea()
			const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
			this.mapRangeSelectedLayer(boundingRectangle, glyph => { glyph[4] = 0 })
			this.mapRangeSelectedLayer(boundingRectangle, glyph => { glyph[5] = 0 })
			this.mapRangeSelectedLayer(boundingRectangle, glyph => { glyph[6] = 0 })
			this.mapRangeSelectedLayer(boundingRectangle, glyph => { glyph[7] = 1 })
			this.mapRangeSelectedLayer(boundingRectangle, glyph => { glyph[8] = false })
			this.mapRangeSelectedLayer(boundingRectangle, glyph => { glyph[9] = 0 })
			
		}
	}
	@action
	resetOffset = () => {
		this.glyphOffsetX = 0
		this.glyphOffsetY = 0

		if (!this.selectionArea.start) {
			this.currentLayer[4] = 0 //offset x
			this.currentLayer[9] = 0 //offset y
		} else {
			const boundingRectangle = this.getSelectedArea()
			const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
			this.mapRangeSelectedLayer(boundingRectangle, glyph => { glyph[4] = 0 })
			this.mapRangeSelectedLayer(boundingRectangle, glyph => { glyph[9] = 0 })
			
		}
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	MOUSE AND CLICK EVENTS

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	//Tools
	@action
	clickSelection = (posX, posY) => {
		if (this.shiftDown === true) {
			this.emptySelection()
		}
		this.selected_x = posX
		this.selected_y = posY
		this.handlePaintEvents(posX, posY)
	}
	@action
	handleMoveCursor = (posX, posY) => {
		this.selected_x = posX
		this.selected_y = posY
	}
	@action
	handlePaintEvents = (x, y) => {
		if (this.shiftDown && this.mouseDown) {
			return
		}
		if (
			this.paintMode ||
			colorstore.coloringModeFg ||
			colorstore.coloringModeBg
		) {
			if (this.paintMode) {
				this.mouseDown && this.paintLayer()
			}
			if (colorstore.coloringModeFg) {
				this.colorLayer()
			}
			if (colorstore.coloringModeBg) {
				this.colorBgLayer()
			}
		}
	}
	@action
	pencil = (x, y, old_x, old_y) => {
		const self = this
		bresenham(old_x, old_y, x, y, function (x, y) {
			if (self.shiftDown) {
				self.perfectPixels(x, y)
			} else {
				self.insertXY(x, y)
			}
		})
	}

	/*
	* Simple pixelperfect freehand drawing function from https://cantwell-tom.medium.com/pixel-perfect-lines-in-html-canvas-112fc638d1e9
	* not perfect as drawing really fast can "glitch" it
	*/
	@observable
	lastDrawn = {x: 0, y: 0}
	@observable
	waitingPixel = {x: 0, y: 0}
	perfectPixels = (x, y) => {
		//if currentPixel not neighbor to lastDrawn, draw waitingpixel
		if (Math.abs(x - this.lastDrawn.x) > 1 || Math.abs(y - this.lastDrawn.y) > 1) {
			this.insertXY(this.waitingPixel.x, this.waitingPixel.y)
			//update queue
			this.lastDrawn.x = this.waitingPixel.x
			this.lastDrawn.y = this.waitingPixel.y
			this.waitingPixel.x = x
			this.waitingPixel.y = y
		} else {
			this.waitingPixel.x = x
			this.waitingPixel.y = y
		}
	}


	@action
	paintLayer = () => {
		if (this.shiftDown && this.mouseDown) {
			return
		}
		const currentGlyph = this.currentLayer
		//Compare selected glyph and the placed glyph on the canvas. Paint only if the two arrays are different.
		if (
			JSON.stringify(this.getSelectedGlyph().sort()) !==
			JSON.stringify(Object.values(currentGlyph).sort())
		) {
			if (!this.altDown) {
				currentGlyph.replace(this.getSelectedGlyph())
			}
			if (this.altDown) {
				currentGlyph.replace(getEmptyLayer())
			}
		}
	}
	@action
	colorLayer = () => {
		if (this.mouseDown) {
			if (!this.altDown) {
				this.currentLayer[10] = colorstore.colorIndex
			}
			if (this.altDown) {
				this.currentLayer[10] = 0
			}
		}
	}
	@action
	colorBgLayer = () => {
		if (this.mouseDown) {
			if (!this.altDown) {
				this.currentGlyph[4][0] = colorstore.bgColorIndex
			}
			if (this.altDown) {
				this.currentGlyph[4][0] = 255
			}
		}
	}
	@action
	handleClickSVG = (x, y) => {
		this.selected_x = x
		this.selected_y = y
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	KEY MODIFIER EVENTS

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	@action
	handleAltDown = () => {
		this.altDown = true
	}
	@action
	handleAltUp = () => {
		this.altDown = false
	}
	@action
	handleCtrlDown = () => {
		this.ctrlDown = true
	}
	@action
	handleCtrlUp = () => {
		this.ctrlDown = false
	}
	@action
	handleMetaDown = () => {
		this.metaDown = true
	}
	@action
	handleMetaUp = () => {
		this.metaDown = false
	}
	@action
	handleShiftDown = () => {
		this.shiftDown = true
	}
	@action
	handleShiftUp = () => {
		this.shiftDown = false
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	CANVAS CURSOR

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	@action
	goRight = () => {
		//ArrowRight
		if (this.toggleOffset) {
			//user is holding down "o" key so do offset
			this.increaseGlyphOffsetX()
		} else {
			//else move cursor
			if (!this.altDown) {
				if (this.selected_x < this.canvasWidth - 1) {
					this.selected_x += 1
				} else {
					return
				}
			}
			if (this.altDown) {
				if (
					this.selected_x < this.canvasWidth - 1 &&
					this.selected_x <= this.canvasWidth - 6
				) {
					this.selected_x += +5
				} else {
					this.selected_x = this.canvasWidth - 1
				}
			}
		}
	}
	@action
	goLeft = () => {
		//ArrowLeft
		if (this.toggleOffset) {
			//user is holding down "o" key so do offset
			this.decreaseGlyphOffsetX()
		} else {
			//else move cursor
			if (!this.altDown) {
				if (this.selected_x > 0) {
					this.selected_x -= 1
				}
			}
			if (this.altDown) {
				if (this.selected_x > 4) {
					this.selected_x -= 5
				} else {
					this.selected_x = 0
				}
			}
		}
	}
	@action
	goDown = () => {
		//ArrowDown
		if (this.toggleOffset) {
			//user is holding down "o" key so do offset
			this.increaseGlyphOffsetY()
		} else {
			//else move cursor
			if (!this.altDown) {
				if (this.selected_y < this.canvasHeight - 1) {
					this.selected_y += 1
				} else {
					return
				}
			}
			if (this.altDown) {
				if (
					this.selected_y < this.canvasHeight - 1 &&
					this.selected_y <= this.canvasHeight - 6
				) {
					this.selected_y += 5
				} else {
					this.selected_y = this.canvasHeight - 1
				}
			}
		}
	}
	@action
	goUp = () => {
		//ArrowUp
		if (this.toggleOffset) {
			//user is holding down "o" key so do offset
			this.decreaseGlyphOffsetY()
		} else {
			//else move cursor
			if (!this.altDown) {
				if (this.selected_y > 0) {
					this.selected_y -= 1
				}
			}
			if (this.altDown) {
				if (this.selected_y > 4) {
					this.selected_y -= 5
				} else {
					this.selected_y = 0
				}
			}
		}
	}
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	INSERT FUNCTIONS

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	getSelectedGlyph = () => {
		return [
			this.glyphPath,
			this.svgWidth,
			this.svgHeight,
			this.svgBaseline,
			this.glyphOffsetX,
			this.glyphFontSizeModifier,
			this.rotationAmount,
			this.flipGlyph,
			this.glyphInvertedShape,
			this.glyphOffsetY,
			colorstore.colorIndex,
		]
	}
	getBgColor = () => {
		return [colorstore.bgColorIndex]
	}
	@action
	insertEmpty = () => {
		//space
		this.currentLayer.replace(getEmptyLayer())
		this.insertBackground()
	}
	@action
	insertEmptyCell = () => {
		//ctrl + e
		if (!this.ctrlDown) {
			this.insertEmpty()
		} else {
			this.currentGlyph.replace(getEmptyCell())
		}
		this.currentGlyph[4][0] = 255
	}
	@action
	insert = () => {
		//q
		this.currentLayer.replace(this.getSelectedGlyph())
		this.currentGlyph[4].replace(this.getBgColor())
	}
	@action
	insertXY = (x, y) => {
		this.currentLayerXY(x, y).replace(this.getSelectedGlyph())
	}
	@action
	insertBackground = () => {
		//z
		this.currentGlyph[4].replace(this.getBgColor())
	}
	@action
	colorFg = () => {
		//x
		if (!this.ctrlDown) {
			this.currentLayer[10] = colorstore.colorIndex
		} else {
			for (let z_i = 0; z_i <= 3; z_i++) {
				this.currentGlyph[z_i][10] = colorstore.colorIndex
			}
		}
	}
	@action
	swapColorIndexes = (from, to) => {
		const boundingRectangle = [[0, 0], [this.canvasHeight - 1, this.canvasWidth - 1]]
		this.mapRangeAllLayers(boundingRectangle, glyph => {
			if (glyph[10] == from) {
				glyph[10] = to
			} else {
				return
			}
		})
		this.mapRangeBackgroundLayer(boundingRectangle, bgindex => {
			if (bgindex[0] == from) {
				bgindex[0] = to
			} else {
				return
			}
		})
	}

	@action
	backSpace = () => {
		//backspace
		this.insertEmpty()
		if (this.selected_y > 0) {
			if (this.selected_x > 0) {
				this.goLeft()
			} else {
				this.selected_y -= 1
				this.selected_x = this.canvasWidth - 1
			}
		} else {
			if (this.selected_x > 0) {
				this.goLeft()
			} else {
				return
			}
		}
	}
	@action
	enter = () => {
		this.goDown()
		this.selected_x = 0
	}
	
	@action
	copy = (x, y) => {
		this.glyphPath = this.canvas[y][x][this.selectedLayer][0]
	}
	

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
	AREA SELECTION FUNCTIONS & ACTIONS

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

	getSelectedArea = () => {
		if (!this.selectionArea.start) {
			return null
		}
		if (this.selectionArea.start && !this.selectionArea.end) {
			return getBoundingRectangle(this.selectionArea.start, [
				this.selected_y,
				this.selected_x,
			])
		}
		return [this.selectionArea.start, this.selectionArea.end]
	}
	mapRangeAllLayers = (range, f) => {
		const [[start_y, start_x], [end_y, end_x]] = range
		for (let z_i = 0; z_i <= 3; z_i++) {
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					f(this.canvas[y_i][x_i][z_i])
				}
			}
		}
	}
	mapRangeSelectedLayer = (range, f) => {
		const [[start_y, start_x], [end_y, end_x]] = range
		for (let y_i = start_y; y_i <= end_y; y_i++) {
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				f(this.canvas[y_i][x_i][this.selectedLayer])
			}
		}
	}
	mapRangeBackgroundLayer = (range, f) => {
		const [[start_y, start_x], [end_y, end_x]] = range
		for (let y_i = start_y; y_i <= end_y; y_i++) {
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				f(this.canvas[y_i][x_i][4])
			}
		}
	}
	paintRangeAllLayers = (range, glyph) => {
		const [[start_y, start_x], [end_y, end_x]] = range
		for (let y_i = start_y; y_i <= end_y; y_i++) {
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				for (let z_i = 0; z_i <= 3; z_i++) {
					this.canvas[y_i][x_i][z_i].replace(glyph)
				}
			}
		}
	}
	paintRangeSelectedLayer = (range, glyph, layer) => {
		const [[start_y, start_x], [end_y, end_x]] = range
		for (let y_i = start_y; y_i <= end_y; y_i++) {
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				this.canvas[y_i][x_i][layer].replace(glyph)
			}
		}
	}
	@action
	makeSelection = () => {
		//shift + s
		if (this.selectionArea.start && !this.selectionArea.end) {
			const [selectionStart, selectionEnd] = this.getSelectedArea()
			this.selectionArea.start = selectionStart
			this.selectionArea.end = selectionEnd
		} else {
			this.selectionArea.start = [this.selected_y, this.selected_x]
			this.selectionArea.end = null
		}
	}
	@action
	copySelection = () => {
		//shift + c
		if (this.selectionArea.start === null || this.selectionArea.end === null) {
			return
		}

		const selectionWidth =
			this.selectionArea.end[1] - this.selectionArea.start[1]
		const selectionHeight =
			this.selectionArea.end[0] - this.selectionArea.start[0]
		if (!this.ctrlDown) {
			//SELECTED LAYER ONLY
			for (let y_i = 0; y_i <= selectionHeight; y_i++) {
				for (let x_i = 0; x_i <= selectionWidth; x_i++) {
					if (
						this.selected_y + y_i >= this.canvasHeight ||
						this.selected_x + x_i >= this.canvasWidth
					) {
						continue
					}
					const copiedGlyph = toJS(this.canvas[this.selectionArea.start[0] + y_i][this.selectionArea.start[1] + x_i][this.selectedLayer])
					this.canvas[this.selected_y + y_i][this.selected_x + x_i][this.selectedLayer].replace(copiedGlyph)
				}
			}
		} else {
			//ALL LAYERS
			for (let z_i = 0; z_i <= 3; z_i++) {
				for (let y_i = 0; y_i <= selectionHeight; y_i++) {
					for (let x_i = 0; x_i <= selectionWidth; x_i++) {
						if (
							this.selected_y + y_i >= this.canvasHeight ||
							this.selected_x + x_i >= this.canvasWidth
						) {
							continue
						}
						const copiedGlyph = toJS(this.canvas[this.selectionArea.start[0] + y_i][this.selectionArea.start[1] + x_i][z_i])
						this.canvas[this.selected_y + y_i][this.selected_x + x_i][z_i].replace(copiedGlyph)
					}
				}
			}
		}
	}
	@action
	emptySelection = () => {
		//shift + d
		this.selectionArea.start = null
		this.selectionArea.end = null
	}
	@action
	fillArea = () => {
		//shift + q or ctrl + shift + q
		if (!this.selectionArea.start) {
			return
		}
		if (!this.ctrlDown) {
			this.paintRangeSelectedLayer(
				this.getSelectedArea(),
				this.getSelectedGlyph(),
				this.selectedLayer
			)
		} else {
			this.paintRangeAllLayers(this.getSelectedArea(), this.getSelectedGlyph())
		}
	}
	@action
	colorFgSelectionArea = () => {
		if (!this.selectionArea.start) {
			return
		}
		//shift + b
		if (!this.selectionArea.start) {
			if (!this.ctrlDown) {
				this.currentLayer[10] = colorstore.colorIndex
			} else {
				for (let z_i = 0; z_i <= 3; z_i++) {
					this.currentGlyph[z_i][10] = colorstore.colorIndex
				}
			}
		}
		const [[start_y, start_x], [end_y, end_x]] = this.getSelectedArea()
		if (!this.ctrlDown) {
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					this.canvas[y_i][x_i][this.selectedLayer][10] = colorstore.colorIndex
				}
			}
		} else {
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					for (let z_i = 0; z_i <= 3; z_i++) {
						this.canvas[y_i][x_i][z_i][10] = colorstore.colorIndex
					}
				}
			}
		}
	}
	@action
	fillBackgroundArea = () => {
		if (!this.selectionArea.start) {
			return
		}
		//shift + b
		if (!this.ctrlDown) {
			this.paintRangeSelectedLayer(this.getSelectedArea(), this.getBgColor(), 4)
		} else {
			this.paintRangeSelectedLayer(this.getSelectedArea(), [255], 4)
		}
	}
	@action
	clearArea = () => {
		//shift + e or ctrl + shift + e
		if (!this.selectionArea.start) {
			return
		}
		if (!this.ctrlDown) {
			this.paintRangeSelectedLayer(
				this.getSelectedArea(),
				getEmptyLayer(),
				this.selectedLayer
			)
		} else {
			this.paintRangeAllLayers(this.getSelectedArea(), getEmptyLayer())
			this.paintRangeSelectedLayer(this.getSelectedArea(), [255], 4)
		}
	}
	@action
	rotateSelection = () => {
		// Shift + R
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
		//if selection is not square, do nothing
		if (end_x - start_x !== end_y - start_y) {
			return
		}

		const w = end_y - start_y + 1
		if (!this.ctrlDown) {
			//SELECTED LAYER ONLY
			for (let i = 0; i <= w; i++) {
				for (let j = i; j < w - i - 1; j++) {
					const temp = this.canvas[start_y + i][start_x + j][this.selectedLayer]
					this.canvas[start_y + i][start_x + j][this.selectedLayer] = this.canvas[start_y + w - j - 1][start_x + i][this.selectedLayer]
					this.canvas[start_y + w - j - 1][start_x + i][this.selectedLayer] = this.canvas[start_y + w - i - 1][start_x + w - j - 1][this.selectedLayer]
					this.canvas[start_y + w - i - 1][start_x + w - j - 1][this.selectedLayer] = this.canvas[start_y + j][start_x + w - i - 1][this.selectedLayer]
					this.canvas[start_y + j][start_x + w - i - 1][this.selectedLayer] = temp
				}
			}
			this.mapRangeSelectedLayer(boundingRectangle, glyph => {
				if (glyph[7] == -1) {
					glyph[6] += 90
				} else {
					glyph[6] -= 90
				}
				//offset fixes
				if (glyph[4] !== 0 || glyph[9] !== 0) {
					const tempOffsetX = glyph[4]
					const tempOffsetY = glyph[9]
					glyph[4] = -tempOffsetY
					glyph[9] = tempOffsetX
				}
			})
		} else {
			//ALL LAYERS
			for (let z_i = 0; z_i <= 3; z_i++) {
				for (let i = 0; i <= w; i++) {
					for (let j = i; j < w - i - 1; j++) {
						const temp = this.canvas[start_y + i][start_x + j][z_i]
						this.canvas[start_y + i][start_x + j][z_i] = this.canvas[
							start_y + w - j - 1
						][start_x + i][z_i]
						this.canvas[start_y + w - j - 1][start_x + i][z_i] = this.canvas[
							start_y + w - i - 1
						][start_x + w - j - 1][z_i]
						this.canvas[start_y + w - i - 1][start_x + w - j - 1][
							z_i
						] = this.canvas[start_y + j][start_x + w - i - 1][z_i]
						this.canvas[start_y + j][start_x + w - i - 1][z_i] = temp
					}
				}
			}
			this.mapRangeAllLayers(boundingRectangle, glyph => {
				if (glyph[7] == -1) {
					glyph[6] += 90
				} else {
					glyph[6] -= 90
				}
				//offset fixes
				if (glyph[4] !== 0 || glyph[9] !== 0) {
					const tempOffsetX = glyph[4]
					const tempOffsetY = glyph[9]
					glyph[4] = -tempOffsetY
					glyph[9] = tempOffsetX
				}
			})
		}
	}
	@action
	flipSelection = () => {
		// shift + F or ctrl + shift + f
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
		const y_width = end_y - start_y
		if (!this.ctrlDown) {
			//SELECTED LAYER ONLY
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				for (let y_delta = 0; y_delta <= y_width / 2; y_delta++) {
					const temp = this.canvas[start_y + y_delta][x_i][this.selectedLayer]
					this.canvas[start_y + y_delta][x_i][this.selectedLayer] = this.canvas[
						end_y - y_delta
					][x_i][this.selectedLayer]
					this.canvas[end_y - y_delta][x_i][this.selectedLayer] = temp
				}
			}
			this.mapRangeSelectedLayer(boundingRectangle, glyph => {
				glyph[6] += 180
				glyph[7] *= -1
				//offset fixes
				if (glyph[9] !== 0) {
					glyph[9] *= -1
				}
			})
		} else {
			//ALL LAYERS
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				for (let y_delta = 0; y_delta <= y_width / 2; y_delta++) {
					for (let z_i = 0; z_i <= 3; z_i++) {
						const temp = this.canvas[start_y + y_delta][x_i][z_i]
						this.canvas[start_y + y_delta][x_i][z_i] = this.canvas[
							end_y - y_delta
						][x_i][z_i]
						this.canvas[end_y - y_delta][x_i][z_i] = temp
					}
				}
			}
			this.mapRangeAllLayers(boundingRectangle, glyph => {
				glyph[6] += 180
				glyph[7] *= -1
				//offset fixes
				if (glyph[9] !== 0) {
					glyph[9] *= -1
				}
			})
		}
	}
	@action
	mirrorSelection = () => {
		//Shift + M
		if (!this.selectionArea.start) {
			return
		}

		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		const x_width = end_x - start_x
		if (!this.ctrlDown) {
			//SELECTED LAYER ONLY
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_delta = 0; x_delta <= x_width / 2; x_delta++) {
					const temp = this.canvas[y_i][start_x + x_delta][this.selectedLayer]
					this.canvas[y_i][start_x + x_delta][this.selectedLayer] = this.canvas[
						y_i
					][end_x - x_delta][this.selectedLayer]
					this.canvas[y_i][end_x - x_delta][this.selectedLayer] = temp
				}
			}
			this.mapRangeSelectedLayer(boundingRectangle, glyph => {
				glyph[7] *= -1
				//offset fixes
				if (glyph[4] !== 0) {
					glyph[4] *= -1
				}
			})
		} else {
			//ALL LAYERS
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_delta = 0; x_delta <= x_width / 2; x_delta++) {
					for (let z_i = 0; z_i <= 3; z_i++) {
						const temp = this.canvas[y_i][start_x + x_delta][z_i]
						this.canvas[y_i][start_x + x_delta][z_i] = this.canvas[y_i][end_x - x_delta][z_i]
						this.canvas[y_i][end_x - x_delta][z_i] = temp
					}
				}
			}
			this.mapRangeAllLayers(boundingRectangle, glyph => {
				glyph[7] *= -1
				//offset fixes
				if (glyph[4] !== 0) {
					glyph[4] *= -1
				}
			})
		}
	}
	@action
	transposeSelection = () => {
		//Shift + T
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		//if selection is not square, do nothing
		if (end_x - start_x !== end_y - start_y) {
			return
		}

		const y_width = end_y - start_y
		for (let i = 0; i <= y_width; i++) {
			for (let j = 0; j <= i; j++) {
				const temp = this.canvas[start_y + i][start_x + j]
				this.canvas[start_y + i][start_x + j] = this.canvas[start_y + j][
					start_x + i
				]
				this.canvas[start_y + j][start_x + i] = temp
			}
		}
	}
	@action
	invertColorSelection = () => {
		//Shift + I
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
		if (!this.ctrlDown) {
			//SELECTED LAYER ONLY
			this.mapRangeSelectedLayer(
				boundingRectangle,
				glyph => (glyph[8] = !glyph[8])
			)
		} else {
			//ALL LAYERS
			this.mapRangeAllLayers(boundingRectangle, glyph => (glyph[8] = !glyph[8]))
		}
	}
	@action
	rotateIndividuallySelection = () => {
		//Shift + O
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		this.mapRangeSelectedLayer(boundingRectangle, glyph => {
			glyph[6] += 90
		})
	}
	@action
	flipIndividuallySelection = () => {
		//Shift + P
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		this.mapRangeSelectedLayer(boundingRectangle, glyph => {
			glyph[7] *= -1
		})
	}
	@action
	selectAll = () => {
		//Shift + A
		this.emptySelection()
		this.selectionArea.start = [0, 0]
		this.selectionArea.end = [this.canvasHeight - 1, this.canvasWidth - 1]
	}
	@action
	shiftAreaDown = () => {
		//Shift + J
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		if (end_y == this.canvasHeight - 1) {
			return
		}
		if (!this.ctrlDown) {
			//SELECTED LAYER ONLY
			for (let y_i = end_y; y_i >= start_y; y_i--) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					const temp = this.canvas[y_i][x_i][this.selectedLayer]
					this.canvas[y_i + 1][x_i][this.selectedLayer].replace(temp)
				}
			}
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				this.canvas[start_y][x_i][this.selectedLayer].replace(getEmptyLayer())
			}
		} else {
			//ALL LAYERS
			for (let y_i = end_y; y_i >= start_y; y_i--) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					const temp = this.canvas[y_i][x_i]
					this.canvas[y_i + 1][x_i].replace(temp)
				}
			}
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				this.canvas[start_y][x_i].replace(getEmptyCell())
			}
		}
		this.goDown()
		this.selectionArea.start = [start_y + 1, start_x]
		this.selectionArea.end = [end_y + 1, end_x]
	}
	@action
	shiftAreaUp = () => {
		//Shift + K
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		if (start_y == 0) {
			return
		}
		if (!this.ctrlDown) {
			//SELECTED LAYER ONLY
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					this.canvas[y_i - 1][x_i][this.selectedLayer].replace(
						this.canvas[y_i][x_i][this.selectedLayer]
					)
				}
			}
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				this.canvas[end_y][x_i][this.selectedLayer].replace(getEmptyLayer())
			}
		} else {
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					this.canvas[y_i - 1][x_i].replace(this.canvas[y_i][x_i])
				}
			}
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				this.canvas[end_y][x_i].replace(getEmptyCell())
			}
		}
		this.goUp()
		this.selectionArea.start = [start_y - 1, start_x]
		this.selectionArea.end = [end_y - 1, end_x]
	}
	@action
	shiftAreaRight = () => {
		//Shift + L
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		if (end_x == this.canvasWidth - 1) {
			return
		}
		if (!this.ctrlDown) {
			//SELECTED LAYER ONLY
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = end_x; x_i >= start_x; x_i--) {
					this.canvas[y_i][x_i + 1][this.selectedLayer].replace(
						this.canvas[y_i][x_i][this.selectedLayer]
					)
				}
			}
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				this.canvas[y_i][start_x][this.selectedLayer].replace(getEmptyLayer())
			}
		} else {
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = end_x; x_i >= start_x; x_i--) {
					this.canvas[y_i][x_i + 1].replace(this.canvas[y_i][x_i])
				}
			}
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				this.canvas[y_i][start_x].replace(getEmptyCell())
			}
		}
		this.goRight()
		this.selectionArea.start = [start_y, start_x + 1]
		this.selectionArea.end = [end_y, end_x + 1]
	}
	@action
	shiftAreaLeft = () => {
		//Shift + H
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		if (start_x == 0) {
			return
		}
		if (!this.ctrlDown) {
			//SELECTED LAYER ONLY
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					this.canvas[y_i][x_i - 1][this.selectedLayer].replace(
						this.canvas[y_i][x_i][this.selectedLayer]
					)
				}
			}
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				this.canvas[y_i][end_x][this.selectedLayer].replace(getEmptyLayer())
			}
		} else {
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				for (let x_i = start_x; x_i <= end_x; x_i++) {
					this.canvas[y_i][x_i - 1].replace(this.canvas[y_i][x_i])
				}
			}
			for (let y_i = start_y; y_i <= end_y; y_i++) {
				this.canvas[y_i][end_x].replace(getEmptyCell())
			}
		}
		this.goLeft()
		this.selectionArea.start = [start_y, start_x - 1]
		this.selectionArea.end = [end_y, end_x - 1]
	}
}

export default new CanvasStore()

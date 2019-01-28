import { action, observable, computed, autorunAsync, toJS } from "mobx"
import setstore from "./KeymappingsStore"
import { getBoundingRectangle } from "../utils/geometry"
import { getOS } from "../utils/detectOs"

//[glyphPath, svgWidth, svgHeight, svgBaseline, glyphOffsetX, glyphFontSizeModifier, rotationAmount, flipGlyph, glyphInvertedColor, glyphOffsetY]
export const EMPTY_GLYPH = ["M0 0", "1", "1", "0"]
const getEmptyCell = () => observable([...EMPTY_GLYPH, "0", "0", "0", "1", false, "0"])

const MAX_HISTORY_SIZE = 16

class CanvasStore {
	constructor() {
		if (localStorage.firstRun) {
			this.setCurrentState(JSON.parse(localStorage.storage))
		} else {
			this.createEmptyCanvas()
		}

		autorunAsync(() => {
			const currentState = JSON.stringify(this.getCurrentState())
			localStorage.setItem("storage", currentState)
			this.addToUndoHistory(currentState)
			if (this.preserveRedoHistory) {
				this.preserveRedoHistory = false
			} else {
				this.redoHistory = []
			}
		}, 300)
	}

	//CANVAS
	@observable
	canvas

	//SETTINGS
	@observable
	canvasWidth = 40
	@observable
	canvasHeight = 25
	@observable
	cellWidth = 20
	@observable
	cellHeight = 20
	@observable
	defaultFontSize = 20
	@observable
	hideGrid = false
	@observable
	widthPixels = 0
	@observable
	heightPixels = 0
	@observable
	copiedRow = []
	@observable
	typingMode = false
	@observable
	paintMode = false

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

	//Save to Dropbox info
	@observable
	userFullName = ""
	@observable
	userEmail = ""
	@observable
	userCountry = ""

	//SELECTION AREA
	@observable
	selected_x = 0
	@observable
	selected_y = 0
	@observable
	selectionArea = { start: null, end: null }

	//SELECTION
	@observable
	selectedUnicode = 0
	@observable
	glyphPath = "M0 0"
	@observable
	svgHeight = 0
	@observable
	svgWidth = 0
	@observable
	svgBaseline = 0
	@observable
	fontName = ""
	@observable
	selectionGlyphFontSize = 0

	//Glyph fine tuning
	@observable
	glyphOffsetX = 0
	@observable
	glyphOffsetY = 0
	@observable
	glyphFontSizeModifier = 0
	@observable
	rotationAmount = 0
	@observable
	flipGlyph = 1
	@observable
	glyphInvertedColor = false

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
	
	//Change canvas width
	@action
	addCol = () => {
		this.canvasWidth = this.canvasWidth + 1
		for (const row of this.canvas) {
			row.push(getEmptyCell())
		}
		this.widthPixels = this.canvasWidth * this.cellWidth
	}

	@action
	addColLeft = () => {
		this.canvasWidth = this.canvasWidth + 1
		for (const row of this.canvas) {
			row.unshift(getEmptyCell())
		}
		this.widthPixels = this.canvasWidth * this.cellWidth
	}

	@action
	deleteCol = () => {
		if (this.canvasWidth > 1) {
			this.canvasWidth = this.canvasWidth - 1
			if (this.selected_x == this.canvasWidth) {
				this.selected_x = this.selected_x - 1
			}
			for (const row of this.canvas) {
				row.pop()
			}
		}
		this.widthPixels = this.canvasWidth * this.cellWidth
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
		this.widthPixels = state.widthPixels
		this.heightPixels = state.heightPixels
	}

	getCurrentState = () => ({
		name: "gdc-file",
		timestamp: Math.floor(Date.now() / 1000),
		canvasWidth: this.canvasWidth,
		canvasHeight: this.canvasHeight,
		cellWidth: this.cellWidth,
		cellHeight: this.cellHeight,
		defaultFontSize: this.defaultFontSize,
		widthPixels: this.widthPixels,
		heightPixels: this.heightPixels,
		canvas: this.canvas,
	})

	@action
	createEmptyCanvas = () => {
		this.canvas = this.getEmptyCanvas(this.canvasHeight)
		this.widthPixels = this.canvasWidth * this.cellWidth
		this.heightPixels = this.canvasHeight * this.cellHeight
		localStorage.setItem("firstRun", false)
	}

	@computed
	get isUndoAvailable() {
		return this.history.length >= 2
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
	addToUndoHistory = state => {
		this.history.push(state)
		if (this.history.length > MAX_HISTORY_SIZE) {
			this.history.shift()
		}
	}

	@action
	addToRedoHistory = state => {
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
	getEmptyCanvas = size => {
		return Array.from({ length: this.canvasHeight }, this.getEmptyRow)
	}
	@action
	getEmptyRow = () => {
		return Array.from({ length: this.canvasWidth }, () => getEmptyCell())
	}

	//Change canvas height
	@action
	addRow = () => {
		this.canvasHeight = this.canvasHeight + 1
		this.canvas.push(this.getEmptyRow())
		this.heightPixels = this.canvasHeight * this.cellHeight
	}
	@action
	addRowTop = () => {
		this.canvasHeight = this.canvasHeight + 1
		this.canvas.unshift(this.getEmptyRow())
		this.heightPixels = this.canvasHeight * this.cellHeight
	}
	@action
	deleteRow = () => {
		if (this.canvasHeight > 1) {
			this.canvasHeight = this.canvasHeight - 1
			if (this.selected_y == this.canvasHeight) {
				this.selected_y = this.selected_y - 1
			}
			this.canvas.pop()
		}
		this.heightPixels = this.canvasHeight * this.cellHeight
	}
	//Remove row at selection
	@action
	deleteRowAtSelection = () => {
		this.canvas.splice(this.selected_y, 1)
		this.canvasHeight = this.canvasHeight - 1
		if (this.canvasHeight >= this.selected_y) {
			this.selected_y = this.selected_y - 1
		}
		if (this.selected_y <= 0) {
			this.selected_y = this.selected_y + 1
		}
		this.heightPixels = this.canvasHeight * this.cellHeight
	}
	//Remove col at selection
	@action
	deleteColAtSelection = () => {
		for (var i = 0; i < this.canvasHeight; i++) {
			var col = this.canvas[i]
			col.splice(this.selected_x, 1)
		}
		this.canvasWidth = this.canvasWidth - 1
		if (this.canvasWidth >= this.selected_x) {
			this.selected_x = this.selected_x - 1
		}
		if (this.selected_x <= 0) {
			this.selected_x = this.selected_x + 1
		}
		this.widthPixels = this.canvasWidth * this.cellWidth
	}
	//Add row at selection
	@action
	addRowAtSelection = () => {
		this.canvasHeight++
		this.canvas.splice(this.selected_y, 0, this.getEmptyRow())
		this.heightPixels = this.canvasHeight * this.cellHeight
	}
	//Add col at selection
	@action
	addColAtSelection = () => {
		this.canvasWidth++
		for (var i = 0; i < this.canvasHeight; i++) {
			var col = this.canvas[i]
			col.splice(this.selected_x, 0, getEmptyCell())
		}
		this.widthPixels = this.canvasWidth * this.cellWidth
	}

	//Change cell height
	increaseCellHeight = () => {
		this.cellHeight = this.cellHeight + 1
		this.heightPixels = this.canvasHeight * this.cellHeight
	}
	decreaseCellHeight = () => {
		if (this.cellHeight > 1) {
			this.cellHeight = this.cellHeight - 1
			this.heightPixels = this.canvasHeight * this.cellHeight
		}
	}
	//Change cell width
	increaseCellWidth = () => {
		this.cellWidth = this.cellWidth + 1
		this.widthPixels = this.canvasWidth * this.cellWidth
	}
	decreaseCellWidth = () => {
		if (this.cellWidth > 1) {
			this.cellWidth = this.cellWidth - 1
		}
		this.widthPixels = this.canvasWidth * this.cellWidth
	}
	//Change font size
	increaseFontSize = () => {
		this.defaultFontSize = this.defaultFontSize + 1
	}
	decreaseFontSize = () => {
		if (this.defaultFontSize > 1) {
			this.defaultFontSize = this.defaultFontSize - 1
		}
	}
	//Toggle Hide Grid
	handleChangeHideGrid = () => {
		this.hideGrid = !this.hideGrid
		document.getElementById("hideGrid").checked = this.hideGrid
	}
	//Toggle Typing Mode
	handleChangeTypingMode = () => {
		this.typingMode = !this.typingMode
		this.glyphClear()
		document.getElementById("typingMode").checked = this.typingMode		
	}
	//Toggle Paint Mode
	handleChangePaintMode = () => {
		this.paintMode = !this.paintMode
		document.getElementById("paintMode").checked = this.paintMode
	}

	//Update Size of PNG export
	@action
	updateExportSizeMultiplier = evt => {
		this.exportSizeMultiplier = evt.target.value
	}
	//Update File Name
	@action
	updateFileName = evt => {
		this.fileName = evt.target.value
	}
	//Save to Dropbox info
	@action
	updateFullName = evt => {
		this.userFullName = evt.target.value
	}
	@action
	updateEmail = evt => {
		this.userEmail = evt.target.value
	}
	@action
	updateCountry = evt => {
		this.userCountry = evt.target.value
	}
	//Glyph offset X
	increaseGlyphOffsetX = () => {
		this.glyphOffsetX = this.canvas[this.selected_y][this.selected_x].slice()[4] //First check the existing offset x value
		this.glyphOffsetX += this.svgWidth / 4 //Set offset amount to 10% of the glyph width
		this.canvas[this.selected_y][this.selected_x][4] = this.glyphOffsetX //Update canvas
	}
	decreaseGlyphOffsetX = () => {
		this.glyphOffsetX = this.canvas[this.selected_y][this.selected_x].slice()[4] //First check the existing offset x value
		this.glyphOffsetX -= this.svgWidth / 4 //Set offset amount to 10% of the glyph width
		this.canvas[this.selected_y][this.selected_x][4] = this.glyphOffsetX //Update canvas
	}
	//Glyph offset Y
	increaseGlyphOffsetY = () => {
		this.glyphOffsetY = this.canvas[this.selected_y][this.selected_x].slice()[9] //First check the existing offset x value
		this.glyphOffsetY += this.svgHeight / 4 //Set offset amount to 10% of the glyph width
		this.canvas[this.selected_y][this.selected_x][9] = this.glyphOffsetY //Update canvas
	}
	decreaseGlyphOffsetY = () => {
		this.glyphOffsetY = this.canvas[this.selected_y][this.selected_x].slice()[9] //First check the existing offset x value
		this.glyphOffsetY -= this.svgHeight / 4 //Set offset amount to 10% of the glyph width
		this.canvas[this.selected_y][this.selected_x][9] = this.glyphOffsetY //Update canvas
	}
	//Glyph rotation
	rotateGlyphRight = () => {
		this.rotationAmount = this.canvas[this.selected_y][
			this.selected_x
		].slice()[6] //First check the existing offset x value
		if (this.rotationAmount <= -270) {
			this.rotationAmount = Number(0)
		} else {
			this.rotationAmount = Number(this.rotationAmount - 90)
		}
		this.canvas[this.selected_y][this.selected_x][6] = this.rotationAmount //Update canvas
	}
	rotateGlyphLeft = () => {
		this.rotationAmount = this.canvas[this.selected_y][
			this.selected_x
		].slice()[6] //First check the existing offset x value
		if (this.rotationAmount >= 270) {
			this.rotationAmount = Number(0)
		} else {
			this.rotationAmount = Number(this.rotationAmount + 90)
		}
		this.canvas[this.selected_y][this.selected_x][6] = this.rotationAmount //Update canvas
	}
	//Toggle Glyph Invert Color
	handleChangeInvertColor = () => {
		this.glyphInvertedColor = this.canvas[this.selected_y][this.selected_x][8]
		this.glyphInvertedColor = !this.glyphInvertedColor
		this.canvas[this.selected_y][this.selected_x][8] = this.glyphInvertedColor //Update canvas
	}

	//Glyph font size
	@computed
	get glyphFontSize() {
		return this.defaultFontSize + this.glyphFontSizeModifier
	}
	increaseGlyphFontSizeModifier = () => {
		this.glyphFontSizeModifier = this.canvas[this.selected_y][
			this.selected_x
		].slice()[5] //First check the existing glyphFontSizeModifier
		this.glyphFontSizeModifier++
		this.canvas[this.selected_y][
			this.selected_x
		][5] = this.glyphFontSizeModifier //Update canvas
		this.getFontSizeAtSelection()
	}
	decreaseGlyphFontSizeModifier = () => {
		if (this.glyphFontSize > 1) {
			this.glyphFontSizeModifier = this.canvas[this.selected_y][
				this.selected_x
			].slice()[5] //First check the existing glyphFontSizeModifier
			this.glyphFontSizeModifier--
			this.canvas[this.selected_y][
				this.selected_x
			][5] = this.glyphFontSizeModifier //Update canvas
			this.getFontSizeAtSelection()
		}
	}
	increaseByOneCellGlyphFontSizeModifier = () => {
		this.glyphFontSizeModifier =
			Number(this.canvas[this.selected_y][this.selected_x].slice()[5]) +
			Number(this.defaultFontSize) //First check the existing glyphFontSizeModifier
		this.canvas[this.selected_y][
			this.selected_x
		][5] = this.glyphFontSizeModifier //Update canvas
		this.getFontSizeAtSelection()
	}
	decreaseByOneCellGlyphFontSizeModifier = () => {
		if (this.glyphFontSize - this.defaultFontSize >= 1) {
			this.glyphFontSizeModifier =
				Number(this.canvas[this.selected_y][this.selected_x].slice()[5]) -
				Number(this.defaultFontSize) //First check the existing glyphFontSizeModifier
			this.canvas[this.selected_y][
				this.selected_x
			][5] = this.glyphFontSizeModifier //Update canvas
			this.getFontSizeAtSelection()
		}
	}
	//Flip glyph
	handleChangeFlip = () => {
		this.flipGlyph = this.canvas[this.selected_y][this.selected_x][7]
		this.flipGlyph = this.flipGlyph *= -1
		this.canvas[this.selected_y][this.selected_x][7] = this.flipGlyph
	}
	//GlyphClear - reset selection to default
	glyphClear = () => {
		this.glyphFontSizeModifier = 0
		this.glyphInvertedColor = false
		this.rotationAmount = 0
		this.glyphOffsetX = 0
		this.glyphOffsetY = 0
		this.flipGlyph = 1
		this.canvas[this.selected_y][this.selected_x][3] = 0 //baseline
		this.canvas[this.selected_y][this.selected_x][4] = 0 //offset x
		this.canvas[this.selected_y][this.selected_x][5] = 0 //font size modifier
		this.canvas[this.selected_y][this.selected_x][6] = 0 //rotation
		this.canvas[this.selected_y][this.selected_x][7] = 1 //flip
		this.canvas[this.selected_y][this.selected_x][8] = false //invert color
		this.canvas[this.selected_y][this.selected_x][9] = 0 //offset y
		this.getFontSizeAtSelection()
	}
	emptyCanvas = () => {
		this.glyphClear
		this.selected_y = 0
		this.selected_x = 0
		this.canvasWidth = 40
		this.canvasHeight = 25
		this.cellWidth = 20
		this.cellHeight = 20
		this.defaultFontSize = 20
		this.widthPixels = this.canvasWidth * this.cellWidth
		this.heightPixels = this.canvasHeight * this.cellHeight
		this.canvas = Array.from({ length: this.canvasHeight }, () =>
			this.getEmptyRow()
		)
	}
	toggleWriting = () => {
		this.disableShortcuts = !this.disableShortcuts
	}
	//Tools
	@action
	clickSelection = event => {
		event.preventDefault
		this.selected_x = Number(event.target.getAttribute("data-x"))
		this.selected_y = Number(event.target.getAttribute("data-y"))
		this.getFontSizeAtSelection()
	}
	@action
	handleMouseDown = event => {
		this.mouseDown = true
		if(this.paintMode) {
			this.paintCell()
		}
	}
	@action
	handleMouseUp = event => {
		this.mouseDown = false
	}
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
	@action
	handleMouseOver = event => {
		if(this.paintMode) {
			event.preventDefault
			this.selected_x = Number(event.target.getAttribute("data-x"))
			this.selected_y = Number(event.target.getAttribute("data-y"))
			this.paintCell()
		}
	}
	@action	
	handleUndoRedo = () => {
		if (getOS() == 'OSX') {
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
	@action
	paintCell = () => {
		if(this.mouseDown) {
			const currentGlyph = this.canvas[this.selected_y][this.selected_x]
			if(!this.altDown) {
				currentGlyph.replace(this.getSelectedGlyph())
			} else {
				currentGlyph.replace(getEmptyCell())
			}
			this.getFontSizeAtSelection()
		}
	}
	@action
	getFontSizeAtSelection = () => {
		this.selectionGlyphFontSize =
			Number(this.defaultFontSize) +
			Number(this.canvas[this.selected_y][this.selected_x][5])
	}
	@action
	goRight = () => {
		if (!this.altDown) {
			if (this.selected_x < this.canvasWidth - 1) {
				this.selected_x = Number(this.selected_x + 1)
			} else if (this.selected_x == this.canvasWidth) {
				return
			}
		}
		if (this.altDown) {
			if(this.selected_x < this.canvasWidth - 1 && this.selected_x <= this.canvasWidth - 6 ) {
				this.selected_x = Number(this.selected_x + 5)
			} else if (this.selected_x > this.canvasWidth - 6) {
				this.selected_x = this.canvasWidth - 1
			}
		}
		this.getFontSizeAtSelection()
	}
	@action
	goLeft = () => {
		//ArrowLeft
		if(!this.altDown) {
			if (this.selected_x > 0 ) {
				this.selected_x = Number(this.selected_x - 1)
			}
		}
		if (this.altDown) {
			if(this.selected_x > 4 ) {
				this.selected_x = Number(this.selected_x - 5)
			} else if (this.selected_x <= 4) {
				this.selected_x = 0
			}
		}
		this.getFontSizeAtSelection()
	}
	@action
	goDown = () => {
		//ArrowDown
		if(!this.altDown) {
			if (this.selected_y < this.canvasHeight - 1) {
				this.selected_y = Number(this.selected_y + 1)
			} else if (this.selected_y == this.canvasHeight) {
				return
			}	
		}
		if (this.altDown) {
			if(this.selected_y < this.canvasHeight - 1 && this.selected_y <= this.canvasHeight - 6 ) {
				this.selected_y = Number(this.selected_y + 5)
			} else if (this.selected_y > this.canvasHeight - 6) {
				this.selected_y = this.canvasHeight - 1
			}
		}

		this.getFontSizeAtSelection()
	}
	@action
	goUp = () => {
		//ArrowUp
		if(!this.altDown) {
			if (this.selected_y > 0) {
				this.selected_y = Number(this.selected_y - 1)
			}
		}
		if (this.altDown) {
			if(this.selected_y > 4 ) {
				this.selected_y = Number(this.selected_y - 5)
			} else if (this.selected_y <= 4) {
				
				this.selected_y = 0
			}
		}
		this.getFontSizeAtSelection()
	}
	insertEmpty = () => {
		//space
		const currentGlyph = this.canvas[this.selected_y][this.selected_x]
		currentGlyph.replace(getEmptyCell())
		this.getFontSizeAtSelection()
	}
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
			this.glyphInvertedColor,
			this.glyphOffsetY
		]
	}
	insert = () => {
		//q
		const currentGlyph = this.canvas[this.selected_y][this.selected_x]
		currentGlyph.replace(this.getSelectedGlyph())
		this.getFontSizeAtSelection()
	}
	backSpace = () => {
		//backspace
		const currentGlyph = this.canvas[this.selected_y][this.selected_x]
		currentGlyph.replace(getEmptyCell())
		this.getFontSizeAtSelection()
		if (this.selected_y > 0) {
			if (this.selected_x > 0) {
				this.goLeft()
			} else if (this.selected_x <= 0) {
				this.selected_y = this.selected_y - 1
				this.selected_x = this.canvasWidth - 1
			}
		} else {
			if (this.selected_x > 0) {
				this.goLeft()
			}
			if (this.selected_x == 0) {
				return
			}
		}
	}
	enter = () => {
		this.goDown()
		this.selected_x = 0
	}

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

		for (let y_i = 0; y_i <= selectionHeight; y_i++) {
			for (let x_i = 0; x_i <= selectionWidth; x_i++) {
				if (
					this.selected_y + y_i >= this.canvasHeight ||
					this.selected_x + x_i >= this.canvasWidth
				) {
					continue
				}

				const copiedGlyph = toJS(
					this.canvas[this.selectionArea.start[0] + y_i][
						this.selectionArea.start[1] + x_i
					]
				)
				this.canvas[this.selected_y + y_i][this.selected_x + x_i].replace(copiedGlyph)
			}
		}
	}

	@action
	mapRange = (range, f) => {
		const [[start_y, start_x], [end_y, end_x]] = range
		for (let y_i = start_y; y_i <= end_y; y_i++) {
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				f(this.canvas[y_i][x_i])
			}
		}
	}

	@action
	paintRange = (range, glyph) => {
		const [[start_y, start_x], [end_y, end_x]] = range
		for (let y_i = start_y; y_i <= end_y; y_i++) {
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				this.canvas[y_i][x_i].replace(glyph)
			}
		}
	}

	@action
	emptySelection = () => {
		//x
		this.selectionArea.start = null
		this.selectionArea.end = null
	}

	@action
	fillArea = () => {
		if (!this.selectionArea.start) {
			return
		}
		this.paintRange(this.getSelectedArea(), this.getSelectedGlyph())
	}

	@action
	clearArea = () => {
		if (!this.selectionArea.start) {
			return
		}
		this.paintRange(this.getSelectedArea(), getEmptyCell())
	}

	@action
	flipSelection = () => {
		// shift + F
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle
		const y_width = end_y - start_y
		for (let x_i = start_x; x_i <= end_x; x_i++) {
			for (let y_delta = 0; y_delta <= y_width / 2; y_delta++) {
				const temp = this.canvas[start_y + y_delta][x_i]
				this.canvas[start_y + y_delta][x_i] = this.canvas[end_y - y_delta][x_i]
				this.canvas[end_y - y_delta][x_i] = temp
			}
		}
		this.mapRange(boundingRectangle, glyph => {
			glyph[6] += 180
			glyph[7] *= -1
		})
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
		for (let y_i = start_y; y_i <= end_y; y_i++) {
			for (let x_delta = 0; x_delta <= x_width / 2; x_delta++) {
				const temp = this.canvas[y_i][start_x + x_delta]
				this.canvas[y_i][start_x + x_delta] = this.canvas[y_i][end_x - x_delta]
				this.canvas[y_i][end_x - x_delta] = temp
			}
		}

		this.mapRange(boundingRectangle, glyph => (glyph[7] *= -1))
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
		for (let i = 0; i <= w; i++) {
			for (let j = i; j < w - i - 1; j++) {
				const temp = this.canvas[start_y + i][start_x + j]
				this.canvas[start_y + i][start_x + j] = this.canvas[
					start_y + w - j - 1
				][start_x + i]
				this.canvas[start_y + w - j - 1][start_x + i] = this.canvas[
					start_y + w - i - 1
				][start_x + w - j - 1]
				this.canvas[start_y + w - i - 1][start_x + w - j - 1] = this.canvas[
					start_y + j
				][start_x + w - i - 1]
				this.canvas[start_y + j][start_x + w - i - 1] = temp
			}
		}

		this.mapRange(boundingRectangle, glyph => {
			if (glyph[7] == -1) {
				glyph[6] += 90
			} else {
				glyph[6] -= 90
			}
		})
	}

	@action
	invertColorSelection = () => {
		//Shift + I
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		this.mapRange(boundingRectangle, glyph => (glyph[8] = !glyph[8]))
	}

	@action
	rotateIndividuallySelection = () => {
		//Shift + O
		if (!this.selectionArea.start) {
			return
		}
		const boundingRectangle = this.getSelectedArea()
		const [[start_y, start_x], [end_y, end_x]] = boundingRectangle

		this.mapRange(boundingRectangle, glyph => {
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

		this.mapRange(boundingRectangle, glyph => {
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

		if(end_y == this.canvasHeight - 1) {
			return 
		}
		for (let y_i = end_y; y_i >= start_y; y_i--) {
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				const temp = this.canvas[y_i][x_i]
				this.canvas[y_i + 1][x_i].replace(temp)
			}
		}
		for (let x_i = start_x; x_i <= end_x; x_i++) {
			this.canvas[start_y].splice(x_i, 1, getEmptyCell());
		}
		this.selected_y = this.selected_y + 1
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

		if(start_y == 0) {
			return 
		}
		for (let y_i = start_y; y_i <= end_y; y_i++) {
			for (let x_i = start_x; x_i <= end_x; x_i++) {
				const temp = this.canvas[y_i][x_i]
				this.canvas[y_i - 1][x_i].replace(temp)
			}
		}
		for (let x_i = start_x; x_i <= end_x; x_i++) {
			this.canvas[end_y].splice(x_i, 1, getEmptyCell());
		}
		this.selected_y = this.selected_y - 1
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

		if(end_x == this.canvasWidth - 1) {
			return 
		}
		
		for (let y_i = start_y; y_i <= end_y; y_i++) {
			this.canvas[y_i].splice(end_x + 1, 1);
			this.canvas[y_i].splice(start_x, 0, getEmptyCell());
		}
		this.selected_x = this.selected_x + 1
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
		
		if(start_x == 0) {
			return 
		}

		for (let y_i = start_y; y_i <= end_y; y_i++) {
			this.canvas[y_i].splice(start_x - 1, 1);
			this.canvas[y_i].splice(end_x, 0, getEmptyCell());
		}
		this.selected_x = this.selected_x - 1
		this.selectionArea.start = [start_y, start_x - 1]
		this.selectionArea.end = [end_y, end_x - 1]
	}
}

export default new CanvasStore()

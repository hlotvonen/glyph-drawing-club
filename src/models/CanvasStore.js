import { action, observable, computed } from 'mobx';
import setstore from './KeymappingsStore'

//[glyphPath, svgWidth, svgHeight, svgBaseline, glyphOffsetX, glyphFontSizeModifier, rotationAmount, flipGlyph]
export const EMPTY_GLYPH = ["M0 0", "1", "1", "0"]
const EMPTY_CELL = [...EMPTY_GLYPH, "0", "0", "0", "1", false];


class CanvasStore {
//Initialize canvas
	constructor() {
		this.canvas = Array.from({length: this.canvasHeight}, () => Array.from({length: this.canvasWidth}, () => EMPTY_CELL ));
		this.widthPixels = this.canvasWidth * this.cellWidth;
		this.heightPixels = this.canvasHeight * this.cellHeight;
	}

//CANVAS
	@observable canvas;

//SETTINGS
	@observable canvasWidth = 20;
	@observable canvasHeight = 15;
	@observable cellWidth = 15;
	@observable cellHeight = 15;
	@observable defaultFontSize = 15;
	@observable hideGrid = false;
	@observable darkTheme = false;
	@observable widthPixels = 0;
	@observable heightPixels = 0;

//SELECTION
	@observable selected_y = 0;
	@observable selected_x = 0;
	@observable selectedUnicode = 0;
	@observable glyphPath = "M0 0";
	@observable svgHeight = 0;
	@observable svgWidth = 0;
	@observable svgBaseline = 0;
	@observable selectedFont = "Reviscii-Regular";
	@observable fontName = "Reviscii-Regular";

//Glyph fine tuning
	@observable glyphOffsetX = 0;
	@observable glyphOffsetY = 0;
	@observable glyphFontSizeModifier = 0;
	@observable rotationAmount = 0;
	@observable flipGlyph = "1";
	@observable glyphInvertedColor = false;

//Change canvas width
	@action addCol = () => {
		this.canvasWidth = this.canvasWidth + 1;
		for (const row of this.canvas) {
			row.push(EMPTY_CELL)
		}
		this.widthPixels = this.canvasWidth * this.cellWidth;
	}
	@action deleteCol = () => {
		if(this.canvasWidth > 1){
			this.canvasWidth = this.canvasWidth - 1;
			if(this.selected_x == this.canvasWidth){
				this.selected_x = this.selected_x - 1;
			}
			for (const row of this.canvas) {
				row.pop()
			}
		}
		this.widthPixels = this.canvasWidth * this.cellWidth;
	}
//Change canvas height
	@action addRow = () => { 
		this.canvasHeight = this.canvasHeight + 1;
		this.canvas.push(Array.from({length: this.canvasWidth}, () => EMPTY_CELL ));
		this.heightPixels = this.canvasHeight * this.cellHeight;
	}

	@action deleteRow = () => {
		if(this.canvasHeight > 1){
			this.canvasHeight = this.canvasHeight - 1;
			if(this.selected_y == this.canvasHeight){
				this.selected_y = this.selected_y - 1;
			}
			this.canvas.pop()
		}
		this.heightPixels = this.canvasHeight * this.cellHeight;
	}

//Change cell height
	increaseCellHeight = () => { 
		this.cellHeight = this.cellHeight + 1;
		this.heightPixels = this.canvasHeight * this.cellHeight;
	}
	decreaseCellHeight = () => {
		if(this.cellHeight > 1){
			this.cellHeight = this.cellHeight - 1;
			this.heightPixels = this.canvasHeight * this.cellHeight;
		}
	}
//Change cell width
	increaseCellWidth = () => { 
		this.cellWidth = this.cellWidth + 1;
		this.widthPixels = this.canvasWidth * this.cellWidth;
	}
	decreaseCellWidth = () => {
		if(this.cellWidth > 1){
			this.cellWidth = this.cellWidth - 1;
		}
		this.widthPixels = this.canvasWidth * this.cellWidth;
	}
//Change font size
	increaseFontSize = () => { 
		this.defaultFontSize = this.defaultFontSize + 1;
	}
	decreaseFontSize = () => {
		if(this.defaultFontSize > 1){
			this.defaultFontSize = this.defaultFontSize - 1;
		}
	}
//Toggle Hide Grid
	handleChange = () => { 
		this.hideGrid = !this.hideGrid;
	}
//Toggle Dark Theme
	handleChangeTheme = () => { 
		this.darkTheme = !this.darkTheme;
	}

//Glyph offset X
	@computed get increasedOffsetXAmount() {
		return this.glyphOffsetX + (this.svgWidth / 30);
	}
	@computed get decreasedOffsetXAmount() {
		return this.glyphOffsetX - (this.svgWidth / 30);
	}
	increaseGlyphOffsetX = () => {
		this.glyphOffsetX = this.canvas[this.selected_y][this.selected_x].slice()[4]; //First check the existing offset x value
		this.glyphOffsetX = this.increasedOffsetXAmount; //Set offset amount to 10% of the glyph width 
		this.canvas[this.selected_y][this.selected_x][4] = this.glyphOffsetX; //Update canvas
	}
	decreaseGlyphOffsetX = () => {
		this.glyphOffsetX = this.canvas[this.selected_y][this.selected_x].slice()[4]; //First check the existing offset x value
		this.glyphOffsetX = this.decreasedOffsetXAmount; //Set offset amount to 10% of the glyph width
		this.canvas[this.selected_y][this.selected_x][4] = this.glyphOffsetX; //Update canvas
	}
//Glyph offset X
	@computed get increasedOffsetYAmount() {
		return this.glyphOffsetY + (this.svgHeight / 50);
	}
	@computed get decreasedOffsetYAmount() {
		return this.glyphOffsetY - (this.svgHeight / 50);
	}
	increaseGlyphOffsetY = () => {
		this.glyphOffsetY = this.canvas[this.selected_y][this.selected_x].slice()[3]; //First check the existing offset x value
		this.glyphOffsetY = this.increasedOffsetYAmount; //Set offset amount to 10% of the glyph width 
		this.canvas[this.selected_y][this.selected_x][3] = this.glyphOffsetY; //Update canvas
	}
	decreaseGlyphOffsetY = () => {
		this.glyphOffsetY = this.canvas[this.selected_y][this.selected_x].slice()[3]; //First check the existing offset x value
		this.glyphOffsetY = this.decreasedOffsetYAmount; //Set offset amount to 10% of the glyph width
		this.canvas[this.selected_y][this.selected_x][3] = this.glyphOffsetY; //Update canvas
	}
//Glyph rotation
	rotateGlyphRight = () => {
		this.rotationAmount = this.canvas[this.selected_y][this.selected_x].slice()[6]; //First check the existing offset x value
		if(this.rotationAmount <= -270) {
			this.rotationAmount = 0;
		} else {
			this.rotationAmount = this.rotationAmount - 90;
		}
		this.canvas[this.selected_y][this.selected_x][6] = this.rotationAmount; //Update canvas
	}
	rotateGlyphLeft = () => {
		this.rotationAmount = this.canvas[this.selected_y][this.selected_x].slice()[6]; //First check the existing offset x value
		if(this.rotationAmount >= 270) {
			this.rotationAmount = 0;
		} else {
			this.rotationAmount = this.rotationAmount + 90;
		}
		this.canvas[this.selected_y][this.selected_x][6] = this.rotationAmount; //Update canvas
	}
//Toggle Glyph Invert Color
	handleChangeInvertColor = () => { 
		this.glyphInvertedColor = !this.glyphInvertedColor;
	    this.canvas[this.selected_y][this.selected_x][8] = this.glyphInvertedColor; //Update canvas
		console.log(this.glyphInvertedColor);
	}

//Glyph font size
  @computed get glyphFontSize() {
    return this.defaultFontSize + this.glyphFontSizeModifier;
  }
  increaseGlyphFontSizeModifier = () => {
  	this.glyphFontSizeModifier = this.canvas[this.selected_y][this.selected_x].slice()[5]; //First check the existing glyphFontSizeModifier
    this.glyphFontSizeModifier = this.glyphFontSizeModifier + 1;
    this.canvas[this.selected_y][this.selected_x][5] = this.glyphFontSizeModifier; //Update canvas
  }
  decreaseGlyphFontSizeModifier = () => {
    if(this.glyphFontSize > 1){
    	this.glyphFontSizeModifier = this.canvas[this.selected_y][this.selected_x].slice()[5]; //First check the existing glyphFontSizeModifier
    	this.glyphFontSizeModifier = this.glyphFontSizeModifier - 1;
   		this.canvas[this.selected_y][this.selected_x][5] = this.glyphFontSizeModifier; //Update canvas
    }
  }
//Flip Glyph
	handleChangeFlip = () => { 
		this.flipGlyph = this.flipGlyph *= -1;
		this.canvas[this.selected_y][this.selected_x][7] = this.flipGlyph;
	}

	goRight = () => {
        if(this.selected_x < this.canvasWidth - 1) {
            this.selected_x = this.selected_x + 1;
        }
        else if(this.selected_x = this.canvasWidth) {
            this.addCol();
        }
	}

   goLeft = () => {
        if(this.selected_x > 0){
            this.selected_x = this.selected_x - 1;
        }
    }

    goDown = () => {
        if(this.selected_y < this.canvasHeight - 1) {
            this.selected_y = this.selected_y + 1;
        }
        else if(this.selected_y = this.canvasHeight) {
            this.addRow();
        }
    }

    goUp = () => {
        if(this.selected_y > 0){
            this.selected_y = this.selected_y - 1;
        }
    }

    insertEmpty = () => {
        this.canvas[this.selected_y][this.selected_x] = EMPTY_CELL;
    }

    insert = () => {
        this.canvas[this.selected_y][this.selected_x] = [this.glyphPath, this.svgWidth, this.svgHeight, this.svgBaseline, this.glyphOffsetX, this.glyphFontSizeModifier, this.rotationAmount, this.flipGlyph, this.glyphInvertedColor];
	}
}

export default new CanvasStore();



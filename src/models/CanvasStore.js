import { action, observable } from 'mobx';

class CanvasStore {
  constructor() {
     this.canvas = Array.from({length: this.canvasHeight}, () => Array.from({length: this.canvasWidth}, () => '\u00A0' ));
  }

  //CANVAS
  @observable canvas

  //SETTINGS
  @observable canvasWidth = 10;
  @observable canvasHeight = 10;
  @observable cellWidth = 16;
  @observable cellHeight = 28;
  @observable fontSize = 28;
  @observable hideGrid = false;

  //SELECTION
  @observable selected_y = 0;
  @observable selected_x = 0;
  @observable selectedUnicode = 0;


  //Change canvas width
  @action addCol = () => {
    this.canvasWidth = this.canvasWidth + 1;
    for (const row of this.canvas) {
      row.push('\u00A0')
    }
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
  }
  //Change canvas height
  @action addRow = () => { 
    this.canvasHeight = this.canvasHeight + 1;
    this.canvas.push(Array.from({length: this.canvasWidth}, () => '\u00A0' ))
  }

  @action deleteRow = () => {
    if(this.canvasHeight > 1){
      this.canvasHeight = this.canvasHeight - 1;
      if(this.selected_y == this.canvasHeight){
        this.selected_y = this.selected_y - 1;
      }
      this.canvas.pop()
    }
  }

  //Change cell height
  increaseCellHeight = () => { 
    this.cellHeight = this.cellHeight + 1;
  }
  decreaseCellHeight = () => {
    if(this.cellHeight > 1){
      this.cellHeight = this.cellHeight - 1;
    }
  }
  //Change cell width
  increaseCellWidth = () => { 
    this.cellWidth = this.cellWidth + 1;
  }
  decreaseCellWidth = () => {
    if(this.cellWidth > 1){
      this.cellWidth = this.cellWidth - 1;
    }
  }
  //Change font size
  increaseFontSize = () => { 
    this.fontSize = this.fontSize + 1;
  }
  decreaseFontSize = () => {
    if(this.fontSize > 1){
      this.fontSize = this.fontSize - 1;
    }
  }
  //Toggle Hide Grid
  handleChange = () => { 
    this.hideGrid = !this.hideGrid;
  }

  handleKeyPress = (event) => {

    //Typing mode
    /*let isPrintableKey = event.key.length === 1;
    if(isPrintableKey) {
      this.canvas[this.selected_y][this.selected_x] = event.key;
    }*/
    
    //Arrow keys for moving around the canvas
    if(event.key == 'ArrowRight'){
      if(this.selected_x < this.canvasWidth - 1) {
        this.selected_x = this.selected_x + 1;
      }
      else if(this.selected_x = this.canvasWidth) {
        this.addCol();
      }
    }
    if(event.key == 'ArrowLeft' && this.selected_x > 0){
      this.selected_x = this.selected_x - 1;
    }
    if(event.key == 'ArrowDown'){
      if(this.selected_y < this.canvasHeight - 1) {
        this.selected_y = this.selected_y + 1;
      }
      else if(this.selected_y = this.canvasHeight) {
        this.addRow();
      }
    }
    if(event.key == 'ArrowUp' && this.selected_y > 0){
      this.selected_y = this.selected_y - 1;
    }
    //SPACE
    if(event.key == ' '){
      this.canvas[this.selected_y][this.selected_x] = '\u00A0'
    }

    if(event.key == 'q'){
      this.canvas[this.selected_y][this.selected_x] = String.fromCodePoint(this.selectedUnicode)
    }
    /*if(event.key == 'w'){
      this.canvas[this.selected_y][this.selected_x] = '\u25c8'
    }
    if(event.key == 'e'){
      this.canvas[this.selected_y][this.selected_x] = '\u25c7'
    }
    if(event.key == 'r'){
      this.canvas[this.selected_y][this.selected_x] = '\u25c9'
    }

    if(event.key == 'a'){
      this.canvas[this.selected_y][this.selected_x] = '\u25ef'
    }
    if(event.key == 's'){
      this.canvas[this.selected_y][this.selected_x] = '\u25d1'
    }
    if(event.key == 'd'){
      this.canvas[this.selected_y][this.selected_x] = '\u2b55'
    }
    if(event.key == 'f'){
      this.canvas[this.selected_y][this.selected_x] = '\u2b24'
    }

    if(event.key == 'z'){
      this.canvas[this.selected_y][this.selected_x] = '\uec08'
    }
    if(event.key == 'x'){
      this.canvas[this.selected_y][this.selected_x] = '\u25f7'
    }
    if(event.key == 'c'){
      this.canvas[this.selected_y][this.selected_x] = '\u25e1'
    }
    if(event.key == 'v'){
      this.canvas[this.selected_y][this.selected_x] = '\u25e0'
    }*/
  }

}

export default new CanvasStore();



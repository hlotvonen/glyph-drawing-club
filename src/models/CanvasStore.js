import { observable } from 'mobx';

class CanvasStore {

  //CANVAS
  @observable canvas = [[]];

  //SETTINGS
  @observable canvasWidth = 10;
  @observable canvasHeight = 10;
  @observable cellWidth = 16;
  @observable cellHeight = 28;
  @observable fontSize = 28;

  //SELECTION
  @observable selected_y = 0;
  @observable selected_x = 0;

  //Change canvas width
  addCol = () => {
    this.canvasWidth = this.canvasWidth + 1;
  }
  deleteCol = () => {
    if(this.canvasWidth > 1){
      this.canvasWidth = this.canvasWidth - 1;
      if(this.selected_x == this.canvasWidth){
        this.selected_x = this.selected_x - 1;
      }
    }
  }
  //Change canvas height
  addRow = () => { 
    this.canvasHeight = this.canvasHeight + 1;
  }
  deleteRow = () => {
    if(this.canvasHeight > 1){
      this.canvasHeight = this.canvasHeight - 1;
      if(this.selected_y == this.canvasHeight){
        this.selected_y = this.selected_y - 1;
      }
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

  handleKeyPress = (event) => {
    if(event.key == 'ArrowRight' && this.selected_x < this.canvasWidth - 1){
      this.selected_x = this.selected_x + 1;
    }
    if(event.key == 'ArrowLeft' && this.selected_x > 0){
      this.selected_x = this.selected_x - 1;
    }
    if(event.key == 'ArrowDown' && this.selected_y < this.canvasHeight - 1){
      this.selected_y = this.selected_y + 1;
    }
    if(event.key == 'ArrowUp' && this.selected_y > 0){
      this.selected_y = this.selected_y - 1;
    }
    if(event.key == 'Enter'){
      canvas[1][1] = 'z'
    }
  }

}

export default new CanvasStore();



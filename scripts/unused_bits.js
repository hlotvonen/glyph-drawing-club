    /*
    
    CanvasStore.js

    let isPrintableKey = event.key.length === 1;
    if(isPrintableKey) {
      this.canvas[this.selected_y][this.selected_x] = event.key;
    }
    
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
      this.canvas[this.selected_y][this.selected_x] = ["M0 0", "0", "0", "0", "0"]
    }

    if(event.key == 'q'){
      //this.canvas[this.selected_y][this.selected_x] = String.fromCodePoint(this.selectedUnicode)
      this.canvas[this.selected_y][this.selected_x] = [this.glyphPath, this.svgWidth, this.svgHeight, this.svgBaseline, this.glyphOffsetX];
      console.log(this.canvas);
    }

    */


    /*

    Grid.js

    <div className="row" key={y}>
      {row.map((character, x) =>
        <Cell character={character} key={x} fontSize={store.fontSize} cellWidth={store.cellWidth} cellHeight={store.cellHeight} highlighted={y === selected_y && x === selected_x} />
      )}
    </div>

    */

    /*

    Cell.js

    <div className={(props.highlighted ? 'selected' : '')} style={{width : props.cellWidth, height : props.cellHeight, fontSize : props.fontSize}} >{props.character}</div>

    */



      @observable glyphFontSizeModifier = 0;
  @observable glyphFontSize = 0;

  // Glyph individual size
  @computed get glyphFontSizeNew() {
    return this.defaultFontSize + this.glyphFontSizeModifier;
  }
  increaseGlyphFontSizeModifier = () => { 
    this.glyphFontSizeModifier = this.glyphFontSizeModifier + 1;
    this.glyphFontSize = this.glyphFontSizeNew;
    this.canvas[this.selected_y][this.selected_x][5] = this.glyphFontSize; //Update canvas
  }
  decreaseGlyphFontSizeModifier = () => {
    if(this.glyphFontSizeModifier > 1){
      this.glyphFontSizeModifier = this.glyphFontSizeModifier - 1;
      this.glyphFontSize = this.glyphFontSizeNew;
      this.canvas[this.selected_y][this.selected_x][5] = this.glyphFontSize; //Update canvas
    }
  }


//AutosaveStore

  import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import localStorage from 'mobx-localstorage';
import canvasstore from './CanvasStore'
import setstore from './KeymappingsStore'


// only for localstorage
const state = observer({
  name: 'localstorage',
  timestamp: Math.floor(Date.now() / 1000),
  canvasWidth: canvasstore.canvasWidth,
  firstRun: true
});

autorun(() => {
  if (!state.firstRun) {
      state.firstRun = false;
      localStorage.setItem("state", state);
      console.log(canvasstore.canvasWidth);
      console.log(localStorage.getItem("state"));
      console.log(state.firstRun)
  }
  localStorage.setItem('firstRun', false);
  console.log(state.firstRun)
  
});


import mobxstore from 'mobx-store'
const testStore = mobxstore({ canvasWidth: [10] })


  @action addToCanvas = () => {
    testStore('canvasWidth').push(1)
    console.log(testStore('canvasWidth').slice())
    //store.undo('canvas')
  }

  @action undoCanvas = () => {
    testStore.undo('canvasWidth')
    console.log(testStore('canvasWidth').slice())
  }
 

let storage;
let firstRun = true;

class CanvasStore {
//Initialize canvas
  constructor() {
    firstRun = false;

    if(firstRun == false) {
      storage = JSON.parse(localStorage.storage)
      this.canvas = storage.canvas
      this.canvasWidth = storage.canvasWidth
      this.canvasHeight = storage.canvasHeight
      this.cellWidth = storage.cellWidth
      this.cellHeight = storage.cellHeight
      this.defaultFontSize = storage.defaultFontSize
      this.canvas = storage.canvas
    } else {
      this.canvas = Array.from({length: this.canvasHeight}, () => Array.from({length: this.canvasWidth}, () => EMPTY_CELL ));
      this.widthPixels = this.canvasWidth * this.cellWidth;
      this.heightPixels = this.canvasHeight * this.cellHeight;
    }
    //set & update localstorage
    autorun(() => {
      const localstorage = {
        name: 'localstorage',
        timestamp: Math.floor(Date.now() / 1000),
        firstRun: firstRun,
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        cellWidth: this.cellWidth,
        cellHeight: this.cellHeight,
        defaultFontSize: this.defaultFontSize,
        canvas: this.canvas
      }
      localStorage.setItem("storage", JSON.stringify(localstorage));
    });
  }




import { action, autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import canvasstore from './CanvasStore'
import setstore from './KeymappingsStore'



class Autostore {
    constructor() {
        autorun(() => {
            this.state = state
            console.log(state.canvasWidth)
            localStorage.setItem("state", JSON.stringify(state));
        });
    }
}
export default new Autostore();

/*
// only for localstorage
const state = observer({
  name: 'localstorage',
  timestamp: Math.floor(Date.now() / 1000),
  canvasWidth: canvasstore.canvasWidth,
  firstRun: true
});

const updateLocalStorage = autorun(() => {
  console.log('updated localStorage')
  localStorage.setItem("state", JSON.stringify(state));
});*/

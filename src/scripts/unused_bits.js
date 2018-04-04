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
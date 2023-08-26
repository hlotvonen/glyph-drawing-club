import { action, autorun, makeObservable, observable, runInAction } from "mobx";
import { nanoid } from "nanoid";
import opentype from 'opentype.js';
import CanvasStore from "./CanvasStore";

class FontStore {

	constructor() {
		makeObservable(this);

    // load default font if none are loaded
    autorun(() => {
      if (!this.hasLoadedFonts) {
        this.loadFontFromUrl('fonts/BruceRogersOrnaments-Regular.otf')
        
      }
    })
	}

  @observable
  selectedGlyph = {
    index: 0,
    fontName: ""
  };

  @observable 
  loadedFonts = [];
  
  get hasLoadedFonts() {
    return this.loadedFonts.length !== 0
  }

  async loadFontFromUrl(path) {
    const buffer = fetch(path).then(res => res.arrayBuffer());
    this.loadFont(buffer);
  }

  async loadFontFromFile(file) {
    const buffer = file.arrayBuffer();
    this.loadFont(buffer);
  }
  /* 
    1. load & parse font using opentype
    2. if font already exists in loadedFonts, then update it
    3. if font doesn't exist in loadedFonts, add it
  */
  async loadFont(buffer) {
    const font = opentype.parse(await buffer);
    const fontObject = {
      name: Object.values(font.names.fullName)[0],
      id: nanoid(),
      size: 20,
      data: font
    }
    this.selectGlyph({
      index: 0,
      fontName: Object.values(font.names.fullName)[0]
    })
    //returns true if font with the same name already exists
    if (this.loadedFonts.some(obj => obj.name === Object.values(font.names.fullName)[0])) {
      const existingFont = this.loadedFonts.find(obj => obj.name === Object.values(font.names.fullName)[0])
      Object.assign(this.loadedFonts.find(obj => obj.name === Object.values(font.names.fullName)[0]), fontObject);
      console.log('Loaded & updated font: ' + Object.values(font.names.fullName)[0] + " " + Object.values(font.names.version)[0])
    } else {
      this.loadedFonts.push(fontObject);
      console.log('Loaded & added font: ' + Object.values(font.names.fullName)[0] + " " + Object.values(font.names.version)[0])
    }
  }

  @action
  removeFont(name) {
    this.loadedFonts.splice(this.loadedFonts.findIndex(obj => obj.name === name) , 1)
  }
  
  @action
  selectGlyph = async (glyphLocation) => {
    this.selectedGlyph = await glyphLocation;
    const font = this.loadedFonts.find(obj => obj.name === glyphLocation.fontName)
    const glyph = font.data.glyphs.glyphs[glyphLocation.index]
    runInAction(()=>{
      CanvasStore.glyphPath = glyph.path.toPathData(8);
      CanvasStore.svgWidth = glyph.advanceWidth;
      CanvasStore.svgHeight = font.data.ascender + font.data.descender;
      CanvasStore.svgBaseline = font.data.descender;
    })
  }

  @action
  nextGlyph() {
    const currentFont = this.loadedFonts.find(obj => obj.name === this.selectedGlyph.fontName)
    if(this.selectedGlyph.index >= currentFont.data.nGlyphs - 1) return
    const nextGlyphIndex = +this.selectedGlyph.index + 1;
    this.selectGlyph({
      index: nextGlyphIndex,
      fontName: this.selectedGlyph.fontName
    })
  }
  
  @action
  prevGlyph() {
    if(this.selectedGlyph.index <= 0) return;
    const prevGlyphIndex = +this.selectedGlyph.index - 1;
    this.selectGlyph({
      index: prevGlyphIndex,
      fontName: this.selectedGlyph.fontName
    })
  }
}
export default new FontStore()
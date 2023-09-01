
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
        this.loadFontFromUrl('fonts/Tesserae-4x4Extended.otf')
      }
    })
  }

  @observable selectedGlyph = { index: 0, fontName: "" };
  @observable loadedFonts = [];

  get hasLoadedFonts() {
    return this.loadedFonts.length !== 0
  }
  getGlyphCount = (fontName) => {
    const font = this.loadedFonts.find(({ name }) => name === fontName);
    return font ? font.data.glyphs.length : 0;
  }

  async loadFontFromUrl(path) {
    const buffer = fetch(path).then(res => res.arrayBuffer());
    this.loadFont(buffer);
  }

  async loadFontFromFile(file) {
    const buffer = file.arrayBuffer();
    this.loadFont(buffer);
  }

  @action loadFont = async (buffer) => {
    try {
      const fontBuffer = await buffer;
      const font = opentype.parse(fontBuffer);
      const fontName = Object.values(font.names.fullName)[0];
  
      const fontObject = {
        name: fontName,
        id: nanoid(),
        size: 20,
        data: font
      }
  
      this.selectGlyph({ index: 0, fontName });
  
      const fontIndex = this.loadedFonts.findIndex(({ name }) => name === fontName);
  
      if (fontIndex !== -1) {
        this.loadedFonts[fontIndex] = { ...this.loadedFonts[fontIndex], ...fontObject };
      } else {
        this.loadedFonts.push(fontObject);
      }
    } catch (error) {
      console.error('Error loading font:', error);
    }
  }

  @action removeFont(name) {
    if (window.confirm(`Are you sure you want to remove the font ${name}?`)) {
      const fontIndex = this.loadedFonts.findIndex(({ name: fontName }) => fontName === name);
      this.loadedFonts.splice(fontIndex, 1);
    }
  }

  @action selectGlyph = async (glyphLocation) => {
    this.selectedGlyph = glyphLocation;
    const font = this.loadedFonts.find(({ name }) => name === glyphLocation.fontName);

    // Check if font exists
    if (!font) {
      console.error(`Font with name ${glyphLocation.fontName} not found or it's still loading`);
      return;
    }

    const glyph = font.data.glyphs.glyphs[glyphLocation.index];

    runInAction(() => {
      const { ascender, descender } = font.data;
      CanvasStore.glyphPath = glyph.path.toPathData(8);
      CanvasStore.svgWidth = glyph.advanceWidth;
      CanvasStore.svgHeight = ascender + Math.abs(descender);
      CanvasStore.svgBaseline = descender;
    })
  }

  @action nextGlyph() {
    const currentFont = this.loadedFonts.find(({ name }) => name === this.selectedGlyph.fontName);
    if (this.selectedGlyph.index >= currentFont.data.nGlyphs - 1) return;

    const nextGlyphIndex = this.selectedGlyph.index + 1;
    this.selectGlyph({ index: nextGlyphIndex, fontName: this.selectedGlyph.fontName });
  }

  @action prevGlyph() {
    if (this.selectedGlyph.index <= 0) return;

    const prevGlyphIndex = this.selectedGlyph.index - 1;
    this.selectGlyph({ index: prevGlyphIndex, fontName: this.selectedGlyph.fontName });
  }
}

export default new FontStore();

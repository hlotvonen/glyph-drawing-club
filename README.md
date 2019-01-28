Glyph Drawing Club
=====================

[GlyphDrawing.club](http://www.glyphdrawing.club/) is a new and versatile online text art and modular design editor. It's inspired by the limitations and possibilities of old school ASCII art editors, but brought to modern times; the editor is based on an adjustable grid into which typographic symbols can be inserted from any font. It's best suitable for creating modular type design, illustrations, ASCII art, concrete poetry and more.

Check "Help" tab on the site for keyboard shortcuts and usage.

###Font Licences

Check detailed licencing info for fonts from the [wiki](https://github.com/hlotvonen/glyph-drawing-club/wiki/Fonts)

### Run locally

```
git clone git://github.com/hlotvonen/glyph-drawing-club/
npm install
npm start
```

### To-do

- [ ] Layers or a feature to overlap characters
- [ ] Color tool (Edit background and foreground colors separately, save and load color palettes, fast risograph workflow, color editing and coloring tools)
- [ ] UI improvements (more condensed sidebar, unify button styles and icons across browsers etc.)
- [ ] Save & load keymappings
- [ ] Highlight all cells with a glyph in it
- [ ] Tooltips
- [ ] Figure out a better shortcut for typing mode

#### To-do in the future (maybe)

- [ ] Make a video tutorial
- [ ] Fill area with random glyphs
- [ ] Insert glyph with incremental modifiers (size, rotate, flip, etc)
- [ ] Mobile version?
- [ ] Gallery, where users can upload their creations
- [ ] Frames with onion skin (to make animation)
- [ ] Top-down & right-to-left writing modes
- [ ] Add faster working mode for working with Taiwanese ANSI (Mainly create keyboard shortcuts for offsetting)


#### Bugs

- [ ] Chrome & Windows when trying to drag and drop a font gives Uncaught TypeError: Failed to execute 'readAsArrayBuffer' on 'FileReader': parameter 1 is not of type 'Blob'. at HTMLBodyElement.GlyphSelect.\_this.onDrop

### About
GlyphDrawing.club has been designed and developed by [@hlotvonen](http://heikkilotvonen.fi) and [@i-tu](https://github.com/i-tu) using React and MobX. For help, ideas, contributions, etc. open an issue or send an email to [hlotvonen@gmail.com](mailto:hlotvonen@gmail.com).

#### Notes
* This project uses Typr.js, a javascript font processor: https://github.com/photopea/Typr.js

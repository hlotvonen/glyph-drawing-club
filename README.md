Glyph Drawing Club
=====================

[GlyphDrawing.club](http://www.glyphdrawing.club/) is a new and versatile online text art and modular design editor. It's inspired by the limitations and possibilities of old school ASCII art editors, but brought to modern times; the editor is based on an adjustable grid into which typographic symbols can be inserted from any font. It's best suitable for creating modular type design, illustrations, ASCII art, concrete poetry and more.

### Basic usage

1. Click on any glyph under the `Glyph selection` on the sidebar.
2. Press <kbd>q</kbd> to insert selected glyph on to the canvas.
3. Move around the canvas by pressing <kbd>arrow keys</kbd>.
4. Press <kbd>f</kbd> to flip, <kbd>r</kbd> to rotate or <kbd>i</kbd> to invert the colors of the glyph.
5. Check out the keyboard shortcuts below and play around with the settings panel. Have fun!
6. If you export as PNG, remember to hide the grid by pressing <kbd>h</kbd>

## Keyboard shortcuts

#### Basics
* <kbd>Arrow keys</kbd> or <kbd>Left mouse click</kbd> : Move around the canvas
* <kbd>Alt</kbd>+<kbd>Arrow keys</kbd>: Quickly move around the canvas
* <kbd>q</kbd> : Insert selected glyph on to the canvas
* <kbd>Spacebar</kbd> or <kbd>Backspace</kbd>: Delete
* <kbd>r</kbd> : Rotate glyph
* <kbd>f</kbd> : Flip glyph
* <kbd>i</kbd> : Invert glyph color
* <kbd>Number keys 1–10</kbd> : Insert glyph from set
* <kbd>Enter</kbd> : Line break
* <kbd>Cmd/Ctrl</kbd>+<kbd>z</kbd>: Undo
* <kbd>Cmd/Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>z</kbd>: Redo

#### View options
* <kbd>h</kbd> : Hide Grid
* <kbd>p</kbd> : Change to black background
* <kbd>c</kbd> : Clip cells

#### Typing mode

* <kbd>t</kbd> : Start typing mode
* <kbd>ESC</kbd> : End typing mode

#### Paint mode

* <kbd>b</kbd> : Start/end paint mode
* <kbd>LMB</kbd> : Hold left mouse button to paint with selected glyph
* <kbd>Alt</kbd> + <kbd>LMB</kbd> : Erase
* Note: all other shortcuts work in this mode also! For example, you can do <kbd>r</kbd> to rotate while in paint mode.

#### Area selection

* <kbd>Shift + s</kbd> : Start selection area. Press <kbd>arrows keys</kbd> to change selection size. Press <kbd>Shift + s</kbd> again to make selection area
* <kbd>x</kbd> or <kbd>Shift + x</kbd> : Deselect area
* <kbd>Shift + a</kbd> : Select all
* <kbd>Shift + c</kbd> : Paste selected area
* <kbd>Shift + m</kbd> : Mirror selected area
* <kbd>Shift + f</kbd> : Flip selected area
* <kbd>Shift + q</kbd> : Fill selected area with selected glyph
* <kbd>Shift + e</kbd> : Empty selected area
* <kbd>Shift + i</kbd> : Invert the colors of selected area
* <kbd>Shift + o</kbd> : Rotate glyphs individually in selected area
* <kbd>Shift + p</kbd> : Flip glyphs individually in selected area
* <kbd>Shift + r</kbd> : Rotate selected area. Selection area has to be square (same amount of cells width & height)
* <kbd>Shift + t</kbd> : Transpose selected area. Selection area has to be square (same amount of cells width & height)
* <kbd>Shift + h</kbd> : Move selected area left
* <kbd>Shift + j</kbd> : Move selected area down
* <kbd>Shift + k</kbd> : Move selected area up
* <kbd>Shift + l</kbd> : Move selected area right

#### Make glyph sets

* <kbd>m</kbd> : Start mapping glyph sets. This disables all other shortcuts. Press again to end mapping.
* <kbd>Number keys 1–10</kbd> : Add selected glyph to set

#### Additional tips

* You can drag & drop any font you have on your computer (.otf/.ttf) to use that font!
* You can refresh (or close and come back) the webpage without losing your work.

### Examples

* Follow [@heikkiveikko](https://www.instagram.com/heikkiveikko/) on Instagram for examples.


Fonts
------

#### Tesserae Regular
###### created by Heikki Lotvonen

One of the default font options for the Glyph Drawing.Club is a modular 4×4 font Tesserae Regular made specifically for the editor. The font contains a set of geomertical shapes that neatly connect to each other when placed on the editor’s grid. Most of the design samples in this user guide have been done using this font.

The initial inspiration for creating Tesserae Regular was to make a modernised PETSCII font, but with smooth, vectorised curves. However, the font quickly grew to a large collection of carefully crafted shapes that surpass those in any other modular design tool (like FontStruct).

Tesserae Regular has hundreds of unique shapes. Inverting the colors and flipping or rotating the shapes creates thousand of different variations, allowing endless possibilities for creating modular designs, be it type design, illustration or anything else.

The font is based on a 4×4 grid. Each anchor point connects to one of the intersections of the grid. This allows for consistent continuation of the shapes when placed next to each other. The font is made of primitive geometric shapes and shapes where the direction point is ¾th of the way to the next anchor point, creating a more interesting asymmetrical shape.

The font is licenced with the *SIL Open Font License, Version 1.1*.

#### Ray Manta C64
###### created by Tim Koch

Ray Manta C64 font is a combination of four different C64 character sets recreated and merged into one OpenType Font:
* three custom made C64 character sets (Circlex, Jellextend and Squaresounds) designed by [**Tim Koch (Ray Manta / Datadoor)**](http://datadoor.net/)
* the regular C64 PETSCII character set 

Copyright (c) 2018, Tim Koch (http://datadoor.net/). This Font Software is licensed under the SIL Open Font License, Version 1.1.

#### Unscii-16 
###### created by Viznut

"Unscii is a set of bitmapped Unicode fonts based on classic system fonts. Unscii attempts to support character cell art well while also being suitable for terminal and programming use." (read more at [http://pelulamu.net/unscii/](http://pelulamu.net/unscii/))

Public Domain.

#### MingLiU 
###### by Microsoft Corporation

MingLiu font is a Traditional Chinese font in a mincho (serif) stroke style. It's used on Taiwanese PTT Bulletin Board Systems to make Taiwanese ANSI art. Read more: 
* https://www.ptt.cc/man/asciiart/index.html
* https://ansi.loli.tw/

#### Submona
###### created by [Brian Gomes Bascoy](http://peramid.es/)

"The submona web font project attempts to create a lightweight subset (52 KB) of monafont that can render common Shift_JIS text art in an acceptable manner, by removing the embedded bitmap strikes (a.k.a. pixel fonts) and many glyphs from some Unicode ranges." (read more at [https://github.com/pera/submona-web-font](https://github.com/pera/submona-web-font))

Public domain

Developement
------

### Run locally

```
npm install
npm start
```

### To-do

- [ ] Tabbed sidebar
- [ ] Layers or a feature to overlap characters
- [ ] Color tool (Edit background and foreground colors separately, save and load color palettes, fast risograph workflow, color editing and coloring tools)
- [ ] Add faster working mode for working with Taiwanese ANSI (Mainly create keyboard shortcuts for offsetting)
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

#### Bugs

- [ ] Chrome & Windows when trying to drag and drop a font gives Uncaught TypeError: Failed to execute 'readAsArrayBuffer' on 'FileReader': parameter 1 is not of type 'Blob'. at HTMLBodyElement.GlyphSelect.\_this.onDrop
- [ ] Safari export png doesn't work... sometimes? maybe? it's sometimes veeeery slow

### About
GlyphDrawing.club has been designed and developed by [@hlotvonen](http://heikkilotvonen.fi) and [@i-tu](https://github.com/i-tu) using React and MobX. For help, ideas, contributions, etc. open an issue or send an email to [hlotvonen@gmail.com](mailto:hlotvonen@gmail.com).

#### Notes
* This project uses Typr.js, a javascript font processor: https://github.com/photopea/Typr.js

Glyph Drawing Club
=====================

[GlyphDrawing.club](http://www.glyphdrawing.club/) is a contemporary text art editor that supports any font and glyph. It can be used for making custom modular typography, illustrations, concrete poetry and ASCII art and much more.  

### Basic usage

1. Click on any glyph under the `Glyph selection` on the sidebar.
2. Press <kbd>q</kbd> to insert selected glyph on to the canvas.
3. Move around the canvas by pressing `arrow keys`.
4. Press <kbd>f</kbd> to flip, <kbd>r</kbd> to rotate or <kbd>i</kbd> to invert the colors of the glyph.
5. Check out the keyboard shortcuts below and play around with the settings panel. Have fun!
6. Before exporting, remember to hide the grid by pressing <kbd>h</kbd>

## Keyboard shortcuts

* `Arrow keys`: Move around the canvas
* <kbd>q</kbd> : Insert selected glyph on to the canvas
* <kbd>Spacebar</kbd> : Delete
* <kbd>r</kbd> : Rotate glyph
* <kbd>f</kbd> : Flip glyph
* <kbd>i</kbd> : Invert glyph color
* <kbd>h</kbd> : Hide Grid
* <kbd>p</kbd> : Invert colors of the whole canvas
* `Number keys 1–10` : Insert glyph from set

#### Typing mode

* `t` : Start typing mode
* `ESC` : End typing mode
* `§` : Insert selected glyph on to the canvas (same as `q`, but only for typing mode)
* `Arrow keys` : Move around the canvas 
* `Enter` : Line break 
* `Backspace` : delete

#### Make area selection

* `Shift + s` : Start selection area. Press `arrows keys` to change selection size. Press `Shift + s` again to make selection area
* `x` : Deselect area
* `Shift + c` : Paste selected area
* `Shift + m` : Mirror selected area
* `Shift + f` : Flip selected area
* `Shift + q` : Fill selected area with selected glyph
* `Shift + e` : Empty selected area
* `Shift + i` : Invert the colors of selected area

#### Make glyph sets

* `m` : Start mapping glyph sets. This disables all other shortcuts. Press again to end mapping.
* `Number keys 1–10` : Add selected glyph to set

#### Additional tips

* You can drag & drop any font you have on your computer (.otf/.ttf) to use that font!
* There is no Undo / Redo. We don't make mistakes, just happy little accidents! (or just save often)
* You can refresh (or close and come back) the webpage without losing your work.
* Share your work! I would love to see what you make. You can send artwork to [hlotvonen@gmail.com](mailto:hlotvonen@gmail.com)

### Examples

* Find some examples [here](examples). You can download the .unscii files and open them with the editor.
* Follow [@heikkiveikko](https://www.instagram.com/heikkiveikko/) on Instagram for more.

### Fonts

#### Tesserae Regular
###### created by Heikki Lotvonen

One of the default font options for the Glyph Drawing.Club is a modular 4×4 font Tesserae Regular made specifically for the editor. The font contains a set of geomertical shapes that neatly connect to each other when placed on the editor’s grid. Most of the design samples in this user guide have been done using this font.

The initial inspiration for creating Tesserae Regular was to make a modernised PETSCII font, but with smooth, vectorised curves. However, the font quickly grew to a large collection of carefully crafted shapes that surpass those in any other modular design tool (like FontStruct).

The current version of Tesserae Regular has 382 unique shapes. Inverting the colors and flipping or rotating the shapes creates thousand of different variations, allowing endless possibilities for creating modular designs, be it type design, illustration or anything else.

The font is based on a 4×4 grid. Each anchor point connects to one of the intersections of the grid. This allows for consistent continuation of the shapes when placed next to each other. The font is made of primitive geometric shapes and shapes where the direction point is ¾th of the way to the next anchor point, creating a more interesting asymmetrical shape.

The font is licenced with the *SIL Open Font License*. You can download it from [here](fonts).

#### Ray Manta C64
###### created by Tim Koch

Ray Manta C64 font is a combination of four different C64 character sets recreated and merged into one OpenType Font:
* three custom made C64 character sets (Circlex, Jellextend and Squaresounds) designed by [**Tim Koch (Ray Manta / Datadoor)**](http://datadoor.net/)
* the regular C64 PETSCII character set 

Copyright (c) 2018, Tim Koch (http://datadoor.net/), with Reserved Font Name “Ray Manta C64”. This Font Software is licensed under the SIL Open Font License, Version 1.1.

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


### Run locally

```
npm install
npm start
```

### To-do

- [ ] Color tool
- [ ] Make a video tutorial
- [x] Add masking (like Taiwanese ANSI)
- [ ] Add faster working mode for working with Taiwanese ANSI
- [ ] UI improvements
- [x] Fix performance issues when the canvas is large.
- [x] For some reason, photoshop gives an error when opening the exported `.jpg` file. Workaround is to open the image in any other software (like Preview on Mac), export it again, and it should open normally now.
- [ ] Glyph offset x & y needs a rework
- [x] "Reset to default" button offset y is sometimes incorrect

#### To-do in the future (maybe)

- [ ] Tooltips
- [ ] Export as vector data
- [x] Typing mode
- [ ] Undo/redo functionality
- [ ] Feature to overlap characters
- [ ] Gallery, where users can upload their creations
- [ ] Frames (to make animation)
- [ ] Real textmode with UTF

### About
GlyphDrawing.club has been designed and developed by [@hlotvonen](http://heikkilotvonen.fi) and [@i-tu](https://github.com/i-tu) using React and MobX. For help, ideas, contributions, etc. open an issue or send an email to [hlotvonen@gmail.com](mailto:hlotvonen@gmail.com).

#### Notes
* This projects uses Typr.js, a javascript font processor: https://github.com/photopea/Typr.js

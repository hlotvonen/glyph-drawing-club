Glyph Drawing Club
=====================

[GlyphDrawing.club](http://www.glyphdrawing.club/) is a contemporary textmode graphics editor that supports any font and glyph. It can be used for making custom modular typography, illustrations, concrete poetry and ASCII art.  

### Basic usage

1. Click on any glyph under the `Glyph selection`
2. Press `q` to insert selected glyph on to the canvas.
3. Move around the canvas by pressing `arrow keys`.
4. Press `f` to flip or `r` to rotate a glyph.
5. Have fun!
6. Before exporting, remember to hide the grid by pressing `h`

#### Additional tips

* You can drag & drop any font you have on your computer (.otf/.ttf) to use that font!
* There is no Undo / Redo. We don't make mistakes, just happy little accidents. Save your work often if you are afraid :-)
* You can refresh (or close and come back) the webpage without losing your work.
* For some reason, photoshop gives an error when opening the exported `.jpg` file. Open the image in any other software (like Preview on Mac) export it again, and it should work.
* Share your work! I would love to see what you make. You can send artwork to [hlotvonen@gmail.com](mailto:hlotvonen@gmail.com)

## Keyboard shortcuts

`Arrow keys`: Move around the canvas
`q` : Insert selected glyph
`Spacebar` : Delete
`r` : Rotate glyph
`f` : Flip glyph
`i` : Invert colors
`h` : Hide Grid
`p` : Invert all colors
`Number keys 1–10` : Insert glyph from set

#### Make area selection

`Shift + s` : Start selection area. Press `arrows keys` to change selection size. Press `Shift + s` again to make selection area
`x` : Deselect area
`Shift + c` : Copy selected area
`Shift + m` : Mirror selected area
`Shift + f` : Flip selected area
`Shift + q` : Fill selected area with selected glyph
`Shift + e` : Empty selected area

#### Make glyph sets

`m` : Start mapping glyph sets. This disables all other shortcuts. Press again to end mapping
`Number keys 1–10` : Add selected glyph to set

### Examples

Follow [@heikkiveikko](https://www.instagram.com/heikkiveikko/) on Instagram or find some examples [here]()

### Run locally

```
npm install
npm start
```

### To-do

- [] Make a longer tutorial
- [] UI improvements
- [] Exported JPG won't open in Photoshop.
- [] Glyph offset x & y are a bit unintuitive
- [] "Reset to default" button offset y is sometimes incorrect

#### To-do in the future (maybe)

* Tooltips
* Export as vector data
* Typing mode
* Undo/redo functionality
* Color tool
* Gallery, where users can upload their creations
* Frames (to make animation)
* Real textmode with UTF

### About
GlyphDrawing.club has been designed and developed by @hlotvonen and @i-tu using React and MobX. For help, ideas, contributions, etc. open an issue or send an email to [hlotvonen@gmail.com](mailto:hlotvonen@gmail.com).
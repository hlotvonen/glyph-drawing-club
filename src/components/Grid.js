import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore';
import Cell from './Cell';
import SelectionHighlight from './SelectionHighlight'
import Numbers from './Numbers'
import Cursor from './Cursor'
import gridStore from '../models/GridStore'

@observer class Grid extends Component {

  render() {
    const pixelRendering = store.pixelRendering ? 'pixelRendering' : '';

    const grid = []
    for (let y = 0; y < store.canvasHeight; y++) {
      const row = []
      for (let x = 0; x < store.canvasWidth; x++) {
        const [glyphPath, svgWidth, svgHeight, svgBaseline, glyphOffsetX, glyphFontSizeModifier, rotationAmount, flipGlyph, glyphInvertedColor]
         = store.canvas[y][x]

        row.push(<Cell key={`${y}_${x}`} y={y} x={x} />)
      }
      grid.push(
        <div className="row" key={y} style={{width: Number(store.canvasWidth) * Number(store.cellWidth) + 'px', height: Number(store.cellHeight) + 'px'}}>
          {row}
        </div>
      )
    }

    return (
      <div id="canvas" className={`grid ${pixelRendering}`} style={{
        transform: `translate(${
            gridStore.settings.posX
          }px, ${
            gridStore.settings.posY
          }px) scale(${
            gridStore.settings.zoom
          })`
      }}>

        <Numbers />
        <Cursor />
        {grid}
        <SelectionHighlight />
      </div>
    );
  }
}
export default Grid;
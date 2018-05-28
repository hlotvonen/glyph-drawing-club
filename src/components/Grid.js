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
    const canvas = store.canvas
    const pixelRendering = store.pixelRendering ? 'pixelRendering' : '';

    const grid = canvas.map((row, y) =>
      <div className="row" key={y} style={{width: Number(store.canvasWidth) * Number(store.cellWidth) + 'px', height: Number(store.cellHeight) + 'px'}}>
        {row.map(([glyphPath, svgWidth, svgHeight, svgBaseline, glyphOffsetX, glyphFontSizeModifier, rotationAmount, flipGlyph, glyphInvertedColor], x) =>
          <Cell 
            glyphPath={glyphPath} 
            key={x} 
            defaultFontSize={store.defaultFontSize} 
            glyphFontSizeModifier={glyphFontSizeModifier} 
            svgWidth={svgWidth} 
            svgHeight={svgHeight} 
            svgBaseline={svgBaseline} 
            glyphOffsetX={glyphOffsetX} 
            cellWidth={store.cellWidth} 
            cellHeight={store.cellHeight}
            rotationAmount={rotationAmount}
            flipGlyph={flipGlyph}
            glyphInvertedColor={glyphInvertedColor}
            clipCells={store.clipCells}
          />
        )}
      </div>
    );

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
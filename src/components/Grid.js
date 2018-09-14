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
		const grid = canvas.map((row, y) =>
      <div className="row" key={y} style={{width: Number(store.canvasWidth) * Number(store.cellWidth) + 'px', height: Number(store.cellHeight) + 'px'}}>
        {row.map((col, x) =>
					<Cell key={`${y}_${x}`} y={y} x={x} clickSelection={store.clickSelection}/>
        )}
      </div>
    );

		const pixelRendering = store.pixelRendering ? 'pixelRendering' : '';

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
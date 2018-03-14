import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore';
import Cell from './Cell';


@observer class Grid extends Component {

  render() {
    const canvas = store.canvas
    const selected_y = store.selected_y;
    const selected_x = store.selected_x;

    const grid = canvas.map((row, y) =>
      <div className="row" key={y}>
        {row.map((character, x) =>
          <Cell key={x} character={character} fontSize={store.fontSize} cellWidth={store.cellWidth} cellHeight={store.cellHeight} highlighted={y === selected_y && x === selected_x} />
        )}
      </div>
    );

    return (
      <div className="grid">
        {grid}
      </div>
    );
  }
}
export default Grid;
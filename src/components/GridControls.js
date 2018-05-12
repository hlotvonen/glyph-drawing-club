import React from 'react';
import gridstore from '../models/GridStore.js';

class GridControls extends React.Component {

	render() {
		return(
			<div className="grid_controls">

				<div className="zoom">
					<button onClick={gridstore.zoomIn}>{'+'}</button> 
					<button onClick={gridstore.zoomOut}>{'-'}</button>
				</div>
				<div className="move_y">
					<button onClick={gridstore.moveUp}>{'\u2191'}</button>
				</div>
				<div className="move_x">
					<button onClick={gridstore.moveLeft}>{'\u2190'}</button>
					<button onClick={gridstore.center}>{'\u20DD'}</button>
					<button onClick={gridstore.moveRight}>{'\u2192'}</button>
				</div>
				<div className="move_y">
					<button onClick={gridstore.moveDown}>{'\u2193'}</button>
				</div>


			</div>
		);
	}
}
export default GridControls;

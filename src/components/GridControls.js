import React from 'react';
import gridstore from '../models/GridStore.js';

class GridControls extends React.Component {

	render() {
		return(
			<div className="grid_controls">

				<div className="zoom">
					<button onClick={gridstore.zoomIn}>{'\u254B'}</button> 
					<button onClick={gridstore.zoomOut}>{'\u2501'}</button>
				</div>
				<div className="move_y">
					<button onClick={gridstore.moveUp}>{'\u25B2'}</button>
				</div>
				<div className="move_x">
					<button onClick={gridstore.moveLeft}>{'\u25C0'}</button>
					<button onClick={gridstore.center}>{'\u25C9'}</button>
					<button onClick={gridstore.moveRight}>{'\u25B6'}</button>
				</div>
				<div className="move_y">
					<button onClick={gridstore.moveDown}>{'\u25BC'}</button>
				</div>


			</div>
		);
	}
}
export default GridControls;

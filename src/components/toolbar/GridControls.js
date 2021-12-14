import React from "react"
import gridstore from "../../models/GridStore.js"

class GridControls extends React.Component {
	render() {
		return (
			<div className="grid grid-cols-3 absolute bottom-1 right-1">
				<button onClick={gridstore.zoomIn}>{"+"}</button>
				<button onClick={gridstore.moveUp}>{"\u25B2"}</button>
				<button onClick={gridstore.zoomOut}>{"\u2501"}</button>
				<button onClick={gridstore.moveLeft}>{"\u25C0"}</button>
				<button onClick={gridstore.center}>{"\u25C9"}</button>
				<button onClick={gridstore.moveRight}>{"\u25B6"}</button>
				<button className="col-start-2" onClick={gridstore.moveDown}>{"\u25BC"}</button>
			</div>
		)
	}
}
export default GridControls

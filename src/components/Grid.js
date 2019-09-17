import React, { Component } from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore"
import Cell from "./Cell"
import CellBg from "./CellBg"
import UiLayer from "./UiLayer"
import { CanvasMouseEvents } from "./CanvasMouseEvents"
import gridStore from "../models/GridStore"

@observer
class Grid extends Component {

	render() {
		const canvas = store.canvas
		
		const gridBg = canvas.map((row, y) => (
			<React.Fragment key={`row_${y}`}>
				{row.map((col, x) => (
					<CellBg
						y={y}
						x={x}
						key={`${y}_${x}`}
						cell={store.canvas[y][x][4]}
					/>
				))}
			</React.Fragment>
		))

		const gridFg = canvas.map((row, y) => (
			<React.Fragment key={`row_${y}`}>
				{row.map((col, x) => (
					<Cell
						y={y}
						x={x}
						cell={store.canvas[y][x]}
						key={`${y}_${x}`}
					/>
				))}
			</React.Fragment>
		))

		return (
			<div
				id="canvas"
				className="grid"
				style={{
					transform: `translate(${gridStore.settings.posX}px, ${
						gridStore.settings.posY
					}px) scale(${gridStore.settings.zoom})`,
					width: Number(store.canvasWidth) * Number(store.cellWidth) + "px",
					height:  Number(store.canvasHeight) * Number(store.cellHeight) + "px",
				}}
			>	
				<div className="gridBg">
					{gridBg}
				</div>
				<div className="gridFg">
					{gridFg}
				</div>

				<UiLayer />

				<CanvasMouseEvents />

			</div>
		)
	}
}
export default Grid

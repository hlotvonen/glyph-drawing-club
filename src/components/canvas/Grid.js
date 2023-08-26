import { observer } from "mobx-react"
import React, { Component } from "react"
import store from "../../models/CanvasStore"
import gridStore from "../../models/GridStore"
import CanvasMouseEvents from "./CanvasMouseEvents"
import Cell from "./Cell"
import CellBg from "./CellBg"
import { ReferenceImage } from "./ReferenceImage"
import UiLayer from "./ui/UiLayer"

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
						cell={canvas[y][x][4]}
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
						cell={canvas[y][x]}
						key={`${y}_${x}`}
					/>
				))}
			</React.Fragment>
		))

		return (
			<div
				className="canvas"
				style={{
					transform: `translate(${gridStore.settings.posX}px, ${
						gridStore.settings.posY
					}px) scale(${gridStore.settings.zoom})`,
					width: Number(store.canvasWidth) * Number(store.cellWidth) + "px",
					height:  Number(store.canvasHeight) * Number(store.cellHeight) + "px",
				}}
			>	
				<ReferenceImage />
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

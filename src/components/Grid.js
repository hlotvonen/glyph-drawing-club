import React, { Component } from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore"
import Cell from "./Cell"
import CellBg from "./CellBg"
import UiLayer from "./UiLayer"
import gridStore from "../models/GridStore"

@observer
class Grid extends Component {
	render() {
		const canvas = store.canvas
		
		const gridBg = canvas.map((row, y) => (
			<div
				className="row"
				key={y}
				style={{
					width: Number(store.canvasWidth) * Number(store.cellWidth) + "px",
					height: Number(store.cellHeight) + "px",
				}}
			>
				{row.map((col, x) => (
					<CellBg
						y={y}
						x={x}
						key={`${y}_${x}`}
						cell={store.canvas[y][x][4]}
					/>
				))}
			</div>
		))

		const grid = canvas.map((row, y) => (
			<div
				className="row"
				key={y}
				style={{
					width: Number(store.canvasWidth) * Number(store.cellWidth) + "px",
					height: Number(store.cellHeight) + "px",
				}}
			>
				{row.map((col, x) => (
					<div
						style={{ 
							width: store.cellWidth, 
							height: store.cellHeight,
						}}
						onClick={store.clickSelection}
						onMouseUp={store.handleMouseUp}
						onMouseDown={store.handleMouseDown}
						onMouseOver={store.handleMouseOver}
						data-y={y}
						data-x={x}
						key={`${y}_${x}`}
					>
						<Cell
							y={y}
							x={x}
							cell={store.canvas[y][x]}
						/>
					</div>
				))}
			</div>
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
					{grid}
				</div>

				<UiLayer />
			</div>
		)
	}
}
export default Grid

import React, { Component } from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore"
import Cell from "./Cell"
import UiLayer from "./UiLayer"
import gridStore from "../models/GridStore"

@observer
class Grid extends Component {
	render() {
		const canvas = store.canvas
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
					<Cell
						key={`${y}_${x}`}
						y={y}
						x={x}
						cell={store.canvas[y][x]}
						clickSelection={store.clickSelection}
						handleMouseOver={store.handleMouseOver}
						handleMouseDown={store.handleMouseDown}
						handleMouseUp={store.handleMouseUp}
					/>
				))}
			</div>
		))

		return (
			<div
				id="canvas"
				className={`grid`}
				style={{
					transform: `translate(${gridStore.settings.posX}px, ${
						gridStore.settings.posY
					}px) scale(${gridStore.settings.zoom})`,
				}}
			>
				{grid}
				<UiLayer />
			</div>
		)
	}
}
export default Grid

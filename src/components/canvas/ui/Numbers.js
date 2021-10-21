import React, { Component } from "react"
import { observer } from "mobx-react"
import store from "../../../models/CanvasStore"

class Numbers extends Component {
	render() {
		const selected_y = store.selected_y
		const selected_x = store.selected_x

		const colNums = []
		for (let i = 0; i < store.canvasWidth; i++) {
			colNums.push(
				<div
					key={i}
					className={"absolute -top-4 flex justify-center " + (selected_x === i ? "text-white-light" : "")}
					style={{
						width: store.cellWidth,
						left: i * store.cellWidth
					}}
				>
					{i + 1}
				</div>
			)
		}

		const rowNums = []
		for (let i = 0; i < store.canvasHeight; i++) {
			rowNums.push(
				<div
					key={i}
					className={"absolute -left-6 flex items-center " + (selected_y === i ? "text-white-light" : "")}
					style={{
						height: store.cellHeight,
						top: i * store.cellHeight,
					}}
				>
					{i + 1}
				</div>
			)
		}

		return (
			<div className="text-pink text-xs pointer-events-none">
				{colNums}
				{rowNums}
			</div>
		)
	}
}
export default observer(Numbers)

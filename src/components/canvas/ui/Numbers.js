import { observer } from "mobx-react"
import { Component } from "react"
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
					className={"grid-numbers grid-numbers-top " + (selected_x === i ? "grid-numbers-highlight" : "")}
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
					className={"grid-numbers grid-numbers-side " + (selected_y === i ? "grid-numbers-highlight" : "")}
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
			<>
				{colNums}
				{rowNums}
			</>
		)
	}
}
export default observer(Numbers)

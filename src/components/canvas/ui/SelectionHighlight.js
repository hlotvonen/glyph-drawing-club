import React from "react"
import store from "../../../models/CanvasStore"
import { getBoundingRectangle } from "../../../utils/geometry"
import { observer } from "mobx-react"

const SelectionHighlight = props => {
	if (store.selectionArea.start === null) {
		return null
	}
	const [[start_y, start_x], [end_y, end_x]] = getBoundingRectangle(
		store.selectionArea.start,
		store.selectionArea.end || [store.selected_y, store.selected_x]
	)

	let posTopX = start_x * store.cellWidth
	let posTopY = start_y * store.cellHeight
	let width = store.cellWidth * (end_x - start_x + 1)
	let height = store.cellHeight * (end_y - start_y + 1)

	return (
		<div
			className={(height === width ? "isSquare " : "") + "selectionHighlight"}
			style={{
				width,
				height,
				top: posTopY,
				left: posTopX,
			}}
		/>
	)
}

export default observer(SelectionHighlight)

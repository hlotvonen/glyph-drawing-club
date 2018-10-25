import React, { Component } from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore"

@observer
class Numbers extends Component {
	render() {
		return (
			<div
				className="cursor"
				style={{
					width: store.cellWidth,
					height: store.cellHeight,
					transform: `translate(${store.selected_x * store.cellWidth}px, ${store.selected_y * store.cellHeight}px)`
					//top: store.selected_y * store.cellHeight,
					//left: store.selected_x * store.cellWidth,
				}}
			/>
		)
	}
}
export default Numbers

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
					position: "absolute",
					boxShadow: `inset 0 0 0 1px red`,
					zIndex: 1000,
					pointerEvents: "none",
					width: store.cellWidth,
					height: store.cellHeight,
					transform: `translate(${store.selected_x * store.cellWidth}px, ${store.selected_y * store.cellHeight}px)`
				}}
			/>
		)
	}
}
export default Numbers

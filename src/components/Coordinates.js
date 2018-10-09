import React from "react"
import store from "../models/CanvasStore.js"
import { observer } from "mobx-react"

class Coordinates extends React.Component {
	render() {
		return (
			<div className="coordinates">
				x:{store.selected_x + 1} y:{store.selected_y + 1}
			</div>
		)
	}
}
export default observer(Coordinates)


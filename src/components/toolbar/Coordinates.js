import React from "react"
import store from "../../models/CanvasStore.js"
import { observer } from "mobx-react"
import { getBoundingRectangle } from "../../utils/geometry"


class Coordinates extends React.Component {

 	selectionSize() {	
		if (store.selectionArea.start !== null) {
			
			let selectionWidth = 0
			let selectionHeight = 0

			if (store.selectionArea.end === null) {
				selectionWidth = Math.abs(store.selected_x - store.selectionArea.start[1]) + 1
				selectionHeight = Math.abs(store.selected_y - store.selectionArea.start[0]) + 1
			} else {
				selectionWidth =  Math.abs(store.selectionArea.end[1] - store.selectionArea.start[1]) + 1
				selectionHeight =  Math.abs(store.selectionArea.end[0] - store.selectionArea.start[0]) + 1		
			}
			return (
				<div>
					selection x:{selectionWidth} y:{selectionHeight}
				</div>
			)

		}
	}

	render() {
		return (
			<div className="coordinates" style={{textAlign: "right"}}>
				x:{+store.selected_x + 1} y:{+store.selected_y + 1}
				<br />
				{this.selectionSize()}
			</div>
		)
	}
}
export default observer(Coordinates)


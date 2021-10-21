import React from "react"
import { observer } from "mobx-react"
import store from "../../models/CanvasStore.js"

class CellWidth extends React.Component {
	render() {
		return (
			<div>
				{"Cell width:"}
				<button onClick={store.decreaseCellWidth}> {"-1"} </button>
				<button onClick={store.increaseCellWidth}> {"+1"} </button>
				<span>{store.cellWidth} px</span>
			</div>
		)
	}
}
export default observer(CellWidth)
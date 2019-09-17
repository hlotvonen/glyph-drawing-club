import React from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore.js"

class CellHeight extends React.Component {
	render() {
		return (
			<div>
				{"Cell height:"}
				<button onClick={store.decreaseCellHeight}> {"-1"} </button>
				<button onClick={store.increaseCellHeight}> {"+2"} </button>
				<span>{store.cellHeight} px</span>
			</div>
		)
	}
}
export default observer(CellHeight)
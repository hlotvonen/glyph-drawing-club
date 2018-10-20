import React from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore.js"

class HistoryControls extends React.Component {
	render() {
		return (
			<div>
				<button disabled={!store.isUndoAvailable} onClick={store.undo}>
					{"⟲ undo"}
				</button>
				<button disabled={!store.isRedoAvailable} onClick={store.redo}>
					{"redo ⟳"}
				</button>
			</div>
		)
	}
}
export default observer(HistoryControls)

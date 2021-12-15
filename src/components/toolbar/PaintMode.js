import { observer } from "mobx-react"
import React from "react"
import store from "../../models/CanvasStore"

class PaintMode extends React.Component {
	render() {
		return (
			<div className="relative">
				<input
					id="paintMode"
					name="paintMode"
					type="checkbox"
					checked={store.paintMode}
					value={store.paintMode}
					onChange={store.handleChangePaintMode}
				/>	
				<label htmlFor="paintMode">Paint mode</label>
			</div>
		)
	}
}
export default observer(PaintMode)

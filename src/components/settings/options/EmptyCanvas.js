import React from "react"
import store from "../../../models/CanvasStore.js"

class EmptyClear extends React.Component {
	render() {
		return (
			<div className="settingsBlock">
				<button onClick={store.emptyCanvas}> {"Empty canvas"} </button>
			</div>
		)
	}
}
export default EmptyClear

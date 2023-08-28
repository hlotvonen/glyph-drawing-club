
import React from "react"
import store from "../../../models/CanvasStore.js"

const EmptyClear = () => {
	return (
		<div className="settingsBlock">
			<button onClick={store.resetEverything}> {"Empty canvas"} </button>
		</div>
	)
}

export default EmptyClear

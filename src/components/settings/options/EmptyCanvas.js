
import React from "react"
import store from "../../../models/CanvasStore.js"

const EmptyClear = () => {
	return (
		<section>
			<h3>Reset</h3>
			<button onClick={store.resetCanvas} data-tooltip="Clear Canvas: Reset canvas to a blank state while retaining current settings"> Clear canvas </button>
			<button onClick={store.resetEverything} data-tooltip="Start Over: reset canvas to a blank state and reset ALL settings"> Reset everything </button>
		</section>
	)
}

export default EmptyClear

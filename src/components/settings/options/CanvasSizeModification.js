import { observer } from "mobx-react"
import React from "react"
import store from "../../../models/CanvasStore.js"

class CanvasHeight extends React.Component {
	render() {
		return (
			<div>

				<div className="settingsBlock">

					<div>Canvas width:</div>
					<button onClick={store.deleteCol}>{"-1"}</button>
					<button onClick={store.addCol}> {"+1"} </button>
					<span>
						{" "} {store.canvasWidth} {"columns"} ({store.cellWidth * store.canvasWidth} px)
					</span>


					<div className="mt-1">Canvas height:</div>
					<button onClick={store.deleteRow}> {"-1"} </button>
					<button onClick={store.addRow}> {"+1"} </button>
					<span>
						{" "} {store.canvasHeight} {"rows"} ({store.cellHeight * store.canvasHeight} px)
					</span>

				</div>

				<div className="settingsBlock">
					{"At red cursor:"}
					<br />
					<button onClick={store.addRowAtSelection}>
						{"Add Row \u2191"}
					</button>
					<button onClick={store.deleteRowAtSelection}>
						{"Delete Row"}
					</button>
					<br />
					<button onClick={store.addColAtSelection}>
						{"Add Col \u2190"}
					</button>
					<button onClick={store.deleteColAtSelection}>
						{"Delete Col"}
					</button>
				</div>

			</div>
		)
	}
}
export default observer(CanvasHeight)
